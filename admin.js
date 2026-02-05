// Admin Dashboard JavaScript

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAdminAuth();
    loadDashboardData();
    setupEventListeners();
});

function loadDashboardData() {
    loadOrders();
    loadMessages();
    updateStatistics();
}

function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('medicineOrders') || '[]');
    const tbody = document.getElementById('ordersTableBody');
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No orders found</td></tr>';
        return;
    }
    
    // Sort by date (newest first)
    orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    
    tbody.innerHTML = orders.map((order, index) => `
        <tr>
            <td><strong>${order.orderId}</strong></td>
            <td>${order.customerName}</td>
            <td><a href="tel:${order.customerMobile}">${order.customerMobile}</a></td>
            <td>
                <span class="badge bg-secondary">${order.medicines.length} items</span>
            </td>
            <td>${order.deliveryOption === 'delivery' ? 'Home Delivery' : 'Store Pickup'}</td>
            <td>${formatDate(order.orderDate)}</td>
            <td><span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span></td>
            <td>
                <button class="btn btn-sm action-btn btn-view" onclick="viewOrderDetail(${index})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm action-btn btn-status" onclick="updateOrderStatus(${index})">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm action-btn btn-delete" onclick="deleteOrder(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const tbody = document.getElementById('messagesTableBody');
    
    if (messages.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No messages found</td></tr>';
        return;
    }
    
    // Sort by date (newest first)
    messages.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    
    tbody.innerHTML = messages.map((msg, index) => `
        <tr>
            <td>${msg.name}</td>
            <td><a href="tel:${msg.phone}">${msg.phone}</a></td>
            <td>${msg.email || 'N/A'}</td>
            <td>${getSubjectText(msg.subject)}</td>
            <td>${truncateText(msg.message, 50)}</td>
            <td>${formatDate(msg.submittedAt)}</td>
            <td>
                <button class="btn btn-sm action-btn btn-view" onclick="viewMessageDetail(${index})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm action-btn btn-delete" onclick="deleteMessage(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function updateStatistics() {
    const orders = JSON.parse(localStorage.getItem('medicineOrders') || '[]');
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('pendingOrders').textContent = orders.filter(o => o.status === 'Pending').length;
    document.getElementById('completedOrders').textContent = orders.filter(o => o.status === 'Completed').length;
    document.getElementById('totalMessages').textContent = messages.length;
}

function viewOrderDetail(index) {
    const orders = JSON.parse(localStorage.getItem('medicineOrders') || '[]');
    const order = orders[index];
    
    const modalContent = document.getElementById('orderDetailContent');
    modalContent.innerHTML = `
        <div class="order-detail-section">
            <h5><i class="fas fa-info-circle me-2"></i>Order Information</h5>
            <div class="detail-row">
                <span class="detail-label">Order ID:</span>
                <span class="detail-value"><strong>${order.orderId}</strong></span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Order Date:</span>
                <span class="detail-value">${formatDate(order.orderDate)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value"><span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span></span>
            </div>
        </div>
        
        <div class="order-detail-section">
            <h5><i class="fas fa-user me-2"></i>Customer Details</h5>
            <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span class="detail-value">${order.customerName}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Mobile:</span>
                <span class="detail-value"><a href="tel:${order.customerMobile}">${order.customerMobile}</a></span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${order.customerEmail || 'N/A'}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Address:</span>
                <span class="detail-value">${order.customerAddress}, ${order.customerCity} - ${order.customerPincode}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Delivery:</span>
                <span class="detail-value">${order.deliveryOption === 'delivery' ? 'Home Delivery' : 'Store Pickup'}</span>
            </div>
        </div>
        
        <div class="order-detail-section">
            <h5><i class="fas fa-pills me-2"></i>Medicine Details</h5>
            <ul class="medicine-list">
                ${order.medicines.map((med, i) => `
                    <li><strong>${i + 1}.</strong> ${med.name} - Quantity: <strong>${med.quantity}</strong></li>
                `).join('')}
            </ul>
        </div>
        
        ${order.prescriptionNote ? `
        <div class="order-detail-section">
            <h5><i class="fas fa-file-prescription me-2"></i>Additional Notes</h5>
            <p class="detail-value">${order.prescriptionNote}</p>
        </div>
        ` : ''}
        
        <div class="order-detail-section">
            <a href="https://wa.me/91${order.customerMobile}" target="_blank" class="btn btn-success w-100">
                <i class="fab fa-whatsapp me-2"></i>Contact via WhatsApp
            </a>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('orderDetailModal'));
    modal.show();
}

function viewMessageDetail(index) {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const msg = messages[index];
    
    const modalContent = document.getElementById('messageDetailContent');
    modalContent.innerHTML = `
        <div class="order-detail-section">
            <h5><i class="fas fa-user me-2"></i>Contact Information</h5>
            <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span class="detail-value">${msg.name}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span class="detail-value"><a href="tel:${msg.phone}">${msg.phone}</a></span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${msg.email || 'N/A'}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Subject:</span>
                <span class="detail-value">${getSubjectText(msg.subject)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${formatDate(msg.submittedAt)}</span>
            </div>
        </div>
        
        <div class="order-detail-section">
            <h5><i class="fas fa-comment-alt me-2"></i>Message</h5>
            <p class="detail-value">${msg.message}</p>
        </div>
        
        <div class="order-detail-section">
            <a href="https://wa.me/91${msg.phone}" target="_blank" class="btn btn-success w-100">
                <i class="fab fa-whatsapp me-2"></i>Reply via WhatsApp
            </a>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('messageDetailModal'));
    modal.show();
}

function updateOrderStatus(index) {
    const orders = JSON.parse(localStorage.getItem('medicineOrders') || '[]');
    const statuses = ['Pending', 'Processing', 'Completed', 'Cancelled'];
    const currentStatus = orders[index].status;
    const currentIndex = statuses.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    
    orders[index].status = statuses[nextIndex];
    localStorage.setItem('medicineOrders', JSON.stringify(orders));
    
    loadOrders();
    updateStatistics();
    
    showNotification('Order status updated successfully!', 'success');
}

function deleteOrder(index) {
    if (confirm('Are you sure you want to delete this order?')) {
        const orders = JSON.parse(localStorage.getItem('medicineOrders') || '[]');
        orders.splice(index, 1);
        localStorage.setItem('medicineOrders', JSON.stringify(orders));
        
        loadOrders();
        updateStatistics();
        
        showNotification('Order deleted successfully!', 'success');
    }
}

function deleteMessage(index) {
    if (confirm('Are you sure you want to delete this message?')) {
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.splice(index, 1);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        loadMessages();
        updateStatistics();
        
        showNotification('Message deleted successfully!', 'success');
    }
}

function setupEventListeners() {
    // Search functionality for orders
    const orderSearch = document.getElementById('orderSearch');
    if (orderSearch) {
        orderSearch.addEventListener('input', function() {
            searchOrders(this.value);
        });
    }
    
    // Search functionality for messages
    const messageSearch = document.getElementById('messageSearch');
    if (messageSearch) {
        messageSearch.addEventListener('input', function() {
            searchMessages(this.value);
        });
    }
}

function searchOrders(query) {
    const orders = JSON.parse(localStorage.getItem('medicineOrders') || '[]');
    const filtered = orders.filter(order => 
        order.orderId.toLowerCase().includes(query.toLowerCase()) ||
        order.customerName.toLowerCase().includes(query.toLowerCase()) ||
        order.customerMobile.includes(query)
    );
    
    const tbody = document.getElementById('ordersTableBody');
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No orders found</td></tr>';
        return;
    }
    
    tbody.innerHTML = filtered.map((order, index) => `
        <tr>
            <td><strong>${order.orderId}</strong></td>
            <td>${order.customerName}</td>
            <td><a href="tel:${order.customerMobile}">${order.customerMobile}</a></td>
            <td><span class="badge bg-secondary">${order.medicines.length} items</span></td>
            <td>${order.deliveryOption === 'delivery' ? 'Home Delivery' : 'Store Pickup'}</td>
            <td>${formatDate(order.orderDate)}</td>
            <td><span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span></td>
            <td>
                <button class="btn btn-sm action-btn btn-view" onclick="viewOrderDetail(${orders.indexOf(order)})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm action-btn btn-status" onclick="updateOrderStatus(${orders.indexOf(order)})">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm action-btn btn-delete" onclick="deleteOrder(${orders.indexOf(order)})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function searchMessages(query) {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const filtered = messages.filter(msg => 
        msg.name.toLowerCase().includes(query.toLowerCase()) ||
        msg.phone.includes(query) ||
        msg.message.toLowerCase().includes(query.toLowerCase())
    );
    
    const tbody = document.getElementById('messagesTableBody');
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No messages found</td></tr>';
        return;
    }
    
    tbody.innerHTML = filtered.map((msg, index) => `
        <tr>
            <td>${msg.name}</td>
            <td><a href="tel:${msg.phone}">${msg.phone}</a></td>
            <td>${msg.email || 'N/A'}</td>
            <td>${getSubjectText(msg.subject)}</td>
            <td>${truncateText(msg.message, 50)}</td>
            <td>${formatDate(msg.submittedAt)}</td>
            <td>
                <button class="btn btn-sm action-btn btn-view" onclick="viewMessageDetail(${messages.indexOf(msg)})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm action-btn btn-delete" onclick="deleteMessage(${messages.indexOf(msg)})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Helper functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

function getSubjectText(value) {
    const subjects = {
        'general': 'General Inquiry',
        'medicine': 'Medicine Availability',
        'order': 'Order Status',
        'wholesale': 'Wholesale Business',
        'feedback': 'Feedback',
        'other': 'Other'
    };
    return subjects[value] || value;
}

function showNotification(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}
