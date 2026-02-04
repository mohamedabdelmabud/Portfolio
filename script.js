// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Navbar background
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'var(--white)';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!validateContactForm(data)) {
                showNotification('Please fill all required fields correctly', 'error');
                return;
            }
            
            // Show success message
            showNotification('Thank you for your message! I will get back to you within 24 hours.', 'success');
            
            // Reset form
            this.reset();
            
            // In production, you would send this data to a server
            console.log('Form submitted:', data);
        });
    }
    
    // Form validation
    function validateContactForm(data) {
        if (!data.name || !data.email || !data.message) {
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return false;
        }
        
        return true;
    }
    
    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            </div>
            <div class="notification-content">
                <p>${message}</p>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 10px;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                z-index: 9999;
                transform: translateX(120%);
                transition: transform 0.3s ease;
                max-width: 400px;
                border-left: 4px solid;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification.success {
                border-left-color: #10b981;
            }
            
            .notification.error {
                border-left-color: #ef4444;
            }
            
            .notification-icon {
                font-size: 1.5rem;
            }
            
            .notification.success .notification-icon {
                color: #10b981;
            }
            
            .notification.error .notification-icon {
                color: #ef4444;
            }
            
            .notification-content p {
                margin: 0;
                color: #1f2933;
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: #9ca3af;
                cursor: pointer;
                padding: 5px;
                margin-left: auto;
            }
            
            .notification-close:hover {
                color: #6b7280;
            }
        `;
        document.head.appendChild(style);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Animate skill level dots
    function animateSkillDots() {
        const dots = document.querySelectorAll('.dot.active');
        dots.forEach((dot, index) => {
            dot.style.opacity = '0';
            setTimeout(() => {
                dot.style.transition = 'opacity 0.3s ease';
                dot.style.opacity = '1';
            }, index * 100);
        });
    }
    
    // Animate certificate cards
    function animateCertificateCards() {
        const cards = document.querySelectorAll('.certificate-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Project tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-tab');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'grid';
                } else if (filter === 'featured') {
                    if (card.classList.contains('featured')) {
                        card.style.display = 'grid';
                    } else {
                        card.style.display = 'none';
                    }
                } else {
                    // For other filters, you can add more logic
                    card.style.display = 'grid';
                }
            });
        });
    });
    
    // Animate weather chart data points
    function animateWeatherChart() {
        const dataPoints = document.querySelectorAll('.data-point');
        dataPoints.forEach((point, index) => {
            point.style.opacity = '0';
            point.style.transform = 'translateX(-50%) scale(0)';
            
            setTimeout(() => {
                point.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                point.style.opacity = '1';
                point.style.transform = 'translateX(-50%) scale(1)';
            }, index * 200);
        });
    }
    
    // Animate pie chart segments
    function animatePieChart() {
        const pieChart = document.querySelector('.pie-chart');
        if (pieChart) {
            pieChart.style.background = 'conic-gradient(#e5e7eb 100%)';
            
            setTimeout(() => {
                pieChart.style.transition = 'background 1.5s ease';
                pieChart.style.background = 'conic-gradient(#4ade80 30%, #fbbf24 20%, #60a5fa 25%, #a78bfa 15%, #f87171 10%)';
            }, 500);
        }
    }
    
    // Animate progress bars
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease';
                bar.style.width = width;
            }, 300);
        });
    }
    
    // Intersection Observer for animations
    function initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Trigger specific animations based on section
                    if (entry.target.id === 'skills') {
                        setTimeout(animateSkillDots, 500);
                    } else if (entry.target.id === 'certificates') {
                        setTimeout(animateCertificateCards, 500);
                    } else if (entry.target.id === 'projects') {
                        setTimeout(animateWeatherChart, 500);
                        setTimeout(animatePieChart, 800);
                        setTimeout(animateProgressBars, 1000);
                    }
                }
            });
        }, observerOptions);
        
        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
    
    // Form input animations
    function initFormAnimations() {
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check initial state
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }
    
    // Initialize everything
    initIntersectionObserver();
    initFormAnimations();
    
    // Set current year in footer
    const yearElement = document.querySelector('.copyright');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            
            if (email) {
                showNotification('Thank you for subscribing!', 'success');
                this.reset();
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize animations on load
    window.addEventListener('load', () => {
        // Add loaded class for fade-in effects
        document.body.classList.add('loaded');
        
        // Initial animations
        setTimeout(animateSkillDots, 1000);
        setTimeout(animateCertificateCards, 1500);
    });
});

// Weather data simulation for the weather app preview
function simulateWeatherData() {
    const temperature = document.querySelector('.temperature');
    const condition = document.querySelector('.condition');
    
    if (temperature && condition) {
        // Simulate temperature changes
        let currentTemp = 28;
        setInterval(() => {
            // Random temperature fluctuation between 26-30°C
            currentTemp = 26 + Math.random() * 4;
            temperature.textContent = `${Math.round(currentTemp)}°C`;
            
            // Change condition based on temperature
            if (currentTemp > 29) {
                condition.textContent = 'Hot';
            } else if (currentTemp > 27) {
                condition.textContent = 'Sunny';
            } else if (currentTemp > 25) {
                condition.textContent = 'Partly Cloudy';
            } else {
                condition.textContent = 'Cloudy';
            }
        }, 3000);
    }
}

// Expense data simulation
function simulateExpenseData() {
    const budgetProgress = document.querySelector('.progress-fill');
    const budgetText = document.querySelector('.progress-text span:first-child');
    
    if (budgetProgress && budgetText) {
        let progress = 65;
        setInterval(() => {
            // Simulate small changes in budget usage
            progress = 60 + Math.random() * 10;
            budgetProgress.style.width = `${progress}%`;
            budgetText.textContent = `Budget Used: ${Math.round(progress)}%`;
        }, 4000);
    }
}

// Start simulations when page loads
window.addEventListener('load', () => {
    setTimeout(simulateWeatherData, 2000);
    setTimeout(simulateExpenseData, 2500);
});