export function initFormHandler() {
  const form = $("#registration-form-element");

  if (form.length) {
    form.validate({
      rules: {
        name: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        phone: {
          required: true,
        },
      },
      messages: {
        name: {
          required: "يرجى إدخال الاسم",
        },
        email: {
          required: "يرجى إدخال البريد الإلكتروني",
          email: "يرجى إدخال بريد إلكتروني صحيح",
        },
        phone: {
          required: "يرجى إدخال رقم الهاتف",
        },
      },
      submitHandler: function (form) {
        const fullPhoneNumber = window.phoneInputInstance
          ? window.phoneInputInstance.getNumber()
          : $("#phone").val();

        const formData = {
          name: $("#name").val().trim(),
          email: $("#email").val().trim(),
          phone: fullPhoneNumber,
          country: window.phoneInputInstance
            ? window.phoneInputInstance.getSelectedCountryData().name
            : "",
          countryCode: window.phoneInputInstance
            ? window.phoneInputInstance.getSelectedCountryData().iso2
            : "",
        };

        console.log("Form submitted with data:", formData);

        const submitButton = $(".submit-button");
        submitButton.text("تم التسجيل بنجاح!");
        submitButton.css("background", "var(--brand-primary)");
        submitButton.prop("disabled", true);

        setTimeout(() => {
          form.reset();
          submitButton.text("سجّل الآن وابدأ رحلتك!");
          submitButton.css("background", "var(--brand-secondary)");
          submitButton.prop("disabled", false);

          $("#name, #email, #phone").each(function () {
            $(this).removeClass("error valid");
          });
        }, 3000);

        return false; // Prevent default form submission
      },
    });
  }
}
