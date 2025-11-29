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

// Date Picker Initialization
document.getElementById('date').addEventListener('focus', function() {
    this.type = 'date';
});

// City data with states (more comprehensive list)
const cities = [
    "Biratnagar, Morang",
    "Dharan, Sunsari",
    "Itahari, Sunsari",
    "Inaruwa, Sunsari",
    "Bhojpur, Bhojpur",
    "Dhankuta, Dhankuta",
    "Ilam, Ilam",
    "Phidim, Panchthar",
    "Birtamod, Jhapa",
    "Damak, Jhapa",
    "Mechinagar, Jhapa",
    "Rajbiraj, Saptari",
    "Lahan, Siraha",
    "Siraha, Siraha",
    "Udayapur Gadhi, Udayapur",
    "Janakpur, Dhanusha",
    "Jaleshwar, Mahottari",
    "Malangwa, Sarlahi",
    "Gaur, Rautahat",
    "Kalaiya, Bara",
    "Birgunj, Parsa",
    "Simara, Bara",
    "Chandranigahapur, Rautahat",
    "Bardibas, Mahottari",
    "Sarlahi, Sarlahi",
    "Kathmandu, Kathmandu",
    "Lalitpur (Patan), Lalitpur",
    "Bhaktapur, Bhaktapur",
    "Kirtipur, Kathmandu",
    "Madhyapur Thimi, Bhaktapur",
    "Banepa, Kavrepalanchok",
    "Dhulikhel, Kavrepalanchok",
    "Panauti, Kavrepalanchok",
    "Chautara, Sindhupalchok",
    "Melamchi, Sindhupalchok",
    "Bidur, Nuwakot",
    "Trishuli, Nuwakot",
    "Dhunche, Rasuwa",
    "Hetauda, Makwanpur",
    "Markhu, Makwanpur",
    "Pokhara, Kaski",
    "Lekhnath, Kaski",
    "Baglung, Baglung",
    "Kusma, Parbat",
    "Beni, Myagdi",
    "Gorkha, Gorkha",
    "Besisahar, Lamjung",
    "Syangja, Syangja",
    "Tansen, Palpa",
    "Waling, Syangja",
    "Damauli, Tanahun",
    "Bharatpur, Chitwan",
    "Ratnanagar, Chitwan",
    "Butwal, Rupandehi",
    "Bhairahawa, Rupandehi",
    "Tilottama, Rupandehi",
    "Lumbini, Rupandehi",
    "Kapilvastu, Kapilvastu",
    "Taulihawa, Kapilvastu",
    "Gulariya, Bardiya",
    "Nepalgunj, Banke",
    "Kohalpur, Banke",
    "Bansgadhi, Bardiya",
    "Sandhikharka, Arghakhanchi",
    "Tamghas, Gulmi",
    "Musikot, Gulmi",
    "Rampur, Palpa",
    "Birendranagar, Surkhet",
    "Manma, Kalikot",
    "Jumla, Jumla",
    "Dunai, Dolpa",
    "Simikot, Humla",
    "Chandannath, Jumla",
    "Gamgadhi, Mugu",
    "Rara, Mugu",
    "Dhangadhi, Kailali",
    "Tikapur, Kailali",
    "Attariya, Kailali",
    "Mahendranagar, Kanchanpur",
    "Bhimdatta, Kanchanpur",
    "Dipayal, Doti",
    "Silgadhi, Doti",
    "Dadeldhura, Dadeldhura",
    "Amargadhi, Dadeldhura",
    "Baitadi, Baitadi",
    "Dasharathchand, Baitadi",
    "Darchula, Darchula",
    "Daman, Makwanpur",
    "Bandipur, Tanahun",
    "Ghalegaun, Lamjung"
  ];
  
  

// Initialize city dropdowns
function initCityDropdown(inputId, dropdownId) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    let highlightedIndex = -1;

    // Show dropdown when input is focused
    input.addEventListener('focus', function() {
        filterCities(inputId, dropdownId);
        dropdown.classList.add('active');
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Filter cities as user types
    input.addEventListener('input', function() {
        filterCities(inputId, dropdownId);
        highlightedIndex = -1;
    });

    // Handle keyboard navigation
    input.addEventListener('keydown', function(e) {
        const items = dropdown.querySelectorAll('.dropdown-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (highlightedIndex < items.length - 1) {
                highlightedIndex++;
                updateHighlightedItem(items);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (highlightedIndex > 0) {
                highlightedIndex--;
                updateHighlightedItem(items);
            }
        } else if (e.key === 'Enter' && highlightedIndex >= 0) {
            e.preventDefault();
            input.value = items[highlightedIndex].textContent;
            dropdown.classList.remove('active');
        } else if (e.key === 'Escape') {
            dropdown.classList.remove('active');
        }
    });

    // Handle item selection
    dropdown.addEventListener('click', function(e) {
        if (e.target.classList.contains('dropdown-item')) {
            input.value = e.target.textContent;
            dropdown.classList.remove('active');
            input.focus();
        }
    });
}

// Filter and display cities based on input
function filterCities(inputId, dropdownId) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    const searchTerm = input.value.toLowerCase();
    
    // Clear previous results
    dropdown.innerHTML = '';
    
    // Filter cities
    const filteredCities = cities.filter(city => 
        city.toLowerCase().includes(searchTerm)
    );
    
    // Display results
    if (filteredCities.length > 0) {
        filteredCities.forEach(city => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            item.textContent = city;
            dropdown.appendChild(item);
        });
    } else {
        const noResults = document.createElement('div');
        noResults.className = 'dropdown-item';
        noResults.textContent = 'No cities found';
        dropdown.appendChild(noResults);
    }
}

// Update highlighted item in dropdown
function updateHighlightedItem(items) {
    items.forEach((item, index) => {
        if (index === highlightedIndex) {
            item.classList.add('highlighted');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('highlighted');
        }
    });
}

// Swap From and To locations
const swapBtn = document.querySelector('.swap-btn');
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');

swapBtn.addEventListener('click', () => {
    const temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;
});

// Search Button Redirect
document.querySelector('.search-btn').addEventListener('click', () => {
    // Validate inputs before redirect
    if (fromInput.value.trim() && toInput.value.trim()) {
        window.location.href = 'views/search.html';
    } else {
        alert('Please select both departure and arrival cities');
    }
});

// Initialize dropdowns when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCityDropdown('from', 'fromDropdown');
    initCityDropdown('to', 'toDropdown');
});

// // Offer Slider Navigation (simplified)
// let currentOffer = 0;
// const offers = document.querySelectorAll('.offer-card');

// function showOffer(index) {
//     offers.forEach((offer, i) => {
//         offer.style.display = i === index ? 'block' : 'none';
//     });
// }

// // Auto-rotate offers (demo only)
// setInterval(() => {
//     currentOffer = (currentOffer + 1) % offers.length;
//     showOffer(currentOffer);
// }, 3000);

// Dark Mode Toggle (would be implemented in a real app)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Save preference to localStorage
}