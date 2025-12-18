// Mobile menu toggle
(function() {
    'use strict';

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');
        // Don't close if clicking inside menu, menu button, or theme toggle button
        if (mobileMenu && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuButton.contains(e.target) &&
            !(themeToggleMobile && themeToggleMobile.contains(e.target))) {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
})();

