# Intersection Observer PoC

Minimal example of using the `IntersectionObserver` API to detect when elements enter or leave the viewport, without listening to `scroll` events.

## Files

- `index.js` — creates an `IntersectionObserver` watching a set of `.box` elements; logs and toggles a `visible` class when each box crosses 50% visibility.
- `index.html` — five boxes separated by tall spacers, plus CSS for a fade/slide-in transition.

## How to test

1. Open `index.html` directly in a browser (double-click it, or `open index.html` on macOS).
2. Open the browser DevTools console.
3. Scroll down the page. As each box crosses 50% into the viewport, you should see it fade/slide in and log:
   ```
   Box 1 entered viewport (ratio: 0.50)
   ```
4. Scroll back up to see the "left viewport" logs and the boxes fade back out.

Alternatively, serve the folder with any static server, e.g.:

```bash
npx serve pocs/intersection-observer
```

then open the printed URL in a browser.
