// Mobile Menu Functionality
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const navContainer = document.querySelector(".nav-container");

  // Toggle mobile menu
  mobileMenuButton.addEventListener("click", function () {
    navContainer.classList.toggle("mobile-menu-open");
  });

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll(".nav-links .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navContainer.classList.remove("mobile-menu-open");

      // Smooth scroll to section
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInside =
      navContainer.contains(event.target) ||
      mobileMenuButton.contains(event.target);

    if (!isClickInside && navContainer.classList.contains("mobile-menu-open")) {
      navContainer.classList.remove("mobile-menu-open");
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (
      window.innerWidth > 768 &&
      navContainer.classList.contains("mobile-menu-open")
    ) {
      navContainer.classList.remove("mobile-menu-open");
    }
  });
});

// Smooth scroll for desktop navigation links
document.addEventListener("DOMContentLoaded", function () {
  const desktopLinks = document.querySelectorAll(".nav-links .nav-link");

  desktopLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
});
