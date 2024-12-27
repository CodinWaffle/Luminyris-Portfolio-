// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll with smooth transition
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.backgroundColor = 'rgba(15, 15, 26, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 15, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(5px)';
        navbar.style.boxShadow = 'none';
    }

    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('skill-card')) {
                entry.target.style.transitionDelay = `${entry.target.dataset.delay}s`;
            }
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Observe and add delay to skill cards
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.dataset.delay = (index * 0.1).toFixed(1);
    observer.observe(card);
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
});

// Mobile menu toggle with animation
const mobileMenuButton = document.createElement('button');
mobileMenuButton.classList.add('mobile-menu-button');
mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.nav-content').prepend(mobileMenuButton);

const navLinks = document.querySelector('.nav-links');
mobileMenuButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuButton.classList.toggle('active');
    
    // Toggle icon
    const icon = mobileMenuButton.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Hover effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 12px 40px rgba(77, 109, 227, 0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
    });
});

// Add loading animation to images
document.querySelectorAll('.project-image img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Category filtering
const categoryTabs = document.querySelectorAll('.category-tab');
const projectCards = document.querySelectorAll('.project-card');

categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update active tab
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.dataset.category;

        // Filter projects
        projectCards.forEach(card => {
            card.classList.remove('visible');
            
            setTimeout(() => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            }, 300);
        });
    });
});

// DOM Elements
const videoContainer = document.querySelector('.project-video-container');
const video = document.querySelector('.main-video');
const playPauseBtn = document.querySelector('.play-pause');
const muteBtn = document.querySelector('.mute-unmute');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-content');
const closeBtn = document.querySelector('.modal-close');
const allProjectCards = document.querySelectorAll('.project-card');
const imageProjectCards = document.querySelectorAll('.project-card:not(.video-showcase)');
const videoShowcase = document.querySelector('.video-showcase');

// Video Controls
if (video && playPauseBtn && muteBtn) {
    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Mute/Unmute functionality
    muteBtn.addEventListener('click', () => {
        if (video.muted) {
            video.muted = false;
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            video.muted = true;
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });

    // Update play button on video end
    video.addEventListener('ended', () => {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
}

// Modal Functionality
if (modal && modalImg && closeBtn) {
    // Open modal when clicking on project cards
    imageProjectCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                modal.classList.add('show');
                modalImg.src = img.src;
                modalImg.alt = img.alt || 'Project Image';
                document.body.style.overflow = 'hidden';
                
                // Ensure image is loaded before showing
                modalImg.onload = function() {
                    modal.style.opacity = '1';
                    this.style.opacity = '1';
                };
            }
        });
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Helper Functions
function closeModal() {
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            modalImg.src = '';
        }, 300);
    }
}

// Prevent modal opening for video showcase
if (videoShowcase) {
    videoShowcase.style.cursor = 'default';
    videoShowcase.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}
  