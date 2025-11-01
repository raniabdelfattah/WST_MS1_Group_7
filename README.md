# Recipes 4 Keeps


A responsive recipe sharing website built with HTML5, CSS3, Bootstrap 5.3.2, and JavaScript that celebrates family recipes and culinary traditions. This project showcases modern web development practices including accessibility, responsive design, clean semantic markup, dynamic content loading, and interactive features.


## Project Timeline


View our complete project timeline and task breakdown in our Gantt Chart:
**[Recipes 4 Keeps Gantt Chart](https://sharing.clickup.com/9016079716/g/h/8cpcxb4-4376/7dba737a757e949)**


**Project Management Notes:**
- **Team Communication**: Regular check-ins via GSpace and team meetings to track progress, address blockers, and ensure all members are aligned on project goals
- **Task Management**: All tasks are assigned with clear deadlines and dependencies in ClickUp and GSpace. Team members update task status regularly to maintain visibility across the project
- **Handling Delays**: If delays occur, the members reassess task priorities immediately. Members redistribute workload, adjust deadlines, or identify features that can be deferred to post-launch updates
- **Feature Changes**: Document all feature changes in team GSpace with detailed descriptions. Team consensus required before implementing scope changes to avoid project drift


## About the Project


Recipes 4 Keeps is a platform where users can browse, search, and discover family recipes passed down through generations. The website emphasizes the cultural significance of food and the importance of preserving culinary traditions. Built by four friends who bonded over their love for cooking, this site represents our journey in sharing treasured recipes from our families.


The design uses a warm orange gradient color scheme that evokes comfort and home cooking, perfectly matching our tagline: "Foods and recipes are treasures worth keeping..."


## Live Demo


Open `index.html` in your browser to explore the website locally. For the best development experience, use VS Code with the Live Server extension.


## Project Structure
```
Recipes-4-Keeps/
├── .vscode/
│   └── launch.json                     # VS Code debugging configuration
│
├── images/                             # Recipe photos, team photos, and logo
│
├── index.html                          # Homepage with featured recipes
├── about.html                          # About Us page with team descriptions
├── recipes.html                        # All Recipes page with filtering
├── recipe-detail.html                  # Individual recipe template
│
├── styles.css                          # Main stylesheet with responsive design
│
├── script.js                           # Main JavaScript functionality
├── recipe-detail.js                    # Recipe detail page JavaScript
│
├── recipes.json                        # Centralized recipe data store
│
└── README.md                           # Project documentation
```


## Pages Overview


### Homepage (index.html)


The main landing page that welcomes visitors and showcases what makes our recipes special.


**Key Sections:**
- **Hero Banner**: Eye-catching gradient background with our mission statement
- **Featured Recipes**: Grid display of 4 highlighted recipes with images, cooking times, and difficulty levels
- **Top Categories**: 6 category boxes for quick browsing (Meat, Asian, Main Dish, Vegetable, Dessert, Easy)
- **Browse All Button**: Call-to-action leading to the complete recipe catalog


**Features:**
- Sticky navigation header with integrated search functionality
- Hover effects on recipe cards showing cooking metadata
- Bootstrap Grid layout that adapts from 4 columns to 1 column based on screen size
- Category tags positioned directly below recipe titles for consistent alignment across all cards
- Bootstrap Offcanvas menu sliding from right for mobile navigation


### About Us (about.html)


Tells the story behind Recipes 4 Keeps and introduces the team.


**Key Sections:**
- **Our Story**: Centered narrative explaining how four friends created this recipe collection
- **Meet the Team**: Individual profiles for Helena, Karissa, Rania, and Chadley with photos and personal bios


**Features:**
- Orange gradient page header matching the site's color scheme
- Bootstrap Grid layout for team members (4 columns → responsive stacking)
- Circular profile images with consistent styling


### All Recipes (recipes.html)


Browse and filter through the complete recipe catalog.


**Key Sections:**
- **Filter System**: 4 category groups (Meal Type, Cuisine Type, Ingredient, Difficulty)
- **Recipe Grid**: Dynamically loaded from recipes.json with 16 recipe cards
- **Recommended Recipes Section**: Left-aligned title for better visual hierarchy


**Filter Categories:**
- **Meal Type**: Breakfast, Main Dish, Side Dish, Dessert, Snack
- **Cuisine Type**: American, Asian, European, Middle Eastern
- **Ingredient**: Meat, Pantry, Seafood, Vegetable
- **Difficulty**: Easy, Medium, Hard


**Features:**
- Interactive filter buttons with gradient backgrounds and hover effects
- Dynamic recipe loading from recipes.json via JavaScript
- Bootstrap Grid layout with responsive columns
- Left-aligned "Recommended Recipes" title for improved visual hierarchy
- All 16 recipes display automatically without manual HTML updates


### Recipe Detail (recipe-detail.html)


Displays complete recipe information with step-by-step instructions and interactive features.


**Key Sections:**
- **Recipe Header**: Large hero image paired with recipe description
- **Recipe Metadata**: Grid showing prep time, cook time, servings, and difficulty
- **Ingredients List**: Organized by category with measurements and ingredient names
- **Instructions**: Numbered steps with clear, detailed directions
- **Cooking Tips**: Pro tips, storage information, and variation suggestions
- **Social Sharing**: Buttons for Facebook, X (Twitter), Pinterest, and Email
- **Leave a Comment**: Interactive comment form with star rating system


**Features:**
- Two-column layout for desktop (image and info side by side)
- Color-coded difficulty badges (green for Easy, orange for Medium, red for Hard)
- Back to Recipes navigation button
- Print-friendly styles for easy recipe printing
- Functional star rating system (1-5 stars)
- Bootstrap modal for comment submission feedback
- Form validation for comment form


## Design System


### Color Palette


The color scheme was carefully chosen to create a warm, inviting atmosphere:


- **Primary Orange** (#ff6b35): Main brand color used in gradients and primary buttons
- **Secondary Orange** (#f7931e): Accent color for hover states and transitions
- **Light Orange** (#ffcc02): Highlight color for gradient endpoints
- **Peru** (#CD853F): Tag backgrounds and accent elements
- **Background** (#f8f9fa): Soft gray for page backgrounds
- **Text Primary** (#333): Dark gray for optimal readability
- **Text Secondary** (#666): Medium gray for descriptions and metadata


### Typography


- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Font Sizes**: Hierarchical sizing from 3rem headings to 0.8rem tags
- **Line Height**: 1.6 for body text, ensuring comfortable reading
- **Font Weights**: Strategic use of 500-700 weights for emphasis


### Layout Patterns


**Bootstrap Grid System**: Responsive grid layouts throughout the site
- Recipe grid: 4 columns (large) → 3 columns (tablet) → 2 columns (small tablet) → 1 column (mobile)
- Team grid: 4 columns → 2 columns → 1 column
- Categories: 3 columns → 2 columns → 1 column
- Consistent gap spacing with Bootstrap's `g-4` class


**Card Design**: Consistent card styling across all recipe displays
- Rounded corners (15px border radius for recipe cards, 8px for other cards)
- Subtle shadows (0 5px 20px rgba(0,0,0,0.1))
- Hover animations with translateY transforms
- White background with proper contrast
- Category tags positioned immediately after titles for visual consistency


**Navigation**: Sticky header that remains accessible while scrolling
- Bootstrap Offcanvas for mobile navigation (slides from right)
- Smooth transitions between navigation states
- Integrated search bar with rounded styling


## Technical Features


### Bootstrap 5.3.2 Integration


Bootstrap has been integrated to enhance responsive layouts and interactive features:


**Bootstrap Components Used:**
- **Grid System**: Applied to Team Member Cards, Top Categories, and Recipe Cards across all pages (index.html, recipes.html, about.html)
- **Offcanvas Navigation**: Upgraded from CSS-only menu to Bootstrap Offcanvas component (slides from right)
- **Modals**: Success feedback modal after comment submission
- **Form Validation**: Bootstrap validation classes on comment form


**Custom CSS Maintained:**
- Original design aesthetic and color schemes
- Custom hover effects and transitions
- Gradient backgrounds
- Filter button styling
- Recipe card hover effects


This hybrid approach maintains our original design aesthetic while adding modern interactive features and responsive behavior where they enhance user experience.


### JavaScript Features


The site includes interactive functionality built with vanilla JavaScript:


**Code Architecture:**
- **IIFE Pattern**: All code wrapped in Immediately Invoked Function Expression for encapsulation
- **DOM Caching**: Frequently accessed elements queried once and stored in cache object
- **Modular Functions**: Separate dedicated functions for HTML generation and event handling


**Dynamic Recipe Loading:**
- `loadAndRenderRecipes()`: Fetches all recipes from recipes.json and renders them on page load
- `createBootstrapRecipeCard()`: Generates recipe HTML with Bootstrap Grid column wrappers
- `loadRecipesForFiltering()`: Loads recipe data for filter functionality
- All 16 recipes auto-render without manual HTML updates


**Interactive Features:**
- **Star Rating System**: Clickable 5-star rating on recipe detail page
- **Comment Submission**: Form handling with Bootstrap modal feedback
- **Form Validation**: Real-time validation on comment form
- **Modal Management**: Success message display after form submission
- **Mobile Menu**: Bootstrap Offcanvas navigation with smooth slide animation
- **Search Functionality**: Search recipes by title, description, or tags
- **Filter System**: Interactive category filtering with multiple selection support
- **Category Navigation**: Click categories on homepage to filter recipes


**Performance Optimizations:**
- DOM elements cached to avoid repeated queries
- Event delegation for better performance
- Clean separation of concerns between UI generation and event handling


### Responsive Design


The website follows a mobile-first approach with carefully planned breakpoints:


**Breakpoint Strategy:**
- **2560px+**: 4K/Ultra-wide displays with locked layouts
- **1920px+**: Full HD displays with optimal spacing
- **1400px+**: Large desktop with maximum content width
- **1200px-1399px**: Standard desktop layout
- **1024px-1199px**: Large tablets (3-column recipe grid)
- **768px-1023px**: Tablets (2-column recipe grid)
- **481px-767px**: Large mobile (2-column recipe grid)
- **320px-480px**: Small mobile (single column)


**Layout Locking**: On screens 1200px and wider, the recipe grid and filter layout remain locked at their optimal widths to prevent over-stretching and maintain visual appeal.


### Accessibility Features


This project prioritizes inclusive design:


- **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<article>`, `<section>` for better screen reader navigation
- **ARIA Labels**: Descriptive labels on interactive elements and forms
- **Focus Indicators**: High contrast (3px solid #CD853F) outlines on all interactive elements
- **Skip Links**: Hidden links allowing keyboard users to skip to main content
- **Alt Text**: Descriptive alternative text on all images
- **Color Contrast**: All text meets WCAG AA standards for contrast ratios
- **Keyboard Navigation**: Full keyboard accessibility for all interactive elements including star rating
- **Screen Reader Support**: `.sr-only` class for visually hidden but screen-reader-accessible content
- **Form Labels**: Proper label associations for all form inputs


### Advanced CSS Features


**Bootstrap Offcanvas Navigation**
- Uses Bootstrap’s offcanvas component for responsive mobile navigation
- Hamburger icon automatically handled by Bootstrap’s toggle system
- Smooth slide-in transition and accessible navigation behavior


**Gradient Backgrounds**: Consistent orange gradient throughout
- Hero section: `linear-gradient(135deg, #ff6b35, #f7931e, #ffcc02)`
- Header: `linear-gradient(135deg, #D2691E, #CD853F)`
- Buttons: `linear-gradient(135deg, #ff6b35, #f7931e)`


**Hover Effects**: Engaging micro-interactions
- Recipe cards lift on hover with `translateY(-5px)`
- Filter buttons scale and change gradient
- Social icons move up slightly on hover
- Image zoom effects on recipe card photos
- Star rating hover and active states


**CSS Grid Mastery**: Advanced grid layouts
- Auto-fit and minmax for responsive grids
- Named grid areas for complex layouts
- Gap property for consistent spacing
- Grid auto-rows for uniform card heights


### Browser Support


**Modern Browser Requirements:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+


**Required CSS Features:**
- CSS Grid (full support needed)
- CSS Flexbox (for navigation and cards)
- CSS Custom Properties (for maintainable colors)
- CSS Transforms (for animations)


**External Dependencies:**
- Font Awesome 6.4.0 (icons via CDN)
- Bootstrap 5.3.2 (modal, form validation, and layout)


### Special Media Queries


**High Contrast Mode**: Enhanced borders and contrast for users who need it
```css
@media (prefers-contrast: high)
```


**Reduced Motion**: Respects user's motion preferences
```css
@media (prefers-reduced-motion: reduce)
```


**Print Styles**: Optimized recipe printing
- Removes navigation and footer
- Adjusts font sizes for readability
- Prevents page breaks inside recipe cards


## Development Setup


### VS Code Configuration


The project includes a `.vscode/launch.json` file for easy development:


```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Open about.html",
            "file": "${workspaceFolder}/index.html"
        }
    ]
}
```


**Note**: Update the file path to match your local directory structure.


### Recommended Extensions


- **Live Server**: For live reloading during development
- **HTML CSS Support**: Enhanced IntelliSense for web development
- **Prettier**: Code formatting for consistent style
- **ESLint**: JavaScript code quality checking


### Getting Started


1. Clone or download the project files
2. Open the project folder in VS Code
3. Install the Live Server extension
4. Right-click on `index.html` and select "Open with Live Server"
5. The website will open in your default browser with live reload enabled


## File Organization


### HTML Structure


Each HTML file follows a consistent structure:
- DOCTYPE declaration
- Meta tags for charset and viewport
- External CSS link (styles.css)
- Font Awesome CDN link
- Bootstrap CDN links (CSS and JS)
- Header with navigation
- Main content area
- Footer with social links and privacy notice
- Custom JavaScript file (script.js) before closing body tag


### CSS Organization


The `styles.css` file is organized into logical sections:


1. **Reset and Base Styles**: Universal styles and accessibility classes
2. **Header Component**: Navigation and search functionality
3. **Main Content Wrapper**: Shared layout container
4. **Homepage Specific**: Hero, browse section, categories
5. **Recipes Page Specific**: Page header, filters, recipe grid
6. **About Page Specific**: Story section, team grid
7. **Recipe Detail Specific**: Recipe layout, ingredients, instructions, comment section
8. **Shared Components**: Recipe cards, buttons, footer
9. **Responsive Design**: Media queries from largest to smallest screens
10. **Accessibility Features**: Special media queries and focus management


### JavaScript Organization


The project uses two main JavaScript files for modular functionality:


1. **script.js**  
   - Handles general website logic (form validation, modal behavior, and navigation)
   - Uses modern JavaScript patterns:
     - **IIFE Wrapper** for encapsulation  
     - **DOM Cache Object** for efficient element access  
     - **HTML Builder Functions** for dynamic content  
     - **Event Handlers** for user interactions  
     - **Initialization** triggered on `DOMContentLoaded`


2. **recipe-detail.js**  
   - Handles dynamic rendering of recipe information  
   - Fetches data from `recipes.json`  
   - Updates the DOM based on the selected recipe


### Image Management


All images are stored in the `/images` directory:
- **Logo**: `Recipe4Keeps_White.png`
- **Recipe Photos**: Named after the dish (e.g., `Japchae.png`, `Molokhia.png`)
- **Team Photos**: Named after team members (e.g., `Yna.jpeg`, `Mae.png`)


**Image Requirements:**
- Recipe photos: Recommended 600x400px minimum for optimal display
- Team photos: Square format, minimum 300x300px (displayed at 150x150px)
- Logo: PNG with transparent background (white version for header)
- All images optimized for web (compressed to under 200KB per image)


## Content Management


### Recipe Card Structure


Each recipe card includes:
- High-quality food photography (180px height, full width)
- Recipe title (max 3 lines for visual consistency, 1.2rem font size)
- Category tags positioned directly below title (for alignment consistency)
- Brief description (2-3 sentences, fills available space)
- Cooking time with clock icon (shown on hover)
- Difficulty badge (color-coded: green/orange/red)
- "View Recipe" call-to-action button (stays at bottom via `margin-top: auto`)


### Team Member Structure


Each team member profile includes:
- Circular profile photo (150x150px displayed size)
- Full name as heading
- Personal bio (2-4 sentences)
- Consistent white card background


### Navigation Structure


The site uses a simple three-page navigation:
- **Home**: Featured content and category browsing
- **Recipes**: Complete catalog with filtering
- **About**: Team information and story


The search functionality is currently visual-only (requires JavaScript implementation for full functionality).


## Challenges Solved


### Layout Consistency Across Screen Sizes


**Challenge**: Maintaining visual hierarchy and card alignment across vastly different screen sizes.


**Solution**: Implemented a locked grid layout for large screens (1200px+) that prevents over-stretching, while using responsive grid columns for smaller devices. Used `max-width` constraints on containers to keep content readable.


### Category Tag Alignment


**Challenge**: Recipe cards had inconsistent heights because tags appeared at different positions, creating a scattered, unaligned appearance.


**Solution**: Restructured the card content order using CSS flexbox with the `order` property, placing tags immediately after titles. This ensures all cards have tags in the same visual position regardless of title length. Used `margin-top: auto` on the button to push it to the bottom of each card, and set `flex: 1` on the description to fill remaining space.


### CSS-only Mobile Navigation


**Challenge**: Creating a functional mobile menu without JavaScript that slides from the correct side.


**Solution**: Implemented a hidden checkbox pattern with adjacent sibling selectors. The checkbox state controls menu visibility and hamburger animation through pure CSS. Fixed positioning issues to ensure menu slides from the left side consistently.


### Footer Layout Lock


**Challenge**: Footer content spreading too wide on ultra-wide displays.


**Solution**: Set maximum widths on footer sections and used `margin: 0 auto` for centering. Added responsive padding that scales with viewport size.


### Consistent Recipe Card Spacing


**Challenge**: Cards bunching together vertically on larger screens, especially when multiple rows of recipes were displayed.


**Solution**: Implemented explicit `row-gap` values of 5rem with `!important` to ensure consistent vertical spacing between rows. Set `grid-auto-rows` with `minmax(420px, auto)` for uniform card heights. Added individual card `margin-bottom: 3rem` as an additional safeguard for proper spacing.


### Bootstrap and Custom CSS Integration


**Challenge**: Integrating Bootstrap components without disrupting the existing custom layout and design.


**Solution**: Selective Bootstrap integration for specific features (modals, form validation) while maintaining custom CSS for core layout components (grids, buttons, recipe cards). This preserved the original aesthetic while adding modern interactive features.


### Form Validation and User Feedback


**Challenge**: Providing clear user feedback for form submissions without page refresh.


**Solution**: Implemented JavaScript form handling with Bootstrap modal for success messages. Combined with Bootstrap's built-in validation classes for real-time feedback on form inputs.


## Future Enhancements


### JavaScript Integration


**Search Functionality**: Implement real-time recipe search
- Filter recipes by keywords
- Highlight matching results
- Clear search button


**Filter System**: Make recipe filters fully interactive
- Toggle active filter states
- Dynamically show/hide matching recipes
- Multiple filter selection
- Clear all filters button


**Advanced Form Features**
- AJAX form submission to prevent page reload
- Email validation with regex
- Character count for comment textarea
- Form field sanitization


### Backend Integration


**Database**: Recipe storage and management system
- MySQL or PostgreSQL for recipe data
- User authentication system
- Recipe CRUD operations
- Comment storage and retrieval


**User Accounts**: Personal recipe collections
- Save favorite recipes
- Create personal cookbooks
- Share recipes with friends
- User profile management


**Admin Panel**: Content management system
- Add/edit/delete recipes
- Manage team information
- View site analytics
- Moderate user comments


**API Integration**: External recipe services
- Import recipes from popular sites
- Nutritional information API
- Ingredient substitution suggestions
- Recipe recommendation engine


### Additional Features


**Recipe Ratings**: Full review system
- Star rating aggregation
- Written reviews display
- Helpful vote buttons
- Sort by rating
- User reputation system


**Print Recipes**: Enhanced printing
- Printer-friendly layout
- Optional sections toggle
- Shopping list format
- PDF generation


**Social Sharing**: Expanded sharing options
- Custom share images
- Pre-filled social media posts
- Copy link functionality
- WhatsApp sharing


**Mobile App**: Progressive Web App features
- Install prompt
- Offline functionality
- Push notifications for new recipes
- App-like navigation


**Advanced Search**: Enhanced filtering
- Ingredient-based search
- Dietary restrictions filter
- Cooking time ranges
- Multi-select categories
- Exclude ingredients option


**User Generated Content**
- Recipe submission by users
- Photo upload capability
- Recipe collections and cookbooks
- Following other users


## Browser Testing


### Recommended Testing Checklist


**Desktop Browsers:**
- [ ] Google Chrome (latest)
- [ ] Mozilla Firefox (latest)
- [ ] Safari (macOS)
- [ ] Microsoft Edge (latest)


**Mobile Devices:**
- [ ] iOS Safari (iPhone)
- [ ] iOS Safari (iPad)
- [ ] Android Chrome (phone)
- [ ] Android Chrome (tablet)


**Responsive Testing:**
- [ ] 2560px+ (4K displays)
- [ ] 1920px (Full HD)
- [ ] 1440px (laptop)
- [ ] 1024px (tablet landscape)
- [ ] 768px (tablet portrait)
- [ ] 375px (mobile)
- [ ] 320px (small mobile)


**Interactive Features:**
- [ ] Star rating system functionality
- [ ] Comment form submission and validation
- [ ] Newsletter signup validation
- [ ] Bootstrap modal display
- [ ] Hamburger menu slide animation
- [ ] Form error messages display


**Accessibility Testing:**
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Screen reader (NVDA or JAWS)
- [ ] High contrast mode
- [ ] Zoom to 200%
- [ ] Print preview
- [ ] Focus indicators on all interactive elements


### Performance Considerations


**Optimization Checklist:**
- [ ] Compress all images (use TinyPNG or similar)
- [ ] Minify CSS for production
- [ ] Minify JavaScript for production
- [ ] Enable gzip compression on server
- [ ] Optimize Bootstrap imports (only include needed components)
- [ ] Test loading speed (aim for under 3 seconds)
- [ ] Check Lighthouse scores


## Maintenance Notes


### Regular Updates


**Content Refresh:**
- Add new recipes monthly
- Update team information as needed
- Replace placeholder content with real data
- Keep copyright year current in footer
- Update comment section as needed


**Technical Maintenance:**
- Run HTML validation (W3C Validator)
- Check CSS for deprecated properties
- Test with new browser versions
- Update Bootstrap and Font Awesome CDN links
- Review and update documentation
- Test JavaScript functionality across browsers


**Accessibility Audits:**
- Run Lighthouse audit quarterly
- Test with screen readers
- Verify keyboard navigation
- Check color contrast ratios
- Validate ARIA labels
- Test form accessibility


### Code Quality Standards


**HTML Best Practices:**
- Use semantic HTML5 elements
- Maintain proper heading hierarchy
- Include descriptive alt text
- Validate markup regularly


**CSS Best Practices:**
- Follow BEM naming convention where applicable
- Group related styles together
- Comment complex CSS sections
- Remove unused styles
- Keep specificity low


**JavaScript Best Practices:**
- Use IIFE for encapsulation
- Cache DOM queries
- Use const/let instead of var
- Add comments for complex logic
- Handle errors appropriately


**Performance Standards:**
- Images under 200KB each
- CSS file under 100KB
- JavaScript file under 50KB
- Total page weight under 2MB
- First contentful paint under 2 seconds


## Credits and Acknowledgments


**Team Members:**
- **Helena Tantoco**: Front-end development; contributed to recipe collection and content writing
- **Rania Abdelfattah**: Back-end development; contributed to recipe details and content writing
- **Karissa Mae Manicad**: Quality assurance and testing; contributed to recipe content and review
- **Chadley De Lara**: Documentation and project coordination; assisted with recipe content editing
  

**Technical Contributions:**
- Bootstrap integration and modal implementation
- JavaScript development with IIFE pattern
- Form validation and event handling
- Hamburger menu functionality fixes
- Comment section with star rating system


**External Resources:**
- Bootstrap 5.3.2 for modal and form components
- Font Awesome for icons
- Google Fonts for typography inspiration
- W3C for web standards and validation tools


**Special Thanks:**
- Our families for sharing their treasured recipes
- Our instructors for guidance and feedback
- The web development community for resources and tutorials


## License and Usage


This project was created for educational purposes as part of a web development course. The code structure and design patterns can be adapted for similar food-related projects while maintaining the warm, community-focused aesthetic that makes Recipes 4 Keeps special.


**Usage Guidelines:**
- Feel free to study the code for learning purposes
- Adapt the structure for your own recipe website
- Please credit the original team if using significant portions
- Replace all content (recipes, images, text) with your own


## Contact


For questions about this project or collaboration opportunities:
- Review the code on GitHub
- Open an issue for bugs or suggestions
- Fork the project to create your own version


---


**Built with ❤️ and a love for cooking**


*Last Updated: November 2025*



