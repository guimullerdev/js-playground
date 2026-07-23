const target = document.getElementById('target');
const logEl = document.getElementById('log');

function log(message) {
  console.log(message);
  logEl.textContent += `${message}\n`;
  logEl.scrollTop = logEl.scrollHeight;
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      if (mutation.addedNodes.length > 0) {
        log(`childList: ${mutation.addedNodes.length} node(s) added`);
      }
      if (mutation.removedNodes.length > 0) {
        log(`childList: ${mutation.removedNodes.length} node(s) removed`);
      }
    } else if (mutation.type === 'attributes') {
      log(`attributes: "${mutation.attributeName}" changed to "${mutation.target.getAttribute(mutation.attributeName)}"`);
    } else if (mutation.type === 'characterData') {
      log(`characterData: changed to "${mutation.target.data}"`);
    }
  }
});

observer.observe(target, {
  childList: true,
  attributes: true,
  characterData: true,
  subtree: true,
  characterDataOldValue: true,
});

let childCount = 0;

document.getElementById('add-child').addEventListener('click', () => {
  childCount += 1;
  const child = document.createElement('p');
  child.textContent = `Child ${childCount}`;
  target.appendChild(child);
});

document.getElementById('remove-child').addEventListener('click', () => {
  const lastChild = target.querySelector('p:last-of-type');
  if (lastChild) target.removeChild(lastChild);
});

document.getElementById('toggle-class').addEventListener('click', () => {
  target.classList.toggle('highlighted');
});

document.getElementById('edit-text').addEventListener('click', () => {
  const textNode = [...target.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
  if (textNode) {
    textNode.data = `Edited at ${new Date().toLocaleTimeString()}`;
  }
});
