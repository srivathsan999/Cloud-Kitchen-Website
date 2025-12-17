// Cart functionality
(function() {
    'use strict';

    // Cart storage key
    const CART_STORAGE_KEY = 'cloudKitchenCart';
    const DELIVERY_FEE = 2.99;
    const TAX_RATE = 0.08; // 8% tax

    // Get cart from localStorage
    function getCart() {
        const cart = localStorage.getItem(CART_STORAGE_KEY);
        return cart ? JSON.parse(cart) : [];
    }

    // Save cart to localStorage
    function saveCart(cart) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        updateCartCount();
    }

    // Update cart count badge
    function updateCartCount() {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(el => {
            if (totalItems > 0) {
                el.textContent = totalItems;
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });
    }

    // Add item to cart
    function addToCart(name, price, image, description) {
        const cart = getCart();
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: parseFloat(price),
                image: image,
                description: description,
                quantity: 1
            });
        }
        
        saveCart(cart);
        // Re-render cart if we're on the cart page
        const isCartPage = window.location.pathname.includes('cart.html') || 
                          window.location.href.includes('cart.html') ||
                          document.getElementById('cart-items');
        if (isCartPage) {
            renderCart();
        }
    }

    // Remove item from cart
    function removeFromCart(name) {
        const cart = getCart().filter(item => item.name !== name);
        saveCart(cart);
        renderCart();
    }

    // Update item quantity
    function updateQuantity(name, quantity) {
        const cart = getCart();
        const item = cart.find(item => item.name === name);
        if (item) {
            item.quantity = Math.max(1, quantity);
            saveCart(cart);
            renderCart();
        }
    }

    // Calculate totals
    function calculateTotals() {
        const cart = getCart();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * TAX_RATE;
        const total = subtotal + DELIVERY_FEE + tax;
        
        return { subtotal, tax, total };
    }

    // Render cart items
    function renderCart() {
        const cart = getCart();
        const cartItemsContainer = document.getElementById('cart-items');
        const emptyCartDiv = document.getElementById('empty-cart');
        const checkoutBtn = document.getElementById('checkout-btn');
        
        if (!cartItemsContainer) return;

        // Clear existing items (except empty cart message and template)
        const existingItems = cartItemsContainer.querySelectorAll('.cart-item:not(.hidden)');
        existingItems.forEach(item => item.remove());

        if (cart.length === 0) {
            if (emptyCartDiv) emptyCartDiv.classList.remove('hidden');
            if (checkoutBtn) checkoutBtn.disabled = true;
            updateSummary(0, 0, 0);
            return;
        }

        if (emptyCartDiv) emptyCartDiv.classList.add('hidden');
        if (checkoutBtn) checkoutBtn.disabled = false;

        // Render each cart item
        cart.forEach((item, index) => {
            // Create cart item element
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item neomorphic rounded-2xl p-6 cart-item-enter';
            cartItem.setAttribute('data-item-name', item.name);
            cartItem.style.opacity = '1';
            cartItem.style.transform = 'translateY(0)';
            cartItem.innerHTML = `
                <div class="flex flex-col md:flex-row gap-6">
                    <!-- Image Section with gradient overlay -->
                    <div class="relative w-full md:w-44 h-44 rounded-2xl overflow-hidden flex-shrink-0 group">
                        <img src="${item.image || 'https://via.placeholder.com/400x400?text=Food+Image'}" alt="${item.name}" class="w-full h-full object-cover item-image transition-transform duration-300 group-hover:scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    
                    <!-- Content Section -->
                    <div class="flex-1 flex flex-col justify-between">
                        <!-- Header with name and remove button -->
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex-1 pr-4">
                                <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white item-name">${item.name}</h3>
                                <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed item-description">${item.description || 'Delicious food item'}</p>
                            </div>
                            <button class="remove-item group flex-shrink-0 w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 dark:text-red-400 p-2 transition-all hover:scale-110" title="Remove item">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <!-- Footer with quantity controls and price -->
                        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                            <!-- Quantity Controls -->
                            <div class="flex items-center gap-4">
                                <span class="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Qty</span>
                                <div class="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-1">
                                    <button class="decrease-qty w-10 h-10 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 font-bold transition-all hover:scale-110" title="Decrease quantity">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <span class="item-quantity w-12 text-center font-bold text-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg py-2">${item.quantity}</span>
                                    <button class="increase-qty w-10 h-10 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 font-bold transition-all hover:scale-110" title="Increase quantity">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Price Section -->
                            <div class="text-left sm:text-right">
                                ${item.quantity > 1 ? `<div class="text-xs text-gray-500 dark:text-gray-400 mb-1">$${item.price.toFixed(2)} × ${item.quantity}</div>` : ''}
                                <div class="flex items-baseline gap-2">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">$</span>
                                    <span class="item-price text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Event listeners
            cartItem.querySelector('.increase-qty').addEventListener('click', () => {
                updateQuantity(item.name, item.quantity + 1);
            });

            cartItem.querySelector('.decrease-qty').addEventListener('click', () => {
                if (item.quantity > 1) {
                    updateQuantity(item.name, item.quantity - 1);
                }
            });

            cartItem.querySelector('.remove-item').addEventListener('click', () => {
                removeFromCart(item.name);
            });

            // Insert before the template (or empty cart message if template doesn't exist)
            const template = cartItemsContainer.querySelector('.cart-item.hidden');
            if (template) {
                cartItemsContainer.insertBefore(cartItem, template);
            } else {
                cartItemsContainer.appendChild(cartItem);
            }
        });

        // Update summary
        const { subtotal, tax, total } = calculateTotals();
        const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0;
        updateSummary(subtotal, tax, deliveryFee);
    }

    // Update order summary
    function updateSummary(subtotal, tax, deliveryFee) {
        const subtotalEl = document.getElementById('subtotal');
        const taxEl = document.getElementById('tax');
        const totalEl = document.getElementById('total');
        const total = subtotal + tax + deliveryFee;

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    }

    // Initialize quantity controls for items already in cart
    function initializeMenuQuantityControls() {
        const cart = getCart();
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(card => {
            const name = card.querySelector('h3')?.textContent.trim() || '';
            const item = cart.find(cartItem => cartItem.name === name);
            const addToCartBtn = card.querySelector('.add-to-cart-btn');
            
            if (item && addToCartBtn) {
                // Get item details
                const priceElement = card.querySelector('span[class*="bg-gradient-to-r"]') || 
                                   card.querySelector('.text-3xl.font-bold') ||
                                   card.querySelector('.text-2xl.font-bold');
                const priceText = priceElement?.textContent || '$0';
                const price = parseFloat(priceText.replace('$', '')) || 0;
                const image = card.querySelector('img')?.src || '';
                const descriptionEl = card.querySelector('p.text-gray-600.dark\\:text-gray-400');
                const description = descriptionEl?.textContent.trim() || '';
                
                // Replace button with quantity controls
                addToCartBtn.outerHTML = `
                    <div class="flex items-center gap-3">
                        <button class="decrease-qty-btn w-10 h-10 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition transform hover:scale-110 flex items-center justify-center" data-name="${name}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                            </svg>
                        </button>
                        <span class="quantity-display w-12 text-center font-bold text-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-xl py-2" data-name="${name}">${item.quantity}</span>
                        <button class="increase-qty-btn w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-500 dark:from-orange-500 dark:to-orange-600 text-white rounded-xl font-bold hover:from-orange-700 hover:to-orange-600 dark:hover:from-orange-600 dark:hover:to-orange-700 transition transform hover:scale-110 flex items-center justify-center shadow-lg" data-name="${name}" data-price="${price}" data-image="${image}" data-description="${description}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                `;
            }
        });
    }

    // Initialize cart page
    document.addEventListener('DOMContentLoaded', () => {
        updateCartCount();
        
        // Check if we're on the cart page
        const isCartPage = window.location.pathname.includes('cart.html') || 
                          window.location.href.includes('cart.html') ||
                          document.getElementById('cart-items');
        
        if (isCartPage) {
            renderCart();

            // Checkout button
            const checkoutBtn = document.getElementById('checkout-btn');
            if (checkoutBtn) {
                checkoutBtn.addEventListener('click', () => {
                    const cart = getCart();
                    if (cart.length > 0) {
                        window.location.href = 'order.html';
                    }
                });
            }
        }

        // Initialize quantity controls for menu page
        const isMenuPage = window.location.pathname.includes('menu.html') || 
                          window.location.href.includes('menu.html');
        if (isMenuPage) {
            initializeMenuQuantityControls();
        }

        // Transform button to quantity controls
        function showQuantityControls(button, name, price, image, description) {
            const card = button.closest('.menu-item');
            if (!card) return;

            // Get current quantity from cart
            const cart = getCart();
            const existingItem = cart.find(item => item.name === name);
            const quantity = existingItem ? existingItem.quantity : 1;

            // Replace button with quantity controls
            button.outerHTML = `
                <div class="flex items-center gap-3">
                    <button class="decrease-qty-btn w-10 h-10 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition transform hover:scale-110 flex items-center justify-center" data-name="${name}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                    </button>
                    <span class="quantity-display w-12 text-center font-bold text-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-xl py-2" data-name="${name}">${quantity}</span>
                    <button class="increase-qty-btn w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-500 dark:from-orange-500 dark:to-orange-600 text-white rounded-xl font-bold hover:from-orange-700 hover:to-orange-600 dark:hover:from-orange-600 dark:hover:to-orange-700 transition transform hover:scale-110 flex items-center justify-center shadow-lg" data-name="${name}" data-price="${price}" data-image="${image}" data-description="${description}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            `;
        }

        // Update quantity display
        function updateQuantityDisplay(name) {
            const cart = getCart();
            const item = cart.find(item => item.name === name);
            const quantity = item ? item.quantity : 0;
            const display = document.querySelector(`.quantity-display[data-name="${name}"]`);
            if (display) {
                display.textContent = quantity;
                if (quantity === 0) {
                    // Restore add to cart button
                    const controls = display.closest('.flex');
                    if (controls) {
                        const card = controls.closest('.menu-item');
                        if (card) {
                            const priceElement = card.querySelector('span[class*="bg-gradient-to-r"]');
                            const priceText = priceElement?.textContent || '$0';
                            const price = parseFloat(priceText.replace('$', '')) || 0;
                            const image = card.querySelector('img')?.src || '';
                            const descriptionEl = card.querySelector('p.text-gray-600.dark\\:text-gray-400');
                            const description = descriptionEl?.textContent.trim() || '';
                            
                            controls.outerHTML = `
                                <button class="add-to-cart-btn px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-500 dark:from-orange-500 dark:to-orange-600 text-white rounded-xl font-bold hover:from-orange-700 hover:to-orange-600 dark:hover:from-orange-600 dark:hover:to-orange-700 transition transform hover:scale-105 shadow-lg">
                                    Add to Cart
                                </button>
                            `;
                        }
                    }
                }
            }
        }

        // Listen for add to cart events from menu page
        document.addEventListener('click', (e) => {
            // Handle add to cart button
            const button = e.target.closest('.add-to-cart-btn');
            if (button) {
                const card = button.closest('.menu-item');
                if (card) {
                    const name = card.querySelector('h3')?.textContent.trim() || '';
                    // Try multiple selectors for price
                    const priceElement = card.querySelector('span[class*="bg-gradient-to-r"]') || 
                                       card.querySelector('.text-3xl.font-bold') ||
                                       card.querySelector('.text-2xl.font-bold');
                    const priceText = priceElement?.textContent || '$0';
                    const price = parseFloat(priceText.replace('$', '')) || 0;
                    const image = card.querySelector('img')?.src || '';
                    const descriptionEl = card.querySelector('p.text-gray-600.dark\\:text-gray-400');
                    const description = descriptionEl?.textContent.trim() || '';

                    if (name && price > 0) {
                        addToCart(name, price, image, description);
                        showQuantityControls(button, name, price, image, description);
                    }
                }
            }

            // Handle increase quantity button
            const increaseBtn = e.target.closest('.increase-qty-btn');
            if (increaseBtn) {
                const name = increaseBtn.getAttribute('data-name');
                const price = parseFloat(increaseBtn.getAttribute('data-price')) || 0;
                const image = increaseBtn.getAttribute('data-image') || '';
                const description = increaseBtn.getAttribute('data-description') || '';
                
                if (name && price > 0) {
                    addToCart(name, price, image, description);
                    updateQuantityDisplay(name);
                }
            }

            // Handle decrease quantity button
            const decreaseBtn = e.target.closest('.decrease-qty-btn');
            if (decreaseBtn) {
                const name = decreaseBtn.getAttribute('data-name');
                if (name) {
                    const cart = getCart();
                    const item = cart.find(item => item.name === name);
                    if (item && item.quantity > 1) {
                        updateQuantity(name, item.quantity - 1);
                    } else if (item && item.quantity === 1) {
                        removeFromCart(name);
                    }
                    updateQuantityDisplay(name);
                }
            }
        });
    });

    // Export functions for use in other scripts
    window.cartManager = {
        addToCart,
        removeFromCart,
        updateQuantity,
        getCart,
        updateCartCount
    };
})();

