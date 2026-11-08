/* ── Nav rule on scroll ─────────────────────────────────── */
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Screenshot slots: drop an image that fails to load so its label shows ── */
document.querySelectorAll('.shot img').forEach(img => {
  const drop = () => img.remove();
  if (img.complete && img.naturalWidth === 0) drop();
  else img.addEventListener('error', drop);
});

/* ── Hero timelapse: fade in once it plays; stay still for reduced motion ── */
const stageVideo = document.querySelector('.stage__video');
if (stageVideo) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  stageVideo.addEventListener('playing', () => stageVideo.classList.add('playing'));
  stageVideo.addEventListener('error', () => stageVideo.remove(), true);
  const applyMotion = () => {
    if (reduceMotion.matches) {
      stageVideo.pause();
      stageVideo.classList.remove('playing');
    } else {
      stageVideo.play().catch(() => {});
    }
  };
  reduceMotion.addEventListener('change', applyMotion);
  applyMotion();
}

/* ── Scroll reveal ──────────────────────────────────────── */
const revealed = document.querySelectorAll('[data-reveal]');
if (revealed.length && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealed.forEach(el => observer.observe(el));
}
