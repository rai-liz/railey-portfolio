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
  // Frameworks
  { name: 'React.js',           cat: 'framework' },
  { name: 'Next.js',            cat: 'framework' },
  { name: 'Node.js',            cat: 'framework' },
  { name: 'Tailwind CSS',       cat: 'framework' },
  { name: 'Laravel',            cat: 'framework' },
  { name: 'Bootstrap',          cat: 'framework' },
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
  // AI Tools
  { name: 'GitHub Copilot',     cat: 'ai'        },
  { name: 'AI API Integration', cat: 'ai'        },
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
      cursor.style.transform    = 'translate(-50%,-50%) scale(2)';
      cursor.style.background   = '#2563eb';
      ring.style.transform      = 'translate(-50%,-50%) scale(1.5)';
      ring.style.borderColor    = 'rgba(37,99,235,0.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform    = 'translate(-50%,-50%) scale(1)';
      cursor.style.background   = '#fff';
      ring.style.transform      = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor    = 'rgba(255,255,255,0.25)';
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

/* ── TOAST ────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ── DOWNLOAD RESUME ──────────────────────── */
function downloadResume() {
  // Replace 'resume.pdf' with your actual resume file once ready
  // window.open('resume.pdf');
  showToast('Resume coming soon! 🚀');
}

/* ── MODAL ────────────────────────────────── */
let currentEdit = null;

function openEdit(type) {
  currentEdit = type;
  const title = document.getElementById('modal-title');
  const body  = document.getElementById('modal-body');

  const templates = {
    about: {
      label: 'Edit about me',
      html: () => `<textarea id="e-abio" rows="6" placeholder="About me">${document.getElementById('about-bio').textContent.trim()}</textarea>`,
    },
    expertise: {
      label: 'Add expertise area',
      html: () => `
        <input id="e-etitle" placeholder="Title">
        <input id="e-esub"   placeholder="Subtitle">
        <textarea id="e-edesc" rows="3" placeholder="Description"></textarea>
      `,
    },
    skill: {
      label: 'Add a skill',
      html: () => `
        <input id="e-skill" placeholder="Skill name">
        <select id="e-scat">
          <option value="coding">Coding Language</option>
          <option value="framework">Framework</option>
          <option value="database">Database</option>
          <option value="tools">Tools</option>
          <option value="ai">AI Tools</option>
          <option value="soft">Soft Skills</option>
        </select>
      `,
    },
    project: {
      label: 'Add a project',
      html: () => `
        <input id="e-ptitle" placeholder="Project name">
        <input id="e-ptag"   placeholder="Tag (e.g. Web App)">
        <textarea id="e-pdesc" rows="3" placeholder="Short description"></textarea>
        <input id="e-ptech" placeholder="Technologies (comma separated)">
      `,
    },
    cert: {
      label: 'Add a certification',
      html: () => `
        <input id="e-cname"   placeholder="Certification name">
        <input id="e-cissuer" placeholder="Issuing organization">
        <input id="e-cyear"   placeholder="Year">
      `,
    },
  };

  const tpl = templates[type];
  if (!tpl) return;

  title.textContent = tpl.label;
  body.innerHTML    = tpl.html();
  document.getElementById('modal').classList.add('show');
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('modal')) {
    document.getElementById('modal').classList.remove('show');
  }
}

function saveModal() {
  const type = currentEdit;

  if (type === 'about') {
    document.getElementById('about-bio').textContent = document.getElementById('e-abio').value;

  } else if (type === 'expertise') {
    const t = document.getElementById('e-etitle').value;
    if (!t) return;
    const el = document.createElement('div');
    el.className = 'exp-card';
    el.setAttribute('onmousemove', 'trackMouse(event,this)');
    el.onclick = function () { toggleExp(this); };
    el.innerHTML = `
      <span class="exp-arrow">▾</span>
      <span class="exp-icon">💡</span>
      <div class="exp-title">${t}</div>
      <div class="exp-sub">${document.getElementById('e-esub').value}</div>
      <div class="exp-detail">${document.getElementById('e-edesc').value}</div>
    `;
    document.getElementById('exp-grid').appendChild(el);

  } else if (type === 'skill') {
    const name = document.getElementById('e-skill').value;
    if (!name) return;
    SKILLS.push({ name, cat: document.getElementById('e-scat').value });
    renderPills('all');
    document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
    document.querySelector('.stab').classList.add('active');

  } else if (type === 'project') {
    const t = document.getElementById('e-ptitle').value;
    if (!t) return;
    const tech = document.getElementById('e-ptech').value
      .split(',').map(x => x.trim()).filter(Boolean);
    const el = document.createElement('div');
    el.className = 'proj-card';
    el.innerHTML = `
      <div class="proj-tag">${document.getElementById('e-ptag').value || 'Web App'}</div>
      <div class="proj-title">${t}</div>
      <div class="proj-desc">${document.getElementById('e-pdesc').value}</div>
      <div class="proj-tech">${tech.map(x => `<span class="tech-badge">${x}</span>`).join('')}</div>
    `;
    document.getElementById('proj-grid').appendChild(el);

  } else if (type === 'cert') {
    const n = document.getElementById('e-cname').value;
    if (!n) return;
    const el = document.createElement('div');
    el.className = 'cert-item';
    el.innerHTML = `
      <div class="cert-icon">🏅</div>
      <div class="cert-info">
        <div class="cert-name">${n}</div>
        <div class="cert-issuer">${document.getElementById('e-cissuer').value}</div>
      </div>
      <div class="cert-year">${document.getElementById('e-cyear').value}</div>
    `;
    document.getElementById('cert-list').appendChild(el);
  }

  document.getElementById('modal').classList.remove('show');
  showToast('Saved! ✓');
}

/* ── INIT ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initScrollReveal();
  renderPills('all');
});

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