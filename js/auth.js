// Authentication Management
console.log("auth.js loaded");

// Check if user is on login page
function isLoginPage() {
    return window.location.pathname.includes('login.html') || 
           window.location.pathname.includes('login');
}

// Check if user is on index/home page
function isIndexPage() {
    return window.location.pathname.includes('index.html') || 
           window.location.pathname === '/' || 
           window.location.pathname.endsWith('/');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("Auth: DOM Content Loaded");
    
    // Set role from URL parameter (only on login page)
    if (isLoginPage()) {
        const urlParams = new URLSearchParams(window.location.search);
        const role = urlParams.get('role') || 'admin';
        
        console.log("Auth: Setting up login page for role:", role);
        
        // Update UI based on role if elements exist
        const roleIndicator = document.getElementById('roleIndicator');
        const loginNote = document.getElementById('loginNote');
        
        if (roleIndicator) {
            if (role === 'admin') {
                roleIndicator.innerHTML = '<span class="status-active"><i class="fas fa-user-shield"></i> Admin Login</span>';
            } else {
                roleIndicator.innerHTML = '<span class="status-inactive"><i class="fas fa-user"></i> User Login</span>';
            }
        }
        
        if (loginNote) {
            if (role === 'admin') {
                loginNote.textContent = 'Admin has access to Maintenance, Reports, and Transactions modules.';
            } else {
                loginNote.textContent = 'User has access to Reports and Transactions modules only. Cannot access Maintenance.';
            }
        }
        
        // Toggle password visibility (only if element exists)
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        
        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
            });
        }
        
        // Handle login form submission (only if form exists)
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log("Login form submitted");
                
                const userId = document.getElementById('userId')?.value || '';
                const password = document.getElementById('password')?.value || '';
                const role = urlParams.get('role') || 'admin';
                
                console.log("Login attempt:", { userId, password, role });
                
                // Default credentials
                const defaultCredentials = {
                    'admin': { id: 'adm', password: 'adm', redirect: 'admin/dashboard.html' },
                    'user': { id: 'user', password: 'user', redirect: 'user/dashboard.html' }
                };
                
                // Validate credentials
                if (role === 'admin' && userId === 'adm' && password === 'adm') {
                    // Store user session
                    sessionStorage.setItem('loggedIn', 'true');
                    sessionStorage.setItem('userRole', 'admin');
                    sessionStorage.setItem('userId', 'adm');
                    sessionStorage.setItem('userName', 'Administrator');
                    
                    console.log("Admin login successful");
                    showMessage('Login successful! Redirecting...', 'success');
                    
                    // Redirect after delay
                    setTimeout(() => {
                        window.location.href = 'admin/dashboard.html';
                    }, 1000);
                    
                } else if (role === 'user' && userId === 'user' && password === 'user') {
                    // Store user session
                    sessionStorage.setItem('loggedIn', 'true');
                    sessionStorage.setItem('userRole', 'user');
                    sessionStorage.setItem('userId', 'user');
                    sessionStorage.setItem('userName', 'Library User');
                    
                    console.log("User login successful");
                    showMessage('Login successful! Redirecting...', 'success');
                    
                    // Redirect after delay
                    setTimeout(() => {
                        window.location.href = 'user/dashboard.html';
                    }, 1000);
                    
                } else {
                    console.log("Invalid credentials");
                    showMessage('Invalid credentials! Please use default credentials shown below.', 'error');
                }
            });
        }
    }
    
    // Check if user is logged in on dashboard pages
    const isDashboardPage = window.location.pathname.includes('dashboard.html') || 
                           window.location.pathname.includes('admin/') || 
                           window.location.pathname.includes('user/');
    
    if (isDashboardPage && !isLoginPage() && !isIndexPage()) {
        console.log("Auth: Checking dashboard access");
        
        const loggedIn = sessionStorage.getItem('loggedIn');
        const userRole = sessionStorage.getItem('userRole');
        
        if (!loggedIn) {
            console.log("Not logged in, redirecting to login");
            window.location.href = '../login.html';
            return;
        }
        
        console.log("User logged in as:", userRole);
        
        // Set user info in dashboard if element exists
        const userName = sessionStorage.getItem('userName');
        const userInfoElement = document.querySelector('.user-info');
        const userProfileElement = document.getElementById('userProfile');
        
        if (userInfoElement) {
            userInfoElement.innerHTML = `
                <i class="fas fa-user-circle fa-2x"></i>
                <div>
                    <strong>${userName}</strong><br>
                    <small>${userRole === 'admin' ? 'Administrator' : 'Library User'}</small>
                </div>
            `;
        }
        
        if (userProfileElement) {
            userProfileElement.innerHTML = `
                <i class="fas fa-user-circle fa-2x"></i>
                <div>
                    <strong>${userName}</strong><br>
                    <small>${userRole === 'admin' ? 'Administrator' : 'Library User'}</small>
                </div>
            `;
        }
        
        // Show role-based elements
        const adminElements = document.querySelectorAll('.admin-only');
        const userElements = document.querySelectorAll('.user-only');
        
        if (userRole === 'admin') {
            adminElements.forEach(el => el.style.display = '');
            userElements.forEach(el => el.style.display = 'none');
        } else {
            adminElements.forEach(el => el.style.display = 'none');
            userElements.forEach(el => el.style.display = '');
        }
    }
    
    // Logout functionality (only if elements exist)
    const logoutButtons = document.querySelectorAll('.logout-btn');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Logout clicked");
            sessionStorage.clear();
            showMessage('You have been logged out successfully.', 'success');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        });
    });
});

// Show message function (if not already defined)
function showMessage(message, type) {
    // Check if function already exists
    if (typeof window.showMessage === 'function' && window.showMessage !== showMessage) {
        window.showMessage(message, type);
        return;
    }
    
    console.log("Showing message:", message, type);
    
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Add animation styles if not already present
    if (!document.querySelector('#messageStyles')) {
        const style = document.createElement('style');
        style.id = 'messageStyles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// Slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// js/auth.js
// ... existing auth.js code ke baad yeh add karein ...

// Global book management functions
function initializeBooks() {
    const savedBooks = localStorage.getItem('libraryBooks');
    if (!savedBooks) {
        // Default books
        const defaultBooks = [
            { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", quantity: 5, year: 1960 },
            { id: 2, title: "1984", author: "George Orwell", category: "Science Fiction", quantity: 3, year: 1949 },
            { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", quantity: 4, year: 1925 },
            { id: 4, title: "Pride and Prejudice", author: "Jane Austen", category: "Romance", quantity: 2, year: 1813 }
        ];
        localStorage.setItem('libraryBooks', JSON.stringify(defaultBooks));
    }
}

// Call this when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeBooks();
    
    // Set role from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    
    // ... rest of existing auth.js code ...
});
