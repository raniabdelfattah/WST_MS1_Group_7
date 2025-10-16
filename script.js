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
    // SEARCH FUNCTIONALITY 
    // ==========================================================================
    
    const searchForms = document.querySelectorAll('.search__form');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('.search__input');
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm) {
                searchRecipes(searchTerm);
            }
        });
    });
    
    function searchRecipes(term) {
        const recipeCards = document.querySelectorAll('.recipe-card');
        let foundCount = 0;
        
        recipeCards.forEach(card => {
            const title = card.querySelector('.recipe-card__title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.recipe-card__description')?.textContent.toLowerCase() || '';
            const tags = Array.from(card.querySelectorAll('.recipe-tags__item'))
                .map(tag => tag.textContent.toLowerCase())
                .join(' ');
            
            // Search in title, description, and tags
            if (title.includes(term) || description.includes(term) || tags.includes(term)) {
                /* let CSS control layout; avoid forcing inline display */
                card.style.display = '';
                foundCount++;
                // Add highlight effect
                card.classList.add('search-highlight');
                setTimeout(() => card.classList.remove('search-highlight'), 1000);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show search results message
        showSearchMessage(term, foundCount);
    }
    
    function showSearchMessage(term, count) {
        // Remove existing message
        const existingMsg = document.querySelector('.search-message');
        if (existingMsg) existingMsg.remove();
        
        // Create new message
        const message = document.createElement('div');
        message.className = 'search-message';
        message.innerHTML = `
            <div class="search-message__content">
                <strong>Search Results:</strong> Found ${count} recipe(s) for "${term}"
                ${count === 0 ? '<br><small>Try searching for different keywords or clear the search.</small>' : ''}
            </div>
            <button class="search-message__close" onclick="clearSearch()" aria-label="Clear search">
                ×
            </button>
        `;
        
        // Insert message before recipe grid
        const recipeSection = document.querySelector('.featured-recipes .container');
        if (recipeSection) {
            const firstChild = recipeSection.querySelector('.section-title') || recipeSection.firstChild;
            if (firstChild && firstChild.nextSibling) {
                recipeSection.insertBefore(message, firstChild.nextSibling);
            } else {
                recipeSection.insertBefore(message, recipeSection.firstChild);
            }
        }
    }
    
    // Clear search function (global)
    window.clearSearch = function() {
        const recipeCards = document.querySelectorAll('.recipe-card');
        recipeCards.forEach(card => {
            /* let CSS control layout */
            card.style.display = '';
        });
        // Clear search inputs
        document.querySelectorAll('.search__input').forEach(input => input.value = '');
        // Remove message
        const existingMsg = document.querySelector('.search-message');
        if (existingMsg) existingMsg.remove();
        // Clear any active filters
        document.querySelectorAll('.filter-item.active').forEach(btn => btn.classList.remove('active'));
        activeFilters.clear();
    };
    
    // ==========================================================================
    // FILTER FUNCTIONALITY 
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
        const recipeCards = document.querySelectorAll('.recipe-card');
        let visibleCount = 0;
        
        if (activeFilters.size === 0) {
            // Show all recipes if no filters active
            recipeCards.forEach(card => {
                /* let CSS decide layout */
                card.style.display = '';
                visibleCount++;
            });
            removeFilterMessage();
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
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show filter message
            showFilterMessage(visibleCount);
        }
        
        // Announce to screen readers
        announceToScreenReader(`Showing ${visibleCount} recipes`);
    }
    
    function showFilterMessage(count) {
        // Remove existing message
        removeFilterMessage();
        
        // Create new message
        const message = document.createElement('div');
        message.className = 'search-message filter-message';
        message.innerHTML = `
            <div class="search-message__content">
                <strong>Filter Results:</strong> Showing ${count} recipe(s)
                ${count === 0 ? '<br><small>No recipes match the selected filters. Try different combinations.</small>' : ''}
            </div>
            <button class="search-message__close" onclick="clearAllFilters()" aria-label="Clear filters">
                ×
            </button>
        `;
        
        // Insert message
        const recipeSection = document.querySelector('.featured-recipes .container');
        if (recipeSection) {
            const firstChild = recipeSection.querySelector('.section-title') || recipeSection.firstChild;
            if (firstChild && firstChild.nextSibling) {
                recipeSection.insertBefore(message, firstChild.nextSibling);
            } else {
                recipeSection.insertBefore(message, recipeSection.firstChild);
            }
        }
    }
    
    function removeFilterMessage() {
        const existingMsg = document.querySelector('.filter-message');
        if (existingMsg) existingMsg.remove();
    }
    
    // Clear all filters function (global)
    window.clearAllFilters = function() {
        document.querySelectorAll('.filter-item.active').forEach(btn => btn.classList.remove('active'));
        activeFilters.clear();
        applyFilters();
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
    
    // Apply category filter on recipes page
    if (window.location.pathname.includes('recipes.html')) {
        const selectedCategory = sessionStorage.getItem('selectedCategory');
        if (selectedCategory) {
            sessionStorage.removeItem('selectedCategory');
            const matchingFilter = document.querySelector(`[data-filter="${selectedCategory}"]`);
            if (matchingFilter) {
                matchingFilter.click();
            }
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
    
    /* IntersectionObserver: add a CSS class instead of writing inline transform styles.
       This prevents the observer from overriding the hover transform and fixes the
       text jumping issue you were seeing. */
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
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('change', function() {
            if (this.checked) {
                const focusableElements = navMenu.querySelectorAll('a, button, input');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                setTimeout(() => firstElement?.focus(), 100);
                
                navMenu.addEventListener('keydown', function(e) {
                    if (e.key === 'Tab') {
                        if (e.shiftKey && document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement?.focus();
                        } else if (!e.shiftKey && document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement?.focus();
                        }
                    }
                    
                    if (e.key === 'Escape') {
                        navToggle.checked = false;
                        document.body.style.overflow = '';
                    }
                });
            }
        });
    }
    
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
// DYNAMIC CSS FOR JAVASCRIPT-ADDED ELEMENTS
// ==========================================================================

const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #ff6b35, #f7931e);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .scroll-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        background: linear-gradient(135deg, #f7931e, #ffcc02);
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }
    
    .search-message {
        margin-bottom: 2rem;
        padding: 1rem 1.5rem;
        background: #d1ecf1;
        border: 1px solid #bee5eb;
        border-radius: 8px;
        color: #0c5460;
        display: flex;
        justify-content: space-between;
        align-items: center;
        animation: slideDown 0.3s ease;
    }
    
    .search-message__content {
        flex: 1;
    }
    
    .search-message__close {
        background: transparent;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #0c5460;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: background 0.2s ease;
    }
    
    .search-message__close:hover {
        background: rgba(12, 84, 96, 0.1);
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .search-highlight {
        animation: searchPulse 0.5s ease;
    }
    
    @keyframes searchPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); box-shadow: 0 15px 40px rgba(255, 107, 53, 0.3); }
    }
    
    .ingredient-checkbox {
        width: 20px;
        height: 20px;
        cursor: pointer;
        accent-color: #CD853F;
        flex-shrink: 0;
    }
    
    .ingredient-label {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
    }
    
    .ingredient-content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        transition: all 0.3s ease;
    }
    
    .ingredient-content.checked {
        text-decoration: line-through;
        opacity: 0.6;
    }
    
    .recipe-author {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
        background: #f8f9fa;
        border-radius: 10px;
        margin: 1.5rem 0;
        border-left: 4px solid #CD853F;
    }
    
    .recipe-author__icon {
        font-size: 2rem;
        color: #CD853F;
    }
    
    .recipe-author__info {
        display: flex;
        flex-direction: column;
    }
    
    .recipe-author__label {
        font-size: 0.85rem;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .recipe-author__name {
        font-size: 1.1rem;
        color: #333;
        font-weight: 600;
    }
    
    .print-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }

    /* Fade-in effect when scrolling.
    JS adds a class for the animation.
    Avoid inline transforms so hover effects stay smooth. */
    
    .recipe-card {
        opacity: 0;
        transition: opacity 0.55s ease;
        will-change: opacity;
    }

    .recipe-card.fade-in {
        opacity: 1;
    }
    
    @media (max-width: 767px) {
        .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
        }
        
        .recipe-author {
            padding: 0.8rem 1rem;
        }
        
        .recipe-author__icon {
            font-size: 1.5rem;
        }
        
        .recipe-author__name {
            font-size: 1rem;
        }
    }
    
    @media print {
        .scroll-to-top,
        .print-btn,
        .search-message,
        .ingredient-checkbox,
        .social-sharing {
            display: none !important;
        }
        
        .recipe-author {
            border: 1px solid #ddd;
        }
    }
`;
document.head.appendChild(style);
