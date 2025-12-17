// Menu filter functionality
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const menuItems = document.querySelectorAll('.menu-item');

        // Filter function
        function filterMenu(category) {
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = '';
                    // Re-trigger animation if needed
                    if (!item.classList.contains('animate-fade-in')) {
                        item.classList.add('animate-on-scroll');
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // Update active button styling
        function setActiveButton(activeBtn) {
            filterButtons.forEach(btn => {
                const category = btn.getAttribute('data-category');
                if (btn === activeBtn) {
                    // Active state - gradient button
                    btn.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
                    btn.classList.add('bg-gradient-to-r', 'from-orange-600', 'to-orange-500', 'dark:from-orange-500', 'dark:to-orange-600', 'text-white', 'shadow-lg', 'active');
                } else {
                    // Inactive state - gray button
                    btn.classList.remove('bg-gradient-to-r', 'from-orange-600', 'to-orange-500', 'dark:from-orange-500', 'dark:to-orange-600', 'text-white', 'shadow-lg', 'active');
                    btn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
                }
            });
        }

        // Add click event listeners to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                filterMenu(category);
                setActiveButton(button);
            });
        });
    });
})();

