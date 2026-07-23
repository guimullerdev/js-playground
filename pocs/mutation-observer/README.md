# Mutation Observer PoC

Minimal example of using the `MutationObserver` API to react to DOM changes (child additions/removals, attribute changes, text changes) without polling.

## Files

- `index.js` — creates a `MutationObserver` watching `#target` for `childList`, `attributes`, and `characterData` mutations, and buttons that trigger each kind of change.
- `index.html` — a watched box plus buttons to add/remove a child, toggle a class, and edit text, and an on-page log panel.

## How to test

1. Open `index.html` directly in a browser (double-click it, or `open index.html` on macOS).
2. Open the browser DevTools console (mutations are also logged to the on-page log panel).
3. Click the buttons and observe logs like:
   ```
   childList: 1 node(s) added
   childList: 1 node(s) removed
   attributes: "class" changed to "highlighted"
   characterData: changed to "Edited at 10:32:01 AM"
   ```
4. Try editing the element directly via DevTools Elements panel (e.g. add an attribute) — the observer picks that up too, since it's not tied to the buttons.

Alternatively, serve the folder with any static server, e.g.:

```bash
npx serve pocs/mutation-observer
```

then open the printed URL in a browser.
