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

// --- Navigation ---
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

// --- RSVP Form -> Google Sheets ---
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbw0w18vI0MUpDJS3xvRTFJzVoFsZOLnu8Sw1JUCKo6i0AXgfQgI4g10XxeNP9VJpllq3g/exec';

document.getElementById('weddingRsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    var formData = {
        name: document.getElementById('guest-name').value,
        email: document.getElementById('guest-email').value,
        attendance: document.querySelector('input[name="attendance"]:checked').value,
        dietary: document.getElementById('dietary').value
    };
    
    // Send to Google Sheets
    fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then(function() {
        // Success - go to thank you page
        document.getElementById('weddingRsvpForm').reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit RSVP';
        navigate('thankyou');
    }).catch(function() {
        // Even on error, show thank you (no-cors always resolves)
        document.getElementById('weddingRsvpForm').reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit RSVP';
        navigate('thankyou');
    });
    
    // Fallback: after 3 seconds, go to thank you page regardless
    setTimeout(function() {
        if (!document.getElementById('thankyou').classList.contains('active-page')) {
            document.getElementById('weddingRsvpForm').reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit RSVP';
            navigate('thankyou');
        }
    }, 3000);
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

// --- Gallery ---
document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', function() { window.open(this.src, '_blank'); });
});

// --- Video ---
const hv = document.querySelector('.hero-video');
if (hv) { hv.play().catch(function() {}); }