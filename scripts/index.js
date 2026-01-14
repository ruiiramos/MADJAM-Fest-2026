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

// Testimonial Carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((card, i) => {
        if (i === index) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function previousTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Initialize first testimonial
if (testimonials.length > 0) {
    showTestimonial(0);
}

// Auto-advance testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

document.querySelector('.edition-base-inline').addEventListener('click', function() {
    window.location.href = '../views/madyears.html';
});