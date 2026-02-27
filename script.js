/* ============================================
   CurcuMax - JavaScript
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // --- Navbar scroll effect ---
  const navbar = document.querySelector(".navbar");

  function handleNavScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true });
  handleNavScroll();

  // --- Mobile menu toggle ---
  const mobileToggle = document.querySelector(".mobile-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("active");
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open")
        ? "hidden"
        : "";
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.classList.remove("active");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  // --- Scroll-triggered fade-in animations ---
  const fadeElements = document.querySelectorAll(".fade-up");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger children if data-stagger is set
          const delay = parseInt(entry.target.dataset.delay || "0", 10);
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, delay);
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));

  // --- Hero parallax ---
  const heroBg = document.querySelector("[data-parallax]");

  if (heroBg) {
    window.addEventListener(
      "scroll",
      () => {
        heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      },
      { passive: true }
    );
  }

  // --- Order form quantity price update ---
  const quantitySelect = document.getElementById("quantity");
  const priceDisplay = document.getElementById("order-price");

  if (quantitySelect && priceDisplay) {
    quantitySelect.addEventListener("change", () => {
      const qty = parseInt(quantitySelect.value, 10);
      const unitPrice = 17.5;
      const total = (qty * unitPrice).toFixed(2);
      priceDisplay.textContent = `$${total}`;
    });
  }

  // --- Order form submission ---
  const orderForm = document.getElementById("order-form");
  const orderSuccess = document.getElementById("order-success");
  const orderFormCard = document.getElementById("order-form-card");

  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Simulate order submission
      const submitBtn = orderForm.querySelector('button[type="submit"]');
      submitBtn.textContent = "Processing...";
      submitBtn.disabled = true;

      setTimeout(() => {
        orderFormCard.style.display = "none";
        orderSuccess.classList.add("visible");
      }, 1500);
    });
  }
});
