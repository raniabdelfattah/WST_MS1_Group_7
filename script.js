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
            document.body.style.overflow = 'hidden';
        });
        
        // When menu closes - restore body scroll
        navMenu.addEventListener('hide.bs.offcanvas', function () {
            document.body.style.overflow = '';
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
        
        // Also check for category filter from homepage
        const selectedCategory = sessionStorage.getItem('selectedCategory');
        if (selectedCategory) {
            sessionStorage.removeItem('selectedCategory');
            const matchingFilter = document.querySelector(`[data-filter="${selectedCategory}"]`);
            if (matchingFilter) {
                matchingFilter.click();
            }
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
    // FILTER FUNCTIONALITY - WITH RESULTS ABOVE RECOMMENDED
    // ==========================================================================
    
    const filterButtons = document.querySelectorAll('.filter-item');
    let activeFilters = new Set();
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.dataset.filter.toLowerCase();
            
            // Toggle active state
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                activeFilters.add(filterValue);
            } else {
                activeFilters.delete(filterValue);
            }
            
            // Apply filters
            applyFilters();
        });
    });
    
    function applyFilters() {
        const recipeCards = document.querySelectorAll('.featured-recipes .recipe-card');
        let visibleCount = 0;
        const filteredRecipes = [];
        
        if (activeFilters.size === 0) {
            // Remove filter results section
            const filterSection = document.querySelector('.filter-results-section');
            if (filterSection) filterSection.remove();
        } else {
            recipeCards.forEach(card => {
                // Get all tags from the card
                const tags = Array.from(card.querySelectorAll('.recipe-tags__item'))
                    .map(tag => tag.textContent.toLowerCase().replace(/\s+/g, '-'));
                
                // Get difficulty from overlay
                const difficultyElement = card.querySelector('.recipe-meta__difficulty');
                if (difficultyElement) {
                    const difficultyText = difficultyElement.textContent.toLowerCase().trim();
                    tags.push(difficultyText);
                }
                
                // Check if card matches any active filter
                const matches = Array.from(activeFilters).some(filter => {
                    return tags.some(tag => {
                        // Handle multi-word filters (e.g., "main-dish", "side-dish")
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
            
            // Show filter results
            showFilterResults(visibleCount, filteredRecipes);
        }
        
        // Announce to screen readers
        announceToScreenReader(`Showing ${visibleCount} recipes`);
    }
    
    function showFilterResults(count, recipes) {
        // Remove existing filter results section
        const existingSection = document.querySelector('.filter-results-section');
        if (existingSection) existingSection.remove();
        
        // Create filter results section
        const resultsSection = document.createElement('section');
        resultsSection.className = 'filter-results-section';
        
        // Get active filter names
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
        
        // Insert before the recommended recipes section
        const featuredSection = document.querySelector('.featured-recipes');
        if (featuredSection) {
            featuredSection.parentNode.insertBefore(resultsSection, featuredSection);
            
            // Add filtered recipe cards to the results grid
            if (count > 0) {
                const resultsGrid = resultsSection.querySelector('.filter-results-grid');
                recipes.forEach(card => {
                    resultsGrid.appendChild(card);
                });
            }
            
            // Scroll to filter results
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Clear all filters function (global)
    window.clearAllFilters = function() {
        document.querySelectorAll('.filter-item.active').forEach(btn => btn.classList.remove('active'));
        activeFilters.clear();
        
        // Remove filter results section
        const filterSection = document.querySelector('.filter-results-section');
        if (filterSection) filterSection.remove();
    };
    
    // ==========================================================================
    // CATEGORY CARD INTERACTIONS (Homepage)
    // ==========================================================================
    
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-card__name').textContent;
            sessionStorage.setItem('selectedCategory', categoryName.toLowerCase());
            window.location.href = 'recipes.html';
        });
        
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
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
    // RECIPE DETAIL PAGE - INGREDIENT CHECKLIST
    // ==========================================================================
    
    const ingredients = document.querySelectorAll('.ingredient');
    ingredients.forEach((ingredient, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'ingredient-checkbox';
        checkbox.id = `ingredient-${index}`;
        
        const label = document.createElement('label');
        label.htmlFor = `ingredient-${index}`;
        label.className = 'ingredient-label';
        
        const contentWrapper = document.createElement('span');
        contentWrapper.className = 'ingredient-content';
        contentWrapper.innerHTML = ingredient.innerHTML;
        ingredient.innerHTML = '';
        
        label.appendChild(checkbox);
        label.appendChild(contentWrapper);
        ingredient.appendChild(label);
        
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                contentWrapper.classList.add('checked');
            } else {
                contentWrapper.classList.remove('checked');
            }
        });
    });
    
    // ==========================================================================
    // PRINT RECIPE FUNCTIONALITY
    // ==========================================================================
    
    if (document.querySelector('.recipe-detail')) {
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

