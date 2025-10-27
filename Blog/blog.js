// Function to create and display articles
function displayArticles(articlesToDisplay = articles) {
    // Get reference to the articles container
    const articlesContainer = document.getElementById('articles-container');
    
    // Clear any existing content
    articlesContainer.innerHTML = '';
    
    // Show message if no articles match filters
    if (articlesToDisplay.length === 0) {
        articlesContainer.innerHTML = `
            <div class="no-results">
                <p>📚 No books match your current filters.</p>
                <p>Try adjusting your criteria or resetting the filters.</p>
            </div>
        `;
        return;
    }
    
    // Loop through each article in the array
    articlesToDisplay.forEach(article => {
        // Create a new article element
        const articleElement = document.createElement('article');
        articleElement.className = 'post';
        articleElement.setAttribute('role', 'article');
        articleElement.setAttribute('aria-labelledby', `article-${article.id}-title`);
        
        // Create the HTML template using the article data
        const articleHTML = `
            <div class="post-grid">
                <div class="post-meta">
                    <time datetime="${getISODate(article.date)}">${article.date}</time>
                    <span class="age-range">${article.ages}</span>
                    <span class="genre">${article.genre}</span>
                    <span class="rating" aria-label="${getStarRatingText(article.stars)}">${article.stars}</span>
                </div>
                
                <div class="post-content">
                    <h3 id="article-${article.id}-title">${article.title}</h3>
                    ${article.authorDetails}
                    <img src="${article.imgSrc}" alt="${article.imgAlt}">
                    <p>${article.description} <a href="#" aria-label="Read more about ${article.title}">Read More...</a></p>
                </div>
            </div>
        `;
        
        // Set the innerHTML of the article element
        articleElement.innerHTML = articleHTML;
        
        // Append the new article to the container
        articlesContainer.appendChild(articleElement);
    });
}

// Helper function to convert date to ISO format for datetime attribute
function getISODate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}

// Helper function to create accessible star rating text
function getStarRatingText(stars) {
    const starCount = (stars.match(/\*/g) || []).length;
    return `Rating: ${starCount} out of 5 stars`;
}

// Filter functions
function setupFilters() {
    const ageFilter = document.getElementById('age-filter');
    const genreFilter = document.getElementById('genre-filter');
    const ratingFilter = document.getElementById('rating-filter');
    const resetButton = document.getElementById('reset-filters');
    
    // Add event listeners to all filters
    [ageFilter, genreFilter, ratingFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });
    
    // Add reset button functionality
    if (resetButton) {
        resetButton.addEventListener('click', resetFilters);
    }
}

function applyFilters() {
    const selectedAge = document.getElementById('age-filter').value;
    const selectedGenre = document.getElementById('genre-filter').value;
    const selectedRating = document.getElementById('rating-filter').value;
    
    let filteredArticles = articles;
    
    // Apply age filter
    if (selectedAge !== 'all') {
        filteredArticles = filteredArticles.filter(article => article.ages === selectedAge);
    }
    
    // Apply genre filter
    if (selectedGenre !== 'all') {
        filteredArticles = filteredArticles.filter(article => article.genre === selectedGenre);
    }
    
    // Apply rating filter
    if (selectedRating !== 'all') {
        filteredArticles = filteredArticles.filter(article => {
            const starCount = (article.stars.match(/\*/g) || []).length;
            return starCount.toString() === selectedRating;
        });
    }
    
    // Display filtered articles
    displayArticles(filteredArticles);
}

function resetFilters() {
    document.getElementById('age-filter').value = 'all';
    document.getElementById('genre-filter').value = 'all';
    document.getElementById('rating-filter').value = 'all';
    displayArticles();
}

// Initialize everything when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    displayArticles();
    setupFilters();
});