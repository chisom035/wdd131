const projectData = window.portfolioData ? window.portfolioData.allProjects : [];

const projectsContainer = document.getElementById('all-projects-container');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';

function displayAllProjects(projectsToShow = projectData) {
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = '';
    
    if (projectsToShow.length === 0) {
        projectsContainer.innerHTML = '<p class="no-projects">No projects found for this filter.</p>';
        return;
    }
    
    const projectCards = projectsToShow.map(project => {
        return `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links" style="margin-top: 1rem;">
                        ${project.github ? `<a href="${project.github}" target="_blank" class="button outline" style="margin-right: 0.5rem; padding: 0.5rem 1rem;">GitHub</a>` : ''}
                        ${project.live ? `<a href="${project.live}" target="_blank" class="button primary" style="padding: 0.5rem 1rem;">Live Demo</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    });
    
    projectsContainer.innerHTML = projectCards.join('');
}

function filterProjects(category) {
    let filteredProjects;
    
    if (category === 'all') {
        filteredProjects = projectData;
    } else {
        filteredProjects = projectData.filter(project => project.category === category);
    }
    
    displayAllProjects(filteredProjects);
}

function setupFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.getAttribute('data-filter');
            currentFilter = category;
            filterProjects(category);
        });
    });
}

function initProjectsPage() {
    if (projectsContainer) {
        displayAllProjects();
        setupFilters();
    }
}

document.addEventListener('DOMContentLoaded', initProjectsPage);