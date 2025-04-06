// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

      // Hero Image Slider
      const heroImages = document.querySelectorAll('.hero-image');
      let currentImageIndex = 0;
      
      function switchHeroImage() {
          // Remove active class from all images
          heroImages.forEach(img => img.classList.remove('active'));
          
          // Increment the index and loop back to 0 if at the end
          currentImageIndex = (currentImageIndex + 1) % heroImages.length;
          
          // Add active class to the current image
          heroImages[currentImageIndex].classList.add('active');
      }
      
      // Start the image switching if there are hero images on the page
      if (heroImages.length > 0) {
          // Set the first image as active initially
          heroImages[0].classList.add('active');
          
          // Switch images every 2 seconds
          setInterval(switchHeroImage, 5000);
      }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    
    function highlightNavOnScroll() {
        let scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Form submission - prevent default and show success message
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server here
            alert('Message sent successfully! (This is a demo - no message was actually sent)');
            contactForm.reset();
        });
    }

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Add smooth reveal animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Scroll to top button functionality
window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    }
});

// Typing animation for hero text (alternative to AOS for enhanced effect)
// This is commented out but you can uncomment and use if you want this effect
/*
function typeEffect(element, text, speed = 50) {
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    heroTitle.innerHTML = '';
    window.addEventListener('load', function() {
        typeEffect(heroTitle, 'Creative Designer & Developer');
    });
}
*/