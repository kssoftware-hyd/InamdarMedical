// SIMPLEST CONTACT FORM - GUARANTEED TO WORK

(function() {
    'use strict';
    
    // Wait for page to load
    window.addEventListener('load', function() {
        
        var form = document.getElementById('contactForm');
        
        if (!form) {
            alert('ERROR: Form not found!');
            return;
        }
        
        form.onsubmit = function(e) {
            e.preventDefault();
            
            // Get values
            var name = document.getElementById('name').value;
            var phone = document.getElementById('phone').value;
            var email = document.getElementById('email').value;
            var subject = document.getElementById('subject').value;
            var message = document.getElementById('message').value;
            
            // Check required fields
            if (!name || !phone || !subject || !message) {
                alert('Please fill all required fields!');
                return false;
            }
            
            // Get subject text
            var subjectSelect = document.getElementById('subject');
            var subjectText = subjectSelect.options[subjectSelect.selectedIndex].text;
            
            // Build message
            var msg = 'Contact Form Inquiry\n\n';
            msg += 'Name: ' + name + '\n';
            msg += 'Phone: ' + phone + '\n';
            if (email) msg += 'Email: ' + email + '\n';
            msg += 'Subject: ' + subjectText + '\n\n';
            msg += 'Message:\n' + message;
            
            // Show success
            var success = document.getElementById('contactSuccess');
            if (success) success.classList.remove('d-none');
            
            // Reset form
            form.reset();
            
            // Build WhatsApp URL
            var url = 'https://wa.me/919284504673?text=' + encodeURIComponent(msg);
            
            // Open WhatsApp - TRY MULTIPLE METHODS
            
            // Method 1: Direct redirect
            window.location.href = url;
            
            // Method 2: Backup - try window.open
            setTimeout(function() {
                window.open(url, '_blank');
            }, 100);
            
            return false;
        };
        
        // Phone validation
        var phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.oninput = function() {
                this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
            };
        }
        
    });
    
})();
