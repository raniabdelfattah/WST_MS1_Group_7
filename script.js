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
        initCommentForm();
        
        // Load recipes if on recipes page
        if (document.querySelector('.filters')) {
            loadRecipesForFiltering();
        }
        
        // Check for search term from other pages
        if (window.location.pathname.includes('recipes.html')) {
            handleSearchRedirect();
        }
        
        // Check for category filter from homepage
        if (window.location.pathname.includes('recipes.html')) {
            handleCategoryRedirect();
        }
    });
    
    // ==========================================================================
    // CACHE DOM ELEMENTS - Store references once
    // ==========================================================================
    
    function cacheDOMElements() {
        DOM = {
            navMenu: document.getElementById('nav-menu'),
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
    // NAVIGATION - Bootstrap Offcanvas menu
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
        
        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.navbar__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                const offcanvasInstance = bootstrap.Offcanvas.getInstance(DOM.navMenu);
                if (offcanvasInstance) {
                    offcanvasInstance.hide();
                }
            });
        });
    }
    
    // ==========================================================================
    // SEARCH - With redirect to recipes page
    // ==========================================================================
    
    function initSearch() {
        DOM.searchForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const searchInput = this.querySelector('.search__input');
                const searchTerm = searchInput.value.trim().toLowerCase();
                
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
                    const offcanvasInstance = bootstrap.Offcanvas.getInstance(DOM.navMenu);
                    if (offcanvasInstance) {
                        offcanvasInstance.hide();
                    }
                }
            });
        });
    }
    
    // Handle search when arriving from another page
    function handleSearchRedirect() {
        const searchTerm = sessionStorage.getItem('searchTerm');
        if (searchTerm) {
            DOM.searchInputs.forEach(input => input.value = searchTerm);
            performSearch(searchTerm);
            sessionStorage.removeItem('searchTerm');
        }
    }
    
    // Perform the actual search
    function performSearch(term) {
        let foundCount = 0;
        const foundRecipes = [];
        
        DOM.recipeCards.forEach(card => {
            const title = card.querySelector('.recipe-card__title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.recipe-card__description')?.textContent.toLowerCase() || '';
            const tags = Array.from(card.querySelectorAll('.recipe-tags__item'))
                .map(tag => tag.textContent.toLowerCase())
                .join(' ');
            
            // Check if search term matches
            if (title.includes(term) || description.includes(term) || tags.includes(term)) {
                foundCount++;
                foundRecipes.push(card.cloneNode(true));
            }
        });
        
        showSearchResults(term, foundCount, foundRecipes);
    }
    
    // Display search results
    function showSearchResults(term, count, recipes) {
        // Remove old results
        const existingSection = document.querySelector('.search-results-section');
        if (existingSection) existingSection.remove();
        
        // Create new results section
        const resultsSection = document.createElement('section');
        resultsSection.className = 'search-results-section';
        resultsSection.innerHTML = `
            <div class="container">
                <div class="search-message">
                    <div class="search-message__content">
                        <strong>Search Results:</strong> Found ${count} recipe(s) for "${term}"
                        ${count === 0 ? '<br><small>Try different keywords or <button class="clear-search-link" onclick="window.clearSearch()">clear search</button>.</small>' : ''}
                    </div>
                    <button class="search-message__close" onclick="window.clearSearch()" aria-label="Clear search">×</button>
                </div>
                ${count > 0 ? '<div class="recipe-grid search-results-grid"></div>' : ''}
            </div>
        `;
        
        // Insert before featured recipes
        if (DOM.featuredSection) {
            DOM.featuredSection.parentNode.insertBefore(resultsSection, DOM.featuredSection);
            
            // Add recipe cards
            if (count > 0) {
                const resultsGrid = resultsSection.querySelector('.search-results-grid');
                recipes.forEach(card => resultsGrid.appendChild(card));
            }
            
            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Clear search (exposed globally for onclick)
    window.clearSearch = function() {
        document.querySelector('.search-results-section')?.remove();
        DOM.searchInputs.forEach(input => input.value = '');
        document.querySelectorAll('.filter-item.active').forEach(btn => btn.classList.remove('active'));
        activeFilters.clear();
        document.querySelector('.filter-results-section')?.remove();
    };
    
    // ==========================================================================
    // FILTERS - Using JSON data
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
        }
    }
    
    function initFilters() {
        DOM.filterButtons.forEach(button => {
            // Make keyboard accessible
            button.setAttribute('role', 'button');
            button.setAttribute('tabindex', '0');
            
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
        
        if (this.classList.contains('active')) {
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
        
        DOM.recipeCards.forEach(card => {
            const recipeTitle = card.querySelector('.recipe-card__title')?.textContent.trim();
            const recipeData = recipesData.find(r => r.name === recipeTitle);
            
            if (!recipeData) return;
            
            // Normalize tags
            const tags = recipeData.tags.map(tag => tag.toLowerCase().replace(/\s+/g, '-'));
            tags.push(recipeData.difficulty.toLowerCase());
            
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
                filteredRecipes.push(card.cloneNode(true));
            }
        });
        
        showFilterResults(visibleCount, filteredRecipes);
        announceToScreenReader(`Showing ${visibleCount} recipes`);
    }
    
    function showFilterResults(count, recipes) {
        // Remove old results
        document.querySelector('.filter-results-section')?.remove();
        
        // Get active filter names
        const activeFilterNames = Array.from(activeFilters).map(filter => {
            const btn = document.querySelector(`[data-filter="${filter}"]`);
            return btn ? btn.textContent : filter;
        }).join(', ');
        
        // Create results section
        const resultsSection = document.createElement('section');
        resultsSection.className = 'filter-results-section';
        resultsSection.innerHTML = `
            <div class="container">
                <div class="search-message filter-message">
                    <div class="search-message__content">
                        <strong>Filter Results:</strong> Showing ${count} recipe(s) for: ${activeFilterNames}
                        ${count === 0 ? '<br><small>No matches. Try different filters or <button class="clear-search-link" onclick="window.clearAllFilters()">clear filters</button>.</small>' : ''}
                    </div>
                    <button class="search-message__close" onclick="window.clearAllFilters()" aria-label="Clear filters">×</button>
                </div>
                ${count > 0 ? '<div class="recipe-grid filter-results-grid"></div>' : ''}
            </div>
        `;
        
        // Insert and populate
        if (DOM.featuredSection) {
            DOM.featuredSection.parentNode.insertBefore(resultsSection, DOM.featuredSection);
            
            if (count > 0) {
                const resultsGrid = resultsSection.querySelector('.filter-results-grid');
                recipes.forEach(card => resultsGrid.appendChild(card));
            }
            
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Clear all filters (exposed globally)
    window.clearAllFilters = function() {
        document.querySelectorAll('.filter-item.active').forEach(btn => btn.classList.remove('active'));
        activeFilters.clear();
        document.querySelector('.filter-results-section')?.remove();
    };
    
    // ==========================================================================
    // CATEGORY CARDS - Homepage navigation
    // ==========================================================================
    
    function initCategoryCards() {
        DOM.categoryCards.forEach(card => {
            // Make keyboard accessible
            card.setAttribute('tabindex', '0');
            
            // Mouse click
            card.addEventListener('click', function() {
                const categoryName = this.querySelector('.category-card__name').textContent.trim().toLowerCase();
                const categoryFilter = categoryName.replace(/\s+/g, '-');
                sessionStorage.setItem('selectedCategory', categoryFilter);
                window.location.href = 'recipes.html';
            });
            
            // Keyboard support
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
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
    // NEWSLETTER POPUP - Homepage only
    // ==========================================================================
    
    function initNewsletter() {
        if (!DOM.newsletterOverlay) return;
        
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
        
        // Close button
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
        if (DOM.newsletterForm) {
            DOM.newsletterForm.addEventListener('submit', function(e) {
                const emailInput = this.querySelector('.newsletter-input');
                
                if (!this.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.classList.add('was-validated');
                    if (emailInput) emailInput.setAttribute('aria-invalid', 'true');
                    return;
                }
                
                e.preventDefault();
                if (emailInput) emailInput.setAttribute('aria-invalid', 'false');
                
                const email = emailInput ? emailInput.value : '';
                
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
    }
    
    // ==========================================================================
    // COMMENT FORM - Recipe detail page
    // ==========================================================================
    
    function initCommentForm() {
        if (!DOM.commentForm) return;
        
        // Make star labels keyboard accessible
        const ratingLabels = DOM.commentForm.querySelectorAll('.rating-stars .form-check-label');
        ratingLabels.forEach((label, index) => {
            label.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const input = this.previousElementSibling || this.querySelector('input');
                    if (input) input.checked = true;
                }
            });
        });
        
        // Form validation
        DOM.commentForm.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                e.preventDefault();
                
                // Show success modal
                const successModal = new bootstrap.Modal(document.getElementById('commentSuccessModal'));
                successModal.show();
                
                // Reset form
                this.reset();
                this.classList.remove('was-validated');
            }
            
            this.classList.add('was-validated');
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