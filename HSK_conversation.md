# HSK — Conversation Transcript

_Full transcript of the "HSK" conversation, saved to this project for reference._

---

### 👤 User
Continue from where you left off.

### 🤖 Assistant
No response requested.

---

### 👤 User
then add an option to add my own stories or series

### 🤖 Assistant
_(Edited the app: enhanced `renderPassageText` to auto-derive pinyin when the user leaves it blank; updated `renderReaderList` with a My Stories section + Add Story button and modal; updated `renderReaderPassage` so user-added stories show an Edit button; added CSS for the story form, add-story button, and series group; built and verified.)_

**Add your own stories or series**

A new yellow **+ Add my own story** button at the top of the Graded Reader list. Tap it and you get a form:

- **Title** (Chinese, required) and **Title (English, optional)**
- **Level** — HSK 1 / 2 / 3, or "Custom" for material above HSK 3
- **Series** (optional) — type a series name like "The Detective — Part 1" and any other story with the same series name automatically groups together under a 📚 header
- **Chinese text** — paste the whole story here, with punctuation and line breaks
- **Pinyin** (optional) — leave blank and the reader will **auto-fill pinyin per character from your deck**. If you give your own, it expects one syllable per Chinese character (with a friendly warning if the count's off)
- **English translation** (optional)

Once you save, the story appears under a new **My Stories** section at the top of the reader list, with all the same features as built-in passages — tap-to-lookup, pinyin/EN toggles, mark-as-read, save unknown words to deck. A small yellow level badge (HSK1 / HSK2 / HSK3 / CUSTOM) shows next to the title. Series with the same name appear grouped together with a 📚 header.

When you're reading one of your own stories, an extra **✎ Edit story** button shows up in the toolbar — that re-opens the form so you can edit the text, change the level, rename the series, **or delete the story** (with a confirm prompt). Edits and deletions persist in `localStorage` (`hsk_my_stories_v1`).

To deploy:

```bash
cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/Chinese\ words\ mp3
git add index.html "HSK Flashcards.html"
git commit -m "Add custom stories/series — paste your own text, auto-pinyin, edit/delete"
git push
```

---

### 👤 User
_(Uploaded: New-HSK-Vocabulary-Level-1.pdf, New-HSK-Vocabulary-Level-2.pdf, New-HSK-Vocabulary-Level-3.pdf)_

Cross reference the words in those three PDFs with the ones in my HSK 1-2-3. Tell me how many I'm missing, make a list of them so I can create MP3 sounds for them and add them to my app

### 🤖 Assistant
_(Extracted 300/200/500 words from the PDFs, compared with the app deck, and extracted pinyin + meaning for each missing word.)_

**Summary**

| Level | Words in PDF | ✓ At same level in app | ↪ In app, different level | ✗ Missing entirely |
|---|---:|---:|---:|---:|
| HSK 1 | 300 | 261 | 28 | **11** |
| HSK 2 | 200 | 81 | 112 | **5** |
| HSK 3 | 500 | 87 | 330 | **82** |

**Total missing: 98 words.** Those are the only ones to record MP3s for to fully cover the New HSK 1–3 vocabulary. The ~2,212 unique hanzi already in the app cover most New HSK words — just spread across different levels (the older HSK 1–6 system was structured differently).

Files generated: `HSK_missing_words.md` (full report with three tables, plus an appendix of 470 words classified at a different level) and `HSK_missing_words.csv` (flat list of 98 missing words with a `suggested_filename` column, e.g. `hsk3_001_阿姨.mp3`).

Notes:
- HSK 1 missing includes essentials like **你好, 那个, 这个, 玩, 有些, 一下** — simple words present as components but not as multi-character entries.
- HSK 2 nearly complete — only 5 missing: **没意思, 妻子, 踢, 有时, 丈夫**.
- HSK 3 is most of the work: 82 words (e.g. 冰箱, 蛋糕, 电梯, 邻居, 数学, 西瓜, 雨衣; verbs 尝, 迟到, 锻炼, 担心, 选择, 着急).
- A couple HSK 3 rows had a PDF table quirk (e.g. 红绿灯, 喜爱) where POS/translation got slightly scrambled in auto-parse; hanzi and pinyin are correct.

---

### 👤 User
Add the missing words to my HSK app for now. When I have the audio, we can update the app.

### 🤖 Assistant
_(Built `hsk_missing.py` with all 98 entries + hand-crafted example sentences; used pypinyin for per-character pinyin/tones with heteronym disambiguation; wired into `merge_and_build.py` with `audio_pending: true` and `path: ""`; verified front-end handles empty paths; confirmed idempotent build.)_

**Counts after the add**

| Level | Before | After | Added |
|---|---:|---:|---:|
| HSK 1 | 497 | **508** | +11 |
| HSK 2 | 764 | **769** | +5 |
| HSK 3 | 966 | **1,048** | +82 |
| Total | 2,303 | **2,401** | +98 |

The new cards work fully (tone-colored hanzi, sentences, lookup, segmentation, edits, SRS) minus the audio play button, which only renders once an MP3 path exists. When audio is ready: drop MP3s into the folder structure (e.g. `hsk1 500/hsk1 X/<num> <hanzi> .mp3`) and the `path` field gets updated, then rebuild.

---

### 👤 User
_(Uploaded: New-HSK-Vocabulary-Level-4.pdf, New-HSK-Vocabulary-Level-5.pdf, New-HSK-Vocabulary-L6.pdf)_

add those words as well to my app. Even if I am not learning them right now, they are useful in my dictionary and when writing or reading stories

### 🤖 Assistant
_(Parsed the three PDFs, persisted a clean JSON dataset, translated Chinese POS abbreviations, wired into the build, added HSK 4/5/6 cards to the welcome screen with a dict badge and CSS, ran the idempotent build.)_

**Added as a dictionary**

| Level | Source | New entries added |
|---|---|---:|
| HSK 4 | New HSK PDF (1,000 words) | **445** |
| HSK 5 | New HSK PDF (1,600 words) | **1,105** |
| HSK 6 | New HSK PDF (1,800 words) | **1,731** |

3,281 new entries on top of the existing deck (~1,100 PDF entries were already present under HSK 1/2/3). Total deck: 5,682 entries. HSK 4/5/6 show a 📖 dict badge and start unselected, so default study sessions still pull only HSK 1-3 / measure / grammar.

Immediate benefits: reading-mode lookups reach the full HSK 4/5/6 dictionary; word segmentation matches multi-character HSK 4-6 words; tone coloring works for all characters; built-in passages benefit from better segmentation. Pinyin/tones derived with pypinyin; POS labels translated from the HSK 6 PDF's Chinese abbreviations. PWA now ~1.2 MB, loads once and works offline.

---

### 👤 User
why didn't you add all the hanzi from each pdf? hsk 4 has 1000 words, hsk 5 has 1600 words, and hsk 6 has 1800 words

### 🤖 Assistant
You're right — I'd only added words brand new to the deck; the other ~1,100 PDF entries already existed under HSK 1/2/3 (older categorization). _(Updated the build to also cross-list those entries at their New HSK level, inheriting the original audio path, sentence, and emoji; verified idempotent.)_

**Now matching the PDF totals (after dedup of duplicate-row entries):**

| Level | PDF entries (unique) | In app | Fresh | Cross-listed from HSK 1-3 |
|---|---:|---:|---:|---:|
| HSK 4 | 997 | **997** | 445 | 552 |
| HSK 5 | 1,595 | **1,595** | 1,105 | 490 |
| HSK 6 | 1,794 | **1,794** | 1,731 | 63 |

Totals are 997 / 1,595 / 1,794 rather than 1,000 / 1,600 / 1,800 because each PDF lists a few entries twice with the same hanzi but different POS (e.g. 花 = verb "to spend" and noun "flower"); deduped by hanzi gives these numbers.

Cross-listed words inherit the original's audio, sentence, and emoji (full-featured, not stripped references) and are tagged `crosslisted_from: "hskN"`. E.g. 爱情 keeps its HSK 2 audio when studied at HSK 4.

**Total deck**

| Level | Words |
|---|---:|
| HSK 1 | 508 |
| HSK 2 | 769 |
| HSK 3 | 1,048 |
| HSK 4 | 997 |
| HSK 5 | 1,595 |
| HSK 6 | 1,794 |
| 量词 / 语法 | 76 |
| **Total entries** | **6,787** |

(Unique hanzi: 5,591 — the 1,196 duplicates are the cross-listings.) PWA now 1.56 MB, fast on first load and offline thereafter.

```bash
cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/Chinese\ words\ mp3
git add index.html "HSK Flashcards.html"
git commit -m "Cross-list HSK 1-3 words at HSK 4-6 to match full PDF lists"
git push
```
