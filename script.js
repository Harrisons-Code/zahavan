// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Hide page loader when page is fully loaded
    hidePageLoader();
    
    // Initialize animations
    initAnimations();

    // Initialize waves animation
    initWaves();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize testimonial slider
    initTestimonialSlider();

    // Initialize FAQ accordions
    initFAQ();

    // Initialize sticky header
    initStickyHeader();

    // Initialize smooth scrolling
    initSmoothScroll();

    // Initialize form validation
    initFormValidation();
});

// Window Load Function for additional elements that might take longer to load
window.addEventListener('load', function() {
    // Additional loading checks if needed
});

// Hide Page Loader
function hidePageLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.classList.add('hidden');
        // Remove loader from DOM after animation completes
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

// Initialize Animations
function initAnimations() {
    // Initial animations for visible elements when page loads
    animateElementsInView();
    
    // Check for elements to animate on scroll
    window.addEventListener('scroll', function() {
        animateElementsInView();
    });

    // Animate hero section elements immediately
    const heroElements = document.querySelectorAll('.hero .fade-in');
    heroElements.forEach(element => {
        element.classList.add('visible');
    });
    
    // Animate page header elements immediately on all pages
    const pageHeaderElements = document.querySelectorAll('.page-header .fade-in');
    pageHeaderElements.forEach((element, index) => {
        // Add staggered delay effect
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 200);
    });
}

// Animate Elements in Viewport
function animateElementsInView() {
    // Elements with data-aos attribute for scroll animations
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    animatedElements.forEach(element => {
        if (isElementInViewport(element) && !element.classList.contains('aos-animated')) {
            // Add a slight delay based on the data-aos-delay attribute
            const delay = element.getAttribute('data-aos-delay') || 0;
            
            setTimeout(() => {
                element.classList.add('aos-animated');
                // Add animation class based on data-aos attribute
                switch(element.getAttribute('data-aos')) {
                    case 'fade-up':
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                        break;
                    case 'fade-right':
                        element.style.opacity = '1';
                        element.style.transform = 'translateX(0)';
                        break;
                    case 'fade-left':
                        element.style.opacity = '1';
                        element.style.transform = 'translateX(0)';
                        break;
                    case 'zoom-in':
                        element.style.opacity = '1';
                        element.style.transform = 'scale(1)';
                        break;
                    default:
                        element.style.opacity = '1';
                }
            }, delay);
        }
    });

    // For standard fade-in class elements
    const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
    fadeElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

// Helper: Check if Element is in Viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Initialize Mobile Menu
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickInsideToggle = mobileToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickInsideToggle && nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Initialize Testimonial Slider
function initTestimonialSlider() {
    const sliderContainer = document.querySelector('.testimonial-slider');
    
    if (sliderContainer) {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');
        
        let currentSlide = 0;
        const slideCount = slides.length;
        
        // Show first slide initially
        slides[0].classList.add('active');
        dots[0].classList.add('active');
        
        // Function to go to a specific slide
        function goToSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        // Event listener for next button
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                let nextSlide = currentSlide + 1;
                if (nextSlide >= slideCount) {
                    nextSlide = 0;
                }
                goToSlide(nextSlide);
            });
        }
        
        // Event listener for previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                let prevSlide = currentSlide - 1;
                if (prevSlide < 0) {
                    prevSlide = slideCount - 1;
                }
                goToSlide(prevSlide);
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                goToSlide(index);
            });
        });
        
        // Auto-advance slides every 5 seconds
        setInterval(function() {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= slideCount) {
                nextSlide = 0;
            }
            goToSlide(nextSlide);
        }, 5000);
    }
}

// Initialize FAQ Accordions
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Toggle active class on the current FAQ item
                item.classList.toggle('active');
                
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        }
    });
}

// Initialize Sticky Header
function initStickyHeader() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Initialize Smooth Scrolling
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate name
            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('name-error');
            
            if (!nameInput.value.trim()) {
                showError(nameInput, nameError, 'Please enter your name');
                isValid = false;
            } else {
                clearError(nameInput, nameError);
            }
            
            // Validate email
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, emailError, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(emailInput, emailError);
            }
            
            // Validate subject
            const subjectInput = document.getElementById('subject');
            const subjectError = document.getElementById('subject-error');
            
            if (subjectInput.value === "") {
                showError(subjectInput, subjectError, 'Please select a subject');
                isValid = false;
            } else {
                clearError(subjectInput, subjectError);
            }
            
            // Validate message
            const messageInput = document.getElementById('message');
            const messageError = document.getElementById('message-error');
            
            if (!messageInput.value.trim()) {
                showError(messageInput, messageError, 'Please enter your message');
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, messageError, 'Message should be at least 10 characters');
                isValid = false;
            } else {
                clearError(messageInput, messageError);
            }
            
            // Validate consent
            const consentInput = document.getElementById('consent');
            const consentError = document.getElementById('consent-error');
            
            if (!consentInput.checked) {
                showError(consentInput, consentError, 'Please provide your consent');
                isValid = false;
            } else {
                clearError(consentInput, consentError);
            }
            
            // If all validations pass, show success message
            if (isValid) {
                // In a real application, you'd send the form data to a server here
                // For this demo, we'll just show a success message
                const formSuccess = document.getElementById('form-success');
                formSuccess.textContent = 'Thank you for your message! We will get back to you soon.';
                formSuccess.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });
        
        // Function to show error
        function showError(input, errorElement, message) {
            input.classList.add('error');
            errorElement.textContent = message;
        }
        
        // Function to clear error
        function clearError(input, errorElement) {
            input.classList.remove('error');
            errorElement.textContent = '';
        }
    }
}

// Apply AOS-like styles to elements initially
document.addEventListener('DOMContentLoaded', function() {
    // Set initial style for elements with data-aos attribute
    const aosElements = document.querySelectorAll('[data-aos]');
    
    aosElements.forEach(element => {
        // Set initial opacity to 0
        element.style.opacity = '0';
        
        // Set initial transform based on animation type
        switch(element.getAttribute('data-aos')) {
            case 'fade-up':
                element.style.transform = 'translateY(30px)';
                break;
            case 'fade-right':
                element.style.transform = 'translateX(-30px)';
                break;
            case 'fade-left':
                element.style.transform = 'translateX(30px)';
                break;
            case 'zoom-in':
                element.style.transform = 'scale(0.9)';
                break;
        }
        
        // Set transition properties
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
});

// Initialize Waves Animation
function initWaves() {
    const waveContainer = document.querySelector('.wave-container');
    if (waveContainer) {
        // Make sure the wave container is visible
        waveContainer.style.display = 'block';
        
        // Set wave heights
        const waves = document.querySelectorAll('.wave');
        waves.forEach(wave => {
            wave.style.display = 'block';
        });
        
        // Force repaint to ensure visibility
        setTimeout(() => {
            waves.forEach(wave => {
                wave.style.opacity = '1';
            });
        }, 100);
    }
}

// Text rotation for hero section
const rotatingTexts = ["Good Advice", "Innovation", "Excellence", "Growth"];
let currentTextIndex = 0;
const rotatingTextElement = document.getElementById('rotatingText');

function updateRotatingText() {
    if (!rotatingTextElement) return;
    
    // Fade out
    rotatingTextElement.style.opacity = '0';
    
    setTimeout(() => {
        // Update text
        currentTextIndex = (currentTextIndex + 1) % rotatingTexts.length;
        rotatingTextElement.textContent = rotatingTexts[currentTextIndex];
        
        // Fade in
        rotatingTextElement.style.opacity = '1';
    }, 500); // Half of the transition time
}

// Initialize text rotation
if (rotatingTextElement) {
    setInterval(updateRotatingText, 3000); // Change text every 3 seconds
}

// Enhanced button hover effects
document.querySelectorAll('.btn-modern').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });
}); 