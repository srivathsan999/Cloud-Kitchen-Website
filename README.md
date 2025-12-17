# Cloud Kitchen Website

A modern, responsive cloud kitchen website built with HTML5, Tailwind CSS, and Vanilla JavaScript.

## Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Dark/Light Theme**: Toggle between light and dark modes with persistent preference
- **Smooth Animations**: Scroll-triggered animations using IntersectionObserver
- **Glassmorphism**: Applied to navbar, hero overlay, and login card
- **Neomorphism**: Applied to menu food cards and primary buttons
- **Mobile Menu**: Hamburger menu for mobile navigation

## File Structure

```
cloud-kitchen/
├── index.html          # Landing / Home page
├── menu.html           # Menu listing page
├── about.html          # Kitchen story page
├── order.html          # Order / CTA page
├── contact.html        # Contact & location page
├── login.html          # Login page (no navbar/footer)
├── assets/
│   ├── images/         # Image assets
│   └── icons/          # Icon assets
├── css/
│   └── styles.css      # Tailwind overrides and custom styles
├── js/
│   ├── theme.js        # Theme toggle logic
│   ├── animations.js   # Scroll animations
│   └── navbar.js       # Mobile menu functionality
└── README.md           # This file
```

## Setup

1. Open `index.html` in a web browser
2. No build process required - all dependencies are loaded via CDN

## Technologies Used

- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript (ES6)
- Google Fonts (Inter)

## Browser Support

Modern browsers that support:
- ES6 JavaScript
- CSS Grid and Flexbox
- IntersectionObserver API

## Notes

- Images use colored placeholder divs instead of broken image tags
- Theme preference is stored in localStorage
- All pages are responsive and follow a consistent design system

