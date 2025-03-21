// JavaScript to change the background images every 3 seconds
const heroSection = document.getElementById('hero-section');
const images = [
    'Snow_background.png',
    'Space_background.png',
    'Train_background.png',
];
let currentImageIndex = 0;

function changeBackgroundImage() {
    heroSection.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

setInterval(changeBackgroundImage, 3000);
changeBackgroundImage();  // Set the initial image
