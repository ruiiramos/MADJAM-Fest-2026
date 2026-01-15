// Countdown Timer
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 3);
targetDate.setHours(targetDate.getHours() + 15);
targetDate.setMinutes(targetDate.getMinutes() + 56);

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById('days-tens').textContent = '0';
        document.getElementById('days-ones').textContent = '0';
        document.getElementById('hours-tens').textContent = '0';
        document.getElementById('hours-ones').textContent = '0';
        document.getElementById('minutes-tens').textContent = '0';
        document.getElementById('minutes-ones').textContent = '0';
        return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000) % 24;
    const minutes = Math.floor(diff / 60000) % 60;

    // Split digits for display
    const daysTens = Math.floor(days / 10);
    const daysOnes = days % 10;
    const hoursTens = Math.floor(hours / 10);
    const hoursOnes = hours % 10;
    const minutesTens = Math.floor(minutes / 10);
    const minutesOnes = minutes % 10;

    document.getElementById('days-tens').textContent = daysTens;
    document.getElementById('days-ones').textContent = daysOnes;
    document.getElementById('hours-tens').textContent = hoursTens;
    document.getElementById('hours-ones').textContent = hoursOnes;
    document.getElementById('minutes-tens').textContent = minutesTens;
    document.getElementById('minutes-ones').textContent = minutesOnes;
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