const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const COLORS = ['#ff6b6b', '#feca57', '#1dd1a1', '#54a0ff', '#c56cf0'];

let particles = [];
let isPointerDown = false;

function spawnParticle(x, y) {
  particles.push({
    x,
    y,
    radius: 4 + Math.random() * 6,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  });
}

function step() {
  ctx.fillStyle = 'rgba(17, 17, 17, 0.25)'; // trail effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x - p.radius < 0 || p.x + p.radius > canvas.width) p.vx *= -1;
    if (p.y - p.radius < 0 || p.y + p.radius > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }

  requestAnimationFrame(step);
}

canvas.addEventListener('pointerdown', (event) => {
  isPointerDown = true;
  const rect = canvas.getBoundingClientRect();
  spawnParticle(event.clientX - rect.left, event.clientY - rect.top);
  console.log(`spawned particle, total: ${particles.length}`);
});

canvas.addEventListener('pointermove', (event) => {
  if (!isPointerDown) return;
  const rect = canvas.getBoundingClientRect();
  spawnParticle(event.clientX - rect.left, event.clientY - rect.top);
});

window.addEventListener('pointerup', () => {
  isPointerDown = false;
});

document.getElementById('clear').addEventListener('click', () => {
  particles = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  console.log('cleared canvas');
});

ctx.fillStyle = '#111';
ctx.fillRect(0, 0, canvas.width, canvas.height);
requestAnimationFrame(step);
