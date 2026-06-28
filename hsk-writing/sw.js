/* HSK Writing service worker — scoped to /hsk-writing/ so it never touches the flashcard PWA */
const SHELL="hskw-shell-v6";
const RUN="hskw-runtime-v1";
const SHELL_ASSETS=[
  "./","./index.html","./manifest.json",
  "../icon-writing-192.png","../icon-writing-512.png","../apple-touch-icon-writing.png",
  "https://cdn.jsdelivr.net/npm/hanzi-writer@3.5.0/dist/hanzi-writer.min.js"
];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(SHELL).then(c=>c.addAll(SHELL_ASSETS)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k.startsWith("hskw-")&&k!==SHELL&&k!==RUN).map(k=>caches.delete(k))
  )));
  self.clients.claim();
});
self.addEventListener("fetch",e=>{
  const req=e.request;
  if(req.method!=="GET") return;
  const url=new URL(req.url);
  const isCDN = url.hostname==="cdn.jsdelivr.net";
  const isAudio = decodeURIComponent(url.pathname).toLowerCase().endsWith(".mp3");
  if(isCDN||isAudio){
    // cache-first for stroke data, library, and audio
    e.respondWith(caches.open(RUN).then(async c=>{
      const hit=await c.match(req); if(hit) return hit;
      try{ const res=await fetch(req); if(res&&(res.ok||res.type==="opaque")) c.put(req,res.clone()).catch(()=>{}); return res; }
      catch(err){ return hit||new Response("",{status:504}); }
    }));
  } else if(url.origin===location.origin){
    // network-first for app shell so updates roll out
    e.respondWith(fetch(req).then(res=>{
      if(res&&res.status===200){ const cp=res.clone(); caches.open(SHELL).then(c=>c.put(req,cp)).catch(()=>{}); }
      return res;
    }).catch(()=>caches.match(req).then(h=>h||caches.match("./index.html"))));
  }
});
