/* ── Nav blur on scroll ─────────────────────────────────── */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Scroll reveal ──────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

/* ── Smooth scroll to #notify ───────────────────────────── */
document.querySelectorAll('[href="#notify"], .nav__cta').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('notify').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

/* ── Waitlist form (shared handler for hero + waitlist) ──── */
function setupForm(formId, inputId, successId, errorId) {
  const form = document.getElementById(formId);
  if (!form) return;
  const input   = document.getElementById(inputId);
  const success = document.getElementById(successId);
  const error   = document.getElementById(errorId);

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const email = input ? input.value.trim() : '';
    if (!email) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    if (error) error.style.display = 'none';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        form.style.display = 'none';
        success.style.display = 'flex';
      } else {
        throw new Error('server_error');
      }
    } catch (_) {
      submitBtn.disabled = false;
      submitBtn.textContent = formId === 'hero-form' ? 'Notify Me' : 'Notify Me When It Launches';
      if (error) {
        error.style.display = 'block';
        error.textContent = 'Something went wrong. Try emailing unalome.dev@gmail.com directly.';
      }
    }
  });
}

setupForm('hero-form',     'hero-email',     'hero-success',     'hero-error');
setupForm('waitlist-form', 'waitlist-email', 'waitlist-success', 'waitlist-error');
