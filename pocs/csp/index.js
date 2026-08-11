console.log('index.js loaded (allowed by script-src \'self\')');

// The browser fires this event whenever the CSP defined in index.html blocks something.
document.addEventListener('securitypolicyviolation', (event) => {
  console.warn('CSP violation:', {
    directive: event.violatedDirective,
    blockedURI: event.blockedURI,
    sourceFile: event.sourceFile,
    lineNumber: event.lineNumber,
  });
});

// Blocked: connect-src 'self' does not allow requests to other origins.
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((res) => res.json())
  .then((data) => console.log('fetch succeeded (should NOT happen):', data))
  .catch((err) => console.log('fetch blocked as expected:', err.message));
