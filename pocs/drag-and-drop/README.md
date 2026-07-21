# Drag and Drop PoC

Minimal example of the native HTML5 Drag and Drop API: a 3-column kanban board where cards can be dragged between columns.

## Files

- `index.js` — wires up `dragstart`/`dragend` on cards and `dragover`/`dragleave`/`drop` on columns, using `DataTransfer` to pass the dragged card's id.
- `index.html` — three columns (`To Do`, `Doing`, `Done`) with draggable cards, plus CSS for drag/hover feedback.

## How to test

1. Open `index.html` directly in a browser (double-click it, or `open index.html` on macOS).
2. Open the browser DevTools console.
3. Drag a card from one column to another. You should see:
   - The column highlight while a card is dragged over it.
   - The card become semi-transparent while dragging.
   - Console logs for `dragstart`, `drop`, and `dragend`, e.g.:
     ```
     dragstart: card 1
     drop: card 1 moved to "doing"
     dragend: card 1
     ```
4. Drop a card back in its original column or move it further to see it re-parented into the target column.

Alternatively, serve the folder with any static server, e.g.:

```bash
npx serve pocs/drag-and-drop
```

then open the printed URL in a browser.
