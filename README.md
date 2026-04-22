# HSK Flashcards

Tone-colored Chinese flashcards (HSK 1–3) with native audio and spaced repetition. Installable as an app on iPhone and Android via GitHub Pages.

## Contents

- `index.html` — the flashcard app (PWA entry point)
- `HSK Flashcards.html` — identical app under the old filename (keeps the desktop-folder shortcut working)
- `manifest.json`, `sw.js`, `icon-*.png`, `apple-touch-icon.png` — PWA assets (app icon, offline cache, install-to-home-screen)
- `hsk1 500/`, `hsk2 700/`, `hsk3 973/` — native audio files

## Deploy to iPhone via GitHub Pages

### Step 1 — Create the repo on github.com
1. Go to <https://github.com/new>
2. Repository name: `hsk-flashcards` (or anything you like)
3. **Public** (required for free GitHub Pages)
4. Do NOT tick "Add a README file" (this folder already has one)
5. Click **Create repository**
6. On the next page, copy the URL shown in the blue banner (looks like `https://github.com/YOUR-USERNAME/hsk-flashcards.git`)

### Step 2 — Push this folder to the repo

Open your Mac's **Terminal** app and paste these commands one block at a time. Replace `YOUR-URL` with the URL you copied.

```bash
cd "$HOME/Library/Mobile Documents/com~apple~CloudDocs/Chinese words mp3"
git init
git add .
git commit -m "Initial HSK Flashcards PWA"
git branch -M main
git remote add origin YOUR-URL
git push -u origin main
```

*(If your folder is somewhere other than iCloud's root, adjust the first `cd` line. Or just drag the folder into Terminal after typing `cd ` to auto-fill the path.)*

The first push uploads ~200 MB of audio. It may take a few minutes. If GitHub asks for a password, it actually wants a [Personal Access Token](https://github.com/settings/tokens) — on macOS you can instead install [GitHub Desktop](https://desktop.github.com/) which handles login automatically.

### Step 3 — Turn on GitHub Pages
1. Go to your repo on github.com → **Settings** → **Pages** (in the left sidebar).
2. Under *Source*, pick **Deploy from a branch**, branch **main**, folder `/ (root)`.
3. Click **Save**.
4. Wait 1–2 minutes. Refresh the page. You'll see: *"Your site is live at `https://YOUR-USERNAME.github.io/hsk-flashcards/`"*.

### Step 4 — Install onto your iPhone
1. Open that URL in **Safari** on your iPhone.
2. Tap the **Share** button (square with an arrow pointing up).
3. Scroll down, tap **Add to Home Screen**.
4. Confirm. An HSK icon appears on your home screen.
5. Tap it — it opens full-screen like a native app. Study progress and pictures you add are saved in the app's storage. Audio caches as you play cards, so recently-studied words work offline.

## Updating the app later
If I update the code in a future Cowork session, you can re-push with:
```bash
cd "$HOME/Library/Mobile Documents/com~apple~CloudDocs/Chinese words mp3"
git add .
git commit -m "Update"
git push
```
Within a minute, the iPhone app gets the update automatically on next open.
