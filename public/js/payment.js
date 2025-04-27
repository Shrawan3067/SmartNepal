// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Payment Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Update active tab button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding content
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
            }
        });
    });
});

// Card Number Formatting
const cardNumberInput = document.getElementById('cardNumber');

cardNumberInput.addEventListener('input', function(e) {
    // Remove all non-digit characters
    let value = this.value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Update input value
    this.value = value;
});

// Expiry Date Formatting
const expiryDateInput = document.getElementById('expiryDate');

expiryDateInput.addEventListener('input', function(e) {
    // Remove all non-digit characters
    let value = this.value.replace(/\D/g, '');
    
    // Add slash after 2 digits (MM/YY)
    if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    // Update input value
    this.value = value;
});

// CVV Input Restriction
const cvvInput = document.getElementById('cvv');

cvvInput.addEventListener('input', function(e) {
    // Remove all non-digit characters and limit to 3 digits
    this.value = this.value.replace(/\D/g, '').substring(0, 3);
});

// Copy UPI ID
const copyBtn = document.querySelector('.copy-btn');

copyBtn.addEventListener('click', () => {
    const upiId = document.querySelector('.upi-copy span').textContent;
    navigator.clipboard.writeText(upiId);
    
    // Show feedback
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied';
    
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
    }, 2000);
});

// Toggle Coupon Section
const toggleBtn = document.querySelector('.toggle-btn');
const couponInput = document.querySelector('.coupon-input');

toggleBtn.addEventListener('click', () => {
    if (couponInput.style.display === 'none' || !couponInput.style.display) {
        couponInput.style.display = 'flex';
        toggleBtn.innerHTML = 'Hide Coupon <i class="fas fa-chevron-up"></i>';
    } else {
        couponInput.style.display = 'none';
        toggleBtn.innerHTML = 'Apply Coupon <i class="fas fa-chevron-down"></i>';
    }
});

// Form Validation
const payNowBtn = document.querySelector('.pay-now-btn');
const cardForm = document.getElementById('cardForm');

payNowBtn.addEventListener('click', () => {
    const activeTab = document.querySelector('.tab-content.active').id;
    
    if (activeTab === 'cards') {
        if (cardForm.checkValidity()) {
            // In a real app, this would process payment
            window.location.href = 'confirmation.html';
        } else {
            cardForm.reportValidity();
        }
    } else {
        // For other payment methods, proceed directly
        window.location.href = 'confirmation.html';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // In a real app, you might load saved cards or other user-specific data
});