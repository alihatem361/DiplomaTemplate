// Initialize international telephone input
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Functionality
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
  // CTA Buttons - Scroll to Registration Form
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

  // Initialize International Telephone Input
  initPhoneInput();
}); // End of DOMContentLoaded event listener

// Function to initialize the international telephone input
function initPhoneInput() {
  const phoneInputField = document.querySelector("#phone");
  if (phoneInputField) {
    // Arabic country names mapping - comprehensive list for better display
    const arabicCountryNames = {
      af: "أفغانستان",
      al: "ألبانيا",
      ad: "أندورا",
      ao: "أنغولا",
      ag: "أنتيغوا وبربودا",
      ar: "الأرجنتين",
      am: "أرمينيا",
      aw: "أروبا",
      au: "أستراليا",
      at: "النمسا",
      az: "أذربيجان",
      bs: "الباهاما",
      bh: "البحرين",
      bd: "بنغلاديش",
      bb: "بربادوس",
      by: "بيلاروس",
      be: "بلجيكا",
      bz: "بليز",
      bj: "بنين",
      bt: "بوتان",
      bo: "بوليفيا",
      ba: "البوسنة والهرسك",
      bw: "بوتسوانا",
      br: "البرازيل",
      bn: "بروناي",
      bg: "بلغاريا",
      bf: "بوركينا فاسو",
      bi: "بوروندي",
      kh: "كمبوديا",
      cm: "الكاميرون",
      ca: "كندا",
      cv: "الرأس الأخضر",
      cf: "جمهورية أفريقيا الوسطى",
      td: "تشاد",
      cl: "تشيلي",
      cn: "الصين",
      co: "كولومبيا",
      km: "جزر القمر",
      cg: "جمهورية الكونغو",
      cd: "جمهورية الكونغو الديمقراطية",
      ck: "جزر كوك",
      cr: "كوستاريكا",
      ci: "ساحل العاج",
      hr: "كرواتيا",
      cu: "كوبا",
      cy: "قبرص",
      cz: "التشيك",
      dk: "الدنمارك",
      dj: "جيبوتي",
      dm: "دومينيكا",
      do: "جمهورية الدومينيكان",
      ec: "الإكوادور",
      eg: "مصر",
      sv: "السلفادور",
      gq: "غينيا الاستوائية",
      er: "إريتريا",
      ee: "إستونيا",
      et: "إثيوبيا",
      fj: "فيجي",
      fi: "فنلندا",
      fr: "فرنسا",
      ga: "الغابون",
      gm: "غامبيا",
      ge: "جورجيا",
      de: "ألمانيا",
      gh: "غانا",
      gr: "اليونان",
      gd: "غرينادا",
      gt: "غواتيمالا",
      gn: "غينيا",
      gw: "غينيا بيساو",
      gy: "غيانا",
      ht: "هايتي",
      hn: "هندوراس",
      hu: "المجر",
      is: "آيسلندا",
      in: "الهند",
      id: "إندونيسيا",
      ir: "إيران",
      iq: "العراق",
      ie: "أيرلندا",
      il: "إسرائيل",
      it: "إيطاليا",
      jm: "جامايكا",
      jp: "اليابان",
      jo: "الأردن",
      kz: "كازاخستان",
      ke: "كينيا",
      ki: "كيريباتي",
      kp: "كوريا الشمالية",
      kr: "كوريا الجنوبية",
      kw: "الكويت",
      kg: "قيرغيزستان",
      la: "لاوس",
      lv: "لاتفيا",
      lb: "لبنان",
      ls: "ليسوتو",
      lr: "ليبيريا",
      ly: "ليبيا",
      li: "ليختنشتاين",
      lt: "ليتوانيا",
      lu: "لوكسمبورغ",
      mk: "مقدونيا الشمالية",
      mg: "مدغشقر",
      mw: "مالاوي",
      my: "ماليزيا",
      mv: "المالديف",
      ml: "مالي",
      mt: "مالطا",
      mh: "جزر مارشال",
      mr: "موريتانيا",
      mu: "موريشيوس",
      mx: "المكسيك",
      fm: "ولايات ميكرونيزيا المتحدة",
      md: "مولدوفا",
      mc: "موناكو",
      mn: "منغوليا",
      me: "الجبل الأسود",
      ma: "المغرب",
      mz: "موزمبيق",
      mm: "ميانمار",
      na: "ناميبيا",
      nr: "ناورو",
      np: "نيبال",
      nl: "هولندا",
      nz: "نيوزيلندا",
      ni: "نيكاراغوا",
      ne: "النيجر",
      ng: "نيجيريا",
      no: "النرويج",
      om: "عُمان",
      pk: "باكستان",
      pw: "بالاو",
      ps: "فلسطين",
      pa: "بنما",
      pg: "بابوا غينيا الجديدة",
      py: "باراغواي",
      pe: "بيرو",
      ph: "الفلبين",
      pl: "بولندا",
      pt: "البرتغال",
      qa: "قطر",
      ro: "رومانيا",
      ru: "روسيا",
      rw: "رواندا",
      ws: "ساموا",
      sm: "سان مارينو",
      st: "ساو تومي وبرينسيبي",
      sa: "المملكة العربية السعودية",
      sn: "السنغال",
      rs: "صربيا",
      sc: "سيشل",
      sl: "سيراليون",
      sg: "سنغافورة",
      sk: "سلوفاكيا",
      si: "سلوفينيا",
      sb: "جزر سولومون",
      so: "الصومال",
      za: "جنوب أفريقيا",
      ss: "جنوب السودان",
      es: "إسبانيا",
      lk: "سريلانكا",
      sd: "السودان",
      sr: "سورينام",
      sz: "إسواتيني",
      se: "السويد",
      ch: "سويسرا",
      sy: "سوريا",
      tw: "تايوان",
      tj: "طاجيكستان",
      tz: "تنزانيا",
      th: "تايلاند",
      tl: "تيمور الشرقية",
      tg: "توغو",
      to: "تونغا",
      tt: "ترينيداد وتوباغو",
      tn: "تونس",
      tr: "تركيا",
      tm: "تركمانستان",
      tv: "توفالو",
      ug: "أوغندا",
      ua: "أوكرانيا",
      ae: "الإمارات العربية المتحدة",
      gb: "المملكة المتحدة",
      us: "الولايات المتحدة الأمريكية",
      uy: "أوروغواي",
      uz: "أوزبكستان",
      vu: "فانواتو",
      va: "الفاتيكان",
      ve: "فنزويلا",
      vn: "فيتنام",
      ye: "اليمن",
      zm: "زامبيا",
      zw: "زيمبابوي",
      dz: "الجزائر",
      nc: "كاليدونيا الجديدة",
      pf: "بولينيزيا الفرنسية",
    };

    const phoneInput = window.intlTelInput(phoneInputField, {
      // Set the initial country to Saudi Arabia
      initialCountry: "sa",

      // Allow dropdown with all countries
      allowDropdown: true,

      // Show preferred countries at the top
      preferredCountries: [
        "sa",
        "ae",
        "kw",
        "qa",
        "bh",
        "om",
        "eg",
        "jo",
        "lb",
        "sy",
      ],

      // Separate dial code to show it separately
      separateDialCode: true,

      // Auto hide country dial code
      autoHideDialCode: false,

      // National mode for number formatting
      nationalMode: false, // Show full international format

      // Format on display
      formatOnDisplay: true,

      // Placeholder number type
      placeholderNumberType: "MOBILE",

      // Show search box
      showSearchBox: true,
      searchNotFound: "لم يتم العثور على دولة",

      // Custom placeholder
      customPlaceholder: function (
        selectedCountryPlaceholder,
        selectedCountryData
      ) {
        return "ادخل رقم الهاتف";
      },

      // Utils script for formatting/validation
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
    });

    // Function to update country names to Arabic with numbering
    function updateCountryNamesToArabic() {
      setTimeout(() => {
        const countryItems = document.querySelectorAll(".iti__country");
        countryItems.forEach((item, index) => {
          const countryData = item.getAttribute("data-country-code");
          const countryNameElement = item.querySelector(".iti__country-name");

          if (countryData && countryNameElement) {
            // Format the index with leading zeros (e.g., 0001, 0002, etc.)
            const formattedIndex = String(index + 1).padStart(4, "0");

            // Check if we have Arabic translation, otherwise use the original name
            const originalText = countryNameElement.textContent;
            const arabicName = arabicCountryNames[countryData];

            // Use Arabic name if available, otherwise keep original
            const displayName = arabicName || originalText;

            countryNameElement.textContent = `${formattedIndex} - ${displayName}`;
          }
        });
      }, 100);
    }

    // Enhanced search functionality
    let searchTimeout;
    function enhanceSearch() {
      const searchInput = document.querySelector(".iti__search-input");
      if (searchInput) {
        // Set placeholder in Arabic
        searchInput.placeholder = "ابحث عن دولة أو رمز الاتصال...";

        // Add custom search behavior
        searchInput.addEventListener("input", function (e) {
          clearTimeout(searchTimeout);
          const query = e.target.value.toLowerCase();

          searchTimeout = setTimeout(() => {
            const countryItems = document.querySelectorAll(".iti__country");
            let visibleCount = 0;

            countryItems.forEach((item) => {
              const countryName = item.querySelector(".iti__country-name");
              const dialCode = item.querySelector(".iti__dial-code");

              if (countryName && dialCode) {
                // Search in both the formatted name (with number) and original country name
                const formattedName = countryName.textContent.toLowerCase();
                const nameMatch = formattedName.includes(query);
                const codeMatch = dialCode.textContent.includes(query);

                // Also search in the original country name (after the dash)
                const originalNameMatch =
                  formattedName.split(" - ")[1]?.includes(query) || false;

                if (
                  nameMatch ||
                  codeMatch ||
                  originalNameMatch ||
                  query === ""
                ) {
                  item.style.display = "flex";
                  visibleCount++;
                } else {
                  item.style.display = "none";
                }
              }
            });

            // Show "no results" message if no countries match
            if (visibleCount === 0 && query !== "") {
              console.log("No countries found for:", query);
            }
          }, 150);
        });
      }
    }

    // Country selection handler
    phoneInputField.addEventListener("countrychange", function () {
      const selectedCountry = phoneInput.getSelectedCountryData();
      console.log("Country changed to:", selectedCountry);

      // Update input with country code at the start
      if (selectedCountry && selectedCountry.dialCode) {
        const currentValue = phoneInputField.value;
        const dialCode = "+" + selectedCountry.dialCode;

        // Remove any existing dial code from the input
        let cleanValue = currentValue.replace(/^\+\d+\s*/, "");

        // Add the new dial code at the start
        phoneInputField.value = dialCode + " " + cleanValue;

        // Trigger input event to format the number
        phoneInputField.dispatchEvent(new Event("input"));
      }
    });

    // Handle dropdown opening to enhance search
    phoneInputField.addEventListener("open:countrydropdown", function () {
      updateCountryNamesToArabic();
      setTimeout(enhanceSearch, 100);
    });

    // Initialize Arabic names on first load
    updateCountryNamesToArabic();

    // Add validation on blur
    phoneInputField.addEventListener("blur", function () {
      if (phoneInput.isValidNumber()) {
        phoneInputField.classList.remove("error");
        phoneInputField.classList.add("valid");
      } else {
        if (phoneInputField.value.trim() !== "") {
          phoneInputField.classList.remove("valid");
          phoneInputField.classList.add("error");
        }
      }
    });

    // Reset validation styling when user starts typing
    phoneInputField.addEventListener("blur", function () {
      if (phoneInput.isValidNumber()) {
        phoneInputField.classList.remove("error");
        phoneInputField.classList.add("valid");
      } else {
        if (phoneInputField.value.trim() !== "") {
          phoneInputField.classList.remove("valid");
          phoneInputField.classList.add("error");
        }
      }
    });

    // Reset validation styling when user starts typing
    phoneInputField.addEventListener("input", function () {
      phoneInputField.classList.remove("error", "valid");
    });

    // Store the intl-tel-input instance globally for form submission
    window.phoneInputInstance = phoneInput;

    console.log("International phone input initialized successfully!");
  }
} // End of initPhoneInput function

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

// Form submission handler with international phone validation
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");
  const submitButton = document.querySelector(".submit-button");

  if (form && submitButton) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const nameInput = form.querySelector('input[type="text"]');
      const emailInput = form.querySelector('input[type="email"]');
      const phoneInput = document.querySelector("#phone");

      let isValid = true;
      let errors = [];

      // Validate name
      if (!nameInput.value.trim()) {
        errors.push("يرجى إدخال الاسم");
        nameInput.classList.add("error");
        isValid = false;
      } else {
        nameInput.classList.remove("error");
      }

      // Validate email
      if (!emailInput.value.trim()) {
        errors.push("يرجى إدخال البريد الإلكتروني");
        emailInput.classList.add("error");
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        errors.push("يرجى إدخال بريد إلكتروني صحيح");
        emailInput.classList.add("error");
        isValid = false;
      } else {
        emailInput.classList.remove("error");
      }

      // Validate phone using intl-tel-input
      if (window.phoneInputInstance) {
        if (!phoneInput.value.trim()) {
          errors.push("يرجى إدخال رقم الهاتف");
          phoneInput.classList.add("error");
          isValid = false;
        } else if (!window.phoneInputInstance.isValidNumber()) {
          errors.push("يرجى إدخال رقم هاتف صحيح");
          phoneInput.classList.add("error");
          isValid = false;
        } else {
          phoneInput.classList.remove("error");
        }
      }

      if (isValid) {
        // Get the full international number
        const fullPhoneNumber = window.phoneInputInstance
          ? window.phoneInputInstance.getNumber()
          : phoneInput.value;

        // Prepare form data
        const formData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          phone: fullPhoneNumber,
          country: window.phoneInputInstance
            ? window.phoneInputInstance.getSelectedCountryData().name
            : "",
          countryCode: window.phoneInputInstance
            ? window.phoneInputInstance.getSelectedCountryData().iso2
            : "",
        };

        console.log("Form submitted with data:", formData);

        // Show success message
        submitButton.textContent = "تم التسجيل بنجاح!";
        submitButton.style.background = "var(--brand-primary)";
        submitButton.disabled = true;

        // Reset form after 3 seconds
        setTimeout(() => {
          form.reset();
          submitButton.textContent = "سجّل الآن وابدأ رحلتك!";
          submitButton.style.background = "var(--brand-secondary)";
          submitButton.disabled = false;

          // Clear validation classes
          [nameInput, emailInput, phoneInput].forEach((input) => {
            input.classList.remove("error", "valid");
          });
        }, 3000);

        // Here you would typically send the data to your server
        // Example: sendToServer(formData);
      } else {
        // Show error message
        console.log("Form validation errors:", errors);
        alert(errors.join("\n"));
      }
    });
  }
});
