const body = document.body;
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

nav?.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLAnchorElement) {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Abrir menu");
  }
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  body.classList.add("reveal-ready");

  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.94) {
      element.classList.add("is-visible");
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
