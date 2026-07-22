/* ============================================
   RETRO ARCADE PORTFOLIO — Steven Kang
   Main JavaScript — Interactivity & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initNavbar();
  initLevelCards();
  initSkillBars();
  initTypingEffect();
  initPressStart();
  initPixelSprite();
  initKonamiCode();
  initSoundSystem();
  initMobileNav();
});

/* ============================================
   1. Scroll-Triggered Animations
   Uses IntersectionObserver for performance
   ============================================ */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // only animate once
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ============================================
   2. Navbar — Show/hide on scroll
   ============================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hero = document.getElementById('hero');

  if (!navbar || !hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      navbar.classList.toggle('visible', !entry.isIntersecting);
    },
    { threshold: 0.1 }
  );

  observer.observe(hero);

  // Active link highlighting
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

/* ============================================
   3. Level Cards — Expand/Collapse
   ============================================ */
function initLevelCards() {
  const cards = document.querySelectorAll('.level-card');

  cards.forEach((card) => {
    const header = card.querySelector('.level-header');

    // Click handler
    header.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');

      // Close all other cards
      cards.forEach((c) => {
        if (c !== card) {
          c.classList.remove('expanded');
          c.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current card
      card.classList.toggle('expanded', !isExpanded);
      card.setAttribute('aria-expanded', String(!isExpanded));

      // Play sound
      playSound(isExpanded ? 'close' : 'open');
    });

    // Keyboard support
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
}

/* ============================================
   4. Skill Bars — Animate on scroll
   ============================================ */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  if (!skillBars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const targetWidth = fill.getAttribute('data-width');
          // Small delay for visual effect
          setTimeout(() => {
            fill.style.width = targetWidth;
            fill.classList.add('animate');
          }, 200);
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach((bar) => observer.observe(bar));
}

/* ============================================
   5. Typing Effect — Hero tagline
   ============================================ */
function initTypingEffect() {
  const taglineEl = document.getElementById('hero-tagline-text');
  if (!taglineEl) return;

  const text = taglineEl.getAttribute('data-text');
  taglineEl.textContent = '';

  let i = 0;
  const speed = 35; // ms per character

  function type() {
    if (i < text.length) {
      taglineEl.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  // Start after a brief delay
  setTimeout(type, 800);
}

/* ============================================
   6. Press Start — Landing CTA
   ============================================ */
function initPressStart() {
  const btn = document.getElementById('press-start');
  if (!btn) return;

  btn.addEventListener('click', () => {
    playSound('start');
    const about = document.getElementById('about');
    if (about) {
      about.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* ============================================
   7. Pixel Sprite — Follows cursor on desktop
   A simple canvas-drawn pixel character
   ============================================ */
function initPixelSprite() {
  // Only on desktop (no cursor on mobile)
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.innerWidth < 768) return;

  const sprite = document.getElementById('pixel-sprite');
  if (!sprite) return;

  // Draw a small 16x16 pixel character on canvas
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');

  // Simple pixel art — small ghost/pac-man style character
  const pixels = [
    // Row data: [row, col, color]
    // Head
    [3,5,'#3a6cf4'],[3,6,'#3a6cf4'],[3,7,'#3a6cf4'],[3,8,'#3a6cf4'],[3,9,'#3a6cf4'],[3,10,'#3a6cf4'],
    [4,4,'#3a6cf4'],[4,5,'#3a6cf4'],[4,6,'#3a6cf4'],[4,7,'#3a6cf4'],[4,8,'#3a6cf4'],[4,9,'#3a6cf4'],[4,10,'#3a6cf4'],[4,11,'#3a6cf4'],
    [5,3,'#3a6cf4'],[5,4,'#3a6cf4'],[5,5,'#3a6cf4'],[5,6,'#ffffff'],[5,7,'#3a6cf4'],[5,8,'#3a6cf4'],[5,9,'#ffffff'],[5,10,'#3a6cf4'],[5,11,'#3a6cf4'],[5,12,'#3a6cf4'],
    [6,3,'#3a6cf4'],[6,4,'#3a6cf4'],[6,5,'#3a6cf4'],[6,6,'#ffffff'],[6,7,'#3a6cf4'],[6,8,'#3a6cf4'],[6,9,'#ffffff'],[6,10,'#3a6cf4'],[6,11,'#3a6cf4'],[6,12,'#3a6cf4'],
    [7,3,'#3a6cf4'],[7,4,'#3a6cf4'],[7,5,'#3a6cf4'],[7,6,'#3a6cf4'],[7,7,'#3a6cf4'],[7,8,'#3a6cf4'],[7,9,'#3a6cf4'],[7,10,'#3a6cf4'],[7,11,'#3a6cf4'],[7,12,'#3a6cf4'],
    [8,3,'#3a6cf4'],[8,4,'#3a6cf4'],[8,5,'#3a6cf4'],[8,6,'#3a6cf4'],[8,7,'#3a6cf4'],[8,8,'#3a6cf4'],[8,9,'#3a6cf4'],[8,10,'#3a6cf4'],[8,11,'#3a6cf4'],[8,12,'#3a6cf4'],
    [9,3,'#3a6cf4'],[9,4,'#3a6cf4'],[9,5,'#3a6cf4'],[9,6,'#3a6cf4'],[9,7,'#3a6cf4'],[9,8,'#3a6cf4'],[9,9,'#3a6cf4'],[9,10,'#3a6cf4'],[9,11,'#3a6cf4'],[9,12,'#3a6cf4'],
    [10,3,'#3a6cf4'],[10,4,'#3a6cf4'],[10,5,'#3a6cf4'],[10,6,'#3a6cf4'],[10,7,'#3a6cf4'],[10,8,'#3a6cf4'],[10,9,'#3a6cf4'],[10,10,'#3a6cf4'],[10,11,'#3a6cf4'],[10,12,'#3a6cf4'],
    // Legs/tentacles with gaps
    [11,3,'#3a6cf4'],[11,4,'#3a6cf4'],[11,6,'#3a6cf4'],[11,7,'#3a6cf4'],[11,9,'#3a6cf4'],[11,10,'#3a6cf4'],[11,12,'#3a6cf4'],
    [12,3,'#3a6cf4'],[12,7,'#3a6cf4'],[12,10,'#3a6cf4'],
  ];

  pixels.forEach(([row, col, color]) => {
    ctx.fillStyle = color;
    ctx.fillRect(col * 2, row * 2, 2, 2);
  });

  sprite.style.backgroundImage = `url(${canvas.toDataURL()})`;
  sprite.style.backgroundSize = 'cover';
  sprite.style.display = 'block';

  let mouseX = 0;
  let mouseY = 0;
  let spriteX = 0;
  let spriteY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth follow with easing
  function animateSprite() {
    const dx = mouseX - spriteX;
    const dy = mouseY - spriteY;
    spriteX += dx * 0.08;
    spriteY += dy * 0.08;
    sprite.style.left = `${spriteX + 16}px`;
    sprite.style.top = `${spriteY + 16}px`;

    // Flip direction based on movement
    sprite.style.transform = dx < -1 ? 'scaleX(-1)' : 'scaleX(1)';

    requestAnimationFrame(animateSprite);
  }

  animateSprite();
}

/* ============================================
   8. Konami Code Easter Egg
   ↑ ↑ ↓ ↓ ← → ← → B A
   ============================================ */
function initKonamiCode() {
  const code = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];
  let index = 0;

  document.addEventListener('keydown', (e) => {
    if (e.code === code[index]) {
      index++;
      if (index === code.length) {
        triggerEasterEgg();
        index = 0;
      }
    } else {
      index = 0;
    }
  });
}

function triggerEasterEgg() {
  playSound('secret');

  // Glitch the hero name
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    heroName.classList.add('glitch-text', 'active');
    setTimeout(() => heroName.classList.remove('active'), 600);
  }

  // Spawn confetti
  const container = document.getElementById('konami-confetti');
  if (!container) return;

  const colors = ['#00fff5', '#ff2d95', '#ffd700', '#39ff14', '#ff5500', '#aa00ff'];

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${2 + Math.random() * 2}s`;
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.width = `${4 + Math.random() * 8}px`;
    piece.style.height = piece.style.width;
    container.appendChild(piece);
  }

  // Clean up confetti after animation
  setTimeout(() => {
    container.innerHTML = '';
  }, 5000);

  // Flash a fun message
  const msg = document.createElement('div');
  msg.textContent = '🎮 ACHIEVEMENT UNLOCKED: SECRET FOUND! 🎮';
  msg.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Press Start 2P', monospace;
    font-size: clamp(0.5rem, 2vw, 0.8rem);
    color: #d4940a;
    background: rgba(255, 255, 255, 0.97);
    padding: 24px 40px;
    border: 2px solid #d4940a;
    z-index: 10001;
    text-align: center;
    animation: pulse-glow 1s ease-in-out infinite;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  `;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

/* ============================================
   9. Sound System — Web Audio API
   Generates simple 8-bit style sounds
   ============================================ */
let audioContext = null;
let soundEnabled = false;

function initSoundSystem() {
  const toggle = document.getElementById('sound-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    soundEnabled = !soundEnabled;
    toggle.textContent = soundEnabled ? '🔊 SFX ON' : '🔇 SFX OFF';
    toggle.setAttribute('aria-label', soundEnabled ? 'Sound effects on, click to mute' : 'Sound effects off, click to unmute');

    if (soundEnabled) {
      playSound('toggle');
    }
  });
}

function playSound(type) {
  if (!soundEnabled || !audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  const now = audioContext.currentTime;

  switch (type) {
    case 'start':
      // Rising arpeggio
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(262, now);
      oscillator.frequency.setValueAtTime(330, now + 0.08);
      oscillator.frequency.setValueAtTime(392, now + 0.16);
      oscillator.frequency.setValueAtTime(523, now + 0.24);
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      oscillator.start(now);
      oscillator.stop(now + 0.4);
      break;

    case 'open':
      // Short ascending blip
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(400, now);
      oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.1);
      gainNode.gain.setValueAtTime(0.06, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      oscillator.start(now);
      oscillator.stop(now + 0.15);
      break;

    case 'close':
      // Short descending blip
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(600, now);
      oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.1);
      gainNode.gain.setValueAtTime(0.06, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      oscillator.start(now);
      oscillator.stop(now + 0.15);
      break;

    case 'toggle':
      // Coin pickup
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(988, now);
      oscillator.frequency.setValueAtTime(1319, now + 0.08);
      gainNode.gain.setValueAtTime(0.06, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      oscillator.start(now);
      oscillator.stop(now + 0.2);
      break;

    case 'secret':
      // Zelda secret jingle approximation
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(392, now);
      oscillator.frequency.setValueAtTime(440, now + 0.1);
      oscillator.frequency.setValueAtTime(494, now + 0.2);
      oscillator.frequency.setValueAtTime(523, now + 0.3);
      oscillator.frequency.setValueAtTime(587, now + 0.4);
      oscillator.frequency.setValueAtTime(659, now + 0.5);
      oscillator.frequency.setValueAtTime(784, now + 0.6);
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      oscillator.start(now);
      oscillator.stop(now + 0.9);
      break;

    default:
      // Generic click
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(600, now);
      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      oscillator.start(now);
      oscillator.stop(now + 0.05);
  }
}

/* ============================================
   10. Mobile Navigation
   ============================================ */
function initMobileNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}
