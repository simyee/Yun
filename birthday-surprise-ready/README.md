# Yun Sol’s Birthday Adventure ♡

This is a simple static website: there is no database, login, or build step.

## Image folders

Put the real files at these exact paths (keep the filenames unchanged):

- `assets/references/visual-style-board.png` — design reference only; the live page does not display it.
- `assets/photos/couple-photobooth-01.jpg` — opening photo.
- `assets/photos/couple-photobooth-02.jpg` — final-letter photo.
- `assets/chibi/chibi-couple-casual.png` — opening and locked screen mascot.
- `assets/chibi/chibi-couple-dinner.png` — dinner invitation mascot.
- `assets/chibi/chibi-couple-concert.png` — concert reveal mascot.
- `assets/concert/bigbang-ticket.png` — real ticket shown in the concert reveal. Do not replace this with a recreation.
- `assets/social/share-preview.jpg` — link preview image. A 1200 × 630 preview has been created from the supplied style board.

Missing images show a labeled pastel placeholder, so the website remains usable while assets are being prepared.

## Preview locally

The easiest option is to double-click `index.html`; it opens in your browser immediately.

For a localhost preview (closer to the published site), open a terminal in this folder and run:

```powershell
npx serve .
```

Use the local address shown in the terminal (usually `http://localhost:3000`). The first run may ask permission to download the small preview utility.

## Test the unlocked experience

Near the top of `script.js`, change:

```js
const TEST_UNLOCK_BIRTHDAY_EXPERIENCE = false;
```

to `true`. Before publishing the real surprise, change it back to `false`.

## Edit details

- Dinner location/date/time and all concert details: edit the clearly labeled `CONFIG` block near the top of `script.js`.
- Final letter: edit `FINAL_BIRTHDAY_MESSAGE` near the top of `script.js`.
- Images: replace the corresponding files inside `assets`.

## Deploy to Vercel

1. Create a free Vercel account and choose **Add New → Project**.
2. Upload/import this `birthday-surprise` folder through a GitHub repository.
3. Leave Framework Preset as **Other** and leave Build Command empty.
4. Click **Deploy**.

To update the live site while keeping the same link, edit the files in the same GitHub repository and push/commit them. Vercel automatically redeploys to the existing project URL.
