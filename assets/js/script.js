/* ==========================================================================
   Gayatri Patil — Portfolio Scripts
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setYear();
    initLoadingScreen();
    initAOS();
    initTypedJS();
    initThemeToggle();
    initNavbarScroll();
    initMobileNav();
    initScrollSpy();
    initScrollProgress();
    initBackToTop();
    initCustomCursor();
    initCounters();
    initSkillBars();
    initCircularSkills();
    initProjectFilter();
    initContactForm();
    initParticles();
  }

  /* ---------- Footer year ---------- */
  function setYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- Loading screen ---------- */
  function initLoadingScreen() {
    var screen = document.getElementById("loading-screen");
    if (!screen) return;
    window.addEventListener("load", function () {
      setTimeout(function () {
        screen.classList.add("hide");
      }, 400);
    });
  }

  /* ---------- AOS ---------- */
  function initAOS() {
    if (window.AOS) {
      AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 60,
      });
    }
  }

  /* ---------- Typed.js hero role ---------- */
  function initTypedJS() {
    var el = document.getElementById("typed-role");
    if (!el || !window.Typed) return;
    new Typed("#typed-role", {
      strings: ["clear insights.", "actionable dashboards.", "business decisions.", "real stories."],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1500,
      startDelay: 300,
      loop: true,
      smartBackspace: true,
    });
  }

  /* ---------- Dark / light mode ---------- */
  function initThemeToggle() {
    var toggle = document.getElementById("themeToggle");
    var root = document.documentElement;
    var icon = toggle ? toggle.querySelector("i") : null;
    var saved = localStorage.getItem("gp-theme");

    if (saved === "dark") {
      root.setAttribute("data-theme", "dark");
      if (icon) icon.className = "fa-solid fa-sun";
      if (toggle) toggle.setAttribute("aria-pressed", "true");
    }

    if (!toggle) return;
    toggle.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      if (isDark) {
        root.removeAttribute("data-theme");
        localStorage.setItem("gp-theme", "light");
        if (icon) icon.className = "fa-solid fa-moon";
        toggle.setAttribute("aria-pressed", "false");
      } else {
        root.setAttribute("data-theme", "dark");
        localStorage.setItem("gp-theme", "dark");
        if (icon) icon.className = "fa-solid fa-sun";
        toggle.setAttribute("aria-pressed", "true");
      }
    });
  }

  /* ---------- Sticky navbar shadow ---------- */
  function initNavbarScroll() {
    var nav = document.getElementById("mainNav");
    if (!nav) return;
    window.addEventListener("scroll", function () {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    });
  }

  /* ---------- Mobile nav toggle + auto close on link click ---------- */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("navMenu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.contains("show");
      menu.classList.toggle("show", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });

    menu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("show");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Scroll-spy for nav active state ---------- */
  function initScrollSpy() {
    var sections = document.querySelectorAll("main section[id]");
    var links = document.querySelectorAll(".nav-link");
    if (!sections.length || !links.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");
            links.forEach(function (link) {
              link.classList.toggle("active", link.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Scroll progress bar ---------- */
  function initScrollProgress() {
    var bar = document.getElementById("scroll-progress");
    if (!bar) return;
    window.addEventListener("scroll", function () {
      var doc = document.documentElement;
      var scrollTop = doc.scrollTop || document.body.scrollTop;
      var scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = pct + "%";
    });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    var btn = document.getElementById("backToTop");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("show", window.scrollY > 500);
    });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Custom cursor (desktop only) ---------- */
  function initCustomCursor() {
    if (window.matchMedia("(hover: none)").matches) return;
    var dot = document.querySelector(".cursor-dot");
    var ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;

    window.addEventListener("mousemove", function (e) {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      ring.style.left = e.clientX + "px";
      ring.style.top = e.clientY + "px";
    });

    document.querySelectorAll("a, button, .glass, .glass-panel").forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        ring.style.transform = "translate(-50%,-50%) scale(1.6)";
        ring.style.opacity = "0.9";
      });
      el.addEventListener("mouseleave", function () {
        ring.style.transform = "translate(-50%,-50%) scale(1)";
        ring.style.opacity = "0.6";
      });
    });
  }

  /* ---------- Animated counters ---------- */
  function initCounters() {
    var counters = document.querySelectorAll(".stat-num");
    if (!counters.length) return;

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (c) { observer.observe(c); });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var duration = 1200;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  /* ---------- Animated skill bars ---------- */
  function initSkillBars() {
    var bars = document.querySelectorAll(".skill-bar");
    if (!bars.length) return;

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var bar = entry.target;
          var pct = bar.getAttribute("data-percent") || "0";
          var fill = bar.querySelector(".skill-fill");
          if (fill) {
            requestAnimationFrame(function () {
              fill.style.width = pct + "%";
            });
          }
          obs.unobserve(bar);
        });
      },
      { threshold: 0.4 }
    );
    bars.forEach(function (b) { observer.observe(b); });
  }

  /* ---------- Circular skill charts ---------- */
  function initCircularSkills() {
    var circles = document.querySelectorAll(".circular-skill");
    if (!circles.length) return;
    var CIRCUMFERENCE = 2 * Math.PI * 52; // r=52

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var wrap = entry.target;
          var pct = parseInt(wrap.getAttribute("data-percent"), 10) || 0;
          var fillCircle = wrap.querySelector(".circle-fill");
          var numEl = wrap.querySelector(".circular-skill-num");
          if (fillCircle) {
            var offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;
            requestAnimationFrame(function () {
              fillCircle.style.strokeDashoffset = offset;
            });
          }
          if (numEl) {
            numEl.setAttribute("data-count", pct);
            animateCounter(numEl);
          }
          obs.unobserve(wrap);
        });
      },
      { threshold: 0.4 }
    );
    circles.forEach(function (c) { observer.observe(c); });
  }

  /* ---------- Project filtering ---------- */
  function initProjectFilter() {
    var buttons = document.querySelectorAll(".filter-btn");
    var items = document.querySelectorAll(".project-item");
    if (!buttons.length || !items.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var filter = btn.getAttribute("data-filter");

        items.forEach(function (item) {
          var match = filter === "all" || item.getAttribute("data-category") === filter;
          item.style.display = match ? "" : "none";
        });
      });
    });
  }

  /* ---------- Contact form (front-end validation, no backend) ---------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    var status = document.getElementById("formStatus");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        Array.prototype.forEach.call(form.elements, function (field) {
          if (field.willValidate) {
            field.classList.toggle("is-invalid", !field.checkValidity());
          }
        });
        if (status) {
          status.textContent = "Please fill in all fields correctly.";
          status.className = "form-status mt-3 error";
        }
        return;
      }

      // No backend is connected — this simulates a successful submission
      // and opens the user's email client as a practical fallback.
      var name = form.elements["name"].value;
      var email = form.elements["email"].value;
      var subject = form.elements["subject"].value;
      var message = form.elements["message"].value;

      var mailto =
        "mailto:patilgr1205@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");

      if (status) {
        status.textContent = "Thanks! Opening your email app to send the message.";
        status.className = "form-status mt-3 success";
      }
      window.location.href = mailto;
      form.reset();
    });
  }

  /* ---------- Lightweight canvas particle background for hero ---------- */
  function initParticles() {
    var canvas = document.getElementById("particles");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var particles = [];
    var count = window.innerWidth < 768 ? 28 : 55;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.8 + 0.6,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
        });
      }
    }

    function isDark() {
      return document.documentElement.getAttribute("data-theme") === "dark";
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var color = isDark() ? "56,189,248" : "10,102,194";

      particles.forEach(function (p, i) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + color + ",0.5)";
        ctx.fill();

        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(" + color + "," + (0.12 * (1 - dist / 110)) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();
    window.addEventListener("resize", function () {
      resize();
      createParticles();
    });
  }
})();
