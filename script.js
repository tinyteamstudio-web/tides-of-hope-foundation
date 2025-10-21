// 🌊 Fade-in Scroll Animation Script
document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll('.fade-in');

  const options = {
    threshold: 0.2
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, options);

  fadeEls.forEach(el => {
    appearOnScroll.observe(el);
  });
});

