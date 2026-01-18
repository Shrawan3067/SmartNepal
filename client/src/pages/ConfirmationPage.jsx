import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Default booking data structure
  const defaultBookingData = {
    bookingId: "VOY78945612",
    from: "Mumbai",
    to: "Goa",
    date: "Sat, 15 Jul 2023",
    departureTime: "22:30",
    departureLocation: "Mumbai Central Bus Stand",
    arrivalTime: "07:00",
    arrivalLocation: "Panjim Bus Stand, Goa",
    duration: "8h 30m",
    operator: "SmartNepal Travels",
    busType: "AC Sleeper (2+1)",
    amenities: ["WiFi", "Charging", "AC"], // Ensure amenities is always an array
    passenger: {
      name: "Rahul Sharma",
      gender: "Male",
      age: 28,
      seat: "A12 (Upper)",
      phone: "+91 9876543210",
      email: "rahul.sharma@example.com"
    },
    payment: {
      baseFare: 1199,
      taxes: 100,
      discount: 200,
      total: 1099,
      method: "UPI",
      methodDetail: "rahul.sharma@okhdfcbank"
    }
  };

  // Get booking data from navigation state or use default data
  const bookingData = location.state || defaultBookingData;

  // Ensure all required fields exist with safe defaults
  const safeBookingData = {
    ...defaultBookingData,
    ...bookingData,
    amenities: bookingData?.amenities || defaultBookingData.amenities,
    passenger: {
      ...defaultBookingData.passenger,
      ...(bookingData?.passenger || {})
    },
    payment: {
      ...defaultBookingData.payment,
      ...(bookingData?.payment || {})
    }
  };

  // OR simpler approach - just ensure amenities exists
  const amenities = safeBookingData.amenities || ["WiFi", "Charging", "AC"];

  const handleDownloadTicket = () => {
    // In real app, generate and download PDF
    alert("Ticket download will start shortly");
  };

  const handleShare = () => {
    // In real app, implement share functionality
    alert("Share options will appear here");
  };

  const handleViewMap = () => {
    window.open(`https://maps.google.com?q=${encodeURIComponent(safeBookingData.departureLocation)}`, '_blank');
  };

  const handleCallSupport = () => {
    alert("Calling customer support...");
  };

  const handleBrowseHotels = () => {
    navigate("/hotels");
  };

  const handleBookCab = () => {
    navigate("/cabs");
  };

  const handleViewTours = () => {
    navigate("/tours");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
          <div className="confirmation-page">
        {/* Confirmation Hero */}
        <section className="confirmation-hero bg-gradient-to-r from-blue-900 to-orange-500 text-white pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="confirmation-check max-w-2xl mx-auto text-center">
              <div className="check-circle w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <i className="fas fa-check text-4xl text-orange-500"></i>
              </div>
              <h1 className="text-4xl font-bold mb-4">Booking Confirmed!</h1>
              <p className="text-xl opacity-90">
                Your ticket has been successfully booked. Details have been sent to your email.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="confirmation-main py-8">
          <div className="container mx-auto px-4">
            {/* Ticket Summary */}
            <section className="ticket-summary mb-12">
              <div className="summary-header flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-blue-900">Your Journey Details</h2>
                <div className="ticket-actions flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleDownloadTicket}
                    className="btn-outline border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-4 py-2 rounded-md transition duration-300 flex-1 sm:flex-none flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-download"></i>
                    <span className="hidden sm:inline">Download Ticket</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="btn-outline border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-4 py-2 rounded-md transition duration-300 flex-1 sm:flex-none flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-share-alt"></i>
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>
              </div>
              
              <div className="ticket-card bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="ticket-qr text-center lg:text-left">
                    <div className="bg-gray-100 p-4 rounded-lg inline-block mb-4">
                      <div className="w-40 h-40 bg-gradient-to-br from-blue-900 to-orange-500 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="grid grid-cols-4 gap-1 mb-2">
                            {[...Array(16)].map((_, i) => (
                              <div key={i} className={`w-6 h-6 rounded ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent border border-white'}`}></div>
                            ))}
                          </div>
                          <span className="text-xs font-mono">Booking QR</span>
                        </div>
                      </div>
                    </div>
                    <span className="booking-id font-medium text-blue-900 block">
                      Booking ID: {safeBookingData.bookingId}
                    </span>
                  </div>
                  
                  <div className="ticket-details flex-1">
                    <div className="route mb-6">
                      <div className="cities flex items-center gap-3 mb-2">
                        <span className="from-city text-2xl font-bold">{safeBookingData.from}</span>
                        <i className="fas fa-arrow-right text-gray-500"></i>
                        <span className="to-city text-2xl font-bold">{safeBookingData.to}</span>
                      </div>
                      <span className="travel-date text-gray-600">{safeBookingData.date}</span>
                    </div>
                    
                    <div className="timings mb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="departure">
                          <span className="time text-xl font-bold block">{safeBookingData.departureTime}</span>
                          <span className="location text-gray-600 text-sm">{safeBookingData.departureLocation}</span>
                        </div>
                        
                        <div className="duration flex-1 flex flex-col items-center px-4">
                          <span className="text-gray-600 text-sm mb-2">{safeBookingData.duration}</span>
                          <div className="route-line relative w-full h-px bg-gray-300">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-900"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-orange-500"></div>
                          </div>
                        </div>
                        
                        <div className="arrival">
                          <span className="time text-xl font-bold block">{safeBookingData.arrivalTime}</span>
                          <span className="location text-gray-600 text-sm">{safeBookingData.arrivalLocation}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bus-details mb-6">
                      <div className="operator flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold">
                          SN
                        </div>
                        <span className="font-medium">{safeBookingData.operator} • {safeBookingData.busType}</span>
                      </div>
                      <div className="amenities flex flex-wrap gap-4">
                        {/* FIXED: Using the guaranteed amenities array */}
                        {amenities.map((amenity, index) => (
                          <span key={index} className="flex items-center gap-2 text-gray-600">
                            {amenity === "WiFi" && <i className="fas fa-wifi text-blue-900"></i>}
                            {amenity === "Charging" && <i className="fas fa-bolt text-blue-900"></i>}
                            {amenity === "AC" && <i className="fas fa-snowflake text-blue-900"></i>}
                            {/* Add more icons as needed */}
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="passenger-details pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">Passenger Details</h3>
                      <div className="passenger flex flex-col sm:flex-row sm:justify-between mb-3">
                        <span className="name font-medium">
                          {safeBookingData.passenger.name} ({safeBookingData.passenger.gender}, {safeBookingData.passenger.age})
                        </span>
                        <span className="seat text-gray-600">Seat: {safeBookingData.passenger.seat}</span>
                      </div>
                      <div className="contact flex flex-col sm:flex-row gap-4 text-gray-600 text-sm">
                        <span className="flex items-center gap-2">
                          <i className="fas fa-phone"></i>
                          {safeBookingData.passenger.phone}
                        </span>
                        <span className="flex items-center gap-2">
                          <i className="fas fa-envelope"></i>
                          {safeBookingData.passenger.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="boarding-pass mt-8 bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-6">Boarding Pass</h3>
                  <div className="pass-container bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="pass-left p-6 flex flex-col items-center justify-center gap-4 md:border-r border-dashed border-gray-300">
                        <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-xl">
                          SN
                        </div>
                        <span className="passenger-name font-medium">{safeBookingData.passenger.name}</span>
                        <span className="seat-number bg-blue-900 text-white px-4 py-1 rounded-full text-sm">
                          Seat {safeBookingData.passenger.seat?.split(' ')[0] || "N/A"}
                        </span>
                      </div>
                      
                      <div className="pass-right flex-1 flex flex-col md:flex-row">
                        <div className="pass-qr p-6 flex items-center justify-center md:border-r border-dashed border-gray-300">
                          <div className="w-24 h-24 bg-gradient-to-br from-blue-900 to-orange-500 flex items-center justify-center">
                            <i className="fas fa-qrcode text-white text-3xl"></i>
                          </div>
                        </div>
                        
                        <div className="pass-details p-6 flex flex-col justify-center gap-3">
                          <span className="font-medium">{safeBookingData.from} → {safeBookingData.to}</span>
                          <span className="text-gray-600">{safeBookingData.date} • {safeBookingData.departureTime}</span>
                          <span className="text-gray-600">Bus: VOY-7894</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Payment Summary */}
            <section className="payment-summary mb-12">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Payment Summary</h2>
              <div className="payment-card bg-white rounded-xl shadow-lg p-6">
                <div className="space-y-4">
                  <div className="payment-row flex justify-between pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Base Fare (1 Passenger)</span>
                    <span>{formatPrice(safeBookingData.payment.baseFare)}</span>
                  </div>
                  <div className="payment-row flex justify-between pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span>{formatPrice(safeBookingData.payment.taxes)}</span>
                  </div>
                  <div className="payment-row flex justify-between pb-4 border-b border-gray-200 text-orange-500">
                    <span>Discount Applied</span>
                    <span>-{formatPrice(safeBookingData.payment.discount)}</span>
                  </div>
                  <div className="payment-row total flex justify-between pt-4">
                    <span className="text-lg font-bold">Total Amount Paid</span>
                    <span className="text-lg font-bold text-blue-900">{formatPrice(safeBookingData.payment.total)}</span>
                  </div>
                  
                  <div className="payment-method mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <span className="font-medium">Payment Method:</span>
                      <div className="method flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center">
                          <i className="fas fa-university text-white"></i>
                        </div>
                        <span>{safeBookingData.payment.method} ({safeBookingData.payment.methodDetail})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Help & Next Steps */}
            <section className="help-section mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="help-card bg-white rounded-xl shadow-lg p-6 flex gap-4">
                  <i className="fas fa-map-marker-alt text-3xl text-blue-900 mt-2"></i>
                  <div className="help-content flex-1">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Boarding Point Location</h3>
                    <p className="text-gray-600 mb-4">{safeBookingData.departureLocation}</p>
                    <button
                      onClick={handleViewMap}
                      className="btn-outline border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-4 py-2 rounded-md transition duration-300 flex items-center gap-2"
                    >
                      <i className="fas fa-map"></i>
                      View on Map
                    </button>
                  </div>
                </div>
                
                <div className="help-card bg-white rounded-xl shadow-lg p-6 flex gap-4">
                  <i className="fas fa-headset text-3xl text-blue-900 mt-2"></i>
                  <div className="help-content flex-1">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h3>
                    <p className="text-gray-600 mb-4">
                      Our customer support team is available 24/7 to assist you with any queries.
                    </p>
                    <button
                      onClick={handleCallSupport}
                      className="btn-outline border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-4 py-2 rounded-md transition duration-300 flex items-center gap-2"
                    >
                      <i className="fas fa-phone"></i>
                      Call Support
                    </button>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Recommended Add-ons */}
            <section className="addons-section">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Complete Your Journey</h2>
              <div className="addons-grid grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="addon-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-40 bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center">
                    <i className="fas fa-hotel text-white text-5xl"></i>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Hotels in Goa</h3>
                    <p className="text-gray-600 mb-4">
                      Book your stay at the best hotels starting from ₹999/night
                    </p>
                    <button
                      onClick={handleBrowseHotels}
                      className="btn-primary bg-orange-500 hover:bg-orange-600 text-white w-full py-3 rounded-md font-semibold transition duration-300"
                    >
                      Browse Hotels
                    </button>
                  </div>
                </div>
                
                <div className="addon-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-40 bg-gradient-to-r from-green-600 to-green-800 flex items-center justify-center">
                    <i className="fas fa-taxi text-white text-5xl"></i>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Cab to Bus Stand</h3>
                    <p className="text-gray-600 mb-4">
                      Pre-book your cab to reach the boarding point on time
                    </p>
                    <button
                      onClick={handleBookCab}
                      className="btn-primary bg-orange-500 hover:bg-orange-600 text-white w-full py-3 rounded-md font-semibold transition duration-300"
                    >
                      Book Cab
                    </button>
                  </div>
                </div>
                
                <div className="addon-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-40 bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center">
                    <i className="fas fa-umbrella-beach text-white text-5xl"></i>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Goa Tour Packages</h3>
                    <p className="text-gray-600 mb-4">
                      Explore Goa with our specially curated tour packages
                    </p>
                    <button
                      onClick={handleViewTours}
                      className="btn-primary bg-orange-500 hover:bg-orange-600 text-white w-full py-3 rounded-md font-semibold transition duration-300"
                    >
                      View Tours
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
  );
};

export default ConfirmationPage;