/* =========================================================
   DR. MUHAMMAD QOUSAIN ALI — MAIN JAVASCRIPT
   Optimized Version
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ===== 1. ELEMENTS ===== */
  const header = document.getElementById("header");
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const scrollTopButton = document.getElementById("scrollTop");
  const currentYear = document.getElementById("currentYear");
  const appointmentForm = document.getElementById("appointmentForm");
  const appointmentDate = document.getElementById("date");
  const formMessage = document.getElementById("formMessage");

  /* ===== 2. DYNAMIC YEAR ===== */
  if (currentYear) currentYear.textContent = new Date().getFullYear();

  /* ===== 3. MOBILE MENU ===== */
  const closeMenu = () => {
    if (!mobileMenu || !menuButton) return;
    mobileMenu.classList.remove("open");
    menuButton.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  };

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      menuButton.classList.toggle("active", isOpen);
      document.body.classList.toggle("menu-open", isOpen);
      menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (!mobileMenu.classList.contains("open")) return;
      const clickedInside = mobileMenu.contains(event.target);
      const clickedButton = menuButton.contains(event.target);
      if (!clickedInside && !clickedButton) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mobileMenu.classList.contains("open")) closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900 && mobileMenu.classList.contains("open")) closeMenu();
    });
  }

  /* ===== 4. STICKY HEADER ===== */
  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 30) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ===== 5. SCROLL TO TOP ===== */
  if (scrollTopButton) {
    const handleScrollTop = () => {
      if (window.scrollY > 400) scrollTopButton.classList.add("show");
      else scrollTopButton.classList.remove("show");
    };
    window.addEventListener("scroll", handleScrollTop, { passive: true });
    scrollTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    handleScrollTop();
  }

  /* ===== 6. REVEAL ANIMATIONS ===== */
  const revealSelector = [
    ".section-heading",
    ".service-card",
    ".blog-card",
    ".care-card",
    ".qualification-card",
    ".faq-item",
    ".faq-card",
    ".contact-card",
    ".info-card",
    ".approach-item",
    ".doctor-card",
    ".doctor-profile-card",
    ".hero-content",
    ".hero-visual",
    ".featured-article",
    ".guide-box",
    ".disclaimer-box",
    ".welfare-card",
    ".welfare-notice",
    ".camp-announcement",
    ".trust-card"
  ].join(", ");

  const revealElements = document.querySelectorAll(revealSelector);

  if (revealElements.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealElements.forEach((element) => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  /* ===== 7. DATE MINIMUM = TODAY ===== */
  if (appointmentDate) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    appointmentDate.min = `${year}-${month}-${day}`;
  }

  /* ===== 8. FORM HELPERS ===== */
  const showFormMessage = (message, type) => {
    if (!formMessage) return;
    formMessage.textContent = message;
    formMessage.className = `form-message ${type} show`;
  };

  const clearFormMessage = () => {
    if (!formMessage) return;
    formMessage.textContent = "";
    formMessage.className = "form-message";
  };

  const setFieldError = (field) => {
    if (!field) return;
    field.classList.remove("success");
    field.classList.add("error");
  };

  const setFieldSuccess = (field) => {
    if (!field) return;
    field.classList.remove("error");
    field.classList.add("success");
  };

  const clearFieldState = (field) => {
    if (!field) return;
    field.classList.remove("error", "success");
  };

  /* ===== 9. PHONE VALIDATOR ===== */
  const isValidPakistaniPhone = (phone) => {
    const cleanPhone = String(phone).replace(/[\s()-]/g, "");
    return /^(?:\+92|92|0)?3\d{9}$/.test(cleanPhone);
  };

  /* ===== 10. APPOINTMENT FORM → WHATSAPP ===== */
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      clearFormMessage();

      const nameField = document.getElementById("name");
      const phoneField = document.getElementById("phone");
      const dateField = document.getElementById("date");
      const serviceField = document.getElementById("service");
      const messageField = document.getElementById("message");

      const name = nameField ? nameField.value.trim() : "";
      const phone = phoneField ? phoneField.value.trim() : "";
      const date = dateField ? dateField.value : "";
      const service = serviceField ? serviceField.value : "";
      const message = messageField ? messageField.value.trim() : "";

      [nameField, phoneField, dateField, serviceField, messageField].forEach(clearFieldState);

      let hasError = false;

      if (name.length < 2) { setFieldError(nameField); hasError = true; }
      else setFieldSuccess(nameField);

      if (!isValidPakistaniPhone(phone)) { setFieldError(phoneField); hasError = true; }
      else setFieldSuccess(phoneField);

      if (!date) { setFieldError(dateField); hasError = true; }
      else setFieldSuccess(dateField);

      if (!service) { setFieldError(serviceField); hasError = true; }
      else setFieldSuccess(serviceField);

      if (hasError) {
        showFormMessage("Please check the highlighted fields and enter the required information.", "error");
        const firstError = appointmentForm.querySelector(".form-control.error");
        if (firstError) firstError.focus();
        return;
      }

      let formattedDate = date;
      if (date) {
        const selectedDate = new Date(`${date}T00:00:00`);
        formattedDate = selectedDate.toLocaleDateString("en-PK", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          weekday: "long"
        });
      }

      /* NAYA NUMBER */
      const whatsappNumber = "923474275223";

      const whatsappMessage =
`*Appointment Request — Dr. Muhammad Qousain Ali*

*Patient Name:* ${name}
*Phone:* ${phone}
*Preferred Date:* ${formattedDate}
*Reason for Visit:* ${service}

*Additional Information:*
${message || "Not provided"}

Please confirm the available appointment time.`;

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      showFormMessage("Your appointment request is ready. WhatsApp will open so you can send it to the clinic.", "success");

      const whatsappWindow = window.open(whatsappURL, "_blank", "noopener,noreferrer");
      if (!whatsappWindow) window.location.href = whatsappURL;

      setTimeout(() => {
        appointmentForm.reset();
        [nameField, phoneField, dateField, serviceField, messageField].forEach(clearFieldState);
        clearFormMessage();
      }, 2500);
    });

    appointmentForm.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener("input", () => field.classList.remove("error"));
      field.addEventListener("change", () => field.classList.remove("error"));
    });
  }

  /* ===== 11. ACTIVE NAV LINK ===== */
  const navLinks = document.querySelectorAll("#mobileMenu a");
  const currentPage = window.location.pathname.split("/").pop().toLowerCase() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const cleanHref = href.split("#")[0].toLowerCase();
    if (cleanHref === currentPage) {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    }
  });

  /* ===== 12. DISABLE "#" LINKS ===== */
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });

  /* ===== 13. SMOOTH INTERNAL SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

});