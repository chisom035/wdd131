// Skills data with enhanced information
export const skillsData = [
    { 
        id: 1,
        name: 'HTML5', 
        description: 'Semantic markup, accessibility, and modern HTML5 features',
        level: 'Advanced',
        category: 'frontend',
        experience: '3 years'
    },
    { 
        id: 2,
        name: 'CSS3', 
        description: 'Responsive design, Flexbox, Grid, animations and modern layout techniques',
        level: 'Advanced',
        category: 'frontend',
        experience: '3 years'
    },
    { 
        id: 3,
        name: 'JavaScript', 
        description: 'ES6+, DOM manipulation, async programming, and modern JS features',
        level: 'Intermediate',
        category: 'frontend',
        experience: '2 years'
    },
    { 
        id: 4,
        name: 'React', 
        description: 'Component-based architecture, hooks, state management, and React ecosystem',
        level: 'Intermediate',
        category: 'frontend',
        experience: '1.5 years'
    },
    { 
        id: 5,
        name: 'Node.js', 
        description: 'Server-side development, REST APIs, Express.js, and backend architecture',
        level: 'Intermediate',
        category: 'backend',
        experience: '1 year'
    },
    { 
        id: 6,
        name: 'Python', 
        description: 'Scripting, backend development, data processing, and automation',
        level: 'Beginner',
        category: 'backend',
        experience: '6 months'
    },
    { 
        id: 7,
        name: 'Git', 
        description: 'Version control, collaboration, branching strategies, and GitHub workflows',
        level: 'Intermediate',
        category: 'tools',
        experience: '2 years'
    },
    { 
        id: 8,
        name: 'MongoDB', 
        description: 'NoSQL database management, CRUD operations, and data modeling',
        level: 'Beginner',
        category: 'database',
        experience: '6 months'
    }
];

// Projects data with comprehensive information
export const projectsData = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with payment integration, user authentication, admin dashboard, and inventory management. Features include product search, shopping cart, order tracking, and customer reviews.',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT', 'Express'],
        category: 'fullstack',
        featured: true,
        demoUrl: 'https://example.com/ecommerce-demo',
        githubUrl: 'https://github.com/chisom035/ecommerce-platform',
        status: 'completed',
        year: 2024,
        complexity: 'high'
    },
    {
        id: 2,
        title: 'Task Management App',
        description: 'A productivity application for managing personal and team tasks with drag-and-drop functionality, due dates, priority levels, and real-time collaboration features.',
        tags: ['JavaScript', 'Firebase', 'CSS3', 'HTML5', 'Drag & Drop API'],
        category: 'web',
        featured: true,
        demoUrl: 'https://example.com/taskmanager-demo',
        githubUrl: 'https://github.com/chisom035/task-manager',
        status: 'completed',
        year: 2023,
        complexity: 'medium'
    },
    {
        id: 3,
        title: 'Weather Dashboard',
        description: 'Real-time weather application with location-based forecasts, interactive maps, severe weather alerts, and historical data visualization. Includes PWA capabilities for offline use.',
        tags: ['React', 'API Integration', 'Chart.js', 'Geolocation', 'PWA'],
        category: 'web',
        featured: true,
        demoUrl: 'https://example.com/weather-dashboard',
        githubUrl: 'https://github.com/chisom035/weather-dashboard',
        status: 'completed',
        year: 2023,
        complexity: 'medium'
    },
    {
        id: 4,
        title: 'Mobile Fitness Tracker',
        description: 'Cross-platform mobile app for tracking workouts, nutrition, and fitness goals with progress visualization, social features, and personalized recommendations.',
        tags: ['React Native', 'Firebase', 'Redux', 'Chart.js', 'Mobile'],
        category: 'mobile',
        featured: false,
        demoUrl: 'https://example.com/fitness-tracker',
        githubUrl: 'https://github.com/chisom035/fitness-tracker',
        status: 'in-progress',
        year: 2024,
        complexity: 'high'
    },
    {
        id: 5,
        title: 'Social Media Dashboard',
        description: 'Analytics dashboard for social media management with real-time metrics, post scheduling, engagement tracking, and automated reporting across multiple platforms.',
        tags: ['Vue.js', 'Node.js', 'MySQL', 'D3.js', 'Express', 'REST API'],
        category: 'fullstack',
        featured: false,
        demoUrl: 'https://example.com/social-dashboard',
        githubUrl: 'https://github.com/chisom035/social-dashboard',
        status: 'completed',
        year: 2023,
        complexity: 'high'
    },
    {
        id: 6,
        title: 'Recipe Sharing Platform',
        description: 'Community-driven platform for sharing and discovering recipes with user ratings, reviews, meal planning features, and dietary restriction filtering.',
        tags: ['React', 'Express', 'MongoDB', 'JWT', 'Cloudinary', 'REST API'],
        category: 'fullstack',
        featured: false,
        demoUrl: 'https://example.com/recipe-platform',
        githubUrl: 'https://github.com/chisom035/recipe-platform',
        status: 'completed',
        year: 2023,
        complexity: 'medium'
    },
    {
        id: 7,
        title: 'Portfolio Website',
        description: 'Responsive personal portfolio website showcasing projects, skills, and experience with modern design, smooth animations, and optimized performance.',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'GitHub Pages'],
        category: 'web',
        featured: false,
        demoUrl: 'https://chisomwonodi.com',
        githubUrl: 'https://github.com/chisom035/portfolio',
        status: 'completed',
        year: 2024,
        complexity: 'low'
    },
    {
        id: 8,
        title: 'Expense Tracker',
        description: 'Personal finance management application for tracking expenses, setting budgets, and visualizing spending patterns with detailed reports and insights.',
        tags: ['React', 'Context API', 'Chart.js', 'Local Storage', 'CSS Modules'],
        category: 'web',
        featured: false,
        demoUrl: 'https://example.com/expense-tracker',
        githubUrl: 'https://github.com/chisom035/expense-tracker',
        status: 'completed',
        year: 2023,
        complexity: 'medium'
    }
];

// Enhanced project statistics using array reduce
export const projectStats = projectsData.reduce((stats, project) => {
    stats.totalProjects++;
    
    if (project.featured) stats.featuredProjects++;
    
    if (!stats.categories.includes(project.category)) {
        stats.categories.push(project.category);
    }
    
    stats.technologies = [...new Set([...stats.technologies, ...project.tags])];
    
    if (project.status === 'completed') stats.completedProjects++;
    if (project.status === 'in-progress') stats.inProgressProjects++;
    
    // Count by complexity
    stats.complexity[project.complexity] = (stats.complexity[project.complexity] || 0) + 1;
    
    // Count by year
    stats.years[project.year] = (stats.years[project.year] || 0) + 1;
    
    return stats;
}, { 
    totalProjects: 0, 
    featuredProjects: 0, 
    completedProjects: 0,
    inProgressProjects: 0,
    categories: [], 
    technologies: [],
    complexity: {},
    years: {}
});

// Skill statistics
export const skillStats = skillsData.reduce((stats, skill) => {
    stats.totalSkills++;
    
    if (!stats.categories.includes(skill.category)) {
        stats.categories.push(skill.category);
    }
    
    stats.levels[skill.level] = (stats.levels[skill.level] || 0) + 1;
    
    return stats;
}, {
    totalSkills: 0,
    categories: [],
    levels: {}
});

// Project analysis using array map and complex transformations
export const projectAnalysis = projectsData.map(project => {
    const analysis = {
        ...project,
        tagCount: project.tags.length,
        hasDemo: !!project.demoUrl,
        hasGithub: !!project.githubUrl,
        complexity: project.tags.length > 4 ? 'high' : project.tags.length > 2 ? 'medium' : 'low',
        frontendTech: project.tags.filter(tag => 
            ['React', 'Vue.js', 'JavaScript', 'HTML5', 'CSS3'].includes(tag)
        ),
        backendTech: project.tags.filter(tag => 
            ['Node.js', 'Express', 'MongoDB', 'MySQL', 'Firebase'].includes(tag)
        ),
        isFullStack: project.tags.some(tag => 
            ['Node.js', 'Express', 'MongoDB'].includes(tag)
        ) && project.tags.some(tag => 
            ['React', 'Vue.js', 'JavaScript'].includes(tag)
        )
    };
    
    // Calculate project score based on various factors
    analysis.score = (
        (analysis.tagCount * 2) +
        (analysis.hasDemo ? 10 : 0) +
        (analysis.hasGithub ? 5 : 0) +
        (analysis.isFullStack ? 15 : 0) +
        (project.featured ? 20 : 0)
    );
    
    return analysis;
});

// Enhanced analysis with array reduce for aggregated insights
export const technologyAnalysis = projectsData.reduce((analysis, project) => {
    project.tags.forEach(tech => {
        if (!analysis.techUsage[tech]) {
            analysis.techUsage[tech] = {
                count: 0,
                projects: [],
                categories: new Set(),
                complexity: []
            };
        }
        
        analysis.techUsage[tech].count++;
        analysis.techUsage[tech].projects.push(project.title);
        analysis.techUsage[tech].categories.add(project.category);
        analysis.techUsage[tech].complexity.push(project.complexity);
    });
    
    return analysis;
}, {
    techUsage: {},
    mostUsedTech: [],
    trendingTech: []
});

// Calculate most used technologies
export const mostUsedTechnologies = Object.entries(technologyAnalysis.techUsage)
    .map(([tech, data]) => ({
        technology: tech,
        count: data.count,
        projects: data.projects,
        categories: Array.from(data.categories),
        averageComplexity: data.complexity.length
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

// Export comprehensive data summary
export const portfolioData = {
    skills: {
        total: skillStats.totalSkills,
        byLevel: skillStats.levels,
        byCategory: skillStats.categories.reduce((acc, category) => {
            acc[category] = skillsData.filter(skill => skill.category === category).length;
            return acc;
        }, {})
    },
    projects: {
        total: projectStats.totalProjects,
        featured: projectStats.featuredProjects,
        byStatus: {
            completed: projectStats.completedProjects,
            inProgress: projectStats.inProgressProjects
        },
        byCategory: projectStats.categories.reduce((acc, category) => {
            acc[category] = projectsData.filter(project => project.category === category).length;
            return acc;
        }, {}),
        byComplexity: projectStats.complexity,
        byYear: projectStats.years
    },
    technologies: {
        total: projectStats.technologies.length,
        mostUsed: mostUsedTechnologies.slice(0, 5)
    }
};

console.log('📊 Portfolio Data Loaded:', portfolioData);