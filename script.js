(function () {
  "use strict";

  /* Sticky nav shadow on scroll */
  var nav = document.getElementById("siteNav");
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 8) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Mobile menu toggle */
  var burger = document.getElementById("burgerBtn");
  var menu = document.getElementById("mobileMenu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Lifestyle filter for neighborhood cards */
  var filterBar = document.getElementById("filterBar");
  var grid = document.getElementById("neighborhoodGrid");
  if (filterBar && grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".n-card"));
    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-pill");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-pill").forEach(function (p) {
        p.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      var filter = btn.getAttribute("data-filter");
      cards.forEach(function (card) {
        var tags = card.getAttribute("data-tags") || "";
        var show = filter === "all" || tags.indexOf(filter) !== -1;
        card.style.display = show ? "" : "none";
      });
    });
  }

  /* Scroll reveal, respects reduced-motion via CSS transition-duration override */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
