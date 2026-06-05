# SerpDex — GitHub Pages File Structure

## Files

```
serpdex/
│
├── index.html              ← Homepage
├── schema-generator.html   ← Schema Markup Generator tool
│
├── shared.css              ← ALL shared styles (nav, footer, buttons, tokens)
├── header.html             ← Nav markup only — loaded by every page
├── footer.html             ← Footer markup only — loaded by every page
├── components.js           ← Fetches header.html + footer.html into every page
│
└── README.md               ← This file
```

## How it works

Every page has two placeholder divs:
```html
<div id="site-header"></div>   <!-- top of body -->
<div id="site-footer"></div>   <!-- bottom of body -->
```

`components.js` runs on `DOMContentLoaded` and fetches `header.html`
and `footer.html` into those divs. Works on GitHub Pages.

## Adding a new tool page

1. Copy `schema-generator.html` as a starting point
2. Replace the content between the two placeholder divs
3. Keep these 3 lines in `<head>`:
   ```html
   <link rel="stylesheet" href="shared.css" />
   ```
4. Keep these 2 lines before `</body>`:
   ```html
   <div id="site-footer"></div>
   <script src="components.js"></script>
   ```
5. Add any page-specific CSS in a `<style>` tag in `<head>`

## Updating header/footer sitewide

Edit **only** `header.html` or `footer.html` — every page updates automatically.

## GitHub Pages setup

1. Push all files to a repo
2. Go to Settings → Pages → Source: `main` branch, `/ (root)`
3. Your site is live at `https://yourusername.github.io/serpdex/`

> **Note:** The component loader uses `fetch()` which requires the files
> to be served over HTTP/HTTPS. Opening HTML files directly from your
> desktop (`file://`) will block the fetch. Use a local server for
> development: `npx serve .` or VS Code Live Server.
