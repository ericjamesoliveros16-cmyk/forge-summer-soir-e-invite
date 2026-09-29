// --- Entrance Screen + Music ---
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const entranceScreen = document.getElementById('entranceScreen');
const enterBtn = document.getElementById('enterBtn');
let musicPlaying = false;

function setPlaying() { musicPlaying = true; musicToggle.classList.add('playing'); musicIcon.innerHTML = '\u266B'; }
function setPaused() { musicPlaying = false; musicToggle.classList.remove('playing'); musicIcon.innerHTML = '\u266A'; }

enterBtn.addEventListener('click', function() {
    bgMusic.play().then(setPlaying).catch(function() {});
    entranceScreen.classList.add('hidden');
    setTimeout(function() { entranceScreen.style.display = 'none'; }, 1200);
});

musicToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    if (musicPlaying) { bgMusic.pause(); setPaused(); }
    else { bgMusic.play().then(setPlaying).catch(function() {}); }
});

// --- Hamburger Menu ---
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');

function closeMenu() {
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('show');
}
menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    menuOverlay.classList.toggle('show');
});
menuOverlay.addEventListener('click', closeMenu);

// --- Navigation (both desktop nav-links and mobile-menu links) ---
function navigate(targetId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    document.getElementById(targetId).classList.add('active-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        navigate(this.dataset.target);
        closeMenu();
    });
});
document.getElementById('logoHome').addEventListener('click', function() {
    navigate('landing');
    closeMenu();
});
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() { navigate(this.dataset.target); });
});
document.querySelectorAll('.hero-square').forEach(sq => {
    sq.addEventListener('click', function() { navigate(this.dataset.target); });
});
// --- Countdown ---
const wd = new Date('2027-02-21T16:00:00').getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const dist = wd - now;
    if (dist < 0) { document.getElementById('countdown').innerHTML = '<p>The big day is here!</p>'; return; }
    document.getElementById('days').textContent = String(Math.floor(dist / 86400000)).padStart(2,'0');
    document.getElementById('hours').textContent = String(Math.floor((dist % 86400000) / 3600000)).padStart(2,'0');
    document.getElementById('minutes').textContent = String(Math.floor((dist % 3600000) / 60000)).padStart(2,'0');
    document.getElementById('seconds').textContent = String(Math.floor((dist % 60000) / 1000)).padStart(2,'0');
}
updateCountdown(); setInterval(updateCountdown, 1000);
// --- RSVP ---
document.getElementById('weddingRsvpForm').addEventListener('submit', function(e) {
    e.preventDefault(); document.getElementById('form-message').style.display = 'block'; this.reset();
});
// --- Gallery ---
document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', function() { window.open(this.src, '_blank'); });
});
// --- Video ---
const hv = document.querySelector('.hero-video');
if (hv) { hv.play().catch(function() {}); }