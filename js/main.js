/* ============================================
   WEREWOLF DUEL – JS principal
   ============================================ */

// --- Navbar : scroll effect ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// --- Navbar : menu mobile ---
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Fermer le menu au clic sur un lien
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// --- Carrousel cartes ---
(function () {
    const track   = document.getElementById('carouselTrack');
    const prev    = document.getElementById('carouselPrev');
    const next    = document.getElementById('carouselNext');
    const dotsEl  = document.getElementById('carouselDots');

    if (!track) return;

    const slides = track.querySelectorAll('.card-slide');
    let current  = 0;

    // Calcul du nombre de slides visibles selon la largeur
    function visibleCount() {
        const w = track.parentElement.offsetWidth;
        if (w < 560) return 1;
        if (w < 900) return 2;
        return 4;
    }

    function maxIndex() {
        return Math.max(0, slides.length - visibleCount());
    }

    // Créer les dots
    function buildDots() {
        dotsEl.innerHTML = '';
        const count = maxIndex() + 1;
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === current ? ' active' : '');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsEl.appendChild(dot);
        }
    }

    function goTo(index) {
        current = Math.max(0, Math.min(index, maxIndex()));
        const slideWidth = slides[0].offsetWidth + 24; // gap = 24px
        track.style.transform = `translateX(-${current * slideWidth}px)`;
        dotsEl.querySelectorAll('.carousel-dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }

    prev.addEventListener('click', () => goTo(current - 1));
    next.addEventListener('click', () => goTo(current + 1));

    // Recalcul au resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            buildDots();
            goTo(0);
        }, 200);
    });

    buildDots();
    goTo(0);
})();

// --- Reveal au scroll (IntersectionObserver) ---
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

reveals.forEach(el => observer.observe(el));
