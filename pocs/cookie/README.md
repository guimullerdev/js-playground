# Cookie PoC

Minimal example of setting, reading and deleting cookies using `document.cookie` in the browser.

## Files

- `index.js` — `setCookie`, `getCookie` and `deleteCookie` helpers, plus example usage.
- `index.html` — loads `index.js` so it runs in a browser.

## How to test

1. Open `index.html` directly in a browser (double-click it, or `open index.html` on macOS).
2. Open the browser DevTools console.
3. You should see logged output:
   ```
   username cookie: john_doe
   username cookie after delete: null
   ```
4. You can also inspect the `username` cookie in DevTools → Application/Storage → Cookies while the script runs, to see it get created and then removed.

Alternatively, serve the folder with any static server, e.g.:

```bash
npx serve pocs/cookie
```

then open the printed URL in a browser.
