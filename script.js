// Mobile Menu Toggle
const menuButton = document.getElementById('menu-button');
const navLinks = document.getElementById('nav-links');
const navbar = document.querySelector('.navbar');

function toggleMenu() {
    // 1. Toggle the CSS class (controls visibility via CSS)
    navLinks.classList.toggle('open');
    
    // 2. Update the button text/icon for accessibility
    const isExpanded = navLinks.classList.contains('open');
    menuButton.setAttribute('aria-expanded', isExpanded);
    menuButton.innerHTML = isExpanded ? '✕' : '☰'; // X vs Hamburger
}

// Add the event handler
menuButton.addEventListener('click', toggleMenu);

// Close menu when a link is clicked (for mobile UX)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
            toggleMenu(); // Closes the menu
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Progress Indicator
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const progress = (scrollTop / documentHeight) * 100;
    
    progressBar.style.width = progress + '%';
});

// Form Submission Handling
const contactForm = document.getElementById('contact-form');
const messageDiv = document.getElementById('form-message');

if (contactForm && messageDiv) {
    contactForm.addEventListener('submit', function(event) {
        // Stop the browser from submitting the form and refreshing the page
        event.preventDefault();

        const nameInput = document.getElementById('name').value.trim();
        const emailInput = document.getElementById('email').value.trim();
        const messageInput = document.getElementById('message').value.trim();

        if (nameInput === '' || emailInput === '' || messageInput === '') {
            messageDiv.textContent = 'Please fill out all required fields.';
            messageDiv.style.color = '#dc3545';
            messageDiv.style.backgroundColor = '#f8d7da';
            messageDiv.style.border = '1px solid #f5c6cb';
            messageDiv.style.padding = '0.75rem';
            messageDiv.style.borderRadius = '0.375rem';
        } else {
            // Successful mock submission
            messageDiv.textContent = 'Thank you for your message! I will be in touch shortly.';
            messageDiv.style.color = '#155724';
            messageDiv.style.backgroundColor = '#d4edda';
            messageDiv.style.border = '1px solid #c3e6cb';
            messageDiv.style.padding = '0.75rem';
            messageDiv.style.borderRadius = '0.375rem';
            
            // Clear the form fields
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                messageDiv.textContent = '';
                messageDiv.style.backgroundColor = 'transparent';
                messageDiv.style.border = 'none';
                messageDiv.style.padding = '0';
            }, 5000);
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a, .cta-button').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Audio interaction for project cards
const projectCards = document.querySelectorAll('.project-card[data-sound="true"]');
const hoverSound = document.getElementById('hover-sound');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (hoverSound) {
            // hoverSound.currentTime = 0;
            // hoverSound.play().catch(e => console.log('Audio play failed:', e));
        }
    });
});

// CTA Button interaction
const ctaButton = document.getElementById('cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        // Optional: Add click sound or animation
        ctaButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            ctaButton.style.transform = 'scale(1)';
        }, 150);
    });
}

// Add loading animation for project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Add delay for staggered animation
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.6s ease-in-out forwards;
        opacity: 0;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Close mobile menu if window is resized to desktop size
    if (window.innerWidth >= 768 && navLinks.classList.contains('open')) {
        toggleMenu();
    }
});

// Ensure video plays correctly
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video-background');
    
    if (video) {
        // Restart video if it ends (extra precaution for looping)
        video.addEventListener('ended', function() {
            video.currentTime = 0;
            video.play().catch(e => console.log('Video play error:', e));
        });
        
        // Ensure video plays (some browsers require this)
        video.play().catch(e => console.log('Video autoplay failed:', e));
    }
});