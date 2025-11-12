const initTypewriter = () => {
  const element = document.querySelector(".typewriter");
  if (!element) return;

  const text = element.dataset.text || "";
  const chars = [...text];
  let index = 0;

  const type = () => {
    if (index <= chars.length) {
      element.textContent = chars.slice(0, index).join("");
      index += 1;
      const delay = index === chars.length ? 2200 : 90 + Math.random() * 80;
      setTimeout(type, delay);
    } else {
      setTimeout(() => {
        element.textContent = "";
        index = 0;
        setTimeout(type, 500);
      }, 2200);
    }
  };

  type();
};

const initCTA = () => {
  const button = document.querySelector(".cta");
  if (!button) return;

  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    button.style.setProperty("--mouse-x", `${x}px`);
    button.style.setProperty("--mouse-y", `${y}px`);
  });

  button.addEventListener("click", () => {
    const targetId = button.dataset.scrollTarget;
    const target = targetId ? document.querySelector(targetId) : null;
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
};

const initCurrentYear = () => {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
};

const initMatchMediaTheme = () => {
  document.documentElement.dataset.theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    document.documentElement.dataset.theme = event.matches ? "dark" : "light";
  });
};

const initScrollReveal = () => {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  const fadeUp = (targets) => {
    gsap.from(targets, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.18,
      scrollTrigger: {
        trigger: targets,
        start: "top 85%",
      },
    });
  };

  fadeUp(".section-header");
  fadeUp(".about-content");
  fadeUp(".skill-card");
  fadeUp(".project-card");
  fadeUp(".cert-card");
  fadeUp(".contact-actions");
};

const initHeroAnimation = () => {
  if (!window.gsap) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".nav-bar", { y: -40, opacity: 0, duration: 0.8 })
    .from(".hero-avatar", { scale: 0.85, opacity: 0, duration: 1 }, "-=0.2")
    .from(".hero-text h1", { y: 40, opacity: 0, duration: 1 }, "-=0.6")
    .from(".cta", { y: 30, opacity: 0, duration: 0.8 }, "-=0.4");
};

const initParallaxBackground = () => {
  const background = document.querySelector(".background-animation");
  if (!background) return;

  let currentX = 0;
  let currentY = 0;

  window.addEventListener("mousemove", (event) => {
    const { innerWidth, innerHeight } = window;
    const targetX = ((event.clientX / innerWidth) - 0.5) * 30;
    const targetY = ((event.clientY / innerHeight) - 0.5) * 30;

    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;

    background.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(1.05)`;
  });
};

const initFocusStates = () => {
  const interactive = document.querySelectorAll("a, button");
  interactive.forEach((element) => {
    element.addEventListener("focus", () => {
      element.classList.add("is-focused");
    });
    element.addEventListener("blur", () => {
      element.classList.remove("is-focused");
    });
  });
};

const init = () => {
  initTypewriter();
  initCTA();
  initCurrentYear();
  initMatchMediaTheme();
  initScrollReveal();
  initHeroAnimation();
  initParallaxBackground();
  initFocusStates();
};

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}

