# Recipes4Keeps

A responsive recipe sharing website built with HTML5, CSS3, Bootstrap 5, and JavaScript that celebrates family recipes and culinary traditions. This project showcases modern web development practices including accessibility features, responsive design, dynamic content loading, and interactive user experiences.

## Project Timeline

View our complete project timeline and task breakdown in our Gantt Chart:
**[Recipes4Keeps Gantt Chart](https://sharing.clickup.com/9016079716/g/h/8cpcxb4-4376/7dba737a757e949)**

## Testing & Quality Assurance

Our team is continuously developing and improving the platform through comprehensive testing procedures. This includes functionality testing across different browsers and devices, cross-browser compatibility checks to ensure consistent experiences, responsive design validation at various breakpoints, accessibility audits for WCAG compliance, form validation testing, and user experience evaluations. See our detailed Testing Log and results here:
**[MS2 Testing Documentation](https://docs.google.com/document/d/1DgL9C-ljX8cjXjpzMfzQ58mSFQD27aZ1w1b7mt3xA-I/edit?tab=t.0)**

## Step by Step Contingency Plan

Please access the Recipe4Keeps' Contingency plan via this link **[Recipe4Keeps Contingency Plan Document](https://doc.clickup.com/9016079716/d/h/8cpcxb4-4596/027719be7f9f7c0)**

## About the Project

Recipes 4 Keeps is a platform where users can browse, search, and discover family recipes passed down through generations - _shared by the 4 main 'cooks' behind the brains: Helena Rose Tantoco, Rania Nabil Abdelfattah, Chadley Marie De Lara and Karissa Mae Manicad_. The website emphasizes the cultural significance of food and the importance of preserving culinary traditions. Built by four friends who bonded over their love for cooking, this site represents our journey in sharing treasured recipes from our families to yours.

The design uses a warm orange gradient color scheme (Sienna #D2691E, Peru #CD853F, Sandy Brown #F4A460) that evokes comfort and home cooking, perfectly matching our tagline: "Foods and recipes are treasures worth keeping..."

## MS2 DRAFT FEEDBACK IMPLEMENTATION CHECKLIST

**_Feedback 1: Bootstrap Implementation_
- To fully meet the requirement, try using more Bootstrap classes like container, row, col, btn, form control, and card on more sections.
- If Tailwind is the option, use it fully with its utility first style instead of mixing many custom rules.
- Forms (such as newsletter) could use Bootstrap’s built-in accessibility features for form validation and aria attributes.
- Some features may be easier to manage using more Bootstrap components.**
**************
Assigned To: Helena Rose Tantoco
Status: Completed
Notes & Justification: 
_Accomplished:_
Leave a Comment Modal
Newsletter Form Validation
Bootstrap Grid System
Form Controls & Components
Didn’t use Tailwind

_Feedback 2: JavaScript Best Practices__
- Try to avoid repeated DOM searches inside loops for better performance.
- Break JavaScript into modules and use modern syntax.
- Use const and let instead of var to match modern JavaScript.
**************
Assigned To: Rania Nabil Abdelfattah
Status: Completed
Notes & Justification:
_Accomplished:_
Encapsulation with IIFE
DOM Caching Object
Extracted HTML Builder functions
Already Implemented:
Use const and let instead of var to match modern JavaScript (no resolution needed as the existing code already matched modern JavaScript).

_Feedback 3: ReadMe section implementation and Updates_
- Add the Gantt Chart Link to the readmesectio
- Add the feedback and what was accomplished/what the group opted out from implementing out of all the feedbacks received.
**************
Assigned To: Chadley Marie De Lara
Status: Completed
Notes & Justification:
Accomplished:
Complete Feature Documentation - All interactive functionality including dynamic recipe loading from JSON, multi-filter system with search, newsletter popup, comment system with star ratings, social sharing, and mobile navigation with Bootstrap Offcanvas
Technical Implementation Details - Responsive design system (320px-1920px+ breakpoints), accessibility features (WCAG 2.1 compliance, ARIA labels, keyboard navigation), performance optimizations (DOM caching, Intersection Observer), and the complete recipes.json database structure with all 18 recipes
Project Organization & Testing - Team contributions, development challenges with solutions, MS2 Testing Documentation link under the "Testing & Quality Assurance" section, project timeline with Gantt Chart, and installation/setup instructions

_Feedback 4: Managing Projects_
- Add simple planning documents such as a task list, flow chart, Kanban board, or Gantt chart.
- Include notes about what to do if delays happen or if features change.
- Add a short testing and results record.
**************
Assigned To: Chadley Marie De Lara, Karissa Mae Manicad
Status: Completed
Accomplished:
Gantt Chart and Task Timeline via ClickUp (link also attached on README | WST-MS2 Branch) (Chad)
README Updates (Chad)
Gantt chart creation (Mae)
Group Contingency Plan (Chad)
Test and Results Log (Mae)
Note: The Gantt chart has already been created since MS1.

_Feedback 5: Suggested Advanced Features_
- Add more advanced features in later versions such as user accounts, ratings, and recipe submissions.
- Some error messages (like for missing recipe) are simple — you could offer suggestions or links for recovery.
- More explicit tab order control for keyboard users would help.
**************
Assigned To: N/A
Status: Not Implemented
Not Implemented:
The listed features below were not prioritized for this project as the database is not yet a requirement and some of the features don’t align with the nature of our project which is more similar to a personal portfolio website (content generated by authors only).
User accounts system - more of a social media feature
Recipe ratings  - ratings applied but without a database storage
Recipe submission functionality/User-generated content  - more of a social media feature ; defeats the purpose of Recipes 4 Keeps as only the authors can share their recipes on the platform
Error messages (e.g., missing recipes) could offer suggested links for recovery - adding recovery links would add unnecessary UI complexity since users can easily navigate via our main menu, which remains accessible on error pages..
Accomplished:
Recipe Rating Functionality - without database storage 
Explicit Tab Order - used tabindex=”0” on cards/buttons
Found in: 
Category cards (index.html)
Filter buttons (recipes.html)
Team member cards (about.html - via role="button")






## Live Demo

Open `index.html` in your browser to explore the website locally. For the best development experience, use VS Code with the Live Server extension to avoid CORS issues when loading JSON data.

## Project Structure

```
Recipes-4-Keeps/
├── .vscode/
│   └── launch.json              # VS Code debugging configuration
├── images/                       # Recipe and team photos
│   ├── Recipe4Keeps_White.png   # Website logo (white version for header)
│   ├── Japchae.png              # Recipe images (18 total recipes)
│   ├── Molokhia.png
│   ├── Maja Blanca.jpg
│   ├── Ooey Gooey Brownies.png
│   ├── Curry Katsu.png
│   ├── Fettuccine Alfredo.png
│   ├── Siu Mai.jpg
│   ├── Stir-Fry Garlic Bok Choy with Mushroom.jpg
│   ├── Sourdough Like a Pro!.png
│   ├── Pancakes.png
│   ├── Not Another Loaded Fries.png
│   ├── Inabraw (Dinengdeng).png
│   ├── Buttered Garlic Shrimp.png
│   ├── Tabbouleh.jpg
│   ├── Stuffed Grape Leaves.jpg
│   ├── Swedish Meatballs.jpg
│   ├── Yna.jpeg                 # Team member photos
│   ├── Mae.png
│   ├── Rans.jpg
│   └── Chad.jpeg
├── index.html                   # Homepage with featured recipes
├── about.html                   # About Us page with team bios
├── recipes.html                 # All Recipes page with filtering
├── recipe-detail.html           # Individual recipe template
├── script.js                    # Main JavaScript functionality
├── recipe-detail.js             # Recipe detail page specific JS
├── recipes.json                 # Recipe database (16 recipes)
├── styles.css                   # Main stylesheet with responsive design
└── README.md                    # Project documentation
```

## Pages Overview

### Homepage (index.html)

The main landing page that welcomes visitors and showcases what makes our recipes special.

**Key Sections:**
- **Hero Banner**: Eye-catching orange gradient background with our mission statement
- **Featured Recipes**: Dynamic grid display of 4 curated recipes (Japchae, Ooey Gooey Brownies, Molokhia, Maja Blanca) with images, cooking times, and difficulty levels
- **Top Categories**: 6 interactive category cards for quick browsing (Meat, Asian, Main Dish, Vegetable, Dessert, Easy)
- **Browse All Button**: Call-to-action leading to the complete recipe catalog
- **Newsletter Popup**: Subscription form that appears automatically for first-time visitors

**Interactive Features:**
- Sticky navigation header with integrated search functionality
- Hover effects on recipe cards revealing cooking metadata overlay
- Responsive Bootstrap grid layout (4 cols → 2 cols → 1 col)
- Category tags displayed directly below recipe titles
- Smooth scroll animations when recipe cards enter viewport
- Newsletter popup with email validation and localStorage persistence
- Mobile-friendly hamburger menu with Bootstrap Offcanvas

### About Us (about.html)

Tells the story behind Recipes 4 Keeps and introduces the four-person team.

**Key Sections:**
- **Page Header**: Orange gradient banner with title and subtitle
- **Our Story**: Centered narrative explaining how four friends created this recipe collection
- **Meet the Team**: Individual profiles featuring:
  - **Helena Tantoco**: Recreates her mom and grandmother's restaurant-quality dishes
  - **Karissa Mae Manicad**: A loving mom of two who experiments with family-friendly recipes
  - **Rania Abdelfattah**: Brings rich Arab, Egyptian, and Filipino flavors to her cooking
  - **Chadley De Lara**: A pescatarian with an adventurous palate and secret recipes

**Features:**
- Responsive 4-column team grid using Bootstrap (4 cols → 2 cols → 1 col)
- Circular profile images with consistent styling (150px diameter)
- Equal-height cards ensuring visual consistency across all screen sizes
- Browse All Recipes button for easy navigation

### All Recipes (recipes.html)

Browse, search, and filter through the complete catalog of 18 recipes.

**Key Sections:**
- **Page Header**: Orange gradient banner with search prompt
- **Filter Section**: Advanced 4-column filtering system with categories:
  - **Meal Type**: Breakfast, Main Dish, Side Dish, Dessert, Snack
  - **Cuisine Type**: American, Asian, European, Middle Eastern
  - **Ingredient**: Meat, Pantry, Seafood, Vegetable
  - **Difficulty**: Easy, Medium, Hard
- **Recommended Recipes**: All 18 recipes displayed in responsive grid
- **Search Results**: Dynamic section showing filtered results
- **Filter Results**: Visual feedback showing active filters

**Interactive Features:**
- Real-time multi-filter system (AND logic between categories)
- Active filter indicators with checkmarks and highlighted buttons
- Click-to-clear filter functionality
- Search bar integration with keyword matching
- Recipe count display showing number of results
- Visual feedback for active filters (white background, thicker border)
- Smooth animations when filter results appear
- Clear all filters button for easy reset

**Recipe Cards Display:**
- Recipe name and short description
- Hero image with hover zoom effect
- Cooking metadata overlay (total time and difficulty badge)
- Up to 3 category tags
- "View Recipe" button linking to detailed page
- Consistent card heights using flexbox
- Bootstrap responsive grid (4 cols → 3 cols → 2 cols → 1 col)

### Individual Recipe Page (recipe-detail.html)

Comprehensive recipe details with step-by-step instructions and interactive features.

**Key Sections:**
- **Recipe Header**: 
  - Recipe title prominently displayed
  - Hero image (400px height, responsive)
  - Full recipe description
  - Published date and recipe author with icons
  
- **Recipe Metadata Grid**:
  - Prep Time
  - Cook Time
  - Chill Time (conditional, shown only if exists)
  - Servings
  - Difficulty level with color-coded badges (Green: Easy, Orange: Medium, Red: Hard)

- **Recipe Tags**: All applicable category tags (Meal Type, Cuisine, Ingredients, Difficulty)

- **Ingredients Section**:
  - Organized by ingredient categories
  - Precise measurements and ingredient names
  - Clean two-column layout (measurement | ingredient name)

- **Instructions Section**:
  - Numbered steps with circular badges
  - Clear, detailed cooking instructions
  - Border separation between steps for readability

- **Cooking Tips & Notes**:
  - Pro tips for successful cooking
  - Storage recommendations
  - Recipe variations and substitutions

- **Leave a Comment Section**:
  - 5-star rating system with visual star selection
  - Comment text area
  - Name and email fields
  - Bootstrap form validation
  - Success modal confirmation
  - Proper ARIA labels for accessibility

- **Social Sharing**:
  - Facebook sharing
  - X (Twitter) sharing
  - Pinterest sharing (with image)
  - Email sharing
  - Custom styled share buttons with hover effects

- **Navigation**:
  - "Back to All Recipes" button
  - Print Recipe button (appears in navigation bar)

**Interactive Features:**
- Dynamic recipe loading based on URL parameter (?id=recipe-id)
- Total time calculation (prep + cook + chill time)
- Star rating hover preview and selection
- Form validation with visual feedback
- Success modal using Bootstrap Modal
- Print-friendly styling
- Social sharing with pre-populated text and URLs
- Scroll-to-top button
- Smooth animations and transitions

## Technical Features

### JavaScript Functionality (script.js)

**Core Functions:**
- **Recipe Loading**: Asynchronous fetch from recipes.json with error handling
- **Search System**: 
  - Real-time keyword matching across recipe names, descriptions, tags, and ingredients
  - Multi-word search support (AND logic)
  - Cross-page search with sessionStorage
  - Search redirect from homepage to recipes page
  
- **Filter System**:
  - Multi-category filtering with active state management
  - Visual feedback with checkmarks and button highlighting
  - Dynamic result counting
  - Clear all filters functionality
  - Persistent filter state during search
  
- **Category Navigation**: Homepage category cards redirect to recipes page with pre-applied filters
- **Recipe Grid Generation**: Dynamic Bootstrap grid HTML creation from JSON data
- **Animations**: Intersection Observer API for scroll-triggered fade-ins
- **Newsletter**: Popup management with localStorage for one-time display
- **Navigation**: Bootstrap Offcanvas integration for mobile menu
- **Scroll to Top**: Fixed button appearing after 300px scroll
- **Social Sharing**: Dynamic URL generation for social platforms
- **DOM Caching**: Performance optimization through element caching
- **Accessibility**: ARIA live regions for screen reader announcements

### Recipe Detail JavaScript (recipe-detail.js)

**Core Functions:**
- **Recipe Data Loading**: Fetch and display individual recipe based on URL parameter
- **Dynamic Content Population**: 
  - Recipe title, image, and description
  - Metadata (times, servings, difficulty)
  - Tags, ingredients, instructions
  - Cooking tips and notes
  
- **Comment Form**:
  - Star rating system with hover preview
  - Visual star fill on selection
  - Bootstrap form validation
  - Success modal display
  - Form reset on submission
  
- **Helper Functions**:
  - HTML building functions for meta grid, ingredients, instructions, notes
  - Total time calculation from multiple time fields
  - Error handling with user-friendly messages
  - IIFE pattern for module encapsulation

### Responsive Design System

**Breakpoint Strategy:**
```css
- Extra Large Desktop (1920px+): TV/Ultra-wide monitors
- Large Desktop (1400px-1919px): Standard desktop monitors
- Desktop (1200px-1399px): Standard laptop screens
- Half-Screen Desktop (900px-1199px): Small laptops, 3-column recipe grid
- Tablet Portrait (768px-899px): iPads, 2-column recipe grid
- Mobile Portrait (360px-599px): Smartphones, 1-column grid
- Extra Small Phone (320px-359px): Older devices
```

**Adaptive Grid Layouts:**
- Featured Recipes: 4 → 3 → 2 → 1 columns
- Category Cards: 3 × 2 grid → 2 × 3 grid → 1 column
- Team Grid: 4 → 2 → 1 columns
- Filter Section: 4 → 2 → 1 columns
- Recipe Meta Grid: Auto-fit (3-4) → 2 → 1 column

**Mobile Navigation:**
- Bootstrap Offcanvas sliding menu from right
- Hamburger icon with animated bars
- Search bar integrated inside mobile menu
- Body scroll prevention when menu open
- Close button with accessible ARIA labels

### Accessibility Features

**WCAG 2.1 Compliance:**
- Semantic HTML5 elements (header, nav, main, article, section, footer)
- ARIA labels for all interactive elements
- ARIA live regions for dynamic content updates
- ARIA pressed states for toggle buttons (filters)
- Skip to content link (keyboard navigation)
- Focus indicators with 3px outline
- Screen reader only class (.sr-only)
- Descriptive alt text for all images
- Form labels properly associated with inputs
- Button role and tabindex for keyboard navigation
- Keyboard support (Enter and Space key handling)

**Visual Accessibility:**
- High contrast mode support
- Prefers reduced motion support (disables animations)
- Color-coded difficulty badges with text labels
- Consistent focus states throughout
- 4.5:1 minimum contrast ratio
- Touch target minimum 44×44px

**Form Accessibility:**
- Required fields marked with aria-required
- Error messages with aria-describedby
- Invalid state with aria-invalid
- Bootstrap validation feedback
- Clear error descriptions

### Performance Optimizations

- DOM element caching to minimize queries
- Intersection Observer for lazy animations
- CSS will-change property for smooth transitions
- Image optimization (appropriate sizes for use cases)
- Minimal JavaScript dependencies
- Efficient event delegation
- LocalStorage for newsletter preference
- SessionStorage for cross-page data

### Print Styles

- Dedicated @media print rules
- Header and footer hidden
- Navigation elements removed
- Recipe content optimized for A4 paper
- Page break avoidance for recipe cards
- Black and white friendly
- Proper font sizing (12pt body, 16pt titles)

## Recipe Database (recipes.json)

**Structure:**
- 16 total recipes spanning multiple cuisines and difficulty levels
- Comprehensive recipe objects including:
  - Unique ID (URL-friendly slug)
  - Recipe name and short description
  - Full description with personal story
  - Hero image path
  - Prep time, cook time, optional chill time
  - Servings count
  - Difficulty level (Easy, Medium, Hard)
  - Published date
  - Recipe author (team member)
  - Tags array (Meal Type, Cuisine, Ingredients, Difficulty)
  - Ingredients array organized by categories with amounts and names
  - Instructions array (step-by-step strings)
  - Notes array with tips, storage, and variations

**Featured Recipes:**
1. **Japchae Korean Glass Noodles** by Helena Tantoco
2. **Ooey Gooey Brownies** by Chadley De Lara
3. **Molokhia** by Rania Abdelfattah
4. **Maja Blanca** by Karissa Mae Manicad

**Complete Recipe List:**
- Japchae Korean Glass Noodles (Asian, Main/Side, Meat, Vegetables, Medium)
- Maja Blanca (Asian, Dessert, Pantry, Easy)
- Siu Mai (Asian, Main/Side, Meat, Seafood, Medium)
- Stir-Fry Garlic Bok Choy with Mushroom (Asian, Main/Side, Vegetable, Easy)
- Ooey Gooey Brownies (American, Dessert, Pantry, Easy)
- Curry Katsu (Asian, Main, Meat, Medium)
- Molokhia (Middle Eastern, Main/Side, Vegetable, Easy)
- Fettuccine Alfredo (European, Main, Pantry, Easy)
- Sourdough Like a Pro! (European, Snack, Pantry, Hard)
- Fluffy Pancakes (American, Breakfast, Pantry, Easy)
- Not Another Loaded Fries (American, Snack, Meat, Easy)
- Inabraw/Dinengdeng (Asian, Main/Side, Vegetable, Easy)
- Buttered Garlic Shrimp (Asian, Main, Seafood, Easy)
- Tabbouleh (Middle Eastern, Side, Vegetable, Easy)
- Stuffed Grape Leaves (Middle Eastern, Main/Side, Vegetable, Meat, Medium)
- Swedish Meatballs (European, Main, Meat, Medium)

## Design System

### Color Palette

**Primary Colors:**
- Sienna: #D2691E (header gradient start)
- Peru: #CD853F (header gradient end, brand accent)
- Sandy Brown: #F4A460 (hover states)

**Secondary Colors:**
- Orange Red: #ff6b35 (button gradient start)
- Dark Orange: #f7931e (button gradient middle)
- Gold: #ffcc02 (button gradient end)

**Neutral Colors:**
- Dark Gray: #333 (text)
- Medium Gray: #666 (secondary text)
- Light Gray: #999 (footer text)
- Off White: #f8f9fa (section backgrounds)

**Difficulty Badge Colors:**
- Easy: #10b981 (Green)
- Medium: #f59e0b (Orange)
- Hard: #ef4444 (Red)

### Typography

**Font Family:**
- Primary: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif

**Font Sizes:**
- Hero Title: 3rem (clamp 2rem-3.5rem responsive)
- Section Title: 2.5rem (clamp 1.8rem-3rem responsive)
- Recipe Card Title: 1.1rem
- Body Text: 1rem
- Small Text: 0.85rem-0.9rem

**Font Weights:**
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Spacing System

- Extra Small: 0.25rem (4px)
- Small: 0.5rem (8px)
- Medium: 1rem (16px)
- Large: 1.5rem (24px)
- Extra Large: 2rem (32px)
- XXL: 3rem (48px)
- XXXL: 4rem (64px)

### Border Radius

- Small: 8px (cards, buttons)
- Medium: 12px (recipe cards)
- Large: 15px (sections, modals)
- Pill: 25px (buttons, inputs, tags)
- Circle: 50% (profile images, scroll button)

## Technologies Used

**Frontend:**
- HTML5 (Semantic markup, Accessibility attributes)
- CSS3 (Custom properties, Grid, Flexbox, Animations)
- JavaScript ES6+ (Fetch API, Async/Await, Intersection Observer)
- Bootstrap 5.3.2 (Grid system, Offcanvas, Modal, Utilities)
- Font Awesome 6.4.0 (Icons throughout the site)

**Development Tools:**
- VS Code (Primary IDE)
- Live Server (Development server)
- Git (Version control)

**External Resources:**
- Bootstrap CSS & JS (via CDN)
- Font Awesome (via CDN)
- Google Fonts integration ready

## Browser Support

**Tested and fully supported on:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

**Graceful degradation for:**
- Older browsers (fallback fonts, basic layouts)
- Users with JavaScript disabled (static content visible)
- Users with reduced motion preferences


## Development Challenges & Solutions

**Challenge 1: Dynamic Recipe Loading**
- **Issue**: CORS errors when loading recipes.json locally
- **Solution**: Implemented proper error handling and user-friendly error messages; documented need for local server (Live Server or http-server)

**Challenge 2: Multi-Filter Logic**
- **Issue**: Implementing AND logic across different filter categories
- **Solution**: Created Set-based filter system with tag normalization and flexible matching algorithm

**Challenge 3: Mobile Menu Sliding Direction**
- **Issue**: Bootstrap Offcanvas slides from left by default, design called for right-slide
- **Solution**: Custom CSS overrides with transform: translateX(100%) and proper show/hide transitions

**Challenge 4: Equal Height Recipe Cards**
- **Issue**: Varying description lengths caused inconsistent card heights
- **Solution**: Flexbox layout with flex: 1 on content areas and min-height constraints

**Challenge 5: Total Time Calculation**
- **Issue**: Different recipes have different time fields (prep, cook, chill, rest, etc.)
- **Solution**: Dynamic time parser that handles multiple time formats and units (hours, minutes, ranges)

**Challenge 6: Search Cross-Page Functionality**
- **Issue**: Maintaining search context when redirecting from homepage
- **Solution**: SessionStorage for temporary data persistence, automatic search execution on recipes page

**Challenge 7: Accessibility for Dynamic Content**
- **Issue**: Screen readers not announcing filter changes
- **Solution**: Implemented ARIA live regions and proper ARIA attributes for all interactive elements

**Challenge 8: Performance with Multiple Animations**
- **Issue**: Scroll animations causing jank on older devices
- **Solution**: Intersection Observer API for efficient viewport detection, CSS will-change property, prefers-reduced-motion support

## Team Contributions

**Helena Tantoco**
- Front-end developer
- Recipe content (Japchae, Stir-Fry Garlic Bok Choy, Inabraw/Dinengdeng)
- About page team member content
- Recipe testing and refinement

**Rania Abdelfattah**
- Back-end developer
- Recipe content (Molokhia, Fettuccine Alfredo, Tabbouleh, Stuffed Grape Leaves, Swedish Meatballs)
- Recipe detail page layout
- Content organization

**Karissa Mae Manicad**
- Recipe content (Maja Blanca, Siu Mai, Buttered Garlic Shrimp)
- Recipe image curation
- MS2 Testing Documentation

**Chadley De Lara**
- Recipe content (Ooey Gooey Brownies, Curry Katsu, Sourdough, Pancakes, Not Another Loaded Fries)
- README documentation
- Project coordination

## Future Enhancements

**Phase 1 (Short-term):**
- User authentication system
- Save favorite recipes
- Print recipe functionality enhancements
- Recipe ratings and reviews database
- Advanced search with multiple criteria

**Phase 2 (Medium-term):**
- User-submitted recipes
- Recipe collections/meal plans
- Shopping list generator
- Nutritional information calculator
- Recipe scaling (adjust servings)

**Phase 3 (Long-term):**
- Mobile app version
- Video cooking tutorials
- Community features (forums, comments)
- Recipe API for third-party integration
- Multi-language support

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/recipes-4-keeps.git
   cd recipes-4-keeps
   ```

2. **Open in VS Code:**
   ```bash
   code .
   ```

3. **Install Live Server extension** (if not already installed):
   - Open VS Code Extensions (Ctrl+Shift+X)
   - Search for "Live Server"
   - Install by Ritwick Dey

4. **Launch the website:**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Website will open at `http://127.0.0.1:5500/`

**Alternative Setup (Python):**
```bash
# Navigate to project directory
cd recipes-4-keeps

# Start Python HTTP server
python -m http.server 8000

# Open browser to http://localhost:8000
```

## File Organization Best Practices

**Image Naming Convention:**
- Recipe images: PascalCase with spaces (e.g., "Ooey Gooey Brownies.png")
- Team photos: FirstName.extension (e.g., "Yna.jpeg")
- Logo: Descriptive with context (e.g., "Recipe4Keeps_White.png")

**Code Organization:**
- HTML: Semantic structure with clear comments
- CSS: Organized by component with section markers
- JavaScript: IIFE pattern for module encapsulation
- JSON: Properly formatted with 2-space indentation

## Validation & Standards

**HTML Validation:**
- W3C HTML Validator compliant
- Semantic HTML5 elements used throughout
- No deprecated tags or attributes

**CSS Validation:**
- W3C CSS Validator compliant
- Modern CSS features with fallbacks
- Vendor prefixes where necessary

**JavaScript Standards:**
- ES6+ syntax
- Consistent code formatting
- JSDoc comments for functions
- Error handling throughout

**Accessibility:**
- WCAG 2.1 Level AA compliant
- Screen reader tested
- Keyboard navigation support
- Color contrast meets standards

## License

This project is created for educational purposes as part of a web development course. All rights reserved by the team members.

## Acknowledgments

- Recipe content contributed by our family members and personal collections
- Design inspiration from Buzzfeed Tasty and AllRecipes
- Bootstrap and Font Awesome for UI components
- Web development course instructors for guidance and feedback

## Contact

For questions, feedback, or collaboration opportunities, please reach out to the team through our GitHub repository.

---

**Built with ❤️ and a love for cooking**

*Last Updated: November 2025*
