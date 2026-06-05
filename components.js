/* ============================================================
   SerpDex — Component Loader
   Fetches header.html and footer.html and injects them.
   Works on GitHub Pages (client-side fetch).
   ============================================================ */

async function loadComponent(id, file) {
  try {
    const res  = await fetch(file);
    if (!res.ok) throw new Error(res.status);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch(e) {
    console.warn('Could not load component:', file, e);
  }
}

async function initComponents() {
  await Promise.all([
    loadComponent('site-header', 'header.html'),
    loadComponent('site-footer', 'footer.html'),
  ]);

  // ── Nav scroll behaviour (runs after header is injected) ──
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () =>
      nav.classList.toggle('stuck', scrollY > 40)
    );
  }

  // ── Mark active nav link based on current page ──
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // ── Scroll reveal ──
  document.querySelectorAll('.up').forEach(el => el.classList.add('in'));
}

document.addEventListener('DOMContentLoaded', initComponents);
