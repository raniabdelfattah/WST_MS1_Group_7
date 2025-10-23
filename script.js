// ==========================================================================
// RECIPES 4 KEEPS - MAIN JAVASCRIPT FILE
// Handles functionality for all HTML pages
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // NAVIGATION FUNCTIONALITY - Bootstrap Offcanvas Integration
    // ==========================================================================
    
    const navMenu = document.getElementById('nav-menu');
    
    if (navMenu) {
        // When menu opens - prevent body scroll
        navMenu.addEventListener('show.bs.offcanvas', function () {
            document.body.classList.add('menu-open');
        });
        
        // When menu closes - restore body scroll
        navMenu.addEventListener('hide.bs.offcanvas', function () {
            document.body.classList.remove('menu-open');
        });
        
        // Close menu when nav link is clicked
        const navLinks = document.querySelectorAll('.navbar__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                const offcanvasInstance = bootstrap.Offcanvas.getInstance(navMenu);
                if (offcanvasInstance) {
                    offcanvasInstance.hide();
                }
            });
        });
    }
    
    // ==========================================================================
    // SEARCH FUNCTIONALITY - WITH REDIRECT TO RECIPES PAGE
    // ==========================================================================
    
    const searchForms = document.querySelectorAll('.search__form');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('.search__input');
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm) {
                // Store search term in sessionStorage
                sessionStorage.setItem('searchTerm', searchTerm);
                
                // If not on recipes page, redirect to it
                if (!window.location.pathname.includes('recipes.html')) {
                    window.location.href = 'recipes.html';
                } else {
                    // Already on recipes page, perform search
                    performSearch(searchTerm);
                }
                
                // Close offcanvas menu if open
                const offcanvasInstance = bootstrap.Offcanvas.getInstance(navMenu);
                if (offcanvasInstance) {
                    offcanvasInstance.hide();
                }
            }
        });
    });
    
    // Check if there's a search term when recipes page loads
    if (window.location.pathname.includes('recipes.html')) {
        const searchTerm = sessionStorage.getItem('searchTerm');
        if (searchTerm) {
            // Populate search inputs with the term
            document.querySelectorAll('.search__input').forEach(input => {
                input.value = searchTerm;
            });
            // Perform the search
            performSearch(searchTerm);
            // Clear the stored search term
            sessionStorage.removeItem('searchTerm');
        }
        
    }
    
    function performSearch(term) {
        const recipeCards = document.querySelectorAll('.recipe-card');
        let foundCount = 0;
        const foundRecipes = [];
        
        recipeCards.forEach(card => {
            const title = card.querySelector('.recipe-card__title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.recipe-card__description')?.textContent.toLowerCase() || '';
            const tags = Array.from(card.querySelectorAll('.recipe-tags__item'))
                .map(tag => tag.textContent.toLowerCase())
                .join(' ');
            
            // Search in title, description, and tags
            if (title.includes(term) || description.includes(term) || tags.includes(term)) {
                foundCount++;
                foundRecipes.push(card.cloneNode(true));
            }
        });
        
        // Show search results message and cards
        showSearchResults(term, foundCount, foundRecipes);
    }
    
    function showSearchResults(term, count, recipes) {
        // Remove existing search results section
        const existingSection = document.querySelector('.search-results-section');
        if (existingSection) existingSection.remove();
        
        // Create search results section
        const resultsSection = document.createElement('section');
        resultsSection.className = 'search-results-section';
        resultsSection.innerHTML = `
            <div class="container">
                <div class="search-message">
                    <div class="search-message__content">
                        <strong>Search Results:</strong> Found ${count} recipe(s) for "${term}"
                        ${count === 0 ? '<br><small>Try searching for different keywords or <button class="clear-search-link" onclick="clearSearch()">clear the search</button>.</small>' : ''}
                    </div>
                    <button class="search-message__close" onclick="clearSearch()" aria-label="Clear search">
                        ×
                    </button>
                </div>
                ${count > 0 ? '<div class="recipe-grid search-results-grid"></div>' : ''}
            </div>
        `;
        
        // Insert before the recommended recipes section
        const featuredSection = document.querySelector('.featured-recipes');
        if (featuredSection) {
            featuredSection.parentNode.insertBefore(resultsSection, featuredSection);
            
            // Add found recipe cards to the search results grid
            if (count > 0) {
                const resultsGrid = resultsSection.querySelector('.search-results-grid');
                recipes.forEach(card => {
                    resultsGrid.appendChild(card);
                });
            }
            
            // Scroll to search results
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Clear search function (global)
    window.clearSearch = function() {
        // Remove search results section
        const existingSection = document.querySelector('.search-results-section');
        if (existingSection) existingSection.remove();
        
        // Clear search inputs
        document.querySelectorAll('.search__input').forEach(input => input.value = '');
        
        // Clear any active filters
        document.querySelectorAll('.filter-item.active').forEach(btn => btn.classList.remove('active'));
        activeFilters.clear();
        
        // Remove filter results section
        const filterSection = document.querySelector('.filter-results-section');
        if (filterSection) filterSection.remove();
    };
    
// ==========================================================================
// FILTER FUNCTIONALITY - USING JSON DATA
// ==========================================================================

let recipesData = [];
let recipesLoaded = false;

// Load recipes data on page load
async function loadRecipesForFiltering() {
    try {
        const response = await fetch('recipes.json');
        if (!response.ok) throw new Error('Failed to load recipes');
        const data = await response.json();
        recipesData = data.recipes;
        recipesLoaded = true;
        console.log('✓ Recipes loaded for filtering:', recipesData.length);
    } catch (error) {
        console.error('Error loading recipes:', error);
    }
}

// Only load if on recipes page
if (document.querySelector('.filters')) {
    loadRecipesForFiltering();
}

const filterButtons = document.querySelectorAll('.filter-item');
let activeFilters = new Set();

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        console.log('Button clicked:', this.dataset.filter);
        
        const filterValue = this.dataset.filter.toLowerCase();
        
        // Toggle active state
        this.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            activeFilters.add(filterValue);
        } else {
            activeFilters.delete(filterValue);
        }
        
        console.log('Active filters:', Array.from(activeFilters));
        
        // Apply filters
        applyFilters();
    });
});

function applyFilters() {
    console.log('applyFilters called');
    
    if (!recipesLoaded || recipesData.length === 0) {
        console.warn('Recipes not loaded yet, retrying in 500ms...');
        setTimeout(applyFilters, 500);
        return;
    }
    
    const recipeCards = document.querySelectorAll('.featured-recipes .recipe-card');
    let visibleCount = 0;
    const filteredRecipes = [];
    
    if (activeFilters.size === 0) {
        const filterSection = document.querySelector('.filter-results-section');
        if (filterSection) filterSection.remove();
        return;
    }
    
    recipeCards.forEach(card => {
        const titleElement = card.querySelector('.recipe-card__title');
        const recipeTitle = titleElement ? titleElement.textContent.trim() : '';
        
        const recipeData = recipesData.find(r => r.name === recipeTitle);
        
        if (!recipeData) {
            console.warn(`Recipe not found: ${recipeTitle}`);
            return;
        }
        
        const tags = recipeData.tags.map(tag => 
            tag.toLowerCase().replace(/\s+/g, '-')
        );
        tags.push(recipeData.difficulty.toLowerCase());
        
        const matches = Array.from(activeFilters).some(filter => {
            return tags.some(tag => {
                const normalizedTag = tag.replace(/\s+/g, '-');
                const normalizedFilter = filter.replace(/\s+/g, '-');
                return normalizedTag.includes(normalizedFilter) || normalizedFilter.includes(normalizedTag);
            });
        });
        
        if (matches) {
            visibleCount++;
            filteredRecipes.push(card.cloneNode(true));
        }
    });
    
    console.log('Matches found:', visibleCount);
    showFilterResults(visibleCount, filteredRecipes);
    announceToScreenReader(`Showing ${visibleCount} recipes`);
}

function showFilterResults(count, recipes) {
    const existingSection = document.querySelector('.filter-results-section');
    if (existingSection) existingSection.remove();
    
    const resultsSection = document.createElement('section');
    resultsSection.className = 'filter-results-section';
    
    const activeFilterNames = Array.from(activeFilters).map(filter => {
        const btn = document.querySelector(`[data-filter="${filter}"]`);
        return btn ? btn.textContent : filter;
    }).join(', ');
    
    resultsSection.innerHTML = `
        <div class="container">
            <div class="search-message filter-message">
                <div class="search-message__content">
                    <strong>Filter Results:</strong> Showing ${count} recipe(s) for: ${activeFilterNames}
                    ${count === 0 ? '<br><small>No recipes match the selected filters. Try different combinations or <button class="clear-search-link" onclick="clearAllFilters()">clear filters</button>.</small>' : ''}
                </div>
                <button class="search-message__close" onclick="clearAllFilters()" aria-label="Clear filters">
                    ×
                </button>
            </div>
            ${count > 0 ? '<div class="recipe-grid filter-results-grid"></div>' : ''}
        </div>
    `;
    
    const featuredSection = document.querySelector('.featured-recipes');
    if (featuredSection) {
        featuredSection.parentNode.insertBefore(resultsSection, featuredSection);
        
        if (count > 0) {
            const resultsGrid = resultsSection.querySelector('.filter-results-grid');
            recipes.forEach(card => {
                resultsGrid.appendChild(card);
            });
        }
        
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

window.clearAllFilters = function() {
    document.querySelectorAll('.filter-item.active').forEach(btn => btn.classList.remove('active'));
    activeFilters.clear();
    
    const filterSection = document.querySelector('.filter-results-section');
    if (filterSection) filterSection.remove();
};

function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}
    
// ==========================================================================
// CATEGORY CARD INTERACTIONS (Homepage)
// ==========================================================================

const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', function() {
        const categoryName = this.querySelector('.category-card__name').textContent.trim().toLowerCase();
        const categoryFilter = categoryName.replace(/\s+/g, '-');
        
        // Store the category filter (with hyphens)
        sessionStorage.setItem('selectedCategory', categoryFilter);
        
        // Redirect to recipes page
        window.location.href = 'recipes.html';
    });
    
    // Keyboard accessibility
    card.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});


// ==========================================================================
// AUTO-APPLY CATEGORY FILTER ON RECIPES PAGE
// ==========================================================================

    if (window.location.pathname.includes('recipes.html')) {
        // Check for category filter from homepage
        const selectedCategory = sessionStorage.getItem('selectedCategory');
        
        if (selectedCategory) {
            // Small delay to ensure page loads first
            setTimeout(() => {
                // Clear the stored category
                sessionStorage.removeItem('selectedCategory');
                
                // Find and click the matching filter button
                const matchingFilter = document.querySelector(`[data-filter="${selectedCategory}"]`);
                
                if (matchingFilter) {
                    matchingFilter.click();
                    
                    // Scroll to filter results
                    setTimeout(() => {
                        const resultsSection = document.querySelector('.filter-results-section');
                        if (resultsSection) {
                            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 300);
                }
            }, 100);
        }
    }
    
    // ==========================================================================
    // RECIPE CARD ANIMATIONS 
    // ==========================================================================
    
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add fade-in class that will be handled by CSS.
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    recipeCards.forEach(card => {
        observer.observe(card);
    });
    
    // ==========================================================================
    // SOCIAL SHARING FUNCTIONALITY
    // ==========================================================================
    
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const recipeTitle = document.querySelector('.recipe-info__title')?.textContent || 'Recipe';
            const recipeUrl = window.location.href;
            
            if (this.classList.contains('share-btn--facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`, '_blank', 'width=600,height=400');
            } else if (this.classList.contains('share-btn--x')) {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(recipeTitle)}&url=${encodeURIComponent(recipeUrl)}`, '_blank', 'width=600,height=400');
            } else if (this.classList.contains('share-btn--pinterest')) {
                const imageUrl = document.querySelector('.recipe-hero__image')?.src || '';
                window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(recipeUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(recipeTitle)}`, '_blank', 'width=600,height=400');
            } else if (this.classList.contains('share-btn--email')) {
                const subject = `Check out this recipe: ${recipeTitle}`;
                const body = `I found this great recipe and thought you might like it!\n\n${recipeUrl}`;
                window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            }
        });
    });
    
    // ==========================================================================
    // SMOOTH SCROLL TO TOP BUTTON
    // ==========================================================================
    
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    // ==========================================================================
    // PRINT RECIPE FUNCTIONALITY
    // ==========================================================================
    
    if (document.querySelector('.recipe-detail')) {
    // Check if a print button already exists
    if (!document.querySelector('.print-btn')) {
        const printBtn = document.createElement('button');
        printBtn.className = 'btn btn--secondary print-btn';
        printBtn.innerHTML = '<i class="fas fa-print"></i> Print Recipe';
        
        const recipeNav = document.querySelector('.recipe-navigation');
        if (recipeNav) {
            recipeNav.style.display = 'flex';
            recipeNav.style.justifyContent = 'space-between';
            recipeNav.style.alignItems = 'center';
            recipeNav.appendChild(printBtn);
        }
        
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
}

    
    // ==========================================================================
    // ACCESSIBILITY ENHANCEMENTS
    // ==========================================================================
    
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }
    
});


    // ==========================================================================
    // NEWSLETTER POPUP FUNCTIONALITY - HOMEPAGE ONLY
    // ==========================================================================
    
    const newsletterOverlay = document.getElementById('newsletterOverlay');
    const closeNewsletterBtn = document.getElementById('closeNewsletter');
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterSuccess = document.getElementById('newsletterSuccess');
    
    // Only run on homepage (index.html)
    const isHomepage = window.location.pathname.includes('index.html') || 
                       window.location.pathname === '/' || 
                       window.location.pathname.endsWith('/');
    
    if (newsletterOverlay && isHomepage) {
        // Check if user has already subscribed
        const hasSubscribed = localStorage.getItem('newsletterSubscribed');
        
        // Show popup immediately on homepage if user hasn't subscribed
        if (!hasSubscribed) {
            // Small delay to ensure page is fully loaded
            setTimeout(() => {
                newsletterOverlay.classList.add('show');
            }, 500);
        }
        
        // Close popup when clicking the X button
        if (closeNewsletterBtn) {
            closeNewsletterBtn.addEventListener('click', function() {
                newsletterOverlay.classList.remove('show');
            });
        }
        
        // Close popup when clicking outside
        newsletterOverlay.addEventListener('click', function(e) {
            if (e.target === newsletterOverlay) {
                newsletterOverlay.classList.remove('show');
            }
        });
        
        // Handle form submission
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = this.querySelector('.newsletter-input');
                const email = emailInput.value;
                
                // Hide form and show success message
                newsletterForm.style.display = 'none';
                newsletterSuccess.classList.add('show');
                
                // Store subscription status permanently
                localStorage.setItem('newsletterSubscribed', 'true');
                localStorage.setItem('subscriberEmail', email);
                
                // Close popup after 3 seconds
                setTimeout(() => {
                    newsletterOverlay.classList.remove('show');
                }, 3000);
            });
        }
    }