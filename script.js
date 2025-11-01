// ==========================================================================
// RECIPES 4 KEEPS - MAIN JAVASCRIPT FILE 
// ==========================================================================

(function() {
    'use strict';
   
    // Cache DOM elements (search once, use many times)
    let DOM = {};
   
    // Recipe data storage
    let recipesData = [];
    let recipesLoaded = false;
    let activeFilters = new Set();
   
    // ==========================================================================
    // INITIALIZE - Run when page loads
    // ==========================================================================
   
    document.addEventListener('DOMContentLoaded', function() {
        // Store all DOM elements we'll use
        cacheDOMElements();
       
        // Set up all event listeners
        initNavigation();
        initSearch();
        initFilters();
        initCategoryCards();
        initRecipeAnimations();
        initSocialSharing();
        initScrollToTop();
        initPrintButton();
        initNewsletter();
       
        // Load recipes for recipes.html page
        if (window.location.pathname.includes('recipes.html')) {
            loadAndRenderRecipes(); // Load and display recipes with Bootstrap grid
            loadRecipesForFiltering(); // Load for filtering functionality
            handleSearchRedirect();
            handleCategoryRedirect();
        }
        
        // Load featured recipes on index.html
        if (window.location.pathname.includes('index.html') || 
            window.location.pathname === '/' || 
            window.location.pathname.endsWith('/')) {
            loadFeaturedRecipes();
        }
    });
   
    // ==========================================================================
    // CACHE DOM ELEMENTS - Store references once with null safety
    // ==========================================================================
   
    function cacheDOMElements() {
        DOM = {
            navMenu: document.getElementById('nav-menu'),
            navLinks: document.querySelectorAll('.navbar__link'),
            searchForms: document.querySelectorAll('.search__form'),
            searchInputs: document.querySelectorAll('.search__input'),
            filterButtons: document.querySelectorAll('.filter-item'),
            categoryCards: document.querySelectorAll('.category-card'),
            recipeCards: document.querySelectorAll('.recipe-card'),
            featuredSection: document.querySelector('.featured-recipes'),
            newsletterOverlay: document.getElementById('newsletterOverlay'),
            newsletterForm: document.getElementById('newsletterForm'),
            closeNewsletterBtn: document.getElementById('closeNewsletter'),
            commentForm: document.getElementById('commentForm')
        };
    }
   
    // ==========================================================================
    // NAVIGATION - Bootstrap Offcanvas menu with null checks
    // ==========================================================================
   
    function initNavigation() {
        if (!DOM.navMenu) return;
       
        // Prevent body scroll when menu opens
        DOM.navMenu.addEventListener('show.bs.offcanvas', function() {
            document.body.classList.add('menu-open');
        });
       
        // Restore scroll when menu closes
        DOM.navMenu.addEventListener('hide.bs.offcanvas', function() {
            document.body.classList.remove('menu-open');
        });
       
        // Close menu when clicking nav links (use cached navLinks)
        if (DOM.navLinks && DOM.navLinks.length > 0) {
            DOM.navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    const offcanvasInstance = bootstrap.Offcanvas.getInstance(DOM.navMenu);
                    if (offcanvasInstance) {
                        offcanvasInstance.hide();
                    }
                });
            });
        }
    }
   
    // ==========================================================================
    // SEARCH - With redirect to recipes page and null checks
    // ==========================================================================
   
    function initSearch() {
        if (!DOM.searchForms || DOM.searchForms.length === 0) return;
        
        DOM.searchForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const searchInput = this.querySelector('.search__input');
                const searchTerm = searchInput?.value.trim().toLowerCase();
               
                if (searchTerm) {
                    // Save search term
                    sessionStorage.setItem('searchTerm', searchTerm);
                   
                    // Go to recipes page if not there
                    if (!window.location.pathname.includes('recipes.html')) {
                        window.location.href = 'recipes.html';
                    } else {
                        performSearch(searchTerm);
                    }
                   
                    // Close mobile menu if open
                    if (DOM.navMenu) {
                        const offcanvasInstance = bootstrap.Offcanvas.getInstance(DOM.navMenu);
                        if (offcanvasInstance) {
                            offcanvasInstance.hide();
                        }
                    }
                }
            });
        });
    }
   
    // Handle search when arriving from another page
    function handleSearchRedirect() {
        const searchTerm = sessionStorage.getItem('searchTerm');
        if (searchTerm && DOM.searchInputs) {
            DOM.searchInputs.forEach(input => input.value = searchTerm);
            performSearch(searchTerm);
            sessionStorage.removeItem('searchTerm');
        }
    }
   
    // Perform search using JSON data
    async function performSearch(term) {
        if (!recipesLoaded) {
            // If recipes aren't loaded yet, wait and try again
            setTimeout(() => performSearch(term), 100);
            return;
        }
       
        let foundCount = 0;
        const foundRecipes = [];
       
        const searchWords = term.toLowerCase().split(/\s+/).filter(word => word.length > 0);
       
        recipesData.forEach(recipe => {
            // Combine all searchable fields from JSON data
            const searchableText = `
                ${recipe.name.toLowerCase()}
                ${recipe.shortDescription.toLowerCase()}
                ${recipe.description.toLowerCase()}
                ${recipe.tags.join(' ').toLowerCase()}
                ${recipe.ingredients.map(section =>
                    section.items.map(item => item.name.toLowerCase()).join(' ')
                ).join(' ')}
            `;
           
            // Check if ALL search words match
            const matches = searchWords.every(word =>
                searchableText.includes(word) ||
                searchableText.split(/\s+/).filter(textWord => textWord.length > 2).some(textWord => textWord.includes(word))
            );
           
            if (matches) {
                foundCount++;
                foundRecipes.push(recipe);
            }
        });
       
        showSearchResults(term, foundCount, foundRecipes);
    }
   
    // ==========================================================================
    // HELPER FUNCTION: Create Results Section (DRY principle)
    // ==========================================================================
   
    function createResultsSection(type, title, count, recipes, extraMessage = '') {
        const section = document.createElement('section');
        section.className = `${type}-results-section`;
        section.style.background = '#f8f9fa';
        section.style.padding = '4rem 0';
        
        const hasRecipes = count > 0;
        const clearFunction = type === 'search' ? 'clearSearch' : 'clearAllFilters';
        
        section.innerHTML = `
            <div class="container">
                <div class="search-message ${type}-message">
                    <div class="search-message__content">
                        <strong>${title}:</strong> ${hasRecipes ? `Found ${count} recipe(s)${extraMessage}` : `Found 0 recipes${extraMessage}`}
                        ${!hasRecipes ? `<br><small>Try different keywords or <button class="clear-search-link" onclick="window.${clearFunction}()">clear ${type}</button>.</small>` : ''}
                    </div>
                    <button class="search-message__close" onclick="window.${clearFunction}()" aria-label="Clear ${type}">×</button>
                </div>
                ${hasRecipes ? `
                    <div class="recipe-grid row g-4 ${type}-results-grid">
                        ${recipes.map(recipe => createBootstrapRecipeCard(recipe)).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        
        return section;
    }
   
    // HELPER FUNCTION: Calculate total time from prep, cook, chill, and other time variables
    function calculateTotalTime(recipe) {
        // Helper function to convert time string to minutes
        function parseTimeToMinutes(timeStr) {
            if (!timeStr) return 0;
            
            const lowerStr = timeStr.toLowerCase();
            
            // Extract all numbers from the string (handles ranges like "24-28 hours")
            const numbers = timeStr.match(/\d+(\.\d+)?/g);
            if (!numbers || numbers.length === 0) return 0;
            
            // Get the maximum number (for ranges like "24-28", take 28)
            const maxNumber = Math.max(...numbers.map(n => parseFloat(n)));
            
            // Check if time is in hours
            if (lowerStr.includes('hour') || lowerStr.includes('hr')) {
                return maxNumber * 60; // Convert hours to minutes
            }
            
            // Otherwise assume it's in minutes
            return maxNumber;
        }
        
        // Collect all time variables from the recipe object
        let totalMinutes = 0;
        
        // Add prep time
        if (recipe.prepTime) {
            totalMinutes += parseTimeToMinutes(recipe.prepTime);
        }
        
        // Add cook time
        if (recipe.cookTime) {
            totalMinutes += parseTimeToMinutes(recipe.cookTime);
        }
        
        // Add chill time
        if (recipe.chillTime) {
            totalMinutes += parseTimeToMinutes(recipe.chillTime);
        }
        
        // Add rest time
        if (recipe.restTime) {
            totalMinutes += parseTimeToMinutes(recipe.restTime);
        }
        
        // Add marinating time
        if (recipe.marinatingTime) {
            totalMinutes += parseTimeToMinutes(recipe.marinatingTime);
        }
        
        // Add any other time variables
        if (recipe.proofingTime) {
            totalMinutes += parseTimeToMinutes(recipe.proofingTime);
        }
        
        if (recipe.soakingTime) {
            totalMinutes += parseTimeToMinutes(recipe.soakingTime);
        }
        
        // Format based on total minutes
        if (totalMinutes >= 60) {
            const hours = Math.floor(totalMinutes / 60);
            const mins = totalMinutes % 60;
            
            if (mins === 0) {
                return `${hours}h`;
            } else {
                return `${hours}h ${mins}m`;
            }
        }
        return `${totalMinutes}m`;
    }
    
    // HELPER FUNCTION: Create Bootstrap Recipe Card HTML
    function createBootstrapRecipeCard(recipe) {
        const totalTime = calculateTotalTime(recipe);
        
        return `
            <article class="col-12 col-sm-6 col-lg-3">
                <div class="recipe-card">
                    <div class="recipe-card__image">
                        <img src="${recipe.image}"
                            alt="${recipe.name}"
                            class="recipe-card__photo">
                        <div class="recipe-card__overlay">
                            <div class="recipe-meta">
                                <span class="recipe-meta__time">
                                    <i class="fas fa-clock" aria-hidden="true"></i>
                                    <span class="sr-only">Total time:</span>
                                    ${totalTime}
                                </span>
                                <span class="recipe-meta__difficulty recipe-meta__difficulty--${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span>
                            </div>
                        </div>
                    </div>
                    <div class="recipe-card__content">
                        <h3 class="recipe-card__title">${recipe.name}</h3>
                        <div class="recipe-tags">
                            ${recipe.tags.slice(0, 3).map(tag => `<span class="recipe-tags__item">${tag}</span>`).join('')}
                        </div>
                        <p class="recipe-card__description">${recipe.shortDescription}</p>
                        <a href="recipe-detail.html?id=${recipe.id}" class="recipe-card__link">View Recipe</a>
                    </div>
                </div>
            </article>
        `;
    }
    
    // Display search results using helper function
    function showSearchResults(term, count, recipes) {
        // Remove old results
        const existingSection = document.querySelector('.search-results-section');
        if (existingSection) existingSection.remove();
       
        const resultsSection = createResultsSection(
            'search',
            'Search Results',
            count,
            recipes,
            count > 0 ? ` for "${term}"` : ` for "${term}"`
        );
       
        // Insert before featured recipes
        if (DOM.featuredSection) {
            DOM.featuredSection.parentNode.insertBefore(resultsSection, DOM.featuredSection);
           
            // Re-initialize animations for new cards
            if (count > 0) {
                const newCards = resultsSection.querySelectorAll('.recipe-card');
                initRecipeAnimationsForCards(newCards);
            }
        }
       
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
   
    // Clear search (exposed globally for onclick)
    window.clearSearch = function() {
        document.querySelector('.search-results-section')?.remove();
        if (DOM.searchInputs) {
            DOM.searchInputs.forEach(input => input.value = '');
        }
        document.querySelectorAll('.filter-item.active').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        activeFilters.clear();
        document.querySelector('.filter-results-section')?.remove();
    };
   
    // ==========================================================================
    // FILTERS - Using JSON data with improved accessibility
    // ==========================================================================
   
    async function loadRecipesForFiltering() {
        try {
            const response = await fetch('recipes.json');
            if (!response.ok) throw new Error('Failed to load recipes');
            const data = await response.json();
            recipesData = data.recipes;
            recipesLoaded = true;
        } catch (error) {
            console.error('Error loading recipes:', error);
            
            // Show user-friendly error message
            if (DOM.featuredSection) {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'alert alert-danger text-center';
                errorMsg.style.margin = '2rem auto';
                errorMsg.style.maxWidth = '600px';
                errorMsg.innerHTML = `
                    <strong>Oops!</strong> Unable to load recipes. 
                    <br><small>Please refresh the page or try again later.</small>
                `;
                DOM.featuredSection.prepend(errorMsg);
            }
        }
    }
   
    function initFilters() {
        if (!DOM.filterButtons || DOM.filterButtons.length === 0) return;
        
        DOM.filterButtons.forEach(button => {
            // Make keyboard accessible with proper ARIA
            button.setAttribute('role', 'button');
            button.setAttribute('tabindex', '0');
            button.setAttribute('aria-pressed', 'false'); // For screen readers
           
            // Mouse click
            button.addEventListener('click', handleFilterClick);
           
            // Keyboard support
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
   
    function handleFilterClick() {
        const filterValue = this.dataset.filter.toLowerCase();
       
        // Toggle filter on/off
        this.classList.toggle('active');
        
        // Update ARIA state for accessibility
        const isActive = this.classList.contains('active');
        this.setAttribute('aria-pressed', isActive ? 'true' : 'false');
       
        if (isActive) {
            activeFilters.add(filterValue);
        } else {
            activeFilters.delete(filterValue);
        }
       
        applyFilters();
    }
   
    function applyFilters() {
        // Wait for recipes to load
        if (!recipesLoaded || recipesData.length === 0) {
            setTimeout(applyFilters, 500);
            return;
        }
       
        // If no filters, remove results
        if (activeFilters.size === 0) {
            document.querySelector('.filter-results-section')?.remove();
            return;
        }
       
        let visibleCount = 0;
        const filteredRecipes = [];
       
        // Use the JSON data instead of DOM elements
        recipesData.forEach(recipe => {
            // Normalize tags and include difficulty
            const tags = recipe.tags.map(tag => tag.toLowerCase().replace(/\s+/g, '-'));
            tags.push(recipe.difficulty.toLowerCase());
           
            // Check if any filter matches
            const matches = Array.from(activeFilters).some(filter => {
                return tags.some(tag => {
                    const normalizedTag = tag.replace(/\s+/g, '-');
                    const normalizedFilter = filter.replace(/\s+/g, '-');
                    return normalizedTag.includes(normalizedFilter) || normalizedFilter.includes(normalizedTag);
                });
            });
           
            if (matches) {
                visibleCount++;
                filteredRecipes.push(recipe);
            }
        });
       
        showFilterResults(visibleCount, filteredRecipes);
        announceToScreenReader(`Showing ${visibleCount} recipes`);
    }    
   
    // Display Filter Results using helper function
    function showFilterResults(count, recipes) {
        // Remove old results
        document.querySelector('.filter-results-section')?.remove();
       
        // Get active filter names
        const activeFilterNames = Array.from(activeFilters).map(filter => {
            const btn = document.querySelector(`[data-filter="${filter}"]`);
            return btn ? btn.textContent : filter;
        }).join(', ');
       
        const resultsSection = createResultsSection(
            'filter',
            'Filter Results',
            count,
            recipes,
            count > 0 ? ` for: ${activeFilterNames}` : `. Filters: ${activeFilterNames}`
        );
       
        // Insert and populate
        if (DOM.featuredSection) {
            DOM.featuredSection.parentNode.insertBefore(resultsSection, DOM.featuredSection);
           
            if (count > 0) {
                // Re-initialize animations for new cards
                const newCards = resultsSection.querySelectorAll('.recipe-card');
                initRecipeAnimationsForCards(newCards);
            }
           
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
   
    // Clear all filters (exposed globally)
    window.clearAllFilters = function() {
        if (DOM.filterButtons) {
            DOM.filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
        }
        activeFilters.clear();
        document.querySelector('.filter-results-section')?.remove();
    };

    // ==========================================================================
    // Load Featured Recipes on Index Page
    // ==========================================================================

    async function loadFeaturedRecipes() {
        const featuredSection = document.querySelector('.featured-recipes');
        if (!featuredSection) return;
        
        try {
            const response = await fetch('recipes.json');
            if (!response.ok) throw new Error('Failed to load recipes');
            const data = await response.json();
            
            // Featured recipe IDs
            const featuredRecipeIds = [
                'japchae-korean-glass-noodles',
                'ooey-gooey-brownies',
                'molokhia',
                'maja-blanca'
            ];
            
            // Get featured recipes in order
            const featuredRecipes = featuredRecipeIds
                .map(id => data.recipes.find(r => r.id === id))
                .filter(recipe => recipe !== undefined);
            
            // Clear existing recipe grid
            const existingGrid = featuredSection.querySelector('.recipe-grid');
            if (existingGrid) {
                existingGrid.remove();
            }
            
            // Create new Bootstrap grid
            const recipeGrid = document.createElement('div');
            recipeGrid.className = 'recipe-grid row g-4';
            
            // Add featured recipes as Bootstrap cards
            featuredRecipes.forEach(recipe => {
                recipeGrid.innerHTML += createBootstrapRecipeCard(recipe);
            });
            
            // Append to section
            const container = featuredSection.querySelector('.container');
            if (container) {
                container.appendChild(recipeGrid);
            }
            
            // Re-initialize animations for new cards
            const newCards = recipeGrid.querySelectorAll('.recipe-card');
            initRecipeAnimationsForCards(newCards);
            
        } catch (error) {
            console.error('Error loading featured recipes:', error);
            
            // Show error to user
            if (featuredSection) {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'alert alert-danger text-center';
                errorMsg.style.margin = '2rem auto';
                errorMsg.style.maxWidth = '600px';
                errorMsg.innerHTML = `
                    <strong>Error!</strong> Unable to load featured recipes. 
                    <br><small>Please check your internet connection and try again.</small>
                `;
                featuredSection.querySelector('.container')?.prepend(errorMsg);
            }
        }
    }

    // ==========================================================================
    // Load and Render Recipes on Recipes Page
    // ==========================================================================

    async function loadAndRenderRecipes() {
        // Only run on recipes.html page
        if (!window.location.pathname.includes('recipes.html')) return;
       
        const recommendedSection = document.querySelector('.featured-recipes');
        if (!recommendedSection) return;
       
        try {
            const response = await fetch('recipes.json');
            if (!response.ok) throw new Error('Failed to load recipes');
            const data = await response.json();
           
            // Clear existing recipe grids
            const existingGrids = recommendedSection.querySelectorAll('.recipe-grid');
            existingGrids.forEach(grid => grid.remove());
           
            // Create new Bootstrap grid
            const recipeGrid = document.createElement('div');
            recipeGrid.className = 'recipe-grid row g-4';
           
            // Add all recipes as Bootstrap cards
            data.recipes.forEach(recipe => {
                recipeGrid.innerHTML += createBootstrapRecipeCard(recipe);
            });
           
            // Append to section
            const container = recommendedSection.querySelector('.container');
            if (container) {
                container.appendChild(recipeGrid);
            }
           
            // Re-initialize animations for new cards
            const newCards = recipeGrid.querySelectorAll('.recipe-card');
            initRecipeAnimationsForCards(newCards);
           
        } catch (error) {
            console.error('Error loading recipes:', error);
            
            // Show error to user
            if (recommendedSection) {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'alert alert-danger text-center';
                errorMsg.style.margin = '2rem auto';
                errorMsg.style.maxWidth = '600px';
                errorMsg.innerHTML = `
                    <strong>Error!</strong> Unable to load recipes. 
                    <br><small>Please check your internet connection and try again.</small>
                `;
                recommendedSection.querySelector('.container')?.prepend(errorMsg);
            }
        }
    }

    // ==========================================================================
    // HELPER: Initialize animations for specific cards
    // ==========================================================================

    function initRecipeAnimationsForCards(cards) {
        if (!cards || cards.length === 0) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
       
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
       
        cards.forEach(card => observer.observe(card));
    }
    
    // ==========================================================================
    // CATEGORY CARDS - Homepage navigation with caching
    // ==========================================================================
   
    function initCategoryCards() {
        if (!DOM.categoryCards || DOM.categoryCards.length === 0) return;
        
        DOM.categoryCards.forEach(card => {
            // Make keyboard accessible
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            
            // Cache the category name to avoid repeated DOM queries
            const categoryNameElement = card.querySelector('.category-card__name');
            if (!categoryNameElement) return; // Skip if name not found
            
            const categoryName = categoryNameElement.textContent.trim().toLowerCase();
            const categoryFilter = categoryName.replace(/\s+/g, '-');
            
            // Store filter as data attribute for easier access
            card.dataset.categoryFilter = categoryFilter;
            
            const handleCategoryClick = function() {
                sessionStorage.setItem('selectedCategory', this.dataset.categoryFilter);
                window.location.href = 'recipes.html';
            };
           
            // Mouse click
            card.addEventListener('click', handleCategoryClick);
           
            // Keyboard support
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCategoryClick.call(this);
                }
            });
        });
    }
   
    // Handle category filter from homepage
    function handleCategoryRedirect() {
        const selectedCategory = sessionStorage.getItem('selectedCategory');
       
        if (selectedCategory) {
            setTimeout(() => {
                sessionStorage.removeItem('selectedCategory');
               
                const matchingFilter = document.querySelector(`[data-filter="${selectedCategory}"]`);
                if (matchingFilter) {
                    matchingFilter.click();
                   
                    setTimeout(() => {
                        document.querySelector('.filter-results-section')?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            }, 100);
        }
    }
   
    // ==========================================================================
    // RECIPE ANIMATIONS - Fade in on scroll
    // ==========================================================================
   
    function initRecipeAnimations() {
        if (!DOM.recipeCards || DOM.recipeCards.length === 0) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
       
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
       
        DOM.recipeCards.forEach(card => observer.observe(card));
    }
   
    // ==========================================================================
    // SOCIAL SHARING - Recipe detail page
    // ==========================================================================
   
    function initSocialSharing() {
        const shareButtons = document.querySelectorAll('.share-btn');
        if (!shareButtons || shareButtons.length === 0) return;
       
        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
               
                const recipeTitle = document.querySelector('.recipe-info__title')?.textContent || 'Recipe';
                const recipeUrl = window.location.href;
               
                if (this.classList.contains('share-btn--facebook')) {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`, '_blank', 'width=600,height=400');
                }
                else if (this.classList.contains('share-btn--x')) {
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(recipeTitle)}&url=${encodeURIComponent(recipeUrl)}`, '_blank', 'width=600,height=400');
                }
                else if (this.classList.contains('share-btn--pinterest')) {
                    const imageUrl = document.querySelector('.recipe-hero__image')?.src || '';
                    window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(recipeUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(recipeTitle)}`, '_blank', 'width=600,height=400');
                }
                else if (this.classList.contains('share-btn--email')) {
                    const subject = `Check out this recipe: ${recipeTitle}`;
                    const body = `I found this great recipe!\n\n${recipeUrl}`;
                    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                }
            });
        });
    }
   
    // ==========================================================================
    // SCROLL TO TOP BUTTON
    // ==========================================================================
   
    function initScrollToTop() {
        // Create button
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-to-top';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollTopBtn);
       
        // Show/hide on scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
       
        // Scroll to top on click
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
   
    // ==========================================================================
    // PRINT RECIPE BUTTON - Recipe detail page
    // ==========================================================================
   
    function initPrintButton() {
        if (!document.querySelector('.recipe-detail')) return;
        if (document.querySelector('.print-btn')) return; // Already exists
       
        const printBtn = document.createElement('button');
        printBtn.className = 'btn btn--secondary print-btn';
        printBtn.innerHTML = '<i class="fas fa-print"></i> Print Recipe';
       
        const recipeNav = document.querySelector('.recipe-navigation');
        if (recipeNav) {
            recipeNav.style.display = 'flex';
            recipeNav.style.justifyContent = 'space-between';
            recipeNav.style.alignItems = 'center';
            recipeNav.appendChild(printBtn);
           
            printBtn.addEventListener('click', () => window.print());
        }
    }
   
    // ==========================================================================
    // NEWSLETTER POPUP - Homepage only with proper checks
    // ==========================================================================
   
    function initNewsletter() {
        // Early return if elements don't exist
        if (!DOM.newsletterOverlay || !DOM.newsletterForm) return;
       
        // Only show on homepage
        const isHomepage = window.location.pathname.includes('index.html') ||
                           window.location.pathname === '/' ||
                           window.location.pathname.endsWith('/');
       
        if (!isHomepage) return;
       
        // Check if already subscribed
        const hasSubscribed = localStorage.getItem('newsletterSubscribed');
       
        if (!hasSubscribed) {
            setTimeout(() => DOM.newsletterOverlay.classList.add('show'), 500);
        }
       
        // Close button - with null check
        if (DOM.closeNewsletterBtn) {
            DOM.closeNewsletterBtn.addEventListener('click', function() {
                DOM.newsletterOverlay.classList.remove('show');
            });
        }
       
        // Close when clicking outside
        DOM.newsletterOverlay.addEventListener('click', function(e) {
            if (e.target === DOM.newsletterOverlay) {
                DOM.newsletterOverlay.classList.remove('show');
            }
        });
       
        // Form submission
        DOM.newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
           
            if (!this.checkValidity()) {
                this.classList.add('was-validated');
                if (emailInput) emailInput.setAttribute('aria-invalid', 'true');
                return;
            }
           
            if (emailInput) emailInput.setAttribute('aria-invalid', 'false');
           
            const email = emailInput?.value || '';
           
            // Show success message
            this.style.display = 'none';
            const successMsg = document.getElementById('newsletterSuccess');
            if (successMsg) successMsg.classList.add('show');
           
            // Save subscription
            localStorage.setItem('newsletterSubscribed', 'true');
            localStorage.setItem('subscriberEmail', email);
           
            // Close popup
            setTimeout(() => DOM.newsletterOverlay.classList.remove('show'), 3000);
        });
    }
   
    // ==========================================================================
    // ACCESSIBILITY HELPER
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
   
})();