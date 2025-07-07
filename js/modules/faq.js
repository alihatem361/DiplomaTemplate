function toggleFAQItem(item, button, answer) {
  const isExpanded = item.classList.contains("expanded");
  const ariaExpanded = button.getAttribute("aria-expanded") === "true";

  if (isExpanded || ariaExpanded) {
    item.classList.remove("expanded");
    button.setAttribute("aria-expanded", "false");
    if (answer) {
      answer.style.animation = "fadeOut 0.3s ease-in-out forwards";
      setTimeout(() => {
        answer.style.display = "none";
        answer.style.animation = "";
      }, 250);
    }
  } else {
    item.classList.add("expanded");
    button.setAttribute("aria-expanded", "true");
    if (answer) {
      answer.style.display = "block";
      answer.style.animation = "fadeIn 0.3s ease-in-out forwards";
    }
  }
}

export function initFaq() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const toggleButton = item.querySelector(".faq-toggle");
    const answer = item.querySelector(".faq-answer");
    const itemId = item.getAttribute("data-faq-id");

    toggleButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleFAQItem(item, toggleButton, answer);
    });

    item.addEventListener("click", function (e) {
      if (e.target === toggleButton || toggleButton.contains(e.target)) {
        return;
      }
      toggleFAQItem(item, toggleButton, answer);
    });

    toggleButton.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFAQItem(item, toggleButton, answer);
      }
    });
  });

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

  faqItems.forEach((item) => {
    const toggleButton = item.querySelector(".faq-toggle");
    toggleButton.addEventListener("focus", function () {
      item.style.outline = "2px solid var(--faq-brand-primary)";
      item.style.outlineOffset = "2px";
    });
    toggleButton.addEventListener("blur", function () {
      item.style.outline = "";
      item.style.outlineOffset = "";
    });
  });

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      console.log("Window resized, FAQ layout adjusted");
    }, 150);
  });
}

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
