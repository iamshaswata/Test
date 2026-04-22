function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function closeMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  if (!menu || !icon) return;

  menu.classList.remove("open");
  icon.classList.remove("open");
}

function scrollToSection(hash) {
  const target = document.querySelector(hash);
  if (!target) return;

  const nav = window.innerWidth <= 980
    ? document.querySelector("#hamburger-nav")
    : document.querySelector("#desktop-nav");
  const navHeight = nav ? nav.getBoundingClientRect().height : 0;
  const extraGap = window.innerWidth <= 980 ? 66 : 30;
  const top = target.getBoundingClientRect().top + window.scrollY - navHeight - extraGap;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: "smooth"
  });

  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, "", hash);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!hash) return;

      event.preventDefault();
      const isMobileMenuLink = !!link.closest(".menu-links");

      if (isMobileMenuLink) {
        closeMenu();
        window.setTimeout(() => scrollToSection(hash), 220);
        return;
      }

      scrollToSection(hash);
    });
  });
});
