// Contact Page JavaScript - SIMPLE TEST VERSION
// Use this if the main version doesn't work

console.log('Contact form script loaded!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up contact form...');
    
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.error('Contact form not found!');
        return;
    }
    
    console.log('Contact form found!');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted!');
        
        // Get values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const email = document.getElementById('email').value;
        
        console.log('Form data:', { name, phone, subject, message, email });
        
        // Validate
        if (!name || !phone || !subject || !message) {
            alert('Please fill in all required fields (Name, Phone, Subject, Message)');
            return;
        }
        
        // Build WhatsApp message
        const subjectOptions = {
            'general': 'General Inquiry',
            'medicine': 'Medicine Availability',
            'order': 'Order Status',
            'wholesale': 'Wholesale Business',
            'feedback': 'Feedback',
            'other': 'Other'
        };
        
        const subjectText = subjectOptions[subject] || subject;
        
        let msg = 'Contact Form Inquiry\n\n';
        msg += 'Name: ' + name + '\n';
        msg += 'Phone: ' + phone + '\n';
        if (email) {
            msg += 'Email: ' + email + '\n';
        }
        msg += 'Subject: ' + subjectText + '\n\n';
        msg += 'Message:\n' + message;
        
        console.log('WhatsApp message:', msg);
        
        // Encode and create URL
        const encodedMsg = encodeURIComponent(msg);
        const whatsappURL = 'https://wa.me/919284504673?text=' + encodedMsg;
        
        console.log('WhatsApp URL:', whatsappURL);
        
        // Show success message
        const successDiv = document.getElementById('contactSuccess');
        if (successDiv) {
            successDiv.classList.remove('d-none');
            console.log('Success message shown');
        }
        
        // Reset form
        contactForm.reset();
        console.log('Form reset');
        
        // Open WhatsApp
        console.log('Opening WhatsApp in 1 second...');
        setTimeout(function() {
            console.log('Opening WhatsApp now!');
            window.open(whatsappURL, '_blank');
        }, 1000);
        
        // Hide success message
        setTimeout(function() {
            if (successDiv) {
                successDiv.classList.add('d-none');
            }
        }, 8000);
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });
}
