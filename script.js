// Kaydırınca belirme
const io = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('show'));
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// İlerleme çubuğu
const bar = document.getElementById('progress');
addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (scrollY / max) * 100 + '%';
});

// Uçan kalpler (canvas)
const c = document.getElementById('hearts');
const ctx = c.getContext('2d');
let hearts = [];
function resize() { c.width = innerWidth; c.height = innerHeight; }
resize(); addEventListener('resize', resize);

function newHeart() {
  return {
    x: Math.random() * c.width, y: c.height + 20,
    s: 6 + Math.random() * 14, v: 0.4 + Math.random() * 1.2,
    a: 0.2 + Math.random() * 0.5, w: Math.random() * Math.PI * 2
  };
}
for (let i = 0; i < 40; i++) { const h = newHeart(); h.y = Math.random() * c.height; hearts.push(h); }

function drawHeart(x, y, s, a) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s / 16, s / 16);
  ctx.fillStyle = `hsla(340, 90%, 65%, ${a})`;
  ctx.beginPath();
  ctx.moveTo(0, 4);
  ctx.bezierCurveTo(0, 0, -8, -4, -8, 2);
  ctx.bezierCurveTo(-8, 8, 0, 12, 0, 16);
  ctx.bezierCurveTo(0, 12, 8, 8, 8, 2);
  ctx.bezierCurveTo(8, -4, 0, 0, 0, 4);
  ctx.fill(); ctx.restore();
}
(function loop() {
  ctx.clearRect(0, 0, c.width, c.height);
  hearts.forEach((h, i) => {
    h.y -= h.v; h.w += 0.02;
    drawHeart(h.x + Math.sin(h.w) * 20, h.y, h.s, h.a);
    if (h.y < -30) hearts[i] = newHeart();
  });
  requestAnimationFrame(loop);
})();

// Buton: kalp patlaması
const emojis = ['❤️', '💖', '💕', '💘', '💗', '🌹'];
document.getElementById('loveBtn').addEventListener('click', e => {
  for (let i = 0; i < 30; i++) {
    const s = document.createElement('span');
    s.className = 'burst';
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.left = e.clientX + 'px';
    s.style.top = e.clientY + 'px';
    const ang = Math.random() * Math.PI * 2, d = 100 + Math.random() * 200;
    s.style.setProperty('--x', Math.cos(ang) * d + 'px');
    s.style.setProperty('--y', Math.sin(ang) * d + 'px');
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1200);
  }
  e.target.textContent = 'Ben de seni seviyorum 💞';
});
