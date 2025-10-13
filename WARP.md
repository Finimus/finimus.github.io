# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a modern, responsive portfolio website clone built with vanilla HTML5, CSS3, and JavaScript. It features a dark theme with gradient accents, smooth animations, and interactive elements. The project uses TailwindCSS via CDN for utility classes and custom CSS for advanced styling and animations.

## Development Commands

### Local Development
```powershell
# Serve the website using Python (if installed)
python -m http.server 8000

# Serve using Node.js (if npx/node installed)
npx serve .

# Serve using PHP (if PHP installed)  
php -S localhost:8000

# Simple option: Open index.html directly in browser
start index.html
```

### File Watching and Live Reload
```powershell
# If you need live reload, you can use browser-sync
npx browser-sync start --server --files "**/*" --no-notify

# Or use live-server
npx live-server --port=8000
```

### Deployment
```powershell
# Deploy to GitHub Pages (push to main branch, enable Pages in repo settings)
git add .
git commit -m "Update portfolio"
git push origin main

# Deploy to Netlify (drag and drop build folder)
# Or use Netlify CLI
npx netlify deploy --prod --dir=.
```

## Architecture Overview

### File Structure
- **`index.html`** - Main HTML file with semantic structure, contains all page sections
- **`css/styles.css`** - Custom CSS with CSS custom properties, animations, and responsive design
- **`js/main.js`** - JavaScript functionality including mobile menu, smooth scrolling, animations, and utilities
- **`assets/`** - Additional assets (currently empty, reserved for future use)
- **`images/`** - Image assets directory

### Key Architecture Patterns

#### CSS Architecture
- **CSS Custom Properties**: All colors and theming variables defined in `:root` for easy customization
- **Utility Classes**: Mix of TailwindCSS utilities and custom utility classes for common patterns
- **Component-Based Styles**: Each UI component (buttons, cards, forms) has dedicated CSS classes
- **Progressive Enhancement**: Graceful degradation for older browsers and accessibility support

#### JavaScript Architecture
- **Module Pattern**: All functionality wrapped in DOMContentLoaded event listener
- **Event Delegation**: Efficient event handling for dynamic content
- **Throttled Events**: Performance optimized scroll and resize handlers using throttle utility
- **Observer Pattern**: Intersection Observer for scroll-triggered animations
- **Utility Functions**: Reusable throttle, debounce, and notification helpers

#### Component System
- **Mobile Menu**: Toggle-based overlay menu with smooth animations
- **Navigation**: Auto-hiding navbar with active section highlighting  
- **Form Handling**: Async form submission with loading states and notifications
- **Animations**: CSS-based animations triggered by JavaScript observers
- **Performance**: Lazy loading, preloading, and optimized event handlers

## Key Technologies & Dependencies

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom properties, flexbox, grid, animations, and responsive design
- **JavaScript ES6+**: Modern features, async/await, DOM manipulation
- **TailwindCSS**: Utility-first CSS framework (loaded via CDN)
- **Google Fonts**: Inter font family for typography

## Development Guidelines

### CSS Customization
- Modify color scheme in `:root` CSS custom properties in `css/styles.css`
- All animations respect `prefers-reduced-motion` for accessibility
- Use existing utility classes before creating new ones
- Follow the gradient theme (blue to purple) for consistency

### JavaScript Development
- All new functionality should be added within the main DOMContentLoaded listener
- Use throttle/debounce utilities for performance-sensitive operations
- Follow the existing error handling patterns
- Use the showNotification utility for user feedback

### Content Updates
- Update hero section, about content, and projects in `index.html`
- Project cards follow consistent structure with hover effects
- Contact form uses placeholder submission (replace with actual backend)
- Social links are placeholder (update href attributes)

### Performance Considerations
- Images should use lazy loading with `data-src` attribute
- Critical resources are preloaded
- Event handlers are throttled for scroll/resize events
- Animations use CSS transforms for better performance

### Responsive Design
- Mobile-first approach with responsive breakpoints:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px  
  - Desktop: 1024px+
- Mobile menu for smaller screens
- Responsive typography scales defined in CSS

## Common Development Tasks

### Adding New Sections
1. Add semantic HTML structure in `index.html`
2. Add navigation link in both desktop and mobile menus
3. Style the section in `css/styles.css`
4. Add intersection observer for animations in `js/main.js`

### Customizing Animations
- CSS animations defined in `css/styles.css` with keyframes
- JavaScript-triggered animations use classes added by Intersection Observer
- Cursor trail and scroll progress are performance-optimized

### Form Integration
- Replace the placeholder form submission in `js/main.js` with actual backend endpoint
- Maintain loading states and error handling patterns
- Use existing notification system for user feedback

## Browser Support
- Modern browsers: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- Mobile browsers: iOS Safari 12+, Chrome Mobile 60+
- Progressive enhancement for older browsers

## Accessibility Features
- Keyboard navigation support with focus indicators
- Screen reader friendly with ARIA attributes
- Color contrast compliance
- Reduced motion support for animations
- Semantic HTML structure with proper heading hierarchy