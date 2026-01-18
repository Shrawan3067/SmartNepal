import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";

const SeatsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: ""
  });
  const [travelInsurance, setTravelInsurance] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock bus data - in real app, this would come from API or props
  const busDetails = {
    from: "Mumbai",
    to: "Goa",
    date: "Sat, 15 Jul 2023",
    departure: "22:30",
    operator: "SmartNepal Travels",
    busType: "AC Sleeper (2+1)",
    baseFare: 1199,
    taxes: 100,
    discount: 200
  };

  // Seat data - in real app, this would come from API
  const seatsData = {
    lowerDeck: [
      { id: "L1", type: "sleeper", gender: "any", booked: false },
      { id: "L2", type: "sleeper", gender: "any", booked: false },
      { id: "L3", type: "sleeper", gender: "any", booked: false },
      { id: "L4", type: "sleeper", gender: "any", booked: false },
      { id: "L5", type: "sleeper", gender: "any", booked: false },
      { id: "L6", type: "sleeper", gender: "any", booked: true },
      { id: "L7", type: "sleeper", gender: "any", booked: false },
      { id: "L8", type: "sleeper", gender: "any", booked: false },
      { id: "L9", type: "sleeper", gender: "any", booked: false },
      { id: "L10", type: "sleeper", gender: "any", booked: true },
      { id: "L11", type: "sleeper", gender: "any", booked: false },
      { id: "L12", type: "sleeper", gender: "any", booked: false },
      { id: "L13", type: "sleeper", gender: "female", booked: false },
      { id: "L14", type: "sleeper", gender: "female", booked: false },
      { id: "L15", type: "sleeper", gender: "female", booked: true }
    ],
    upperDeck: [
      { id: "U1", type: "sleeper", gender: "any", booked: false },
      { id: "U2", type: "sleeper", gender: "any", booked: false },
      { id: "U3", type: "sleeper", gender: "any", booked: true },
      { id: "U4", type: "sleeper", gender: "any", booked: false },
      { id: "U5", type: "sleeper", gender: "any", booked: false },
      { id: "U6", type: "sleeper", gender: "any", booked: false },
      { id: "U7", type: "sleeper", gender: "any", booked: true },
      { id: "U8", type: "sleeper", gender: "any", booked: false },
      { id: "U9", type: "sleeper", gender: "any", booked: false },
      { id: "U10", type: "sleeper", gender: "any", booked: false }
    ]
  };

  const handleSeatClick = (seat) => {
    if (seat.booked) return;

    // Check if seat is women-only and passenger is male
    if (seat.gender === "female" && passengerDetails.gender === "male") {
      alert("This seat is reserved for female passengers only");
      return;
    }

    // Check if already selected
    const isSelected = selectedSeats.some(s => s.id === seat.id);

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      if (selectedSeats.length >= 5) {
        alert("You can select maximum 5 seats at a time");
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleRemoveSeat = (seatId) => {
    setSelectedSeats(selectedSeats.filter(seat => seat.id !== seatId));
  };

  const handlePassengerChange = (e) => {
    const { name, value } = e.target;
    setPassengerDetails({
      ...passengerDetails,
      [name]: value
    });
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    // Check if all required passenger details are filled
    if (!passengerDetails.name || !passengerDetails.age || !passengerDetails.gender || 
        !passengerDetails.email || !passengerDetails.phone) {
      alert("Please fill in all passenger details");
      return;
    }

    // In real app, save booking data and navigate to payment
    const bookingData = {
      selectedSeats,
      passengerDetails,
      travelInsurance,
      totalAmount: calculateTotal(),
      busDetails
    };

    console.log("Booking data:", bookingData);
    navigate("/payment", { state: bookingData });
  };

  const calculateTotal = () => {
    const baseTotal = busDetails.baseFare * selectedSeats.length;
    const taxTotal = busDetails.taxes * selectedSeats.length;
    const discountTotal = busDetails.discount * selectedSeats.length;
    const insuranceTotal = travelInsurance ? 99 * selectedSeats.length : 0;
    
    return baseTotal + taxTotal - discountTotal + insuranceTotal;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderSeatRow = (decks) => {
    const rows = [];
    const seatsPerRow = 3; // 2 seats + walkway + 1 seat
    
    for (let i = 0; i < decks.length; i += seatsPerRow) {
      const rowSeats = decks.slice(i, i + seatsPerRow);
      rows.push(
        <div key={i} className="seat-row">
          {rowSeats.map((seat, index) => {
            const isSelected = selectedSeats.some(s => s.id === seat.id);
            const seatClass = `seat ${seat.booked ? 'booked' : ''} ${seat.gender === 'female' ? 'women-only' : ''} ${isSelected ? 'selected' : ''}`;
            
            return (
              <div key={seat.id} className="seat-wrapper">
                {index === 2 ? (
                  <>
                    <div className="walkway"></div>
                    <div
                      className={seatClass}
                      onClick={() => !seat.booked && handleSeatClick(seat)}
                      data-seat={seat.id}
                      data-type={seat.type}
                      data-gender={seat.gender}
                    >
                      <span>{seat.id}</span>
                      {seat.booked && <i className="fas fa-lock"></i>}
                      {seat.gender === 'female' && !seat.booked && <i className="fas fa-female"></i>}
                    </div>
                  </>
                ) : (
                  <div
                    className={seatClass}
                    onClick={() => !seat.booked && handleSeatClick(seat)}
                    data-seat={seat.id}
                    data-type={seat.type}
                    data-gender={seat.gender}
                  >
                    <span>{seat.id}</span>
                    {seat.booked && <i className="fas fa-lock"></i>}
                    {seat.gender === 'female' && !seat.booked && <i className="fas fa-female"></i>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }
    return rows;
  };

  return (
          <div className="seats-page">
        {/* Seat Selection Header */}
        <section className="seat-header bg-blue-900 text-white pt-24 pb-8">
          <div className="container mx-auto px-4">
            <div className="trip-summary">
              <h1 className="text-3xl font-bold mb-4">Select Your Seats</h1>
              <div className="trip-details">
                <div className="route flex items-center gap-2 mb-2">
                  <span className="from text-xl">{busDetails.from}</span>
                  <i className="fas fa-arrow-right text-gray-300"></i>
                  <span className="to text-xl">{busDetails.to}</span>
                </div>
                <div className="date-operator flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-200">
                  <span className="date">{busDetails.date}</span>
                  <span className="operator">{busDetails.operator} • {busDetails.busType}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="seat-main py-8">
          <div className="container mx-auto px-4">
            <div className="seat-layout-container flex flex-col lg:flex-row gap-8">
              {/* Seat Layout */}
              <section className="seat-layout flex-1 bg-white rounded-lg shadow-md p-6">
                <div className="bus-front flex flex-col items-center mb-8">
                  <i className="fas fa-bus text-4xl text-blue-900"></i>
                  <span className="mt-2 font-medium">Front of Bus</span>
                </div>

                <div className="seat-map flex flex-col gap-8">
                  {/* Lower Deck */}
                  <div className="deck lower-deck">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4 pb-2 border-b border-gray-200">Lower Deck</h3>
                    <div className="seats-grid flex flex-col gap-4">
                      {renderSeatRow(seatsData.lowerDeck)}
                    </div>
                  </div>
                  
                  {/* Upper Deck */}
                  <div className="deck upper-deck">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4 pb-2 border-b border-gray-200">Upper Deck</h3>
                    <div className="seats-grid flex flex-col gap-4">
                      {renderSeatRow(seatsData.upperDeck)}
                    </div>
                  </div>
                </div>
                
                {/* Seat Legend */}
                <div className="seat-legend flex flex-wrap justify-center gap-6 mt-8">
                  <div className="legend-item flex items-center gap-2">
                    <div className="seat w-6 h-6 bg-gray-100 rounded"></div>
                    <span className="text-sm">Available</span>
                  </div>
                  <div className="legend-item flex items-center gap-2">
                    <div className="seat w-6 h-6 bg-blue-900 rounded"></div>
                    <span className="text-sm">Selected</span>
                  </div>
                  <div className="legend-item flex items-center gap-2">
                    <div className="seat w-6 h-6 bg-gray-200 rounded">
                      <i className="fas fa-lock text-xs text-gray-500"></i>
                    </div>
                    <span className="text-sm">Booked</span>
                  </div>
                  <div className="legend-item flex items-center gap-2">
                    <div className="seat w-6 h-6 bg-pink-50 border border-pink-200 rounded">
                      <i className="fas fa-female text-xs text-pink-500"></i>
                    </div>
                    <span className="text-sm">Women Only</span>
                  </div>
                </div>
              </section>
              
              {/* Booking Summary */}
              <aside className="booking-summary w-full lg:w-96 lg:sticky lg:top-24 h-fit">
                <div className="summary-card bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold text-blue-900 mb-6 pb-4 border-b border-gray-200">Booking Summary</h2>
                  
                  <div className="trip-info mb-6">
                    <div className="info-row flex justify-between mb-3">
                      <span className="text-gray-600">Route</span>
                      <span className="font-medium">{busDetails.from} to {busDetails.to}</span>
                    </div>
                    <div className="info-row flex justify-between mb-3">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium">{busDetails.date}</span>
                    </div>
                    <div className="info-row flex justify-between mb-3">
                      <span className="text-gray-600">Departure</span>
                      <span className="font-medium">{busDetails.departure}</span>
                    </div>
                    <div className="info-row flex justify-between mb-3">
                      <span className="text-gray-600">Operator</span>
                      <span className="font-medium">{busDetails.operator}</span>
                    </div>
                    <div className="info-row flex justify-between">
                      <span className="text-gray-600">Bus Type</span>
                      <span className="font-medium">{busDetails.busType}</span>
                    </div>
                  </div>
                  
                  <div className="selected-seats mb-6 py-6 border-t border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Selected Seats</h3>
                    <div className="seats-list flex flex-wrap gap-2 min-h-8">
                      {selectedSeats.length === 0 ? (
                        <div className="no-seats text-gray-500 text-sm">No seats selected yet</div>
                      ) : (
                        selectedSeats.map(seat => (
                          <div key={seat.id} className="seat-badge bg-blue-900 text-white px-3 py-1 rounded-md text-sm flex items-center gap-2">
                            {seat.id}
                            <button
                              onClick={() => handleRemoveSeat(seat.id)}
                              className="text-white hover:text-gray-200"
                            >
                              <i className="fas fa-times text-xs"></i>
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  
                  <div className="fare-summary mb-6">
                    <div className="fare-row flex justify-between mb-3">
                      <span className="text-gray-600">Base Fare ({selectedSeats.length}x)</span>
                      <span>{formatPrice(busDetails.baseFare * selectedSeats.length)}</span>
                    </div>
                    <div className="fare-row flex justify-between mb-3">
                      <span className="text-gray-600">Taxes & Fees</span>
                      <span>{formatPrice(busDetails.taxes * selectedSeats.length)}</span>
                    </div>
                    <div className="fare-row flex justify-between mb-3 text-orange-500">
                      <span>Discount</span>
                      <span>-{formatPrice(busDetails.discount * selectedSeats.length)}</span>
                    </div>
                    {travelInsurance && (
                      <div className="fare-row flex justify-between mb-3">
                        <span className="text-gray-600">Travel Insurance ({selectedSeats.length}x)</span>
                        <span>{formatPrice(99 * selectedSeats.length)}</span>
                      </div>
                    )}
                    <div className="fare-row total flex justify-between mt-4 pt-4 border-t border-gray-200">
                      <span className="font-bold text-lg">Total Amount</span>
                      <span className="font-bold text-lg text-blue-900">{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>
                  
                  <div className="passenger-form mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Passenger Details</h3>
                    <form id="passengerForm">
                      <div className="form-group mb-4">
                        <label htmlFor="passengerName" className="block text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          id="passengerName"
                          name="name"
                          value={passengerDetails.name}
                          onChange={handlePassengerChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="passengerAge" className="block text-gray-700 mb-2">Age</label>
                        <input
                          type="number"
                          id="passengerAge"
                          name="age"
                          value={passengerDetails.age}
                          onChange={handlePassengerChange}
                          min="1"
                          max="100"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label className="block text-gray-700 mb-2">Gender</label>
                        <div className="radio-group flex gap-4">
                          {["male", "female", "other"].map(gender => (
                            <label key={gender} className="radio-option flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="gender"
                                value={gender}
                                checked={passengerDetails.gender === gender}
                                onChange={handlePassengerChange}
                                className="sr-only"
                              />
                              <div className={`radio-checkmark w-5 h-5 border rounded-full flex items-center justify-center ${
                                passengerDetails.gender === gender ? "border-blue-900" : "border-gray-300"
                              }`}>
                                {passengerDetails.gender === gender && (
                                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                                )}
                              </div>
                              <span className="capitalize">{gender}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="passengerEmail" className="block text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          id="passengerEmail"
                          name="email"
                          value={passengerDetails.email}
                          onChange={handlePassengerChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="passengerPhone" className="block text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          id="passengerPhone"
                          name="phone"
                          value={passengerDetails.phone}
                          onChange={handlePassengerChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </form>
                  </div>
                  
                  <div className="add-ons mb-6 py-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Add Travel Insurance</h3>
                    <label className="checkbox-option flex items-center gap-3 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="travelInsurance"
                          checked={travelInsurance}
                          onChange={(e) => setTravelInsurance(e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`checkbox-checkmark w-5 h-5 border rounded flex items-center justify-center ${
                          travelInsurance ? "bg-blue-900 border-blue-900" : "border-gray-300"
                        }`}>
                          {travelInsurance && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-gray-700">Add travel insurance for ₹99 (Recommended)</span>
                    </label>
                  </div>
                  
                  <button
                    onClick={handleProceedToPayment}
                    disabled={selectedSeats.length === 0}
                    className={`w-full py-3 px-4 rounded-md font-semibold transition duration-300 ${
                      selectedSeats.length > 0
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {selectedSeats.length > 0
                      ? `Proceed to Payment (${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''})`
                      : "Proceed to Payment"}
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
  );
};

export default SeatsPage;