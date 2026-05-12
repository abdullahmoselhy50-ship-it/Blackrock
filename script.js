const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        const idx = Array.from(siblings).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 120);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

function animateCounter(el, target, isDecimal = false) {
  const duration = 2000;
  const start = performance.now();
  const startVal = 0;

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = startVal + (target - startVal) * eased;

    if (isDecimal) {
      el.textContent = current.toFixed(1);
    } else {
      el.textContent = Math.floor(current);
    }

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;

        if (text === '$10.6T') {
          el.textContent = '$0T';
          setTimeout(() => {
            let v = 0;
            const iv = setInterval(() => {
              v += 0.1;
              el.textContent = `$${v.toFixed(1)}T`;
              if (v >= 10.6) { el.textContent = '$10.6T'; clearInterval(iv); }
            }, 30);
          }, 200);
        } else if (text === '36') {
          el.textContent = '0';
          animateCounter(el, 36);
        } else if (text === '+100M') {
          el.textContent = '0M';
          let v = 0;
          const iv = setInterval(() => {
            v += 2;
            el.textContent = `+${v}M`;
            if (v >= 100) { el.textContent = '+100M'; clearInterval(iv); }
          }, 20);
        }

        statsObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

statNums.forEach(el => statsObserver.observe(el));

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active && !active.classList.contains('nav-cta')) {
          active.style.color = '#000';
          active.style.fontWeight = '600';
        }
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));