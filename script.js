/* ============================================
   RAILEY BALDE — Portfolio Scripts
   ============================================ */

/* ── SKILLS DATA ──────────────────────────── */
const SKILLS = [
  // Coding Languages
  { name: 'HTML',               cat: 'coding'    },
  { name: 'CSS',                cat: 'coding'    },
  { name: 'JavaScript',         cat: 'coding'    },
  { name: 'TypeScript',         cat: 'coding'    },
  { name: 'PHP',                cat: 'coding'    },
  { name: 'Java',               cat: 'coding'    },
  { name: 'Python',             cat: 'coding'    },

  // Frameworks
  { name: 'React.js',           cat: 'framework' },
  { name: 'Next.js',            cat: 'framework' },
  { name: 'Node.js',            cat: 'framework' },
  { name: 'Tailwind CSS',       cat: 'framework' },
  // Database
  { name: 'PostgreSQL',         cat: 'database'  },
  { name: 'MySQL',              cat: 'database'  },
  { name: 'Prisma ORM',         cat: 'database'  },
  { name: 'SQLite',             cat: 'database'  },
  // Tools
  { name: 'Git',                cat: 'tools'     },
  { name: 'GitHub',             cat: 'tools'     },
  { name: 'Vercel',             cat: 'tools'     },
  { name: 'VS Code',            cat: 'tools'     },
  // Soft Skills
  { name: 'Adaptability',       cat: 'soft'      },
  { name: 'Collaboration',      cat: 'soft'      },
  { name: 'Communication',      cat: 'soft'      },
  { name: 'Critical Thinking',  cat: 'soft'      },
  { name: 'Attention to Detail',cat: 'soft'      },
  { name: 'Time Management',    cat: 'soft'      },
];

/* ── CUSTOM CURSOR ────────────────────────── */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    ring.style.left   = e.clientX + 'px';
    ring.style.top    = e.clientY + 'px';
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform  = 'translate(-50%,-50%) scale(2)';
      cursor.style.background = '#2563eb';
      ring.style.transform    = 'translate(-50%,-50%) scale(1.5)';
      ring.style.borderColor  = 'rgba(37,99,235,0.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform  = 'translate(-50%,-50%) scale(1)';
      cursor.style.background = '#fff';
      ring.style.transform    = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor  = 'rgba(255,255,255,0.25)';
    });
  });
}

/* ── SCROLL REVEAL ────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── EXPERTISE ────────────────────────────── */
function toggleExp(el) {
  el.classList.toggle('open');
}

function trackMouse(e, el) {
  const rect = el.getBoundingClientRect();
  const x = ((e.clientX - rect.left)  / rect.width)  * 100;
  const y = ((e.clientY - rect.top)   / rect.height) * 100;
  el.style.setProperty('--mx', x + '%');
  el.style.setProperty('--my', y + '%');
}

/* ── SKILLS ───────────────────────────────── */
function renderPills(cat) {
  const wrap = document.getElementById('skills-pills');
  const list = cat === 'all' ? SKILLS : SKILLS.filter(s => s.cat === cat);

  wrap.innerHTML = list
    .map((s, i) => `<div class="skill-pill" style="animation-delay:${i * 0.03}s">${s.name}</div>`)
    .join('');
}

function filterSkills(cat, btn) {
  document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderPills(cat);
}

/* ── PROJECT SCREENSHOT GALLERY ───────────── */
function showShot(thumb) {
  const card = thumb.closest('.proj-card');
  const main = card.querySelector('.proj-img-gallery img');
  main.src = thumb.dataset.src;
  main.alt = thumb.dataset.alt;
  card.querySelectorAll('.proj-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

/* ── LIGHTBOX (full-size screenshots) ─────── */
let lbShots = [];
let lbIndex = 0;

function showLightbox(shots, index) {
  lbShots = shots;
  lbIndex = index;
  renderLightbox();
  document.getElementById('lightbox').classList.add('show');
  document.body.style.overflow = 'hidden';
}

// Project gallery: arrows move through that project's screenshots
function openLightbox(mainBtn) {
  const thumbs = [...mainBtn.closest('.proj-card').querySelectorAll('.proj-thumb')];
  const shots  = thumbs.map(t => ({ src: t.dataset.src, alt: t.dataset.alt }));
  showLightbox(shots, Math.max(0, thumbs.findIndex(t => t.classList.contains('active'))));
}

// Certificates: arrows move through all certificates
function openCertLightbox(btn) {
  const all   = [...document.querySelectorAll('#cert-grid .cert-open')];
  const shots = all.map(b => ({ src: b.dataset.src, alt: b.dataset.alt }));
  showLightbox(shots, all.indexOf(btn));
}

function renderLightbox() {
  const shot = lbShots[lbIndex];
  const img  = document.getElementById('lb-img');
  img.src = shot.src;
  img.alt = shot.alt;
  document.getElementById('lb-caption').textContent =
    `${shot.alt}  ·  ${lbIndex + 1} / ${lbShots.length}`;
}

function stepLightbox(dir, e) {
  if (e) e.stopPropagation();
  lbIndex = (lbIndex + dir + lbShots.length) % lbShots.length;
  renderLightbox();
}

function closeLightbox(e) {
  // Clicking the image itself shouldn't close it, only the dark background or ✕
  if (e && e.target.closest('.lb-figure')) return;
  document.getElementById('lightbox').classList.remove('show');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('show')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  stepLightbox(-1);
  if (e.key === 'ArrowRight') stepLightbox(1);
});

/* ── TOAST ────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ── DOWNLOAD RESUME ──────────────────────── */
function downloadResume() {
  const link = document.createElement('a');
  link.href = 'Railey_Balde_CV.pdf';
  link.download = 'Railey_Balde_CV.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast('Downloading CV… 📄');
}

/* ── INIT ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initScrollReveal();
  renderPills('all');
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

/* ── COPY EMAIL ───────────────────────────── */
function copyEmail(btn) {
  const email = 'railey.balde@gmail.com';
  const done = () => {
    btn.textContent = 'Copied ✓';
    btn.classList.add('copied');
    showToast('Email copied ✓');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(done).catch(() => fallbackCopy(email, done));
  } else {
    fallbackCopy(email, done);
  }
}

// For older browsers or non-https pages where the Clipboard API isn't available
function fallbackCopy(text, done) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); done(); } catch { showToast('Copy failed — select the email instead'); }
  ta.remove();
}

/* ── CONTACT DROPDOWN ─────────────────────── */
function toggleContact(e) {
  e.stopPropagation();
  document.getElementById('contact-dropdown').classList.toggle('open');
}

document.addEventListener('click', function(e) {
  const dropdown = document.getElementById('contact-dropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});