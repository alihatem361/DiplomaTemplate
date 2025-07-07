import { initMobileMenu } from "./js/modules/mobile-menu.js";
import { initCtaButtons } from "./js/modules/cta-handler.js";
import { initPhoneInput } from "./js/modules/phone-input.js";
import { initSmoothScroll } from "./js/modules/smooth-scroll.js";
import { initFaq } from "./js/modules/faq.js";
import { initFormHandler } from "./js/modules/form-handler.js";

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initCtaButtons();
  initPhoneInput();
  initSmoothScroll();
  initFaq();
  initFormHandler();
});
