## Project Overview

**Recipes 4 Keeps** is a responsive recipe sharing website built with HTML5 and CSS3. The platform allows users to browse, search, and discover family recipes that have been passed down through generations. The website emphasizes the cultural significance of food and preserving culinary traditions.

### Theme
The website uses a warm orange gradient color scheme that evokes feelings of comfort and home cooking, reflecting the tagline "Foods and recipes are treasures worth keeping..."

## Project Structure

```
MS1 - HTML + CSS/
├── .vscode/
│   └── launch.json          # VS Code debugging configuration
├── index.html               # Homepage
├── about.html              # About Us page
├── recipes.html            # All Recipes page with filters
├── recipe-detail.html      # Individual recipe page template
└── styles.css              # Main stylesheet
```

## Pages Overview

### 1. Homepage (`index.html`)
**Purpose**: Main landing page introducing the website and featuring highlighted recipes.

**Key Features**:
- Hero section with gradient background and tagline
- Featured recipes grid (4 recipe cards)
- Top categories section (6 category boxes)
- "Browse All" call-to-action button
- Responsive navigation with search functionality

**Content Sections**:
- Navigation header with logo and search
- Hero banner with mission statement
- Featured recipes showcase
- Category browsing options
- Footer with social links and privacy notice

### 2. About Us (`about.html`)
**Purpose**: Tells the story of the four friends behind the website and their cooking journey.

**Key Features**:
- Orange gradient page header
- Centered story content
- Team member grid (4 members)
- Individual member profiles with placeholder images

**Content Sections**:
- Page header with title and subtitle
- "Our Story" section explaining the website's origin
- "Meet the Team" section with member cards
- Individual bios for Helena, Karissa, Rania, and Chadley

### 3. All Recipes (`recipes.html`)
**Purpose**: Browse and filter through all available recipes.

**Key Features**:
- Advanced filtering system with 4 categories
- Recipe grid layout (8 recipe cards)
- Interactive filter boxes with hover effects
- Responsive design for different screen sizes

**Filter Categories**:
- **Cuisine Type**: Filipino, Arab, Japanese, South Korean, Chinese
- **Meal Type**: Breakfast, Lunch, Dinner, Main Course, Dessert, Pasta, Snack
- **Ingredient**: Chicken, Fish, Vegetables, Beef, Pork
- **Difficulty**: Easy, Medium, Hard

### 4. Recipe Detail (`recipe-detail.html`)
**Purpose**: Display complete recipe information including ingredients and instructions.

**Key Features**:
- Two-column layout (image and recipe info)
- Detailed recipe metadata (prep time, cook time, servings, difficulty)
- Structured ingredients list
- Step-by-step instructions
- Cooking tips and notes section
- Social sharing buttons
- Back navigation

**Content Sections**:
- Recipe header with image and basic info
- Ingredients section with measurements
- Instructions with numbered steps
- Cooking tips and variations
- Social sharing options

## Design System

### Color Palette
- **Primary Orange**: `#ff6b35` - Main brand color
- **Secondary Orange**: `#f7931e` - Accent color
- **Light Orange**: `#ffcc02` - Highlight color
- **Background**: `#f8f9fa` - Light gray background
- **Text**: `#333` - Dark gray for readability
- **Secondary Text**: `#666` - Medium gray

### Typography
- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Headings**: Bold weights with appropriate sizing hierarchy
- **Body Text**: 1rem base size with 1.6 line height for readability

### Layout Patterns
- **Grid System**: CSS Grid for responsive layouts
- **Cards**: Rounded corners (8-15px), subtle shadows, hover effects
- **Buttons**: Gradient backgrounds, rounded corners, hover animations
- **Navigation**: Sticky header with search integration

## Technical Features

### Responsive Design
- **Mobile-first approach** with breakpoints at:
  - 768px (tablet)
  - 480px (mobile)
- **Flexible grid layouts** that adapt to screen size
- **Collapsible navigation** for mobile devices
- **Scalable images** and typography

### Accessibility Features
- **Focus indicators** with high contrast outlines
- **Screen reader support** with proper ARIA labels
- **Semantic HTML structure** for better navigation
- **High contrast mode support** for users with visual impairments
- **Reduced motion support** for users with vestibular disorders

### Interactive Elements
- **Hover effects** on cards, buttons, and navigation
- **Transform animations** for visual feedback
- **Gradient transitions** on interactive elements
- **Filter system** (visual only - requires JavaScript for functionality)

### Browser Support
- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **CSS Grid and Flexbox** support required
- **Font Awesome icons** for consistent iconography
- **Print-friendly styles** for recipe printing

## Development Configuration

### VS Code Setup
The project includes VS Code configuration for easy development:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Open about.html",
            "file": "c:\\Users\\USER\\Downloads\\MS1 - HTML + CSS\\about.html"
        }
    ]
}
```

### File Organization
- **Inline CSS**: Each HTML file contains page-specific styles in `<style>` tags
- **External CSS**: Main stylesheet (`styles.css`) contains global styles
- **Font Icons**: Font Awesome CDN for consistent iconography
- **Images**: Placeholder images from via.placeholder.com

## Content Management

### Recipe Card Structure
Each recipe card includes:
- High-quality placeholder image
- Recipe title and description
- Cooking time indicator
- Difficulty level badge
- Category tags
- "View Recipe" call-to-action

### Team Member Structure
Each team member includes:
- Profile photo (placeholder)
- Name and bio
- Consistent styling and layout
- Personal cooking story template

### Navigation Structure
- **Home**: Featured content and categories
- **Recipes**: Browsable catalog with filters
- **About**: Team and story information
- **Search**: Global search functionality (visual only)

## Future Enhancement Opportunities

### JavaScript Integration
- **Filter functionality**: Make recipe filters interactive
- **Search implementation**: Enable recipe search
- **Form handling**: Contact forms and user interactions
- **Dynamic content**: Recipe loading and pagination

### Backend Integration
- **Database**: Recipe storage and management
- **User accounts**: Personal recipe collections
- **Admin panel**: Content management system
- **API integration**: Recipe data services

### Additional Features
- **Recipe ratings**: User review system
- **Print recipes**: Optimized recipe printing
- **Recipe sharing**: Social media integration
- **Mobile app**: Progressive Web App features

## Browser Testing

### Recommended Testing
- **Desktop browsers**: Chrome, Firefox, Safari, Edge
- **Mobile devices**: iOS Safari, Android Chrome
- **Tablet devices**: iPad, Android tablets
- **Print preview**: Ensure recipes print properly

### Performance Considerations
- **Image optimization**: Compress images for faster loading
- **CSS minification**: Reduce file sizes for production
- **Font loading**: Optimize web font delivery
- **CDN usage**: Font Awesome and other external resources

## Maintenance Notes

### Regular Updates
- **Content updates**: Add new recipes and team information
- **Image replacement**: Replace placeholder images with real photos
- **Accessibility audit**: Regular accessibility testing
- **Browser compatibility**: Test with new browser versions

### Code Quality
- **HTML validation**: Ensure semantic markup
- **CSS organization**: Maintain consistent styling patterns
- **Performance monitoring**: Track loading times
- **User feedback**: Gather and implement user suggestions

---

## Getting Started

1. **Clone or download** the project files
2. **Open in VS Code** for best development experience
3. **Use Live Server** extension for local development
4. **Test responsive design** at different screen sizes
5. **Replace placeholder content** with actual recipes and images

## License and Usage

This project serves as a template for recipe sharing websites. The code structure and design patterns can be adapted for similar food-related projects while maintaining the warm, community-focused aesthetic.

---

*Created for educational purposes as part of a web development project. The design emphasizes accessibility, responsive design, and modern CSS techniques.*
