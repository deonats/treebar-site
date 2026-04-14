// ============================================
// TREE BAR — script.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── SCROLL REVEAL ────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.menu-section').forEach(el => {
    revealObserver.observe(el);
  });

  // ── CATEGORY TABS ────────────────────────
  const tabs = document.querySelectorAll('.cat-tab');
  const sections = document.querySelectorAll('.menu-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.target;
      if (target === 'all') {
        sections.forEach(s => s.style.display = '');
      } else {
        sections.forEach(s => {
          s.style.display = s.dataset.section === target ? '' : 'none';
        });
      }
    });
  });

  // ── LIGHTBOX ─────────────────────────────
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('.lightbox-img');
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    let currentIdx = 0;

    function openLightbox(idx) {
      currentIdx = idx;
      const img = items[idx].querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function prevImg() {
      currentIdx = (currentIdx - 1 + items.length) % items.length;
      const img = items[currentIdx].querySelector('img');
      lbImg.style.opacity = 0;
      setTimeout(() => {
        lbImg.src = img.src;
        lbImg.style.opacity = 1;
      }, 150);
    }

    function nextImg() {
      currentIdx = (currentIdx + 1) % items.length;
      const img = items[currentIdx].querySelector('img');
      lbImg.style.opacity = 0;
      setTimeout(() => {
        lbImg.src = img.src;
        lbImg.style.opacity = 1;
      }, 150);
    }

    items.forEach((item, idx) => {
      item.addEventListener('click', () => openLightbox(idx));
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImg);
    lightbox.querySelector('.lightbox-next').addEventListener('click', nextImg);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImg();
      if (e.key === 'ArrowRight') nextImg();
    });

    lbImg.style.transition = 'opacity 0.15s ease';
  }

  // ── GALLERY ITEMS STAGGER REVEAL ─────────
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        galleryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    galleryObserver.observe(item);
  });

  // ── STYLE SWITCHER (optional) ─────────────
  const switcher = document.getElementById('style-switcher');
  if (switcher) {
    const link = document.getElementById('theme-css');
    switcher.addEventListener('click', () => {
      if (link.href.includes('style-dark')) {
        link.href = 'style.css';
        switcher.textContent = 'DARK';
      } else {
        link.href = 'style-dark.css';
        switcher.textContent = 'LIGHT';
      }
    });
  }

  // ── SMOOTH PAGE TRANSITIONS ───────────────
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http')) {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });

  // Fade in on load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

});
