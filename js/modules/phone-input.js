export function initPhoneInput() {
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
      initialCountry: "sa",
      allowDropdown: true,
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
      separateDialCode: true,
      autoHideDialCode: false,
      nationalMode: false,
      formatOnDisplay: true,
      placeholderNumberType: "MOBILE",
      showSearchBox: true,
      searchNotFound: "لم يتم العثور على دولة",
      customPlaceholder: function (
        selectedCountryPlaceholder,
        selectedCountryData
      ) {
        return "ادخل رقم الهاتف";
      },
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
    });

    function updateCountryNamesToArabic() {
      setTimeout(() => {
        const countryItems = document.querySelectorAll(".iti__country");
        countryItems.forEach((item, index) => {
          const countryData = item.getAttribute("data-country-code");
          const countryNameElement = item.querySelector(".iti__country-name");

          if (countryData && countryNameElement) {
            const formattedIndex = String(index + 1).padStart(4, "0");
            const originalText = countryNameElement.textContent;
            let displayText = originalText;
            if (originalText.match(/^\d{4} - /)) {
              displayText = originalText.replace(/^\d{4} - /, "");
            }
            const arabicName = arabicCountryNames[countryData];
            const displayName = arabicName || displayText;
            countryNameElement.textContent = `${formattedIndex} - ${displayName}`;
          }
        });
      }, 100);
    }

    let searchTimeout;
    function enhanceSearch() {
      const searchInput = document.querySelector(".iti__search-input");
      if (searchInput) {
        searchInput.placeholder = "ابحث عن دولة أو رمز الاتصال...";
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
                const formattedName = countryName.textContent.toLowerCase();
                const nameMatch = formattedName.includes(query);
                const codeMatch = dialCode.textContent.includes(query);
                const actualCountryName = formattedName
                  .split(" - ")
                  .slice(1)
                  .join(" - ");
                const countryNameMatch = actualCountryName.includes(query);
                if (
                  nameMatch ||
                  codeMatch ||
                  countryNameMatch ||
                  query === ""
                ) {
                  item.style.display = "flex";
                  visibleCount++;
                } else {
                  item.style.display = "none";
                }
              }
            });
            if (visibleCount === 0 && query !== "") {
              console.log("No countries found for:", query);
            }
          }, 150);
        });
      }
    }

    phoneInputField.addEventListener("countrychange", function () {
      const selectedCountry = phoneInput.getSelectedCountryData();
      console.log("Country changed to:", selectedCountry);
      if (selectedCountry && selectedCountry.dialCode) {
        const currentValue = phoneInputField.value;
        const dialCode = "+" + selectedCountry.dialCode;
        let cleanValue = currentValue.replace(/^\+\d+\s*/, "");
        phoneInputField.value = dialCode + " " + cleanValue;
        phoneInputField.dispatchEvent(new Event("input"));
      }
    });

    phoneInputField.addEventListener("open:countrydropdown", function () {
      updateCountryNamesToArabic();
      setTimeout(enhanceSearch, 100);
    });

    updateCountryNamesToArabic();

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

    phoneInputField.addEventListener("input", function () {
      phoneInputField.classList.remove("error", "valid");
    });

    window.phoneInputInstance = phoneInput;
    console.log("International phone input initialized successfully!");
  }
}
