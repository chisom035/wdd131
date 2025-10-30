// ========== UPDATE: Replace with your actual project data ==========
const projects = [
    {
        id: 1,
        title: "E-Commerce Platform", // Your project name
        description: "A full-stack e-commerce solution with React frontend and Node.js backend, featuring user authentication, payment processing, and admin dashboard.", // Your project description
        image: "project1", // Will be replaced with actual image file
        imageUrl: "images/project1.jpg", // ========== ADD YOUR ACTUAL IMAGE PATH HERE ==========
        technologies: ["React", "Node.js", "MongoDB", "Stripe"], // Technologies used
        category: "fullstack", // Category for filtering
        liveUrl: "#", // Replace with actual live demo URL
        codeUrl: "#", // Replace with actual GitHub URL
        featured: true // Show on home page
    },
    {
        id: 2,
        title: "Task Management App", 
        description: "A responsive task management application with drag-and-drop functionality, real-time updates, and team collaboration features.",
        image: "project2", 
        imageUrl: "images/project2.jpg", // ========== ADD YOUR ACTUAL IMAGE PATH HERE ==========
        technologies: ["Vue.js", "Firebase", "CSS3", "PWA"],
        category: "web",
        liveUrl: "#", 
        codeUrl: "#", 
        featured: true
    },
    {
        id: 3,
        title: "Weather Dashboard", 
        description: "A weather forecasting application with location-based services, interactive maps, and detailed weather analytics.",
        image: "project3", 
        imageUrl: "images/project3.jpg", // ========== ADD YOUR ACTUAL IMAGE PATH HERE ==========
        technologies: ["JavaScript", "API", "Chart.js", "HTML5"],
        category: "javascript",
        liveUrl: "#", 
        codeUrl: "#", 
        featured: true
    },
    {
        id: 4,
        title: "Mobile Fitness Tracker", 
        description: "Cross-platform mobile app for tracking workouts, nutrition, and fitness goals with social sharing features.",
        image: "project4", 
        imageUrl: "images/project4.jpg", // ========== ADD YOUR ACTUAL IMAGE PATH HERE ==========
        technologies: ["React Native", "Redux", "Firebase", "iOS/Android"],
        category: "mobile",
        liveUrl: "#", 
        codeUrl: "#", 
        featured: false
    },
    {
        id: 5,
        title: "Portfolio Website", 
        description: "A responsive portfolio website showcasing projects and skills with modern design and smooth animations.",
        image: "project5", 
        imageUrl: "images/project5.jpg", // ========== ADD YOUR ACTUAL IMAGE PATH HERE ==========
        technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
        category: "web",
        liveUrl: "#", 
        codeUrl: "#", 
        featured: false
    },
    {
        id: 6,
        title: "API Integration Platform", 
        description: "A platform for managing and monitoring multiple API integrations with analytics and automated testing.",
        image: "project6", 
        imageUrl: "images/project6.jpg", // ========== ADD YOUR ACTUAL IMAGE PATH HERE ==========
        technologies: ["Python", "Django", "PostgreSQL", "Docker"],
        category: "fullstack",
        liveUrl: "#", 
        codeUrl: "#", 
        featured: false
    }
    // ========== ADD MORE OF YOUR ACTUAL PROJECTS HERE ==========
    // Copy this structure for each of your projects
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const projectsGrid = document.querySelector('.projects-grid');
const projectsPageGrid = document.getElementById('projectsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');
const statNumbers = document.querySelectorAll('.stat-number');

// Mobile Navigation
function initMobileNav() {
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Project Filtering
function initProjectFilter() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category === filter);
    
    displayProjects(filteredProjects, projectsPageGrid);
}

// Display Projects
function displayProjects(projectsArray, container) {
    if (!container) return;
    
    container.innerHTML = projectsArray.map(project => `
        <div class="project-card" data-category="${project.category}">
            <!-- ========== UPDATE: Replace placeholder with actual image when available ========== -->
            ${project.imageUrl ? 
                `<img src="${project.imageUrl}" alt="${project.title}" class="project-img">` :
                `<div class="project-image">${project.title} Image</div>`
            }
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.liveUrl}" class="btn btn-primary" target="_blank">Live Demo</a>
                    <a href="${project.codeUrl}" class="btn btn-secondary" target="_blank">View Code</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Animate Statistics
function animateStats() {
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        stat.textContent = Math.floor(current);
                    }, 16);
                });
                observer.disconnect();
            }
        });
    });
    
    observer.observe(document.querySelector('.stats'));
}

// Form Validation
function initFormValidation() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize featured projects on home page
function initFeaturedProjects() {
    const featuredProjects = projects.filter(project => project.featured);
    displayProjects(featuredProjects, projectsGrid);
}

// Initialize all projects on projects page
function initAllProjects() {
    if (projectsPageGrid) {
        displayProjects(projects, projectsPageGrid);
    }
}

// Page-specific initialization
function initPageSpecific() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('projects.html') || currentPage.endsWith('projects')) {
        initAllProjects();
        initProjectFilter();
    } else {
        initFeaturedProjects();
        animateStats();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initSmoothScroll();
    initFormValidation();
    initPageSpecific();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle resize events
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    }
});