document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would typically load the corresponding content
            // For now, we'll just log the clicked section
            console.log(`Clicked on ${this.textContent.trim()}`);
        });
    });

    // Handle logout
    const logoutButton = document.querySelector('.logout');
    logoutButton.addEventListener('click', function() {
        console.log('Logout clicked');
        // Implement logout functionality here
    });

    // Handle notifications
    const notificationsButton = document.querySelector('.notifications');
    notificationsButton.addEventListener('click', function() {
        console.log('Notifications clicked');
        // Implement notifications functionality here
    });

    // Handle patient list clicks
    const patientLinks = document.querySelectorAll('.patient-list a');
    patientLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== 'dpateint1.html') {
                e.preventDefault();
                console.log(`Clicked on ${this.textContent}`);
                // Implement patient profile loading here
            }
        });
    });
});
