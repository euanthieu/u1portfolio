# Euan Mathieu — Portfolio

Static site, no build step. A full-screen, draggable mosaic of works with a name intro, a lightbox and a profile/index panel.

| Path | What it is |
|---|---|
| `js/portfolio.js` | **All content**: name, bio, contact links, list of works. Edit this. |
| `js/gallery.js` | The `<u1-gallery>` element (layout, motion, lightbox, profile). |
| `media/` | Posters, video stills, short tile loops and web-sized videos. |
| `index.html` | The page. |

**Preview locally:** `python -m http.server 5173`, then open http://localhost:5173.

**Deploy:** `npx vercel` (preview) or `npx vercel --prod` (live).

**Add a work:** drop the file in `media/`, then add an entry to `WORKS` in `js/portfolio.js` with its `w`/`h` (pixel size) so the grid reserves the right shape.
