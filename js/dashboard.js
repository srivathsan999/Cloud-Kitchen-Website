// Dashboard functionality for User and Admin dashboards

document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on user dashboard or admin dashboard
    const isUserDashboard = window.location.pathname.includes('user-dashboard');
    const isAdminDashboard = window.location.pathname.includes('admin-dashboard');

    if (isUserDashboard) {
        initializeUserDashboard();
    } else if (isAdminDashboard) {
        initializeAdminDashboard();
    }
});

// User Dashboard Functions
function initializeUserDashboard() {
    // Reorder buttons
    document.querySelectorAll('.reorder-btn').forEach(button => {
        button.addEventListener('click', handleReorder);
    });

    // Track buttons
    document.querySelectorAll('.track-btn').forEach(button => {
        button.addEventListener('click', handleTrackOrder);
    });

    // View All link
    document.querySelectorAll('.view-all-orders-btn').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showAllOrders();
        });
    });

    // Edit Profile button
    document.querySelectorAll('.edit-profile-btn').forEach(button => {
        button.addEventListener('click', handleEditProfile);
    });

    // Favorites link
    document.querySelectorAll('.favorites-btn').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showFavorites();
        });
    });
}

// Admin Dashboard Functions
function initializeAdminDashboard() {
    // Accept buttons
    document.querySelectorAll('.accept-order-btn').forEach(button => {
        button.addEventListener('click', handleAcceptOrder);
    });

    // Reject buttons
    document.querySelectorAll('.reject-order-btn').forEach(button => {
        button.addEventListener('click', handleRejectOrder);
    });

    // Track buttons
    document.querySelectorAll('.track-btn').forEach(button => {
        button.addEventListener('click', handleTrackOrder);
    });

    // View buttons
    document.querySelectorAll('.view-order-btn').forEach(button => {
        button.addEventListener('click', handleViewOrder);
    });

    // View All link
    document.querySelectorAll('.view-all-orders-btn').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showAllOrders();
        });
    });

    // Add Item button
    document.querySelectorAll('.add-menu-item-btn').forEach(button => {
        button.addEventListener('click', handleAddMenuItem);
    });

    // Edit menu item buttons
    document.querySelectorAll('.edit-menu-item-btn').forEach(button => {
        button.addEventListener('click', handleEditMenuItem);
    });

    // Delete menu item buttons
    document.querySelectorAll('.delete-menu-item-btn').forEach(button => {
        button.addEventListener('click', handleDeleteMenuItem);
    });

    // Quick action links
    document.querySelectorAll('.manage-customers-btn').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showManageCustomers();
        });
    });

    document.querySelectorAll('.view-analytics-btn').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showAnalytics();
        });
    });

    document.querySelectorAll('.settings-btn').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSettings();
        });
    });
}

// User Dashboard Handlers
function handleReorder(e) {
    const orderCard = e.target.closest('.border-2');
    const orderId = orderCard.querySelector('span.text-sm')?.textContent || 'Unknown';
    const orderItems = orderCard.querySelector('h3')?.textContent || 'Unknown items';
    
    if (confirm(`Reorder: ${orderItems}\n\nAdd these items to your cart?`)) {
        // Simulate adding to cart
        showNotification('Items added to cart!', 'success');
        // Redirect to cart after a short delay
        setTimeout(() => {
            window.location.href = 'cart.html';
        }, 1000);
    }
}

function handleTrackOrder(e) {
    const orderCard = e.target.closest('.border-2');
    const orderId = orderCard.querySelector('span.text-sm')?.textContent || 'Unknown';
    const orderItems = orderCard.querySelector('h3')?.textContent || 'Unknown items';
    
    // Show tracking modal
    showTrackingModal(orderId, orderItems);
}

function handleEditProfile(e) {
    // Show profile edit modal
    showProfileEditModal();
}

function showAllOrders() {
    showNotification('Loading all orders...', 'info');
    // In a real app, this would load more orders or navigate to an orders page
    setTimeout(() => {
        alert('This would show all your orders. In a real application, this would load more orders or navigate to a dedicated orders page.');
    }, 500);
}

function showFavorites() {
    showNotification('Loading favorites...', 'info');
    setTimeout(() => {
        alert('This would show your favorite items. In a real application, this would display a list of items you\'ve marked as favorites.');
    }, 500);
}

// Admin Dashboard Handlers
function handleAcceptOrder(e) {
    const orderCard = e.target.closest('.border-2');
    const orderId = orderCard.querySelector('span.text-sm')?.textContent || 'Unknown';
    const customerName = orderCard.querySelector('h3')?.textContent || 'Unknown';
    
    if (confirm(`Accept order ${orderId} from ${customerName}?`)) {
        // Update order status
        const statusBadge = orderCard.querySelector('span.px-3');
        if (statusBadge) {
            statusBadge.textContent = 'Accepted';
            statusBadge.className = 'px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold';
        }
        
        // Change button to "Preparing"
        const buttonContainer = orderCard.querySelector('.flex.gap-2');
        if (buttonContainer) {
            buttonContainer.innerHTML = `
                <button class="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition text-sm">
                    Preparing
                </button>
            `;
        }
        
        showNotification(`Order ${orderId} accepted!`, 'success');
    }
}

function handleRejectOrder(e) {
    const orderCard = e.target.closest('.border-2');
    const orderId = orderCard.querySelector('span.text-sm')?.textContent || 'Unknown';
    const customerName = orderCard.querySelector('h3')?.textContent || 'Unknown';
    
    const reason = prompt(`Reject order ${orderId} from ${customerName}?\n\nPlease provide a reason (optional):`);
    
    if (reason !== null) {
        // Remove or update order card
        orderCard.style.opacity = '0.5';
        orderCard.style.pointerEvents = 'none';
        
        const statusBadge = orderCard.querySelector('span.px-3');
        if (statusBadge) {
            statusBadge.textContent = 'Rejected';
            statusBadge.className = 'px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-semibold';
        }
        
        const buttonContainer = orderCard.querySelector('.flex.gap-2');
        if (buttonContainer) {
            buttonContainer.innerHTML = '';
        }
        
        showNotification(`Order ${orderId} rejected.`, 'warning');
    }
}

function handleViewOrder(e) {
    const orderCard = e.target.closest('.border-2');
    const orderId = orderCard.querySelector('span.text-sm')?.textContent || 'Unknown';
    const customerName = orderCard.querySelector('h3')?.textContent || 'Unknown';
    const orderDetails = orderCard.querySelector('p.text-sm')?.textContent || 'No details';
    
    showOrderDetailsModal(orderId, customerName, orderDetails);
}

function handleAddMenuItem() {
    showAddMenuItemModal();
}

function handleEditMenuItem(e) {
    const button = e.target.closest('.edit-menu-item-btn');
    const itemName = button.getAttribute('data-item-name') || 'Unknown';
    const itemPrice = button.getAttribute('data-item-price') || 'Unknown';
    
    showEditMenuItemModal(itemName, itemPrice);
}

function handleDeleteMenuItem(e) {
    const button = e.target.closest('.delete-menu-item-btn');
    const itemName = button.getAttribute('data-item-name') || 'Unknown';
    const menuItemCard = button.closest('.border-2');
    
    if (confirm(`Are you sure you want to delete "${itemName}"?\n\nThis action cannot be undone.`)) {
        // Animate removal
        menuItemCard.style.transition = 'all 0.3s ease';
        menuItemCard.style.transform = 'scale(0)';
        menuItemCard.style.opacity = '0';
        
        setTimeout(() => {
            menuItemCard.remove();
            showNotification(`"${itemName}" has been deleted.`, 'success');
        }, 300);
    }
}

function showManageCustomers() {
    showNotification('Loading customer management...', 'info');
    setTimeout(() => {
        alert('Customer Management\n\nIn a real application, this would show:\n- List of all customers\n- Customer details and order history\n- Customer search and filters\n- Customer communication tools');
    }, 500);
}

function showAnalytics() {
    showNotification('Loading analytics...', 'info');
    setTimeout(() => {
        alert('Analytics Dashboard\n\nIn a real application, this would show:\n- Revenue charts and graphs\n- Order trends over time\n- Popular items analysis\n- Customer demographics\n- Performance metrics');
    }, 500);
}

function showSettings() {
    showNotification('Loading settings...', 'info');
    setTimeout(() => {
        alert('Settings\n\nIn a real application, this would show:\n- Restaurant information\n- Operating hours\n- Delivery settings\n- Payment methods\n- Notification preferences\n- User management');
    }, 500);
}

// Modal Functions
function showTrackingModal(orderId, orderItems) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Order Tracking</h3>
                <button class="close-modal text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="space-y-4">
                <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Order ID</p>
                    <p class="font-semibold text-gray-900 dark:text-white">${orderId}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Items</p>
                    <p class="font-semibold text-gray-900 dark:text-white">${orderItems}</p>
                </div>
                <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div class="space-y-3">
                        <div class="flex items-center gap-3">
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div>
                                <p class="font-semibold text-gray-900 dark:text-white">Order Confirmed</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Order placed and confirmed</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div>
                                <p class="font-semibold text-gray-900 dark:text-white">Preparing</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Your order is being prepared</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                            <div>
                                <p class="text-gray-500 dark:text-gray-400">Out for Delivery</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Estimated arrival: 30-45 min</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="mt-6 w-full px-4 py-2 bg-orange-600 dark:bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-700 dark:hover:bg-orange-600 transition">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.querySelector('button').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function showProfileEditModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h3>
                <button class="close-modal text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input type="text" value="John Doe" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input type="email" value="john@example.com" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                    <input type="tel" value="+1 (234) 567-8900" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                </div>
                <div class="flex gap-3 pt-4">
                    <button type="button" class="close-modal flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        Cancel
                    </button>
                    <button type="submit" class="flex-1 px-4 py-2 bg-orange-600 dark:bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-700 dark:hover:bg-orange-600 transition">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Profile updated successfully!', 'success');
        modal.remove();
        // In a real app, update the profile display
        setTimeout(() => {
            location.reload();
        }, 1000);
    });
    
    modal.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => modal.remove());
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function showOrderDetailsModal(orderId, customerName, orderDetails) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Order Details</h3>
                <button class="close-modal text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="space-y-4">
                <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Order ID</p>
                    <p class="font-semibold text-gray-900 dark:text-white">${orderId}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Customer</p>
                    <p class="font-semibold text-gray-900 dark:text-white">${customerName}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Order Details</p>
                    <p class="font-semibold text-gray-900 dark:text-white">${orderDetails}</p>
                </div>
                <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Status</p>
                    <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">Delivered</span>
                </div>
            </div>
            <button class="mt-6 w-full px-4 py-2 bg-orange-600 dark:bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-700 dark:hover:bg-orange-600 transition">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.querySelector('button').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function showAddMenuItemModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Add Menu Item</h3>
                <button class="close-modal text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Item Name</label>
                    <input type="text" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Price</label>
                    <input type="number" step="0.01" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <textarea rows="3" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"></textarea>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                    <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option>Burgers</option>
                        <option>Pasta</option>
                        <option>Salads</option>
                        <option>Chicken</option>
                        <option>Desserts</option>
                    </select>
                </div>
                <div class="flex gap-3 pt-4">
                    <button type="button" class="close-modal flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        Cancel
                    </button>
                    <button type="submit" class="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition">
                        Add Item
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Menu item added successfully!', 'success');
        modal.remove();
        // In a real app, add the item to the menu list
    });
    
    modal.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => modal.remove());
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function showEditMenuItemModal(itemName, itemPrice) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Edit Menu Item</h3>
                <button class="close-modal text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Item Name</label>
                    <input type="text" value="${itemName}" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Price</label>
                    <input type="number" step="0.01" value="${itemPrice.match(/\$([\d.]+)/)?.[1] || ''}" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <textarea rows="3" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                </div>
                <div class="flex gap-3 pt-4">
                    <button type="button" class="close-modal flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        Cancel
                    </button>
                    <button type="submit" class="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification(`"${itemName}" updated successfully!`, 'success');
        modal.remove();
    });
    
    modal.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => modal.remove());
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };
    
    notification.className = `fixed top-20 right-4 ${colors[type] || colors.info} text-white px-6 py-3 rounded-lg shadow-2xl z-50 transform transition-all duration-300`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

