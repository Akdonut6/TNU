document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const comicViewer = document.querySelector('.comic-viewer');
    const spreadContainer = document.querySelector('.spread-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pageIndicator = document.querySelector('.page-indicator');
    const controls = document.querySelector('.controls');
    
    // Comic data
    const spreads = document.querySelectorAll('.spread');
    const totalSpreads = spreads.length;
    let currentSpread = 0;
    let isAnimating = false;

    // Show specific spread
    function showSpread(index) {
        if (isAnimating) return;
        
        if (index < 0 || index >= totalSpreads) return;
        
        isAnimating = true;
        controls.classList.add('hidden');
        
        spreads[currentSpread].classList.remove('active');
        spreads[currentSpread].classList.add(index > currentSpread ? 'prev' : 'next');
        
        currentSpread = index;
        spreads[currentSpread].classList.remove('prev', 'next');
        spreads[currentSpread].classList.add('active');
        
        updateControls();
        
        setTimeout(() => {
            controls.classList.remove('hidden');
            isAnimating = false;
        }, 600);
    }

    // Update navigation controls
    function updateControls() {
        prevBtn.disabled = currentSpread <= 0;
        nextBtn.disabled = currentSpread >= totalSpreads - 1;
        pageIndicator.textContent = `${currentSpread + 1} / ${totalSpreads}`;
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (!prevBtn.disabled) showSpread(currentSpread - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        if (!nextBtn.disabled) showSpread(currentSpread + 1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && !prevBtn.disabled) showSpread(currentSpread - 1);
        if (e.key === 'ArrowRight' && !nextBtn.disabled) showSpread(currentSpread + 1);
    });

    // Initialize
    updateControls();
});