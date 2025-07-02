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

// FAQ Accordion Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Get all FAQ items
  const faqItems = document.querySelectorAll(".faq-item");

  // Add click event listeners to all FAQ items
  faqItems.forEach((item) => {
    const toggleButton = item.querySelector(".faq-toggle");
    const answer = item.querySelector(".faq-answer");
    const itemId = item.getAttribute("data-faq-id");

    // Add click event to the toggle button
    toggleButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleFAQItem(item, toggleButton, answer);
    });

    // Add click event to the entire item for better UX
    item.addEventListener("click", function (e) {
      // Don't trigger if clicking on the button (to avoid double triggering)
      if (e.target === toggleButton || toggleButton.contains(e.target)) {
        return;
      }
      toggleFAQItem(item, toggleButton, answer);
    });

    // Add keyboard support for accessibility
    toggleButton.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFAQItem(item, toggleButton, answer);
      }
    });
  });

  function toggleFAQItem(item, button, answer) {
    const isExpanded = item.classList.contains("expanded");
    const ariaExpanded = button.getAttribute("aria-expanded") === "true";

    if (isExpanded || ariaExpanded) {
      // Collapse the item
      item.classList.remove("expanded");
      button.setAttribute("aria-expanded", "false");

      // Add smooth collapse animation
      if (answer) {
        answer.style.animation = "fadeOut 0.3s ease-in-out forwards";
        setTimeout(() => {
          answer.style.display = "none";
          answer.style.animation = "";
        }, 250);
      }
    } else {
      // Expand the item
      item.classList.add("expanded");
      button.setAttribute("aria-expanded", "true");

      // Add smooth expand animation
      if (answer) {
        answer.style.display = "block";
        answer.style.animation = "fadeIn 0.3s ease-in-out forwards";
      }
    }

    // Optional: Close other items when one is opened (accordion behavior)
    // Uncomment the lines below if you want only one item open at a time
    /*
    faqItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("expanded")) {
        const otherButton = otherItem.querySelector(".faq-toggle");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        
        otherItem.classList.remove("expanded");
        otherButton.setAttribute("aria-expanded", "false");
        
        if (otherAnswer) {
          otherAnswer.style.animation = "fadeOut 0.3s ease-in-out forwards";
          setTimeout(() => {
            otherAnswer.style.display = "none";
            otherAnswer.style.animation = "";
          }, 250);
        }
      }
    });
    */
  }

  // Add CSS for fadeOut animation dynamically
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-10px);
      }
    }
  `;
  document.head.appendChild(style);

  // Smooth scrolling for better UX (optional)
  function smoothScrollToElement(element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  // Add focus management for better accessibility
  faqItems.forEach((item) => {
    const toggleButton = item.querySelector(".faq-toggle");

    toggleButton.addEventListener("focus", function () {
      // Optional: Add visual focus indicator
      item.style.outline = "2px solid var(--faq-brand-primary)";
      item.style.outlineOffset = "2px";
    });

    toggleButton.addEventListener("blur", function () {
      // Remove focus indicator
      item.style.outline = "";
      item.style.outlineOffset = "";
    });
  });

  // Handle window resize for responsive behavior
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Optional: Adjust layout on resize if needed
      console.log("Window resized, FAQ layout adjusted");
    }, 150);
  });

  // Optional: Add analytics tracking for FAQ interactions
  function trackFAQInteraction(itemId, action) {
    // Replace with your analytics implementation
    if (typeof gtag !== "undefined") {
      gtag("event", "faq_interaction", {
        faq_item_id: itemId,
        action: action, // 'expand' or 'collapse'
      });
    }

    // Or use any other analytics service
    console.log(`FAQ ${action}: Item ${itemId}`);
  }

  // Add tracking to toggle function (uncomment if needed)
  /*
  const originalToggle = toggleFAQItem;
  toggleFAQItem = function(item, button, answer) {
    const itemId = item.getAttribute("data-faq-id");
    const wasExpanded = item.classList.contains("expanded");
    
    originalToggle(item, button, answer);
    
    // Track the interaction
    trackFAQInteraction(itemId, wasExpanded ? 'collapse' : 'expand');
  };
  */
});

// Export functions for potential external use
window.FAQController = {
  expandItem: function (itemId) {
    const item = document.querySelector(`[data-faq-id="${itemId}"]`);
    if (item && !item.classList.contains("expanded")) {
      const button = item.querySelector(".faq-toggle");
      const answer = item.querySelector(".faq-answer");
      toggleFAQItem(item, button, answer);
    }
  },

  collapseItem: function (itemId) {
    const item = document.querySelector(`[data-faq-id="${itemId}"]`);
    if (item && item.classList.contains("expanded")) {
      const button = item.querySelector(".faq-toggle");
      const answer = item.querySelector(".faq-answer");
      toggleFAQItem(item, button, answer);
    }
  },

  expandAll: function () {
    const items = document.querySelectorAll(".faq-item:not(.expanded)");
    items.forEach((item) => {
      const button = item.querySelector(".faq-toggle");
      const answer = item.querySelector(".faq-answer");
      toggleFAQItem(item, button, answer);
    });
  },

  collapseAll: function () {
    const items = document.querySelectorAll(".faq-item.expanded");
    items.forEach((item) => {
      const button = item.querySelector(".faq-toggle");
      const answer = item.querySelector(".faq-answer");
      toggleFAQItem(item, button, answer);
    });
  },
};
