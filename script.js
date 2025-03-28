// JavaScript for sliding images
let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slides img').length;

function showSlide(index) {
    // Calculate the transform value based on the current slide index
    const offset = -100 * index;
    slides.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Automatically transition every 4 seconds
setInterval(nextSlide, 3000);

// Initialize the first slide
showSlide(currentSlide);