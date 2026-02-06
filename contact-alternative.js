// Contact Page JavaScript - Alternative Version with User Choice

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('contactSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Gather form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                submittedAt: new Date().toISOString()
            };
            
            // Validate required fields
            if (!formData.name || !formData.phone || !formData.subject || !formData.message) {
                alert('Please fill in all required fields!');
                return;
            }
            
            // Store in localStorage (in real app, send to server)
            let contacts = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            contacts.push(formData);
            localStorage.setItem('contactMessages', JSON.stringify(contacts));
            
            // Create WhatsApp message with proper encoding
            const subjectText = document.getElementById('subject').selectedOptions[0].text;
            
            // Build WhatsApp URL
            let whatsappText = `*Contact Form Inquiry*\n\n`;
            whatsappText += `*Name:* ${formData.name}\n`;
            whatsappText += `*Phone:* ${formData.phone}\n`;
            if (formData.email) {
                whatsappText += `*Email:* ${formData.email}\n`;
            }
            whatsappText += `*Subject:* ${subjectText}\n\n`;
            whatsappText += `*Message:*\n${formData.message}`;
            
            // Encode the entire message
            const encodedMessage = encodeURIComponent(whatsappText);
            const whatsappURL = `https://wa.me/919284504673?text=${encodedMessage}`;
            
            // Update success message with WhatsApp button
            successMessage.innerHTML = `
                <div class="d-flex align-items-start gap-3">
                    <i class="fas fa-check-circle" style="font-size: 2rem; color: #27ae60;"></i>
                    <div class="flex-grow-1">
                        <strong>Message Received!</strong>
                        <p class="mb-3">Your inquiry has been saved. Click the button below to send it directly to us via WhatsApp for immediate response.</p>
                        <a href="${whatsappURL}" target="_blank" class="btn btn-success">
                            <i class="fab fa-whatsapp me-2"></i>Send via WhatsApp
                        </a>
                    </div>
                </div>
            `;
            successMessage.classList.remove('d-none');
            
            // Reset form
            contactForm.reset();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Auto-hide success message after 30 seconds
            setTimeout(() => {
                successMessage.classList.add('d-none');
                // Reset success message to original
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle me-2"></i>
                    Thank you for your message! We'll get back to you soon.
                `;
            }, 30000);
        });
    }
});

// Format phone number input
document.getElementById('phone')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// Initialize Google Maps if needed (future enhancement)
function initMap() {
    // Map initialization code can be added here
    console.log('Map initialized');
}

// Add animation to FAQ accordion
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', function() {
        // Add smooth animation effect
        const accordionItem = this.closest('.accordion-item');
        accordionItem.style.transition = 'all 0.3s ease';
    });
});
