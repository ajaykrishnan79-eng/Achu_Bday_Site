const pages = [...document.querySelectorAll('.page')];
function showPage(id) {
  pages.forEach(p => p.classList.toggle('active', p.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.querySelectorAll('[data-next]').forEach(b => b.addEventListener('click', () => showPage(b.dataset.next)));
document.querySelectorAll('[data-prev]').forEach(b => b.addEventListener('click', () => showPage(b.dataset.prev)));

const openLetter = document.getElementById('openLetter');
const letter = document.getElementById('letter');
openLetter.addEventListener('click', () => {
  const opening = letter.classList.contains('hidden');
  letter.classList.toggle('hidden', !opening);
  openLetter.innerHTML = opening ? 'Close letter <span>×</span>' : 'Open your letter <span>♡</span>';
  openLetter.setAttribute('aria-expanded', String(opening));
  if (opening) letter.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Try audible autoplay on load. Browsers may block it; if so, the first tap anywhere
// on the page starts playback. The music button then acts as mute/unmute.
const audio = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
let userMuted = false;
function updateMusicButton() {
  const isMuted = userMuted || audio.muted;
  musicLabel.textContent = isMuted ? 'Unmute music' : 'Mute music';
  musicToggle.setAttribute('aria-pressed', String(!isMuted && !audio.paused));
}
async function startMusicFromGesture() {
  if (userMuted) return;
  audio.muted = false;
  try {
    await audio.play();
    updateMusicButton();
    document.removeEventListener('pointerdown', startMusicFromGesture);
    document.removeEventListener('keydown', startMusicFromGesture);
  } catch (e) {
    // A later user gesture can retry; the button remains available.
  }
}
audio.addEventListener('error', () => {
  musicLabel.textContent = 'Music file missing';
  musicToggle.title = 'Upload music.mp3 beside index.html';
});
musicToggle.addEventListener('click', async () => {
  if (audio.paused) {
    userMuted = false;
    audio.muted = false;
    try { await audio.play(); } catch (e) { musicLabel.textContent = 'Tap to play music'; return; }
  } else {
    userMuted = !userMuted;
    audio.muted = userMuted;
  }
  updateMusicButton();
});
window.addEventListener('load', async () => {
  audio.muted = false;
  try {
    await audio.play();
    updateMusicButton();
  } catch (e) {
    musicLabel.textContent = 'Tap for music';
    document.addEventListener('pointerdown', startMusicFromGesture, { passive: true });
    document.addEventListener('keydown', startMusicFromGesture);
  }
});

const petals = document.querySelector('.petals');
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const symbols = ['✿', '·', '❀'];
  for (let i = 0; i < 13; i++) {
    const p = document.createElement('span');
    p.className = 'petal'; p.textContent = symbols[i % 3];
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = 10 + Math.random() * 12 + 's';
    p.style.animationDelay = -Math.random() * 18 + 's';
    p.style.fontSize = 10 + Math.random() * 13 + 'px';
    p.style.setProperty('--drift', (Math.random() * 100 - 50) + 'px');
    petals.appendChild(p);
  }
}
