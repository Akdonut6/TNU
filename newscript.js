document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.newswiper-container');
  const wrapper = document.querySelector('.newswiper-wrapper');
  const slides = document.querySelectorAll('.newswiper-slide');
  const prevBtn = document.querySelector('.newswiper-button-prev');
  const nextBtn = document.querySelector('.newswiper-button-next');
  const pagination = document.querySelector('.newswiper-pagination');
  
  let currentIndex = 0;
  const slideCount = slides.length;
  let autoSlideInterval;
  
  // Create pagination dots
  for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('newswiper-pagination-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      pagination.appendChild(dot);
  }
  
  const dots = document.querySelectorAll('.newswiper-pagination-dot');
  
  // Update slide position
  function updateSlide() {
      wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update active dot
      dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
      });
  }
  
  // Go to specific slide
  function goToSlide(index) {
      currentIndex = index;
      updateSlide();
      resetAutoSlide();
  }
  
  // Next slide
  function nextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSlide();
      resetAutoSlide();
  }
  
  // Previous slide
  function prevSlide() {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateSlide();
      resetAutoSlide();
  }
  
  // Auto slide every 5 seconds
  function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 5000);
  }
  
  // Reset auto slide timer
  function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
  }
  
  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
  });
  
  // Touch swipe for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  }, {passive: true});
  
  function handleSwipe() {
      if (touchEndX < touchStartX - 50) nextSlide();
      if (touchEndX > touchStartX + 50) prevSlide();
  }
  
  // Start auto sliding
  startAutoSlide();
  
  // Pause on hover
  container.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
  });
  
  container.addEventListener('mouseleave', () => {
      startAutoSlide();
  });
});