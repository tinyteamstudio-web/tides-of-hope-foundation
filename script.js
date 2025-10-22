// 🌊 Tides of Hope Foundation Script
document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------
     FADE-IN SCROLL ANIMATION
  ------------------------------ */
  const fadeEls = document.querySelectorAll('.fade-in');
  const observerOptions = { threshold: 0.2 };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, observerOptions);

  fadeEls.forEach(el => appearOnScroll.observe(el));

  /* ------------------------------
     MOBILE MENU TOGGLE
  ------------------------------ */
  const toggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (toggle && navMenu) {
    toggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");

      // Change icon ☰ ↔ ✖ for better UX
      toggle.textContent = navMenu.classList.contains("active") ? "✖" : "☰";
    });
  }

  /* ------------------------------
     OPTIONAL PARALLAX WAVE EFFECT
  ------------------------------ */
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const waves = document.querySelectorAll('.wave, .wave2');
    waves.forEach(wave => {
      wave.style.transform = `translateX(-${scrollY / 10}px)`;
    });
  });
});
