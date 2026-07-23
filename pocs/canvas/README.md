# Canvas API PoC

Minimal example of the 2D Canvas API: click-and-drag to spawn bouncing, colored particles with a fading trail effect, animated via `requestAnimationFrame`.

## Files

- `index.js` — spawns particles on `pointerdown`/`pointermove`, updates their position each frame, bounces them off the canvas edges, and redraws with a semi-transparent overlay to create motion trails.
- `index.html` — a `<canvas>` element and a "Clear" button.

## How to test

1. Open `index.html` directly in a browser (double-click it, or `open index.html` on macOS).
2. Open the browser DevTools console (spawn events are logged there).
3. Click and drag on the canvas — particles spawn at the cursor and bounce around with trailing motion.
4. Click "Clear" to reset the canvas.

Alternatively, serve the folder with any static server, e.g.:

```bash
npx serve pocs/canvas
```

then open the printed URL in a browser.
