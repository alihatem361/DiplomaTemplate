export function initFormHandler() {
  const form = $("#registration-form-element");

  if (form.length) {
    form.validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
          pattern:
            /^[\u0600-\u06FF\s\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z\s]+$/,
        },
        email: {
          required: true,
          email: true,
        },
        phone: {
          required: true,
          minlength: 8,
        },
      },
      messages: {
        name: {
          required: "يرجى إدخال الاسم الكامل",
          minlength: "يجب أن يكون الاسم على الأقل حرفين",
          pattern: "يرجى إدخال اسم صحيح باللغة العربية أو الإنجليزية فقط",
        },
        email: {
          required: "يرجى إدخال البريد الإلكتروني",
          email: "يرجى إدخال بريد إلكتروني صحيح (مثال: user@example.com)",
        },
        phone: {
          required: "يرجى إدخال رقم الهاتف",
          minlength: "رقم الهاتف قصير جداً، يرجى التأكد من الرقم",
        },
      },
      errorPlacement: function (error, element) {
        // Create error container if it doesn't exist
        if (!element.siblings(".error-container").length) {
          element.after('<div class="error-container"></div>');
        }

        // Place error message in the container
        element.siblings(".error-container").html(error);

        // Add error class to field container
        element.closest(".form-field").addClass("has-error");
      },
      success: function (label, element) {
        // Remove error class and add success elements
        $(element).closest(".form-field").removeClass("has-error");
        $(element).siblings(".error-container").empty();

        // Add success icon if not exists
        if (!$(element).siblings(".success-icon").length) {
          $(element).after('<span class="success-icon">✓</span>');
        }

        // Add validation classes
        $(element).removeClass("error").addClass("valid");
      },
      highlight: function (element) {
        $(element).addClass("error").removeClass("valid");
        $(element).siblings(".success-icon").remove();
      },
      unhighlight: function (element) {
        $(element).removeClass("error");
      },
      submitHandler: function (form) {
        // Validate phone number with international tel input
        const phoneInput = window.phoneInputInstance;
        const phoneValid = phoneInput
          ? phoneInput.isValidNumber()
          : $("#phone").val().length >= 8;

        if (!phoneValid) {
          $("#phone").addClass("error");
          $("#phone").closest(".form-field").addClass("has-error");

          if (!$("#phone").siblings(".error-container").length) {
            $("#phone").after('<div class="error-container"></div>');
          }

          $("#phone")
            .siblings(".error-container")
            .html(
              '<label class="error">رقم الهاتف غير صحيح، يرجى التأكد من الرقم والرمز الدولي</label>'
            );

          // Scroll to phone field
          $("#phone")[0].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          $("#phone").focus();
          return false;
        }

        const fullPhoneNumber = phoneInput
          ? phoneInput.getNumber()
          : $("#phone").val();

        const formData = {
          name: $("#name").val().trim(),
          email: $("#email").val().trim(),
          phone: fullPhoneNumber,
          country: phoneInput ? phoneInput.getSelectedCountryData().name : "",
          countryCode: phoneInput
            ? phoneInput.getSelectedCountryData().iso2
            : "",
          timestamp: new Date().toISOString(),
        };

        console.log("Form submitted with data:", formData);

        const submitButton = $(".submit-button");
        const originalText = submitButton.text();

        // Show loading state
        submitButton.html(`
          <span style="display: flex; align-items: center; gap: 8px; justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;">
              <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            جاري التسجيل...
          </span>
        `);
        submitButton.prop("disabled", true);

        // Add spinner animation
        const style = document.createElement("style");
        style.textContent = `
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `;
        document.head.appendChild(style);

        // Simulate API call delay
        setTimeout(() => {
          // Show success state
          submitButton.html(`
            <span style="display: flex; align-items: center; gap: 8px; justify-content: center;">
              <span style="color: #28A745; font-size: 18px;">✓</span>
              تم التسجيل بنجاح! سنتواصل معك قريباً
            </span>
          `);
          submitButton.css("background", "#28A745");

          // Reset form after success
          setTimeout(() => {
            form.reset();
            submitButton.html(originalText);
            submitButton.css("background", "var(--brand-secondary)");
            submitButton.prop("disabled", false);

            // Reset all field states
            $("#name, #email, #phone").each(function () {
              $(this).removeClass("error valid");
              $(this).siblings(".success-icon").remove();
              $(this).siblings(".error-container").empty();
              $(this).closest(".form-field").removeClass("has-error");
            });

            // Reset phone input styling
            if (phoneInput) {
              $(".iti").removeClass("error");
            }

            document.head.removeChild(style);
          }, 4000);
        }, 1500);

        return false; // Prevent default form submission
      },
    });

    // Add custom validation method for Arabic/English names
    $.validator.addMethod(
      "pattern",
      function (value, element, regexp) {
        return this.optional(element) || regexp.test(value);
      },
      "يرجى إدخال قيمة صحيحة"
    );

    // Real-time validation feedback
    form.find("input").on("blur keyup", function () {
      $(this).valid(); // Trigger validation on blur and keyup
    });

    // Enhanced phone input validation
    const phoneInput = $("#phone");
    if (phoneInput.length && window.phoneInputInstance) {
      phoneInput.on("countrychange", function () {
        // Clear previous errors when country changes
        $(this).removeClass("error");
        $(this).siblings(".error-container").empty();
        $(this).closest(".form-field").removeClass("has-error");
        $(".iti").removeClass("error");
      });

      phoneInput.on("blur", function () {
        const phoneInstance = window.phoneInputInstance;
        if (phoneInstance && $(this).val()) {
          if (!phoneInstance.isValidNumber()) {
            $(".iti").addClass("error");
          } else {
            $(".iti").removeClass("error");
          }
        }
      });
    }

    // Add form submission attempt counter for better UX
    let submitAttempts = 0;
    form.on("submit", function () {
      submitAttempts++;
      if (submitAttempts > 1 && !form.valid()) {
        // Show helpful message after multiple failed attempts
        showFormHelpMessage();
      }
    });

    function showFormHelpMessage() {
      if (!$(".form-help-message").length) {
        $(".form").prepend(`
          <div class="form-help-message" style="
            background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
            border: 1px solid #2196F3;
            border-radius: 8px;
            padding: 12px 16px;
            margin-bottom: 16px;
            color: #1976D2;
            font-family: 'Alexandria', sans-serif;
            font-size: 14px;
            text-align: right;
            animation: helpSlideIn 0.3s ease-out;
          ">
            <span style="font-size: 16px; margin-left: 8px;">💡</span>
            <strong>نصائح للتسجيل:</strong><br>
            • تأكد من إدخال اسمك الكامل<br>
            • تحقق من صحة البريد الإلكتروني<br>
            • اختر الرمز الدولي الصحيح لرقم الهاتف
          </div>
        `);

        // Add animation
        const helpStyle = document.createElement("style");
        helpStyle.textContent = `
          @keyframes helpSlideIn {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `;
        document.head.appendChild(helpStyle);

        // Remove help message after 10 seconds
        setTimeout(() => {
          $(".form-help-message").fadeOut(300, function () {
            $(this).remove();
          });
          if (helpStyle.parentNode) {
            document.head.removeChild(helpStyle);
          }
        }, 10000);
      }
    }

    // Enhanced accessibility for error messages
    form.find("input").each(function () {
      const field = $(this);
      const fieldId = field.attr("id");

      // Add ARIA attributes for better accessibility
      field.attr("aria-describedby", fieldId + "-error");
      field.attr("aria-invalid", "false");
    });

    // Update ARIA attributes when validation state changes
    form.on("focusout change", "input", function () {
      const field = $(this);
      const isValid = field.hasClass("valid");
      const hasError = field.hasClass("error");

      field.attr("aria-invalid", hasError ? "true" : "false");

      if (hasError) {
        field.attr("aria-describedby", field.attr("id") + "-error");
      } else {
        field.removeAttr("aria-describedby");
      }
    });
  }
}
