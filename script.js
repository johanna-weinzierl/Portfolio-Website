// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50, // Adjust for header height
                behavior: 'smooth',
            });
        }
    });
});

// Sticky header effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Form validation
const form = document.querySelector('.contact form');
form.addEventListener('submit', function (e) {
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    let hasError = false;

    if (name.value.trim() === '') {
        showError(name, 'Name is required.');
        hasError = true;
    }

    if (!isValidEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email.');
        hasError = true;
    }

    if (message.value.trim() === '') {
        showError(message, 'Message cannot be empty.');
        hasError = true;
    }

    if (hasError) {
        e.preventDefault();
    }
});

// Helper: Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper: Show error message
function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#ff0000';
    error.style.marginTop = '5px';
    input.parentElement.appendChild(error);
}

// Highlight active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let currentSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 60; // Adjust for header height
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSectionId) {
            link.classList.add('active');
        }
    });
});
