// Simple user credentials (in a real application, these would be stored securely on a server)
const validCredentials = {
    username: 'admin',
    password: 'admin123'
};

// Check if user is already logged in
function checkAuth() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
        window.location.href = 'dashboard.html';
    }
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    if (username === validCredentials.username && password === validCredentials.password) {
        // Set authentication flag
        localStorage.setItem('isAuthenticated', 'true');
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});

// Check authentication status when page loads
checkAuth(); 