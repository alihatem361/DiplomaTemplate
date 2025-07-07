export function initFormHandler() {
  const form = document.querySelector(".form");
  const submitButton = document.querySelector(".submit-button");

  if (form && submitButton) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = form.querySelector('input[type="text"]');
      const emailInput = form.querySelector('input[type="email"]');
      const phoneInput = document.querySelector("#phone");

      let isValid = true;
      let errors = [];

      if (!nameInput.value.trim()) {
        errors.push("يرجى إدخال الاسم");
        nameInput.classList.add("error");
        isValid = false;
      } else {
        nameInput.classList.remove("error");
      }

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
        const fullPhoneNumber = window.phoneInputInstance
          ? window.phoneInputInstance.getNumber()
          : phoneInput.value;

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

        submitButton.textContent = "تم التسجيل بنجاح!";
        submitButton.style.background = "var(--brand-primary)";
        submitButton.disabled = true;

        setTimeout(() => {
          form.reset();
          submitButton.textContent = "سجّل الآن وابدأ رحلتك!";
          submitButton.style.background = "var(--brand-secondary)";
          submitButton.disabled = false;

          [nameInput, emailInput, phoneInput].forEach((input) => {
            input.classList.remove("error", "valid");
          });
        }, 3000);
      } else {
        console.log("Form validation errors:", errors);
        alert(errors.join("\n"));
      }
    });
  }
}
