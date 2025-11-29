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

// Download Ticket Button
document.querySelector('.ticket-actions .btn-outline:first-child').addEventListener('click', () => {
    // In a real app, this would generate and download a PDF ticket
    alert('Ticket download will start shortly');
});

// Share Button
document.querySelector('.ticket-actions .btn-outline:last-child').addEventListener('click', () => {
    // In a real app, this would open share options
    alert('Share options will appear here');
});

// View on Map Button
document.querySelector('.help-card:first-child .btn-outline').addEventListener('click', () => {
    // In a real app, this would open a map with the boarding location
    window.open('https://maps.google.com?q=Mumbai+Central+Bus+Stand', '_blank');
});

// Call Support Button
document.querySelector('.help-card:last-child .btn-outline').addEventListener('click', () => {
    // In a real app, this would initiate a phone call
    alert('Calling customer support...');
});

// Addon Buttons
document.querySelectorAll('.addon-card .btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        // In a real app, this would redirect to the respective service
        alert('Redirecting to service...');
    });
});

// Animation for confirmation check
document.addEventListener('DOMContentLoaded', () => {
    const checkCircle = document.querySelector('.check-circle');
    checkCircle.style.transform = 'scale(0)';
    checkCircle.style.transition = 'transform 0.5s ease-out';
    
    setTimeout(() => {
        checkCircle.style.transform = 'scale(1)';
    }, 100);
});