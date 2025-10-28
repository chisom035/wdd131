// Import data from data.js
import { skillsData, projectsData, projectStats, projectAnalysis } from './data.js';

// DOM elements
const skillsContainer = document.getElementById('skills-container');
const featuredProjectsContainer = document.getElementById('featured-projects');
const allProjectsContainer = document.getElementById('all-projects-container');
const projectCountElement = document.getElementById('project-count');
const skillCountElement = document.getElementById('skill-count');
const experienceElement = document.getElementById('experience');
const contactForm = document.getElementById('contact-form');

// Utility functions
const utils = {
    // Animate counting numbers with callback support
    animateCount(element, target, duration = 2000, callback = null) {
        let current = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
                if (callback && typeof callback === 'function') {
                    callback();
                }
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    },

    // Validate email format with comprehensive checking
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    },

    // Smooth scroll to element with offset
    scrollToElement(elementId, offset = 100) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    },

    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Skills module with enhanced functionality
const skillsModule = {
    init() {
        if (skillsContainer) {
            this.renderSkills();
            this.setupSkillInteractions();
        }
    },

    renderSkills() {
        // Use array map to transform skill data
        const skillCards = skillsData.map(skill => {
            return `
                <div class="skill-card" data-skill="${skill.name.toLowerCase()}">
                    <h3>${skill.name}</h3>
                    <p>${skill.description}</p>
                    <div class="skill-level">${skill.level}</div>
                </div>
            `;
        }).join('');

        skillsContainer.innerHTML = skillCards;
    },

    setupSkillInteractions() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleSkillHover);
            card.addEventListener('mouseleave', this.handleSkillLeave);
        });
    },

    handleSkillHover(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(-8px) scale(1.02)';
    },

    handleSkillLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(0) scale(1)';
    }
};

// Projects module with filtering and analytics
const projectsModule = {
    currentFilter: 'all',
    filteredProjects: [],

    init() {
        if (featuredProjectsContainer) {
            this.renderFeaturedProjects();
            this.setupProjectAnalytics();
        }
        if (allProjectsContainer) {
            this.renderAllProjects();
            this.initFilters();
            this.setupProjectSearch();
        }
    },

    renderFeaturedProjects() {
        // Use array filter to get featured projects
        const featuredProjects = projectsData.filter(project => project.featured);
        this.renderProjects(featuredProjects, featuredProjectsContainer);
    },

    renderAllProjects() {
        this.filteredProjects = projectsData;
        this.renderProjects(projectsData, allProjectsContainer);
    },

    renderProjects(projects, container) {
        // Use array map and reduce for complex rendering
        if (projects.length === 0) {
            container.innerHTML = '<div class="no-projects">No projects found in this category. Try a different filter!</div>';
            return;
        }

        const projectsHTML = projects.map(project => {
            const tagsHTML = project.tags.map(tag => 
                `<span class="project-tag">${tag}</span>`
            ).join('');

            const linksHTML = [
                project.demoUrl ? `<a href="${project.demoUrl}" class="button primary" target="_blank">Live Demo</a>` : '',
                project.githubUrl ? `<a href="${project.githubUrl}" class="button outline" target="_blank">GitHub</a>` : ''
            ].filter(link => link).join('');

            return `
                <div class="project-card" data-category="${project.category}" data-id="${project.id}">
                    <div class="project-image">
                        ${project.title}
                    </div>
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tags">
                            ${tagsHTML}
                        </div>
                        <div class="project-links">
                            ${linksHTML}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = projectsHTML;
        this.setupProjectInteractions();
    },

    initFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleFilterChange(e.target);
            });
        });
    },

    handleFilterChange(button) {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => 
            btn.classList.remove('active')
        );
        button.classList.add('active');

        this.currentFilter = button.getAttribute('data-filter');
        this.filterProjects(this.currentFilter);
    },

    filterProjects(category) {
        // Use array filter with conditional logic
        let filteredProjects;
        
        if (category === 'all') {
            filteredProjects = projectsData;
        } else {
            filteredProjects = projectsData.filter(project => {
                // Conditional branching for complex filtering
                if (category === 'web') {
                    return project.category === 'web' || 
                           project.tags.some(tag => ['HTML', 'CSS', 'JavaScript'].includes(tag));
                } else if (category === 'mobile') {
                    return project.category === 'mobile';
                } else if (category === 'fullstack') {
                    return project.category === 'fullstack' || 
                           project.tags.includes('Node.js') || 
                           project.tags.includes('MongoDB');
                }
                return project.category === category;
            });
        }

        this.filteredProjects = filteredProjects;
        this.renderProjects(filteredProjects, allProjectsContainer);
        this.updateProjectCounter(filteredProjects.length);
    },

    setupProjectSearch() {
        // Could be extended for search functionality
        console.log('Project search setup complete');
    },

    setupProjectInteractions() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    this.handleProjectClick(card);
                }
            });
        });
    },

    handleProjectClick(card) {
        const projectId = card.getAttribute('data-id');
        const project = projectsData.find(p => p.id == projectId);
        
        if (project) {
            console.log('Project clicked:', project.title);
            // Could open modal or navigate to project detail page
        }
    },

    updateProjectCounter(count) {
        const counterElement = document.querySelector('.project-counter');
        if (!counterElement) {
            const filterContainer = document.querySelector('.filter-buttons');
            if (filterContainer) {
                const counter = document.createElement('div');
                counter.className = 'project-counter';
                counter.style.cssText = 'text-align: center; margin: 1em 0; color: #666; font-weight: 600;';
                counter.textContent = `Showing ${count} of ${projectsData.length} projects`;
                filterContainer.after(counter);
            }
        } else {
            counterElement.textContent = `Showing ${count} of ${projectsData.length} projects`;
        }
    },

    setupProjectAnalytics() {
        // Use array reduce for analytics
        const techUsage = projectsData.reduce((acc, project) => {
            project.tags.forEach(tag => {
                acc[tag] = (acc[tag] || 0) + 1;
            });
            return acc;
        }, {});

        console.log('Technology usage across projects:', techUsage);
    }
};

// Form module with comprehensive validation
const formModule = {
    formData: {},
    validationRules: {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000
        }
    },

    init() {
        if (contactForm) {
            this.setupFormValidation();
            this.setupFormInteractions();
        }
    },

    setupFormValidation() {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const isValid = this.validateForm();
            
            if (isValid) {
                this.handleFormSubmit();
            }
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', utils.debounce(() => {
                this.validateField(input);
            }, 300));
        });
    },

    setupFormInteractions() {
        // Add character counters
        const messageInput = document.getElementById('message');
        if (messageInput) {
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = 'text-align: right; font-size: 0.8em; color: #666; margin-top: 0.5em;';
            messageInput.parentNode.appendChild(counter);
            
            messageInput.addEventListener('input', () => {
                const remaining = 1000 - messageInput.value.length;
                counter.textContent = `${messageInput.value.length}/1000 characters`;
                counter.style.color = remaining < 50 ? '#a42212' : '#666';
            });
        }
    },

    validateForm() {
        const fields = ['name', 'email', 'message'];
        let isValid = true;

        fields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    },

    validateField(field) {
        const fieldName = field.id;
        const value = field.value.trim();
        const rules = this.validationRules[fieldName];
        const errorElement = document.getElementById(`${fieldName}-error`);

        // Clear previous error
        field.classList.remove('error-field');
        if (errorElement) errorElement.textContent = '';

        // Required field validation
        if (rules.required && !value) {
            this.showError(field, errorElement, 'This field is required');
            return false;
        }

        // Pattern validation
        if (rules.pattern && value && !rules.pattern.test(value)) {
            if (fieldName === 'email') {
                this.showError(field, errorElement, 'Please enter a valid email address');
            } else if (fieldName === 'name') {
                this.showError(field, errorElement, 'Name can only contain letters and spaces');
            }
            return false;
        }

        // Length validation
        if (rules.minLength && value.length < rules.minLength) {
            this.showError(field, errorElement, `Minimum ${rules.minLength} characters required`);
            return false;
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            this.showError(field, errorElement, `Maximum ${rules.maxLength} characters allowed`);
            return false;
        }

        // Valid field
        field.classList.add('valid-field');
        return true;
    },

    showError(field, errorElement, message) {
        field.classList.add('error-field');
        field.classList.remove('valid-field');
        if (errorElement) {
            errorElement.textContent = message;
        }
    },

    handleFormSubmit() {
        // Collect form data using object
        this.formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        // Simulate form submission
        this.showLoadingState();
        
        setTimeout(() => {
            this.showSuccessState();
            this.resetForm();
        }, 1500);
    },

    showLoadingState() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Store original text for reset
        submitButton.setAttribute('data-original-text', originalText);
    },

    showSuccessState() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.textContent = '✓ Message Sent!';
        submitButton.style.background = '#28a745';
        
        setTimeout(() => {
            this.resetButtonState(submitButton);
        }, 3000);
    },

    resetButtonState(button) {
        const originalText = button.getAttribute('data-original-text');
        button.textContent = originalText;
        button.disabled = false;
        button.style.background = '';
    },

    resetForm() {
        contactForm.reset();
        
        // Clear validation states
        const fields = contactForm.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.classList.remove('valid-field', 'error-field');
        });
        
        const errors = contactForm.querySelectorAll('.error');
        errors.forEach(error => error.textContent = '');
        
        // Reset character counter
        const counter = contactForm.querySelector('.char-counter');
        if (counter) counter.textContent = '0/1000 characters';
    }
};

// Stats module with enhanced analytics
const statsModule = {
    init() {
        if (projectCountElement && skillCountElement && experienceElement) {
            this.animateStats();
            this.setupStatsTracking();
        }
    },

    animateStats() {
        // Animate project count
        utils.animateCount(projectCountElement, projectStats.totalProjects, 1500, () => {
            // Animate skill count after project count completes
            utils.animateCount(skillCountElement, projectStats.totalSkills, 1200, () => {
                // Animate experience last
                utils.animateCount(experienceElement, 2, 800);
            });
        });
    },

    setupStatsTracking() {
        // Track user interactions with stats
        const statItems = document.querySelectorAll('.stat-item');
        
        statItems.forEach(item => {
            item.addEventListener('click', () => {
                this.handleStatClick(item);
            });
        });
    },

    handleStatClick(statItem) {
        const number = statItem.querySelector('.stat-number').textContent;
        const label = statItem.querySelector('.stat-label').textContent;
        
        console.log(`Stat clicked: ${number} ${label}`);
        
        // Add visual feedback
        statItem.style.transform = 'scale(1.05)';
        setTimeout(() => {
            statItem.style.transform = 'scale(1)';
        }, 200);
    }
};

// Navigation module with smooth scrolling and active states
const navigationModule = {
    currentSection: '',
    observer: null,

    init() {
        this.setupSmoothScrolling();
        this.setupActiveNav();
        this.setupIntersectionObserver();
    },

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                if (href.startsWith('#') && document.getElementById(href.substring(1))) {
                    e.preventDefault();
                    utils.scrollToElement(href.substring(1), 80);
                }
            });
        });
    },

    setupActiveNav() {
        // Use array forEach for nav items
        const navItems = document.querySelectorAll('nav a');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });
    },

    setupIntersectionObserver() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        const options = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.currentSection = entry.target.getAttribute('id');
                    this.updateActiveNav();
                }
            });
        }, options);

        sections.forEach(section => {
            this.observer.observe(section);
        });
    },

    updateActiveNav() {
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === `#${this.currentSection}` || 
                (this.currentSection === '' && href === 'index.html') ||
                (window.location.pathname.includes('projects.html') && href === 'projects.html')) {
                link.classList.add('active');
            }
        });
    }
};

// Performance monitoring
const performanceModule = {
    init() {
        this.monitorPerformance();
        this.setupLazyLoading();
    },

    monitorPerformance() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
            
            if (loadTime > 3000) {
                console.warn('Page load time is above 3 seconds. Consider optimizing.');
            }
        });
    },

    setupLazyLoading() {
        // Could be extended for image lazy loading
        const images = document.querySelectorAll('img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => {
                if (img.classList.contains('lazy')) {
                    imageObserver.observe(img);
                }
            });
        }
    }
};

// Main application initialization
class PortfolioApp {
    constructor() {
        this.modules = [
            skillsModule,
            projectsModule,
            formModule,
            statsModule,
            navigationModule,
            performanceModule
        ];
    }

    init() {
        console.log('🚀 Initializing Portfolio Application...');
        
        // Initialize all modules
        this.modules.forEach(module => {
            try {
                module.init();
                console.log(`✅ ${module.constructor.name || 'Module'} initialized`);
            } catch (error) {
                console.error(`❌ Error initializing module:`, error);
            }
        });

        // Set up global error handling
        this.setupErrorHandling();
        
        console.log('🎉 Portfolio Application ready!');
    }

    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error caught:', e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    app.init();
});

// Export for testing or additional functionality
export { 
    utils, 
    skillsModule, 
    projectsModule, 
    formModule, 
    statsModule, 
    navigationModule,
    PortfolioApp 
};