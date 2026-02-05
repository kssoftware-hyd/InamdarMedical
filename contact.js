// Contact Page JavaScript

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
            
            // Store in localStorage (in real app, send to server)
            let contacts = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            contacts.push(formData);
            localStorage.setItem('contactMessages', JSON.stringify(contacts));
            
            // Create WhatsApp message
            const subjectText = document.getElementById('subject').selectedOptions[0].text;
            let whatsappMessage = `*Contact Form Inquiry*%0A%0A`;
            whatsappMessage += `*Name:* ${formData.name}%0A`;
            whatsappMessage += `*Phone:* ${formData.phone}%0A`;
            if (formData.email) {
                whatsappMessage += `*Email:* ${formData.email}%0A`;
            }
            whatsappMessage += `*Subject:* ${subjectText}%0A%0A`;
            whatsappMessage += `*Message:*%0A${formData.message}`;
            
            // Show success message
            successMessage.classList.remove('d-none');
            contactForm.reset();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Optional: Open WhatsApp after 2 seconds
            setTimeout(() => {
                const userConfirm = confirm('Message sent successfully! Would you like to send this via WhatsApp for immediate response?');
                if (userConfirm) {
                    window.open(`https://wa.me/919284504673?text=${whatsappMessage}`, '_blank');
                }
            }, 1000);
            
            // Hide success message after 8 seconds
            setTimeout(() => {
                successMessage.classList.add('d-none');
            }, 8000);
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
