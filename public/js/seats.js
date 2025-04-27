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

// Seat Selection Logic
const seats = document.querySelectorAll('.seat:not(.booked)');
const seatsList = document.querySelector('.seats-list');
const noSeatsMessage = document.querySelector('.no-seats');
const proceedBtn = document.querySelector('.proceed-btn');
const passengerForm = document.getElementById('passengerForm');

let selectedSeats = [];

seats.forEach(seat => {
    seat.addEventListener('click', () => {
        const seatNumber = seat.getAttribute('data-seat');
        const seatGender = seat.getAttribute('data-gender');
        
        // Check if seat is women-only and passenger is male
        if (seat.classList.contains('women-only')) {
            const selectedGender = document.querySelector('input[name="gender"]:checked');
            if (selectedGender && selectedGender.value === 'male') {
                alert('This seat is reserved for female passengers only');
                return;
            }
        }
        
        // Toggle seat selection
        if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
            selectedSeats = selectedSeats.filter(s => s !== seatNumber);
        } else {
            if (selectedSeats.length >= 5) {
                alert('You can select maximum 5 seats at a time');
                return;
            }
            seat.classList.add('selected');
            selectedSeats.push(seatNumber);
        }
        
        updateSelectedSeatsDisplay();
        updateProceedButton();
    });
});

function updateSelectedSeatsDisplay() {
    seatsList.innerHTML = '';
    
    if (selectedSeats.length === 0) {
        noSeatsMessage.style.display = 'block';
    } else {
        noSeatsMessage.style.display = 'none';
        selectedSeats.forEach(seat => {
            const seatBadge = document.createElement('div');
            seatBadge.className = 'seat-badge';
            seatBadge.innerHTML = `
                ${seat}
                <i class="fas fa-times remove-seat" data-seat="${seat}"></i>
            `;
            seatsList.appendChild(seatBadge);
            
            // Add remove seat functionality
            seatBadge.querySelector('.remove-seat').addEventListener('click', (e) => {
                e.stopPropagation();
                removeSeat(seat);
            });
        });
    }
}

function removeSeat(seatNumber) {
    selectedSeats = selectedSeats.filter(s => s !== seatNumber);
    
    // Update UI
    const seatElement = document.querySelector(`.seat[data-seat="${seatNumber}"]`);
    if (seatElement) {
        seatElement.classList.remove('selected');
    }
    
    updateSelectedSeatsDisplay();
    updateProceedButton();
}

function updateProceedButton() {
    if (selectedSeats.length > 0) {
        proceedBtn.disabled = false;
        proceedBtn.textContent = `Proceed to Payment (${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''})`;
    } else {
        proceedBtn.disabled = true;
        proceedBtn.textContent = 'Proceed to Payment';
    }
}

// Form Validation
passengerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat');
        return;
    }
    
    // In a real app, this would submit the form and proceed to payment
    window.location.href = 'payment.html';
});

// Proceed to Payment Button
proceedBtn.addEventListener('click', () => {
    if (passengerForm.checkValidity()) {
        passengerForm.dispatchEvent(new Event('submit'));
    } else {
        passengerForm.reportValidity();
    }
});

// Initialize
updateProceedButton();