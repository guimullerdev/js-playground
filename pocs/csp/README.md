# CSP (Content Security Policy) PoC

Demonstrates how a `Content-Security-Policy` (set here via `<meta http-equiv>`) restricts
what a page can load and execute, and how to observe blocked resources via the
`securitypolicyviolation` event.

The policy in `index.html` is:

```
default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; object-src 'none'
```

## Files

- `index.html` — sets the CSP and includes: the local `index.js`, an inline `<script>`, an
  external `<script src>`, and an external `<img>` — to show what gets blocked vs allowed.
  `index.js` is loaded first (in `<head>`) so its violation listener is registered before the
  browser parses the other, blocked elements.
- `index.js` — logs on load (proving `'self'` scripts run), registers a
  `securitypolicyviolation` listener to log every blocked resource, and does a cross-origin
  `fetch` that `connect-src 'self'` blocks.

## How to test

1. Serve the folder with a static server (CSP behaves inconsistently under `file://`, so don't
   just double-click `index.html`):
   ```bash
   npx serve pocs/csp
   ```
2. Open the printed URL in a browser and open DevTools → Console.
3. You should see:
   - `index.js loaded (allowed by script-src 'self')`
   - Several `CSP violation: {...}` warnings — one each for the inline script, the jQuery
     `<script src>`, the external `<img>`, and the cross-origin `fetch`.
   - `fetch blocked as expected: Failed to fetch`
   - No `inline script ran` or `fetch succeeded` messages — those prove the CSP actually blocked
     that code from running.
4. In DevTools → Network, the jQuery script and the placeholder image will show as blocked
   (`(blocked:csp)`), and no request to `jsonplaceholder.typicode.com` will appear.

Try loosening the policy (e.g. add `'unsafe-inline'` to `script-src`) and reload to see the
inline script log start firing — that's the mechanism CSP uses to stop injected/XSS scripts
from running.
