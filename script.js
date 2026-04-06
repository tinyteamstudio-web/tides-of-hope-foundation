// ==============================
// TIDES OF HOPE - CLEAN HOMEPAGE
// script.js
// ==============================

// MOBILE MENU TOGGLE
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("active");
  });

  // CLOSE MENU AFTER CLICKING A LINK ON MOBILE
  const navLinks = siteNav.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("active");
    });
  });
}
