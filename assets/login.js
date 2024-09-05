document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === '' || password === '') {
            alert('Please enter both username and password.');
            return;
        }

        // Here you would typically send the login request to your server
        console.log('Login attempt:', { username, password });
        alert('Login functionality not implemented in this demo.');
    });
});
