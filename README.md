# AskTab website

The public AskTab homepage and privacy policy, served by GitHub Pages from `main` at [hicms.github.io](https://hicms.github.io/).

## Files

- `index.html`: English product homepage, installation instructions, and links.
- `assets/homepage.css` and `assets/homepage.js`: responsive layout and accessible screenshot preview.
- `ask-tab/privacy.html`: published privacy policy; keep this URL stable for the Chrome Web Store listing.
- `assets/brand/`, `assets/screenshots/`, and `assets/social/`: generated copies of shared public images.

## Update shared images

The source assets and inventory belong to the [AskTab extension repository](https://github.com/hicms/ask-tab/tree/main/assets). Do not edit copied website images independently. From an adjacent AskTab checkout:

```powershell
node scripts/sync-site-assets.mjs ../hicms.github.io
node scripts/sync-site-assets.mjs ../hicms.github.io --check
```

The script validates the image sizes and formats before copying. Commit source asset changes in AskTab, then commit the corresponding copies here. See the [asset management guide](https://github.com/hicms/ask-tab/blob/main/assets/README.md) for the complete workflow.

## Preview and publish

From this directory, start a local static server:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/`. Check desktop and mobile layouts, installation links, the screenshot preview (including Escape and keyboard focus), and the privacy policy before committing. Pushing to `main` triggers GitHub Pages deployment. No package installation or build step is required.

The homepage uses local styles, scripts, and images. It contains no analytics or external font requests. Product features, service requirements, and privacy statements must match the actual extension and its service.
