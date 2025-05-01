document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('.submit-btn');
    const statusMessage = document.getElementById('statusMessage');
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
        // Here you would typically send the data to your backend API
        // For demonstration, we'll simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        
        // Clear the form
        form.reset();
        
        // Show success message
        statusMessage.textContent = 'Message sent successfully!';
        statusMessage.className = 'status-message success';
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            statusMessage.className = 'status-message';
        }, 3000);
        
    } catch (error) {
        // Show error message
        statusMessage.textContent = 'Error sending message. Please try again.';
        statusMessage.className = 'status-message error';
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
}); 