document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('email-capture-form');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Form submission intercepted');
            
            const formData = new FormData(form);
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                console.log('Response received:', response);
                
                if (response.ok) {
                    // Store email in localStorage
                    const email = formData.get('email');
                    localStorage.setItem('userEmail', email);
                    
                    // Show success message
                    const successMessage = document.getElementById('thank-you-message');
                    form.querySelector('.email-input-group').style.display = 'none';
                    if (successMessage) {
                        successMessage.classList.remove('hidden');
                    } else {
                        console.error('Success message element not found');
                    }
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Sorry, there was an error. Please try again.');
            }
        });
    }
});