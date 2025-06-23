// ==============================================
// === LOADING SCREEN ===
// ==============================================
window.addEventListener('load', function() {
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    // Force complete the loading animation
    const progressBar = document.querySelector('.progress');
    if (progressBar) {
      progressBar.style.width = '100%';
    }
    
    // Hide loading screen after short delay
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 1000);
  }
});

// ==============================================
// === MAIN CHARACTER SLIDER ===
// ==============================================
function initCharacterSlider() {
  const slider = document.querySelector('.featured-slider .slider');
  if (!slider) return;

  const slides = document.querySelectorAll('.featured-slider .slide');
  const dots = document.querySelectorAll('.featured-slider .dot');
  const prevArrow = document.querySelector('.featured-slider .prev-arrow');
  const nextArrow = document.querySelector('.featured-slider .next-arrow');
  
  let currentIndex = 0;
  let slideInterval;

  function goToSlide(index) {
    // Validate index
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    // Update slides
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    currentIndex = index;
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  function setupEventListeners() {
    // Arrow buttons
    if (prevArrow) prevArrow.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
    
    if (nextArrow) nextArrow.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (currentIndex !== index) {
          goToSlide(index);
          resetAutoSlide();
        }
      });
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });

    // Touch/swipe for mobile
    let touchStartX = 0;
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      clearInterval(slideInterval);
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
      }
      startAutoSlide();
    }, { passive: true });

    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  // Initialize
  goToSlide(0);
  setupEventListeners();
  startAutoSlide();
}

// ==============================================
// === NAVIGATION MENU TOGGLE (MOBILE) ===
// ==============================================
function initMobileMenu() {
  const menuButton = document.querySelector('.mobile-menu-button');
  const navMenu = document.querySelector('.navbar nav');
  
  if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuButton.classList.toggle('active');
    });
  }
}

// ==============================================
// === BUTTON EFFECTS ===
// ==============================================
function initButtonEffects() {
  document.querySelectorAll('button, .btn, .dot').forEach(button => {
    button.addEventListener('click', function() {
      this.classList.add('pressed');
      setTimeout(() => this.classList.remove('pressed'), 200);
      
      // Uncomment to add sound effect
      // const clickSound = new Audio('click.wav');
      // clickSound.volume = 0.3;
      // clickSound.play();
    });
  });
}

// ==============================================
// === INITIALIZE EVERYTHING ===
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
  initCharacterSlider();
  initMobileMenu();
  initButtonEffects();
  
  // Add any other initialization functions here
});

// ==============================================
// === DEBUGGING HELPERS ===
// ==============================================
function debugSlider() {
  console.log('Slides:', document.querySelectorAll('.slide').length);
  console.log('Dots:', document.querySelectorAll('.dot').length);
  console.log('Arrows:', {
    prev: document.querySelector('.prev-arrow'),
    next: document.querySelector('.next-arrow')
  });
}

// Uncomment to debug:
// debugSlider();