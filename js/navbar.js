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

    // Mobile Home Dropdown Toggle
    const mobileHomeDropdownToggle = document.getElementById('mobile-home-dropdown-toggle');
    const mobileHomeDropdown = document.getElementById('mobile-home-dropdown');
    const mobileHomeDropdownIcon = document.getElementById('mobile-home-dropdown-icon');

    if (mobileHomeDropdownToggle && mobileHomeDropdown && mobileHomeDropdownIcon) {
        mobileHomeDropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileHomeDropdown.classList.toggle('hidden');
            mobileHomeDropdownIcon.classList.toggle('rotate-180');
        });
    }

    // Mobile Dashboard Dropdown Toggle
    const mobileDashboardDropdownToggle = document.getElementById('mobile-dashboard-dropdown-toggle');
    const mobileDashboardDropdown = document.getElementById('mobile-dashboard-dropdown');
    const mobileDashboardDropdownIcon = document.getElementById('mobile-dashboard-dropdown-icon');

    if (mobileDashboardDropdownToggle && mobileDashboardDropdown && mobileDashboardDropdownIcon) {
        mobileDashboardDropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileDashboardDropdown.classList.toggle('hidden');
            mobileDashboardDropdownIcon.classList.toggle('rotate-180');
        });
    }
})();

