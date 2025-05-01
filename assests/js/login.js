document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }
    
    if (username === 'admin' && password === 'admin') {
        // Set a session flag
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        
        // Redirect to dashboard
        window.location.href = "../pages/student.html";
    } else {
        alert('Invalid username or password! Please try again.');
        // Clear the password field
        document.getElementById('password').value = '';
    }
});

// Check if user is already logged in
window.addEventListener('load', function() {
    if (window.location.pathname.includes('login.html') && sessionStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = "../pages/student.html";
    }
}); 