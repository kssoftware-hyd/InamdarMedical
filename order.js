// Order Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const addMedicineBtn = document.getElementById('addMedicineBtn');
    const medicineItems = document.getElementById('medicineItems');
    const orderForm = document.getElementById('medicineOrderForm');
    const successMessage = document.getElementById('successMessage');
    
    let medicineCount = 1;
    
    // Add more medicine fields
    addMedicineBtn.addEventListener('click', function() {
        medicineCount++;
        const newMedicineItem = document.createElement('div');
        newMedicineItem.className = 'medicine-item mb-3';
        newMedicineItem.innerHTML = `
            <div class="row g-2">
                <div class="col-md-6">
                    <label class="form-label">Medicine Name *</label>
                    <input type="text" class="form-control medicine-name" required>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Quantity *</label>
                    <input type="number" class="form-control medicine-quantity" min="1" value="1" required>
                </div>
                <div class="col-md-2 d-flex align-items-end">
                    <button type="button" class="btn btn-danger w-100 remove-medicine">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        medicineItems.appendChild(newMedicineItem);
        
        // Add remove functionality
        const removeBtn = newMedicineItem.querySelector('.remove-medicine');
        removeBtn.addEventListener('click', function() {
            newMedicineItem.remove();
            medicineCount--;
            updateRemoveButtons();
        });
        
        updateRemoveButtons();
    });
    
    // Update remove button states
    function updateRemoveButtons() {
        const removeButtons = document.querySelectorAll('.remove-medicine');
        removeButtons.forEach((btn, index) => {
            if (removeButtons.length <= 1) {
                btn.disabled = true;
            } else {
                btn.disabled = false;
            }
        });
    }
    
    // Handle form submission
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gather form data
        const formData = {
            customerName: document.getElementById('customerName').value,
            customerMobile: document.getElementById('customerMobile').value,
            customerEmail: document.getElementById('customerEmail').value,
            customerAddress: document.getElementById('customerAddress').value,
            customerCity: document.getElementById('customerCity').value,
            customerPincode: document.getElementById('customerPincode').value,
            prescriptionNote: document.getElementById('prescriptionNote').value,
            deliveryOption: document.querySelector('input[name="deliveryOption"]:checked').value,
            medicines: []
        };
        
        // Gather medicine data
        const medicineNames = document.querySelectorAll('.medicine-name');
        const medicineQuantities = document.querySelectorAll('.medicine-quantity');
        
        medicineNames.forEach((nameInput, index) => {
            formData.medicines.push({
                name: nameInput.value,
                quantity: medicineQuantities[index].value
            });
        });
        
        // Store in localStorage (in real app, send to server)
        let orders = JSON.parse(localStorage.getItem('medicineOrders') || '[]');
        formData.orderDate = new Date().toISOString();
        formData.orderId = 'ORD' + Date.now();
        formData.status = 'Pending';
        orders.push(formData);
        localStorage.setItem('medicineOrders', JSON.stringify(orders));
        
        // Create WhatsApp message
        let whatsappMessage = `*New Medicine Order*%0A%0A`;
        whatsappMessage += `*Order ID:* ${formData.orderId}%0A`;
        whatsappMessage += `*Name:* ${formData.customerName}%0A`;
        whatsappMessage += `*Mobile:* ${formData.customerMobile}%0A`;
        whatsappMessage += `*Address:* ${formData.customerAddress}, ${formData.customerCity} - ${formData.customerPincode}%0A`;
        whatsappMessage += `*Delivery:* ${formData.deliveryOption === 'delivery' ? 'Home Delivery' : 'Store Pickup'}%0A%0A`;
        whatsappMessage += `*Medicines:*%0A`;
        
        formData.medicines.forEach((med, index) => {
            whatsappMessage += `${index + 1}. ${med.name} - Qty: ${med.quantity}%0A`;
        });
        
        if (formData.prescriptionNote) {
            whatsappMessage += `%0A*Notes:* ${formData.prescriptionNote}`;
        }
        
        // Show success message
        successMessage.classList.remove('d-none');
        orderForm.reset();
        
        // Remove extra medicine items
        const extraItems = medicineItems.querySelectorAll('.medicine-item');
        extraItems.forEach((item, index) => {
            if (index > 0) {
                item.remove();
            }
        });
        
        medicineCount = 1;
        updateRemoveButtons();
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Optional: Open WhatsApp after 2 seconds
        setTimeout(() => {
            const userConfirm = confirm('Order submitted successfully! Would you like to send this order via WhatsApp for faster processing?');
            if (userConfirm) {
                window.open(`https://wa.me/919284504673?text=${whatsappMessage}`, '_blank');
            }
        }, 1000);
        
        // Hide success message after 10 seconds
        setTimeout(() => {
            successMessage.classList.add('d-none');
        }, 10000);
    });
    
    // Initialize remove buttons
    updateRemoveButtons();
});

// Format phone number input
document.getElementById('customerMobile')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// Format pincode input
document.getElementById('customerPincode')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 6) {
        value = value.slice(0, 6);
    }
    e.target.value = value;
});
