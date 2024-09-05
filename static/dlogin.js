document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', function() {
        // Here you would typically add login validation logic
        // For now, we'll just redirect to the profile page
        window.location.href = 'doctor.html';
    });
});
