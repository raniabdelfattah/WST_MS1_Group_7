// Get recipe ID from URL parameter
function getRecipeIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Fetch recipe data from JSON file using Fetch API
async function fetchRecipes() {
    try {
        // Fetch the JSON file
        const response = await fetch('recipes.json');
        
        // Check if request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Convert response to JavaScript object
        const data = await response.json();
        
        // Return the recipes array
        return data.recipes;
        
    } catch (error) {
        // Handle errors during data loading
        console.error('Error fetching recipes:', error);
        
        // Show helpful error message for common issues
        if (error.message.includes('Failed to fetch')) {
            console.error('CORS Error: You need to run this through a local server!');
            console.error('Try using VS Code Live Server or Python: python -m http.server 8000');
        }
        
        return null;
    }
}

// Find specific recipe by ID
function findRecipeById(recipes, recipeId) {
    return recipes.find(recipe => recipe.id === recipeId);
}

// Populate recipe detail page with recipe data (DOM Manipulation)
function displayRecipe(recipe) {
    if (!recipe) {
        document.querySelector('.recipe-detail__content').innerHTML = 
            '<div class="container"><p class="error-message">Recipe not found. <a href="recipes.html">Back to recipes</a></p></div>';
        return;
    }

    // Update page title
    document.title = `${recipe.name} - Recipes 4 Keeps`;

    // Update recipe title
    document.querySelector('.recipe-info__title').textContent = recipe.name;

    // Update hero image
    const heroImage = document.querySelector('.recipe-hero__image');
    heroImage.src = recipe.image;
    heroImage.alt = recipe.name;

    // Update description
    document.querySelector('.recipe-info__description').textContent = recipe.description;

    // Update metadata - published date and author
    document.querySelector('.recipe-published__date').textContent = recipe.published;
    document.querySelector('.recipe-author__name').textContent = recipe.author;

    // Update prep/cook times and servings (Dynamic DOM creation)
    const metaGrid = document.querySelector('.recipe-meta-grid');
    let metaHTML = `
        <div class="recipe-meta-item">
            <i class="fas fa-clock recipe-meta-item__icon" aria-hidden="true"></i>
            <span class="recipe-meta-item__label">Prep Time:</span>
            <span class="recipe-meta-item__value">${recipe.prepTime}</span>
        </div>
        <div class="recipe-meta-item">
            <i class="fas fa-clock recipe-meta-item__icon" aria-hidden="true"></i>
            <span class="recipe-meta-item__label">Cook Time:</span>
            <span class="recipe-meta-item__value">${recipe.cookTime}</span>
        </div>`;
    
    // Add chill time if it exists (conditional rendering)
    if (recipe.chillTime) {
        metaHTML += `
        <div class="recipe-meta-item">
            <i class="fas fa-snowflake recipe-meta-item__icon" aria-hidden="true"></i>
            <span class="recipe-meta-item__label">Chill Time:</span>
            <span class="recipe-meta-item__value">${recipe.chillTime}</span>
        </div>`;
    }
    
    metaHTML += `
        <div class="recipe-meta-item">
            <i class="fas fa-users recipe-meta-item__icon" aria-hidden="true"></i>
            <span class="recipe-meta-item__label">Servings:</span>
            <span class="recipe-meta-item__value">${recipe.servings}</span>
        </div>
        <div class="recipe-meta-item">
            <i class="fas fa-signal recipe-meta-item__icon" aria-hidden="true"></i>
            <span class="recipe-meta-item__label">Difficulty:</span>
            <span class="recipe-meta-item__value recipe-meta__difficulty--${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span>
        </div>`;
    
    // Populate the meta grid with created HTML
    metaGrid.innerHTML = metaHTML;

    // Update tags (Iterate through array and create elements)
    const tagsContainer = document.querySelector('.recipe-tags');
    tagsContainer.innerHTML = recipe.tags.map(tag => 
        `<span class="recipe-tags__item">${tag}</span>`
    ).join('');

    // Update ingredients (Nested iteration)
    const ingredientsContent = document.querySelector('.ingredients__content');
    ingredientsContent.innerHTML = recipe.ingredients.map(section => `
        <h3 class="ingredients__subtitle">${section.category}</h3>
        <ul class="ingredients__list">
            ${section.items.map(item => `
                <li class="ingredient">
                    <span class="ingredient__amount">${item.amount}</span>
                    <span class="ingredient__name">${item.name}</span>
                </li>
            `).join('')}
        </ul>
    `).join('');

    // Update instructions (Iterate and create numbered list)
    const instructionsList = document.querySelector('.instructions__list');
    instructionsList.innerHTML = recipe.instructions.map((instruction, index) => `
        <li class="instruction">
            <div class="instruction__number">${index + 1}</div>
            <div class="instruction__content">
                <p>${instruction}</p>
            </div>
        </li>
    `).join('');

    // Show recipe notes if available
    if (recipe.notes && recipe.notes.length > 0) {
        const notesContent = document.querySelector('.recipe-notes__content');
        notesContent.innerHTML = recipe.notes.map(note => `
            <div class="recipe-tip">
                <h3 class="recipe-tip__title">${note.title}</h3>
                <p class="recipe-tip__text">${note.text}</p>
            </div>
        `).join('');
    }
}

// Initialize page when DOM is loaded
async function initRecipeDetailPage() {
    // Get the recipe ID from URL
    const recipeId = getRecipeIdFromURL();
    
    // Check if recipe ID exists
    if (!recipeId) {
        document.querySelector('.recipe-detail__content').innerHTML = 
            '<div class="container"><p class="error-message">No recipe specified. <a href="recipes.html">Back to recipes</a></p></div>';
        return;
    }

    // Fetch all recipes from JSON
    const recipes = await fetchRecipes();
    
    // Handle error case
    if (!recipes) {
        document.querySelector('.recipe-detail__content').innerHTML = 
            '<div class="container"><p class="error-message">Error loading recipes. Please make sure you\'re running this through a local server. <a href="recipes.html">Back to recipes</a></p></div>';
        return;
    }

    // Find the specific recipe by ID
    const recipe = findRecipeById(recipes, recipeId);
    
    // Display the recipe on the page
    displayRecipe(recipe);

    // Initialize comment form behavior
    initCommentForm();
}

// Run initialization when page loads
document.addEventListener('DOMContentLoaded', initRecipeDetailPage);

// Initialize Leave a Comment form with Bootstrap validation and success modal
function initCommentForm() {
    const form = document.getElementById('commentForm');
    if (!form) return;

    // Rating stars toggle
    const ratingContainer = document.querySelector('.rating-stars');
    const ratingInputs = form.querySelectorAll('input[name="rating"]');
    const ratingLabels = form.querySelectorAll('.rating-stars .form-check-label');

    function setStarsVisual(value) {
        const selected = Number(value) || 0;
        ratingLabels.forEach((label, idx) => {
            const icon = label.querySelector('i');
            if (!icon) return;
            if (idx < selected) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
            }
        });
    }

    // Hover preview
    if (ratingContainer) {
        ratingLabels.forEach((label, idx) => {
            label.addEventListener('mouseenter', () => setStarsVisual(idx + 1));
            label.addEventListener('focus', () => setStarsVisual(idx + 1));
        });
        ratingContainer.addEventListener('mouseleave', () => {
            const checked = Array.from(ratingInputs).find(r => r.checked);
            setStarsVisual(checked ? checked.value : 0);
        });
    }

    // Click selection
    ratingInputs.forEach(input => {
        input.addEventListener('change', () => setStarsVisual(input.value));
    });

    form.addEventListener('submit', function(e) {
        // HTML5 + Bootstrap validation
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        e.preventDefault();

        // Reset inputs 
        form.reset();
        form.classList.remove('was-validated');

        // Reset stars visual after reset
        setStarsVisual(0);

        // Show success modal
        const modalEl = document.getElementById('commentSuccessModal');
        if (modalEl && window.bootstrap) {
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        }
    });
}