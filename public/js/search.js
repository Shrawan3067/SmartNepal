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

// Toggle bus details
document.querySelectorAll('.bus-card').forEach(card => {
    const mainSection = card.querySelector('.bus-main');
    
    mainSection.addEventListener('click', (e) => {
        // Don't toggle if clicked on view seats button
        if (!e.target.closest('.view-seats')) {
            card.classList.toggle('active');
        }
    });
});

// Filter functionality
const filterCheckboxes = document.querySelectorAll('.filter-checkbox input');
const sliders = document.querySelectorAll('.slider');

function applyFilters() {
    // In a real app, this would filter the bus results
    console.log('Filters applied');
}

filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
});

sliders.forEach(slider => {
    slider.addEventListener('input', applyFilters);
});

// Sort functionality
const sortButtons = document.querySelectorAll('.sort-btn');

sortButtons.forEach(button => {
    button.addEventListener('click', () => {
        sortButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // In a real app, this would sort the results
        console.log('Sorted by:', button.textContent);
    });
});

// View seats button
document.querySelectorAll('.view-seats').forEach(button => {
    button.addEventListener('click', () => {
        // In a real app, this would redirect to seat selection
        window.location.href = 'seats.html';
    });
});

// Modify search button
document.querySelector('.modify-search').addEventListener('click', () => {
    window.location.href = '../index.html';
});

// Fastest filter dropdown
const fastestFilter = document.querySelector('.fastest-filter');

fastestFilter.addEventListener('click', () => {
    // In a real app, this would show a dropdown with options
    console.log('Fastest filter clicked');
});

// Pagination
document.querySelectorAll('.page-btn:not(.disabled)').forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('active')) return;
        
        // In a real app, this would load the selected page
        console.log('Page:', button.textContent);
    });
});