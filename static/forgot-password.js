document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const sendPasswordButton = document.getElementById('sendPasswordButton');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const card = document.querySelector('.card');

    sendPasswordButton.addEventListener('click', function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();

        if (email === '') {
            alert('Please enter your email address.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Disable the button and show loading state
        sendPasswordButton.disabled = true;
        sendPasswordButton.textContent = 'Sending...';

        // Simulate sending email
        simulateSendingEmail(email)
            .then(() => {
                // Hide the form and show the confirmation message
                card.style.display = 'none';
                confirmationMessage.style.display = 'block';
                
                // Generate and log a new password (for demonstration purposes only)
                const newPassword = generateRandomPassword();
                console.log(`New password for ${email}: ${newPassword}`);
            })
            .catch((error) => {
                alert('An error occurred. Please try again later.');
                console.error('Error:', error);
            })
            .finally(() => {
                // Re-enable the button and reset text
                sendPasswordButton.disabled = false;
                sendPasswordButton.textContent = 'Send New Password';
            });
    });

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function simulateSendingEmail(email) {
        // Simulate sending an email with a 2-second delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate a 90% success rate
                if (Math.random() < 0.9) {
                    console.log(`Password reset email sent to ${email}`);
                    resolve();
                } else {
                    reject(new Error('Failed to send email'));
                }
            }, 2000);
        });
    }

    function generateRandomPassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }
});
