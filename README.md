# Recipes4Keeps

A responsive recipe sharing website built with HTML5 and CSS3 that celebrates family recipes and culinary traditions. This project showcases modern web development practices including accessibility, responsive design, and clean semantic markup.

## About the Project

Recipes4Keeps is a platform where users can browse, search, and discover family recipes passed down through generations. The website emphasizes the cultural significance of food and the importance of preserving culinary traditions. Built by four friends who bonded over their love for cooking, this site represents our journey in sharing treasured recipes from our families.

The design uses a warm orange gradient color scheme that evokes comfort and home cooking, perfectly matching our tagline: "Foods and recipes are treasures worth keeping..."

## Live Demo

Open `index.html` in your browser to explore the website locally.

## Project Structure

```
MS1 - HTML + CSS/
├── .vscode/
│   └── launch.json          # VS Code debugging configuration
├── images/                   # Recipe and team photos
│   ├── Recipe4Keeps_White.png
│   ├── Japchae.png
│   ├── Molokhia.png
│   └── ...
├── index.html               # Homepage with featured recipes
├── about.html              # About Us page with team bios
├── recipes.html            # All Recipes page with filtering options
├── recipe-detail.html      # Individual recipe template
├── styles.css              # Main stylesheet with responsive design
└── README.md               # Project documentation
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
- Responsive grid layout that adapts from 4 columns to 1 column based on screen size

### About Us (about.html)

Tells the story behind Recipes 4 Keeps and introduces the team.

**Key Sections:**
- **Our Story**: Centered narrative explaining how four friends created this recipe collection
- **Meet the Team**: Individual profiles for Helena, Karissa, Rania, and Chadley with photos and personal bios

**Features:**
- Orange gradient page header matching the site's color scheme
- 4-column team grid that stacks responsively on smaller screens
- Circular profile images with consistent styling

### All Recipes (recipes.html)

Browse and filter through the complete recipe catalog.

**Key Sections:**
- **Filter System**: 4 category groups (Meal Type, Cuisine Type, Ingredient, Difficulty)
- **Recipe Grid**: 8 recipe cards with comprehensive information
- **Recommended Recipes Section**: Left-aligned title for better visual hierarchy

**Filter Categories:**
- **Meal Type**: Breakfast, Main Dish, Side Dish, Dessert, Snack
- **Cuisine Type**: American, Asian, European, Middle Eastern
- **Ingredient**: Meat, Pantry, Seafood, Vegetable
- **Difficulty**: Easy, Medium, Hard

**Features:**
- Interactive filter buttons with gradient backgrounds and hover effects
- Consistent recipe card design across all pages
- 4-column grid layout (locked for wider screens, responsive for tablets and mobile)

### Recipe Detail (recipe-detail.html)

Displays complete recipe information with step-by-step instructions.

**Key Sections:**
- **Recipe Header**: Large hero image paired with recipe description
- **Recipe Metadata**: Grid showing prep time, cook time, servings, and difficulty
- **Ingredients List**: Organized by category with measurements and ingredient names
- **Instructions**: Numbered steps with clear, detailed directions
- **Cooking Tips**: Pro tips, storage information, and variation suggestions
- **Social Sharing**: Buttons for Facebook, X (Twitter), Pinterest, and Email

**Features:**
- Two-column layout for desktop (image and info side by side)
- Color-coded difficulty badges (green for Easy, orange for Medium, red for Hard)
- Back to Recipes navigation button
- Print-friendly styles for easy recipe printing

## Design System

### Color Palette

The color scheme was carefully chosen to create a warm, inviting atmosphere:

- **Primary Orange** (#ff6b35): Main brand color used in gradients and primary buttons
- **Secondary Orange** (#f7931e): Accent color for hover states and transitions
- **Light Orange** (#ffcc02): Highlight color for gradient endpoints
- **Background** (#f8f9fa): Soft gray for page backgrounds
- **Text Primary** (#333): Dark gray for optimal readability
- **Text Secondary** (#666): Medium gray for descriptions and metadata

### Typography

- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Font Sizes**: Hierarchical sizing from 3rem headings to 0.8rem tags
- **Line Height**: 1.6 for body text, ensuring comfortable reading
- **Font Weights**: Strategic use of 500-700 weights for emphasis

### Layout Patterns

**Grid System**: CSS Grid powers the responsive layouts throughout the site
- Recipe grid locked to 4 columns on large screens (1200px+)
- Adapts to 3 columns on tablets (1024px-1199px)
- Switches to 2 columns on smaller tablets (768px-1023px)
- Single column for mobile devices (below 768px)

**Card Design**: Consistent card styling across all recipe displays
- Rounded corners (8-15px border radius)
- Subtle shadows (0 5px 20px rgba(0,0,0,0.1))
- Hover animations with translateY transforms
- White background with proper contrast

**Navigation**: Sticky header that remains accessible while scrolling
- CSS-only hamburger menu for mobile devices
- Smooth transitions between navigation states
- Integrated search bar with rounded styling

## Technical Features

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
- **Keyboard Navigation**: Full keyboard accessibility for all interactive elements
- **Screen Reader Support**: `.sr-only` class for visually hidden but screen-reader-accessible content

### Advanced CSS Features

**CSS-only Hamburger Menu**: No JavaScript required for mobile navigation
- Uses hidden checkbox (`#nav-toggle`) to control menu state
- Animated hamburger icon transforms into X when active
- Full-screen mobile menu with smooth slide-in transition

**Gradient Backgrounds**: Consistent orange gradient throughout
- Hero section: `linear-gradient(135deg, #ff6b35, #f7931e, #ffcc02)`
- Header: `linear-gradient(135deg, #D2691E, #CD853F)`
- Buttons: `linear-gradient(135deg, #ff6b35, #f7931e)`

**Hover Effects**: Engaging micro-interactions
- Recipe cards lift on hover with `translateY(-5px)`
- Filter buttons scale and change gradient
- Social icons move up slightly on hover
- Image zoom effects on recipe card photos

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
- No JavaScript frameworks required

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
            "file": "c:\\Users\\USER\\Downloads\\MS1 - HTML + CSS\\index.html"
        }
    ]
}
```

**Note**: Update the file path to match your local directory structure.

### Recommended Extensions

- **Live Server**: For live reloading during development
- **HTML CSS Support**: Enhanced IntelliSense for web development
- **Prettier**: Code formatting for consistent style

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
- Header with navigation
- Main content area
- Footer with social links and privacy notice

### CSS Organization

The `styles.css` file is organized into logical sections:

1. **Reset and Base Styles**: Universal styles and accessibility classes
2. **Header Component**: Navigation and search functionality
3. **Main Content Wrapper**: Shared layout container
4. **Homepage Specific**: Hero, browse section, categories
5. **Recipes Page Specific**: Page header, filters, recipe grid
6. **About Page Specific**: Story section, team grid
7. **Recipe Detail Specific**: Recipe layout, ingredients, instructions
8. **Shared Components**: Recipe cards, buttons, footer
9. **Responsive Design**: Media queries from largest to smallest screens
10. **Accessibility Features**: Special media queries and focus management

### Image Management

All images are stored in the `/images` directory:
- **Logo**: `Recipe4Keeps_White.png`
- **Recipe Photos**: Named after the dish (e.g., `Japchae.png`, `Molokhia.png`)
- **Team Photos**: Named after team members (e.g., `Yna.jpeg`, `Mae.png`)

**Image Requirements:**
- Recipe photos: Recommended 600x400px minimum
- Team photos: Square format, minimum 300x300px
- Logo: PNG with transparent background

## Content Management

### Recipe Card Structure

Each recipe card includes:
- High-quality food photography
- Recipe title (max 3 lines for visual consistency)
- Brief description (2-3 sentences)
- Cooking time with clock icon
- Difficulty badge (color-coded)
- Category tags (cuisine, meal type, etc.)
- "View Recipe" call-to-action button

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

**Challenge**: Recipe cards had inconsistent heights because tags appeared at different positions.

**Solution**: Restructured the card content order using CSS flexbox with `order` property, placing tags immediately after titles. Used `margin-top: auto` on the button to push it to the bottom of each card.

### CSS-only Mobile Navigation

**Challenge**: Creating a functional mobile menu without JavaScript.

**Solution**: Implemented a hidden checkbox pattern with adjacent sibling selectors. The checkbox state controls menu visibility and hamburger animation through pure CSS.

### Footer Layout Lock

**Challenge**: Footer content spreading too wide on ultra-wide displays.

**Solution**: Set maximum widths on footer sections and used `margin: 0 auto` for centering. Added responsive padding that scales with viewport size.

### Consistent Recipe Card Spacing

**Challenge**: Cards bunching together vertically, especially on larger screens.

**Solution**: Implemented explicit `row-gap` values with `!important` to ensure consistent vertical spacing. Set `grid-auto-rows` with `minmax()` for uniform card heights.

## Future Enhancements

### JavaScript Integration

**Search Functionality**: Implement real-time recipe search
- Filter recipes by keywords
- Highlight matching results
- Clear search button

**Filter System**: Make recipe filters interactive
- Toggle active filter states
- Dynamically show/hide matching recipes
- Multiple filter selection
- Clear all filters button

**Form Handling**: Add user interaction features
- Contact form with validation
- Newsletter signup
- User recipe submissions

**Dynamic Content**: Recipe management features
- Recipe loading and pagination
- Lazy loading for images
- Infinite scroll option

### Backend Integration

**Database**: Recipe storage and management system
- MySQL or PostgreSQL for recipe data
- User authentication system
- Recipe CRUD operations

**User Accounts**: Personal recipe collections
- Save favorite recipes
- Create personal cookbooks
- Share recipes with friends

**Admin Panel**: Content management system
- Add/edit/delete recipes
- Manage team information
- View site analytics

**API Integration**: External recipe services
- Import recipes from popular sites
- Nutritional information API
- Ingredient substitution suggestions

### Additional Features

**Recipe Ratings**: User review system
- Star rating system
- Written reviews
- Helpful vote buttons
- Sort by rating

**Print Recipes**: Enhanced printing
- Printer-friendly layout
- Optional sections toggle
- Shopping list format

**Social Sharing**: Expanded sharing options
- Custom share images
- Pre-filled social media posts
- Copy link functionality

**Mobile App**: Progressive Web App features
- Install prompt
- Offline functionality
- Push notifications for new recipes

**Advanced Search**: Enhanced filtering
- Ingredient-based search
- Dietary restrictions filter
- Cooking time ranges
- Multi-select categories

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

**Accessibility Testing:**
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Screen reader (NVDA or JAWS)
- [ ] High contrast mode
- [ ] Zoom to 200%
- [ ] Print preview

### Performance Considerations

**Optimization Checklist:**
- [ ] Compress all images (use TinyPNG or similar)
- [ ] Minify CSS for production
- [ ] Enable gzip compression on server
- [ ] Optimize Font Awesome loading
- [ ] Add caching headers
- [ ] Test loading speed (aim for under 3 seconds)

## Maintenance Notes

### Regular Updates

**Content Refresh:**
- Add new recipes monthly
- Update team information as needed
- Replace placeholder content with real data
- Keep copyright year current in footer

**Technical Maintenance:**
- Run HTML validation (W3C Validator)
- Check CSS for deprecated properties
- Test with new browser versions
- Update Font Awesome CDN link if needed
- Review and update documentation

**Accessibility Audits:**
- Run Lighthouse audit quarterly
- Test with screen readers
- Verify keyboard navigation
- Check color contrast ratios
- Validate ARIA labels

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

**Performance Standards:**
- Images under 200KB each
- CSS file under 100KB
- Total page weight under 2MB
- First contentful paint under 2 seconds

## Credits and Acknowledgments

**Team Members:**
- **Helena Tantoco**: Recipe collection and content curation
- **Karissa Mae Manicad**: Recipe testing and photography
- **Rania Abdelfattah**: Cultural recipe research and writing
- **Chadley De Lara**: Project coordination and content editing

**External Resources:**
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

*Last Updated: September 2025*
