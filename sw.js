/* HSK Flashcards service worker */
const SHELL_CACHE = "hsk-shell-v1";
const AUDIO_CACHE = "hsk-audio-v1";
const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(SHELL_CACHE).then((c) => c.addAll(SHELL_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== SHELL_CACHE && k !== AUDIO_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  const req = evt.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  const path = decodeURIComponent(url.pathname).toLowerCase();
  const isAudio = path.endsWith(".mp3");

  if (isAudio) {
    // Cache-first for mp3s; fetch + cache on miss
    evt.respondWith(
      caches.open(AUDIO_CACHE).then(async (cache) => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res && res.status === 200) cache.put(req, res.clone()).catch(() => {});
          return res;
        } catch (e) {
          return new Response("", { status: 504 });
        }
      })
    );
  } else {
    // Network-first for app shell (so updates roll out), fall back to cache
    evt.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(SHELL_CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match("./index.html")))
    );
  }
});
