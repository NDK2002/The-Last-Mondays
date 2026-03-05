// Number counting animation
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        obj.innerHTML = Math.floor(easeProgress * (end - start) + start).toString().padStart(2, '0');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function getMondaysLeft() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const lastDayOfYear = new Date(currentYear, 11, 31);

    let count = 0;
    let tempDate = new Date(today);

    // Start calculating from tomorrow
    tempDate.setDate(tempDate.getDate() + 1);

    while (tempDate <= lastDayOfYear) {
        if (tempDate.getDay() === 1) { // 1 is Monday
            count++;
        }
        tempDate.setDate(tempDate.getDate() + 1);
    }

    return { count, currentYear };
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Randomize particle properties
        const size = Math.random() * 4 + 1; // 1px to 5px
        const left = Math.random() * 100; // 0% to 100%
        const duration = Math.random() * 15 + 10; // 10s to 25s
        const delay = Math.random() * 15; // 0s to 15s
        const blur = Math.random() * 3;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`; // negative delay so some start immediately visible
        if (blur > 0) {
            particle.style.filter = `blur(${blur}px)`;
        }

        particlesContainer.appendChild(particle);
    }
}

// Initialize content
document.addEventListener('DOMContentLoaded', () => {
    const data = getMondaysLeft();
    document.getElementById('year-label').innerText = `NĂM ${data.currentYear}`;

    const countElement = document.getElementById('monday-count');

    // Start counter animation after a small delay corresponding to the fade-in of the card
    setTimeout(() => {
        animateValue(countElement, 0, data.count, 2500);
    }, 400);

    createParticles();
});
