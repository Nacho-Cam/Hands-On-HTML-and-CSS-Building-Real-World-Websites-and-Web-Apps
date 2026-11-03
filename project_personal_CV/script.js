(() => {
  const root = document.documentElement;
  const languageButtons = [...document.querySelectorAll("[data-set-lang]")];
  const languageCopy = {
    en: { title: "Ignacio Camarena Gómez — AI / ML Engineer", nav: "Primary navigation", languages: "Choose language", frames: "Professional experience", left: "Scroll frames left", right: "Scroll frames right" },
    es: { title: "Ignacio Camarena Gómez — Ingeniería de IA / ML", nav: "Navegación principal", languages: "Elegir idioma", frames: "Experiencia profesional", left: "Desplazar fotogramas a la izquierda", right: "Desplazar fotogramas a la derecha" }
  };

  function setLanguage(language) {
    const lang = language === "es" ? "es" : "en";
    root.lang = lang;
    document.title = languageCopy[lang].title;
    document.querySelector(".primary-nav")?.setAttribute("aria-label", languageCopy[lang].nav);
    document.querySelector(".language-switch")?.setAttribute("aria-label", languageCopy[lang].languages);
    document.querySelector(".film-track")?.setAttribute("aria-label", languageCopy[lang].frames);
    document.querySelector('[data-scroll="left"]')?.setAttribute("aria-label", languageCopy[lang].left);
    document.querySelector('[data-scroll="right"]')?.setAttribute("aria-label", languageCopy[lang].right);
    languageButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.setLang === lang)));
    try { localStorage.setItem("icg-language", lang); } catch (_) { /* Storage can be disabled; the page remains usable. */ }
  }

  languageButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.setLang)));
  try { setLanguage(localStorage.getItem("icg-language") || "en"); } catch (_) { setLanguage("en"); }

  const tabs = [...document.querySelectorAll(".film-frame")];
  const panels = [...document.querySelectorAll(".role-detail")];
  const counter = document.getElementById("film-current");
  function activateTab(tab, moveFocus = false, scrollToPanel = true) {
    tabs.forEach((item, index) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
      if (active && counter) counter.textContent = String(index + 1).padStart(2, "0");
    });
    panels.forEach((panel) => {
      const active = panel.id === tab.getAttribute("aria-controls");
      panel.hidden = !active;
      panel.classList.toggle("is-current", active);
    });
    const targetPanel = panels.find((panel) => panel.id === tab.getAttribute("aria-controls"));
    if (moveFocus) tab.focus();
    else if (scrollToPanel) targetPanel?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      activateTab(tabs[next], true);
    });
  });
  if (tabs.length) activateTab(tabs[0], false, false);
  document.querySelectorAll("[data-scroll]").forEach((button) => button.addEventListener("click", () => {
    const track = document.querySelector(".film-track");
    const direction = button.dataset.scroll === "right" ? 1 : -1;
    track?.scrollBy({ left: direction * Math.min(500, track.clientWidth * 0.72), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }));

  const revealItems = document.querySelectorAll(".section-heading, .project-feature, .project-small, .education-entry, .certifications, .contact-content");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); currentObserver.unobserve(entry.target); }
    }), { threshold: 0.14, rootMargin: "0px 0px -30px 0px" });
    revealItems.forEach((item) => { item.classList.add("reveal"); observer.observe(item); });
  }

  if (!reducedMotion.matches && window.matchMedia("(pointer:fine)").matches) {
    const orbit = document.querySelector(".orbital-mark");
    let queued = false;
    window.addEventListener("scroll", () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        const amount = Math.max(-16, Math.min(16, (window.scrollY - 140) * -0.035));
        orbit?.style.setProperty("--parallax", `${amount.toFixed(1)}px`);
        queued = false;
      });
    }, { passive: true });
  }
})();
