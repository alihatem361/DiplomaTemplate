function scrollToRegistrationForm() {
  const registrationForm = document.querySelector("#registration-form");
  if (registrationForm) {
    const offsetTop = registrationForm.offsetTop - 80; // Account for fixed header
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    // Optional: Add a subtle highlight effect to draw attention
    registrationForm.style.transform = "scale(1.02)";
    registrationForm.style.transition = "transform 0.3s ease";

    setTimeout(() => {
      registrationForm.style.transform = "scale(1)";

      // Focus on the first input field after animation
      const firstInput = registrationForm.querySelector('input[type="text"]');
      if (firstInput) {
        firstInput.focus();
        // Add a subtle pulse effect to the first input
        firstInput.style.boxShadow = "0 0 0 3px rgba(0, 179, 79, 0.3)";
        firstInput.style.transition = "box-shadow 0.3s ease";

        setTimeout(() => {
          firstInput.style.boxShadow = "";
        }, 2000);
      }
    }, 1000);
  }
}

export function initCtaButtons() {
  // Add event listeners to all CTA buttons
  const ctaButtons = document.querySelectorAll(
    '.cta-button, .mba-register-button, button[aria-label="احجز مكانك معانا"], .submit-button'
  );

  console.log(`Found ${ctaButtons.length} CTA buttons`);

  ctaButtons.forEach((button, index) => {
    // Skip the submit button as it should handle form submission
    if (!button.classList.contains("submit-button")) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(
          `CTA button ${index + 1} clicked:`,
          button.textContent.trim()
        );
        scrollToRegistrationForm();
      });
    }
  });

  // Also handle buttons by text content for more comprehensive coverage
  const allButtons = document.querySelectorAll("button");
  console.log(`Scanning ${allButtons.length} total buttons for CTA text`);

  let ctaButtonsFound = 0;
  allButtons.forEach((button) => {
    const buttonText = button.textContent.trim();
    const isCtaButton =
      buttonText.includes("سجل الآن") ||
      buttonText.includes("احجز مكانك") ||
      buttonText.includes("ابدأ رحلتك");

    if (isCtaButton && !button.classList.contains("submit-button")) {
      ctaButtonsFound++;
      button.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(`Text-based CTA button clicked:`, buttonText);
        scrollToRegistrationForm();
      });
    }
  });

  console.log(
    `Found ${ctaButtonsFound} additional CTA buttons by text content`
  );
  console.log("CTA button functionality initialized successfully!");
}
