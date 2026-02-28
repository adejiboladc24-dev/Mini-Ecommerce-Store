// Instant scroll utility - No animation, no hanging
export const smoothScrollTo = (targetPosition) => {
  window.scrollTo(0, targetPosition);
};

// Handle instant scroll for anchor links
export const initSmoothScroll = () => {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href^="#"]');
    if (!target) return;
    
    const href = target.getAttribute('href');
    if (href === '#' || !href) return;
    
    e.preventDefault();
    
    const element = document.querySelector(href);
    if (!element) return;
    
    const navbarHeight = 80;
    const targetPosition = element.offsetTop - navbarHeight;
    
    smoothScrollTo(targetPosition);
    
    // Update URL without jumping
    if (history.pushState) {
      history.pushState(null, null, href);
    }
  });
};
