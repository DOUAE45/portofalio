const prefersReducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

// ===============================================
// FIXED HEADER NAVIGATION
// ===============================================
const initStickyHeader = () => {
  const header = document.querySelector('.fixed-header');
  const heroSection = document.querySelector('.hero');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');
  
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateHeader = () => {
    const currentScrollY = window.scrollY;
    
    // Add scrolled class for styling
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide/show header on scroll
    if (currentScrollY > 200) {
      if (currentScrollY > lastScrollY && !header.classList.contains('hidden')) {
        header.classList.add('hidden');
      } else if (currentScrollY < lastScrollY && header.classList.contains('hidden')) {
        header.classList.remove('hidden');
      }
    } else {
      header.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  };

  // Active section highlighting
  const updateActiveSection = () => {
    const scrollPos = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  };

  // Smooth scroll for navigation links
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Update active state immediately
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });

  // Event listeners
  window.addEventListener('scroll', () => {
    requestTick();
    updateActiveSection();
  }, { passive: true });

  // Initial calls
  updateHeader();
  updateActiveSection();
};

// Mobile menu toggle
const initMobileMenu = () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('active');
    
    if (isOpen) {
      menu.classList.remove('active');
      toggle.classList.remove('active');
    } else {
      menu.classList.add('active');
      toggle.classList.add('active');
    }
  });

  // Close menu when clicking on nav items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.classList.remove('active');
    });
  });
};

// ===============================================
// PROFESSIONAL ANIMATIONS SYSTEM
// ===============================================
const initProfessionalAnimations = () => {
  if (prefersReducedMotionQuery.matches) return;

  // Create intersection observer for scroll animations
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.dataset.animation || 'fade-up';
        const delay = element.dataset.delay || '0';
        
        setTimeout(() => {
          element.classList.add(animationType);
          element.classList.add('animated');
        }, parseInt(delay));
        
        animationObserver.unobserve(element);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all elements with animation classes
  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    animationObserver.observe(el);
  });
};

const initStaggeredAnimations = () => {
  if (prefersReducedMotionQuery.matches) return;

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const container = entry.target;
        const children = container.querySelectorAll('.stagger-item');
        
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('fade-up', 'animated');
          }, index * 100);
        });
        
        staggerObserver.unobserve(container);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.stagger-container').forEach((container) => {
    staggerObserver.observe(container);
  });
};

const initParallaxElements = () => {
  if (prefersReducedMotionQuery.matches) return;

  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  const handleParallax = () => {
    const scrollY = window.pageYOffset;
    
    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      const yPos = -(scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  };

  let ticking = false;
  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(handleParallax);
      ticking = true;
      setTimeout(() => { ticking = false; }, 16);
    }
  };

  window.addEventListener('scroll', requestTick, { passive: true });
};

const initHoverEffects = () => {
  // Advanced hover effects for cards
  const cards = document.querySelectorAll('.project-card, .cert-card');
  
  cards.forEach((card) => {
    card.addEventListener('mouseenter', (e) => {
      if (prefersReducedMotionQuery.matches) return;
      
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;
      
      card.style.transform = `
        perspective(1000px) 
        rotateY(${deltaX * 10}deg) 
        rotateX(${deltaY * -10}deg) 
        translateY(-12px) 
        scale(1.02)
      `;
    });
    
    card.addEventListener('mousemove', (e) => {
      if (prefersReducedMotionQuery.matches) return;
      
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;
      
      card.style.transform = `
        perspective(1000px) 
        rotateY(${deltaX * 8}deg) 
        rotateX(${deltaY * -8}deg) 
        translateY(-12px) 
        scale(1.02)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
};

const initTextAnimations = () => {
  if (prefersReducedMotionQuery.matches) return;

  const textElements = document.querySelectorAll('[data-text-animation]');
  
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const text = element.textContent;
        element.innerHTML = '';
        
        [...text].forEach((char, index) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.opacity = '0';
          span.style.transform = 'translateY(20px)';
          span.style.transition = `all 0.3s ease ${index * 0.03}s`;
          element.appendChild(span);
          
          setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
          }, 100);
        });
        
        textObserver.unobserve(element);
      }
    });
  }, { threshold: 0.5 });

  textElements.forEach((element) => {
    textObserver.observe(element);
  });
};

// Enhanced typewriter effect
const initTypewriter = () => {
  const element = document.querySelector(".typewriter");
  if (!element) return;

  const text = element.dataset.text || "";

  if (prefersReducedMotionQuery.matches) {
    element.textContent = text;
    return;
  }

  const chars = [...text];
  let index = 0;

  const type = () => {
    if (index <= chars.length) {
      element.textContent = chars.slice(0, index).join("");
      
      // Add cursor effect
      if (index === chars.length) {
        element.classList.add('typing-complete');
      }
      
      index += 1;
      const delay = index === chars.length ? 2200 : 90 + Math.random() * 80;
      setTimeout(type, delay);
    } else {
      // Restart typing animation after pause
      setTimeout(() => {
        element.textContent = "";
        element.classList.remove('typing-complete');
        index = 0;
        setTimeout(type, 500);
      }, 3000);
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

// Initialize profile image with fallback handling
const initProfileImage = () => {
  const profileImg = document.querySelector('.profile-img');
  const fallbackSvg = document.querySelector('.avatar-fallback');
  
  if (!profileImg || !fallbackSvg) return;
  
  // Check if image loads successfully
  profileImg.onload = () => {
    profileImg.style.opacity = '1';
    console.log('✅ Image de profil chargée avec succès');
  };
  
  profileImg.onerror = () => {
    console.log('⚠️ Impossible de charger l\'image de profil, utilisation du fallback');
    profileImg.parentElement.style.display = 'none';
    fallbackSvg.style.display = 'block';
  };
  
  // Add loading animation
  profileImg.style.opacity = '0';
  profileImg.style.transition = 'opacity 0.5s ease-in-out';
};

const initMatchMediaTheme = () => {
  document.documentElement.dataset.theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    document.documentElement.dataset.theme = event.matches ? "dark" : "light";
  });
};

const initScrollReveal = () => {
  if (prefersReducedMotionQuery.matches) return;
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  const fadeUp = (targets) => {
    gsap.from(targets, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: targets,
        start: "top 90%",
        end: "bottom 20%",
      },
    });
  };

  const slideInLeft = (targets) => {
    gsap.from(targets, {
      x: -80,
      opacity: 0,
      duration: 1.4,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: targets,
        start: "top 90%",
        end: "bottom 20%",
      },
    });
  };

  const scaleIn = (targets) => {
    gsap.from(targets, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.2)",
      stagger: 0.12,
      scrollTrigger: {
        trigger: targets,
        start: "top 90%",
        end: "bottom 20%",
      },
    });
  };

  const gentleFloat = (targets) => {
    gsap.from(targets, {
      y: 30,
      opacity: 0,
      duration: 1.6,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: targets,
        start: "top 85%",
      },
    });
  };

  fadeUp(".section-header");
  gentleFloat(".about-content");
  scaleIn(".skill-card");
  fadeUp(".project-card");
  slideInLeft(".timeline-content");
  scaleIn(".cert-card");
  gentleFloat(".contact");
  scaleIn(".contact-icon");
  fadeUp(".intro-card, .technical-skills, .interests, .languages");
};

const initHeroAnimation = () => {
  if (prefersReducedMotionQuery.matches) return;
  if (!window.gsap) return;

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  
  // Animation séquencée plus douce et élégante
  tl.from(".nav-bar", { 
    y: -60, 
    opacity: 0, 
    duration: 1.2,
    ease: "back.out(1.3)"
  })
  .from(".hero-avatar", { 
    scale: 0.7, 
    opacity: 0, 
    duration: 1.4,
    ease: "back.out(1.2)",
    rotation: -10
  }, "-=0.8")
  .from(".avatar-glow", {
    scale: 0.5,
    opacity: 0,
    duration: 1.6,
    ease: "power2.out"
  }, "-=1.2")
  .from(".location-badge", { 
    x: -50, 
    opacity: 0, 
    duration: 0.8,
    ease: "power2.out"
  }, "-=1.0")
  .from(".eyebrow", { 
    y: 30, 
    opacity: 0, 
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.6")
  .from(".hero-text h1", { 
    y: 50, 
    opacity: 0, 
    duration: 1.2,
    ease: "power2.out"
  }, "-=0.4")
  .from(".hero-text p:not(.typewriter)", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.6")
  .from(".hero-highlights li", { 
    y: 40, 
    opacity: 0, 
    duration: 0.8, 
    stagger: 0.08,
    ease: "back.out(1.1)"
  }, "-=0.4")
  .from(".cta, .cta-secondary", { 
    y: 40, 
    opacity: 0, 
    duration: 1,
    stagger: 0.1,
    ease: "back.out(1.2)"
  }, "-=0.3");
};

const initParallaxBackground = () => {
  if (prefersReducedMotionQuery.matches) return;
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
  // Core functionality
  initStickyHeader();
  initMobileMenu();
  initCurrentYear();
  initProfileImage();
  initMatchMediaTheme();
  initFocusStates();
  
  // Animation system
  initProfessionalAnimations();
  initStaggeredAnimations();
  initParallaxElements();
  initHoverEffects();
  initTextAnimations();
  
  // Legacy animations (kept for compatibility)
  initTypewriter();
  initCTA();
  initNavigation();
  initScrollReveal();
  initHeroAnimation();
  initParallaxBackground();
  initLanguageProgress();
};

// Animation des barres de progression des langues
const initLanguageProgress = () => {
  const progressBars = document.querySelectorAll('.progress-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const level = progressBar.getAttribute('data-level');
        
        // Petit délai pour l'effet visuel
        setTimeout(() => {
          progressBar.style.width = level + '%';
        }, 200);
        
        observer.unobserve(progressBar);
      }
    });
  }, {
    threshold: 0.5
  });
  
  progressBars.forEach(bar => {
    bar.style.width = '0%'; // Initialiser à 0%
    observer.observe(bar);
  });
};

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}

