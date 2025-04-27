// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Password strength indicator
const passwordInput = document.getElementById('signupPassword');
if (passwordInput) {
    passwordInput.addEventListener('input', function() {
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        const password = this.value;
        let strength = 0;
        
        // Check password length
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Check for mixed case
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
        
        // Check for numbers
        if (/\d/.test(password)) strength += 1;
        
        // Check for special chars
        if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
        
        // Update UI
        const width = strength * 20;
        let color = '#e53e3e'; // red
        let text = 'Weak';
        
        if (strength >= 3) {
            color = '#f6ad55'; // orange
            text = 'Medium';
        }
        if (strength >= 5) {
            color = '#68d391'; // green
            text = 'Strong';
        }
        
        strengthBar.style.width = `${width}%`;
        strengthBar.style.backgroundColor = color;
        strengthText.textContent = `Password strength: ${text}`;
        strengthText.style.color = color;
    });
}

// Form validation
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Email validation
        const email = document.getElementById('loginEmail');
        if (!email.value) {
            showError(email, 'Email or phone is required');
            isValid = false;
        } else {
            clearError(email);
        }
        
        // Password validation
        const password = document.getElementById('loginPassword');
        if (!password.value) {
            showError(password, 'Password is required');
            isValid = false;
        } else if (password.value.length < 6) {
            showError(password, 'Password must be at least 6 characters');
            isValid = false;
        } else {
            clearError(password);
        }
        
        if (isValid) {
            // In a real app, you would send this to your server
            alert('Login successful! Redirecting...');
            window.location.href = '../index.html';
        }
    });
}

const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('signupName');
        if (!name.value) {
            showError(name, 'Full name is required');
            isValid = false;
        } else {
            clearError(name);
        }
        
        // Email validation
        const email = document.getElementById('signupEmail');
        if (!email.value) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            clearError(email);
        }
        
        // Phone validation
        const phone = document.getElementById('signupPhone');
        if (!phone.value) {
            showError(phone, 'Phone number is required');
            isValid = false;
        } else if (!/^\d{10}$/.test(phone.value)) {
            showError(phone, 'Please enter a valid 10-digit phone number');
            isValid = false;
        } else {
            clearError(phone);
        }
        
        // Password validation
        const password = document.getElementById('signupPassword');
        const confirmPassword = document.getElementById('signupConfirmPassword');
        
        if (!password.value) {
            showError(password, 'Password is required');
            isValid = false;
        } else if (password.value.length < 8) {
            showError(password, 'Password must be at least 8 characters');
            isValid = false;
        } else {
            clearError(password);
        }
        
        if (!confirmPassword.value) {
            showError(confirmPassword, 'Please confirm your password');
            isValid = false;
        } else if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Passwords do not match');
            isValid = false;
        } else {
            clearError(confirmPassword);
        }
        
        // Terms checkbox validation
        const terms = document.getElementById('termsAgree');
        if (!terms.checked) {
            terms.nextElementSibling.style.color = '#e53e3e';
            isValid = false;
        } else {
            terms.nextElementSibling.style.color = '';
        }
        
        if (isValid) {
            // In a real app, you would send this to your server
            alert('Account created successfully! Redirecting to login...');
            window.location.href = 'login.html';
        }
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = message;
    formGroup.classList.add('error');
}

function clearError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = '';
    formGroup.classList.remove('error');
}