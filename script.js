// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const toggleIcon = document.getElementById('toggle-icon');

// Check for saved user preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
    toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        toggleIcon.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Animate Progress Bars on Scroll
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress');
    const skillsSection = document.querySelector('.skills');
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
        progressBars.forEach(bar => {
            const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
            bar.style.width = width;
        });
        // Remove event listener after animation
        window.removeEventListener('scroll', animateProgressBars);
    }
};

// Initialize progress bars at 0
document.querySelectorAll('.progress').forEach(bar => {
    bar.style.width = '0';
});

// Horizontal Project Scrolling
// const projectsContainer = document.querySelector('.projects-container');
// const leftArrow = document.querySelector('.left-arrow');
// const rightArrow = document.querySelector('.right-arrow');

// rightArrow.addEventListener('click', () => {
//     projectsContainer.scrollBy({ left: 300, behavior: 'smooth' });
// });

// leftArrow.addEventListener('click', () => {
//     projectsContainer.scrollBy({ left: -300, behavior: 'smooth' });
// });

// Horizontal project scrolling functionality
const projectsContainer = document.querySelector('.projects-container');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const projectCard = document.querySelector('.project-card');
const cardWidth = projectCard.offsetWidth + parseInt(window.getComputedStyle(projectCard).marginRight);

// Scroll amount (width of one card + margin)
const scrollAmount = cardWidth;

rightArrow.addEventListener('click', () => {
    projectsContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

leftArrow.addEventListener('click', () => {
    projectsContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});

// Hide/show arrows based on scroll position
projectsContainer.addEventListener('scroll', () => {
    const maxScroll = projectsContainer.scrollWidth - projectsContainer.clientWidth;
    
    if (projectsContainer.scrollLeft <= 10) {
        leftArrow.style.opacity = '0.5';
        leftArrow.style.cursor = 'not-allowed';
    } else {
        leftArrow.style.opacity = '1';
        leftArrow.style.cursor = 'pointer';
    }
    
    if (projectsContainer.scrollLeft >= maxScroll - 10) {
        rightArrow.style.opacity = '0.5';
        rightArrow.style.cursor = 'not-allowed';
    } else {
        rightArrow.style.opacity = '1';
        rightArrow.style.cursor = 'pointer';
    }
});

// Initialize arrow states
projectsContainer.dispatchEvent(new Event('scroll'));

// Set up scroll event listeners
window.addEventListener('scroll', () => {
    animateOnScroll();
    animateProgressBars();
});

// Formspree Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    try {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            contactForm.reset();
            alert('Message sent successfully!');
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        alert('There was a problem sending your message. Please try again later.');
    } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});

// Add touch event listeners for mobile
let touchStartX = 0;
let touchEndX = 0;

projectsContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

projectsContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, {passive: true});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        // Swipe left - scroll right
        projectsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
    if (touchEndX > touchStartX) {
        // Swipe right - scroll left
        projectsContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Add keyboard arrow key support
document.addEventListener('keydown', (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        if (e.key === 'ArrowRight') {
            projectsContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        } else if (e.key === 'ArrowLeft') {
            projectsContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    }
});