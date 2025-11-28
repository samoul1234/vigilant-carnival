document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = []; // This will be populated with portfolio items
    
    // Sample portfolio items (you can replace this with your actual portfolio data)
    const portfolioData = [
        {
            id: 1,
            title: 'مشروع تطوير ويب',
            category: 'web',
            image: 'https://via.placeholder.com/600x400/2ecc71/ffffff?text=Web+Project',
            description: 'موقع ويب تفاعلي مع تصميم عصري'
        },
        {
            id: 2,
            title: 'تطبيق ذكاء اصطناعي',
            category: 'ai',
            image: 'https://via.placeholder.com/600x400/3498db/ffffff?text=AI+Project',
            description: 'نموذج ذكاء اصطناعي للتعرف على الصور'
        },
        {
            id: 3,
            title: 'تصميم غرفة جيمينج',
            category: 'gaming',
            image: 'https://via.placeholder.com/600x400/e74c3c/ffffff?text=Gaming+Room',
            description: 'تصميم احترافي لغرفة جيمينج عصرية'
        },
        {
            id: 4,
            title: 'تنظيم إضاءة غرفة',
            category: 'lighting',
            image: 'https://via.placeholder.com/600x400/9b59b6/ffffff?text=Lighting+Design',
            description: 'تصميم إضاءة مبتكر لغرفة المعيشة'
        },
        {
            id: 5,
            title: 'تطبيق جوال',
            category: 'web',
            image: 'https://via.placeholder.com/600x400/f1c40f/ffffff?text=Mobile+App',
            description: 'تطبيق جوال سهل الاستخدام'
        },
        {
            id: 6,
            title: 'نظام تحليل بيانات',
            category: 'ai',
            image: 'https://via.placeholder.com/600x400/1abc9c/ffffff?text=Data+Analysis',
            description: 'نظام متقدم لتحليل البيانات الضخمة'
        }
    ];
    
    // Render portfolio items
    function renderPortfolioItems(items) {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (!portfolioGrid) return;
        
        portfolioGrid.innerHTML = '';
        
        items.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.setAttribute('data-category', item.category);
            
            portfolioItem.innerHTML = `
                <div class="portfolio-img-container">
                    <img src="${item.image}" alt="${item.title}" class="portfolio-img">
                    <div class="portfolio-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <div class="portfolio-links">
                            <a href="${item.image}" class="portfolio-link" data-lightbox="portfolio" data-title="${item.title}">
                                <i class="fas fa-search-plus"></i>
                            </a>
                            <a href="#" class="portfolio-link">
                                <i class="fas fa-link"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            portfolioGrid.appendChild(portfolioItem);
            portfolioItems.push(portfolioItem);
        });
        
        // Initialize lightbox for portfolio items
        initLightbox();
    }
    
    // Initialize lightbox
    function initLightbox() {
        const lightboxLinks = document.querySelectorAll('[data-lightbox]');
        
        lightboxLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const imgSrc = this.getAttribute('href');
                const title = this.getAttribute('data-title') || '';
                
                // Create lightbox overlay
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="lightbox-close">&times;</span>
                        <img src="${imgSrc}" alt="${title}">
                        ${title ? `<div class="lightbox-caption">${title}</div>` : ''}
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Close lightbox when clicking the close button or outside the image
                const closeBtn = lightbox.querySelector('.lightbox-close');
                closeBtn.addEventListener('click', closeLightbox);
                
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        closeLightbox();
                    }
                });
                
                // Close with ESC key
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        closeLightbox();
                    }
                });
                
                function closeLightbox() {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = '';
                    }, 300);
                }
                
                // Fade in effect
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                }, 10);
            });
        });
    }
    
    // Filter portfolio items
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                if (filter === 'all') {
                    // Show all items
                    portfolioItems.forEach(item => {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    });
                } else {
                    // Filter items by category
                    portfolioItems.forEach(item => {
                        if (item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 10);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                }
            });
        });
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initialize particles.js
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#2ecc71"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#2ecc71",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        }
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
            this.reset();
        });
    }
    
    // Initialize everything when the DOM is loaded
    function init() {
        // Render portfolio items
        renderPortfolioItems(portfolioData);
        
        // Initialize particles.js
        initParticles();
        
        // Animate elements on page load
        setTimeout(() => {
            const animateElements = document.querySelectorAll('.animate-on-scroll');
            animateElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('visible');
                }, 100 * index);
            });
        }, 500);
        
        // Add scroll event listener for animations
        window.addEventListener('scroll', animateOnScroll);
        
        // Trigger animations on page load
        animateOnScroll();
    }
    
    // Call init when the DOM is fully loaded
    init();
});

// Add lightbox styles dynamically
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox img {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 5px;
        box-shadow: 0 5px 30px rgba(0, 0, 0, 0.5);
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        left: 0;
        color: white;
        font-size: 3rem;
        cursor: pointer;
        transition: color 0.3s ease;
    }
    
    .lightbox-close:hover {
        color: #2ecc71;
    }
    
    .lightbox-caption {
        color: white;
        text-align: center;
        margin-top: 1rem;
        font-size: 1.6rem;
    }
`;

document.head.appendChild(lightboxStyles);
