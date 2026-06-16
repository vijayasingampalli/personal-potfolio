/**
 * JavaScript for Vijaya Singampalli's Portfolio
 * Features: Interactive spotlight effect, scroll spy navigation, and fade-in animations on scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive Mouse Spotlight Glow Effect
  const body = document.body;

  window.addEventListener('mousemove', (e) => {
    // Get mouse coordinates relative to viewport
    const x = e.clientX;
    const y = e.clientY;
    
    // Set custom CSS variables on body
    body.style.setProperty('--mouse-x', `${x}px`);
    body.style.setProperty('--mouse-y', `${y}px`);
  });

  // 2. Intersection Observer for Active Navigation Highlight (Scroll Spy)
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  if (sections.length > 0 && navItems.length > 0) {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the sweet spot of screen
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          
          // Remove active class from all links
          navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${activeId}`) {
              item.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  // 3. Scroll Reveal (Fade-in animations)
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (fadeElements.length > 0) {
    const fadeObserverOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once visible, stop observing to keep it clean
          observer.unobserve(entry.target);
        }
      });
    }, fadeObserverOptions);

    fadeElements.forEach(element => {
      fadeObserver.observe(element);
    });
  }

  // 4. Smooth scroll offset logic for desktop navigation
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetId = item.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const isMobile = window.innerWidth <= 768;
          // Offset scroll slightly on mobile for sticky headers
          const offset = isMobile ? 80 : 0;
          const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Fallback active state update
          navItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
        }
      }
    });
  });
});
