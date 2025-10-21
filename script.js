// 🌊 Fade-in Scroll Animation
document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll('.fade-in');
  const options = { threshold: 0.2 };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, options);

  fadeEls.forEach(el => appearOnScroll.observe(el));
});

// 🌫️ Optional: Parallax Wave Motion (if you add wave background)
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const waves = document.querySelectorAll('.wave, .wave2');
  waves.forEach(wave => {
    wave.style.transform = `translateX(-${scrollY / 10}px)`;
  });
});
