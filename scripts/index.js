// Set target: February 27th, 2026 at 15:00
const targetDate = new Date(2026, 1, 27, 15, 0, 0); 

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        // ... (existing zero-reset logic)
        document.getElementById('seconds-tens').textContent = '0';
        document.getElementById('seconds-ones').textContent = '0';
        return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000) % 24;
    const minutes = Math.floor(diff / 60000) % 60;
    const seconds = Math.floor(diff / 1000) % 60; // New calculation

    // Update digits
    document.getElementById('days-tens').textContent = Math.floor(days / 10);
    document.getElementById('days-ones').textContent = days % 10;
    document.getElementById('hours-tens').textContent = Math.floor(hours / 10);
    document.getElementById('hours-ones').textContent = hours % 10;
    document.getElementById('minutes-tens').textContent = Math.floor(minutes / 10);
    document.getElementById('minutes-ones').textContent = minutes % 10;
    
    // New digit display
    document.getElementById('seconds-tens').textContent = Math.floor(seconds / 10);
    document.getElementById('seconds-ones').textContent = seconds % 10;
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// --- Advanced Testimonial Logic ---
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;
let autoPlayTimer;
let resumeTimer;

function updateCarousel() {
    // 1. Reset all cards
    testimonials.forEach(card => {
        card.classList.remove('active', 'prev', 'next');
    });

    // 2. Calculate Indices (Circular)
    const prevIndex = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    const nextIndex = (currentTestimonial + 1) % totalTestimonials;

    // 3. Set Classes
    testimonials[currentTestimonial].classList.add('active');
    testimonials[prevIndex].classList.add('prev');
    testimonials[nextIndex].classList.add('next');
}

function nextTestimonial(isAuto = false) {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateCarousel();
    if (!isAuto) handleManualInteraction();
}

function previousTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    updateCarousel();
    handleManualInteraction();
}

// Logic to pause auto-play on interaction
function handleManualInteraction() {
    // Stop the auto-rotation
    clearInterval(autoPlayTimer);
    clearTimeout(resumeTimer);

    // Wait 10 seconds, then restart auto-rotation
    resumeTimer = setTimeout(() => {
        startAutoPlay();
    }, 10000); 
}

function startAutoPlay() {
    // Clear existing to avoid duplicates
    clearInterval(autoPlayTimer);
    // Move every 3 seconds (you can change 3000 to whatever speed you want)
    autoPlayTimer = setInterval(() => {
        nextTestimonial(true); 
    }, 3000);
}

// Initialize
if (totalTestimonials > 0) {
    updateCarousel();
    startAutoPlay();
}

// Also pause if user clicks the side cards directly
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('click', () => {
        // If clicking a side card, move to it
        if (card.classList.contains('prev')) previousTestimonial();
        if (card.classList.contains('next')) nextTestimonial();
    });
});