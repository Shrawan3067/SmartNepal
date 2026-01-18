import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/common/Layout";

const TourBookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    departureDate: "",
    travelers: 1,
    roomType: "shared",
    guideLanguage: "english",
    insurance: true,
    specialRequests: "",
    guestDetails: {
      name: "",
      email: "",
      phone: "",
      nationality: "",
      passportNumber: "",
      emergencyContact: ""
    },
    paymentMethod: "card"
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Check for tour data in location state
    if (location.state?.tour) {
      setTour(location.state.tour);
      
      // Set default departure date to 30 days from now
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 30);
      setBookingData(prev => ({
        ...prev,
        departureDate: defaultDate.toISOString().split('T')[0]
      }));
      
      setLoading(false);
    } else {
      // If no tour data in state, redirect to tour detail page
      // Using setTimeout to ensure this runs after initial render
      const timer = setTimeout(() => {
        navigate(`/tour/${id}`, { 
          replace: true,
          state: { 
            fromBooking: true,
            message: "Please select a departure date to continue booking" 
          }
        });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [location, navigate, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setBookingData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleIncrementTravelers = () => {
    setBookingData(prev => ({
      ...prev,
      travelers: Math.min(prev.travelers + 1, 10)
    }));
  };

  const handleDecrementTravelers = () => {
    setBookingData(prev => ({
      ...prev,
      travelers: Math.max(prev.travelers - 1, 1)
    }));
  };

  const calculateTotal = () => {
    if (!tour) return 0;
    const basePrice = tour.price * bookingData.travelers;
    const insuranceCost = bookingData.insurance ? 2000 * bookingData.travelers : 0;
    const guideLanguagePremium = bookingData.guideLanguage === "other" ? 5000 * bookingData.travelers : 0;
    const singleRoomSupplement = bookingData.roomType === "single" ? 8000 * bookingData.travelers : 0;
    
    return basePrice + insuranceCost + guideLanguagePremium + singleRoomSupplement;
  };

  const handleProceedToPayment = () => {
    // Validate required fields
    if (!bookingData.guestDetails.name || !bookingData.guestDetails.email || 
        !bookingData.guestDetails.phone || !bookingData.guestDetails.passportNumber) {
      alert("Please fill in all required guest details");
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      const bookingSummary = {
        tour: tour,
        bookingData: bookingData,
        totalAmount: calculateTotal(),
        bookingId: `TOUR${Date.now()}${tour?.id || id}`,
        timestamp: new Date().toISOString()
      };

      console.log("Tour booking processed:", bookingSummary);
      
navigate(`/tour/${tour.id}/payment`, {
    state: { bookingSummary }
  });
    }, 1500);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(price).replace("NPR", "Rs.");
  };

  // Show loading state
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p>Loading booking details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Don't render booking form if no tour
  if (!tour) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p>No tour selected. Redirecting...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
          <div className="tour-booking-page">
        {/* Booking Header */}
        <section className="booking-header bg-gradient-to-r from-blue-900 to-orange-500 text-white pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Book Your Adventure</h1>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-mountain"></i>
                    <span className="text-xl font-medium">{tour.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-clock"></i>
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-flag"></i>
                    <span>{tour.difficulty}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate(-1)}
                className="btn-outline border-white text-white hover:bg-white hover:text-blue-900 self-start lg:self-center px-6 py-2 rounded-lg transition duration-300"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Tour
              </button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="booking-main py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Booking Form */}
              <div className="flex-1">
                {/* Tour Summary */}
                <div className="tour-summary bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Tour Summary</h3>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="h-48 rounded-lg bg-gradient-to-br from-blue-900/20 to-orange-500/20 flex items-center justify-center">
                        <i className="fas fa-mountain text-5xl text-blue-900/50"></i>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h4 className="text-lg font-semibold mb-2">{tour.title}</h4>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <i className="fas fa-clock"></i>
                          <span>Duration: {tour.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <i className="fas fa-users"></i>
                          <span>Group Size: {tour.groupSize}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <i className="fas fa-sun"></i>
                          <span>Best Season: {tour.bestSeason}</span>
                        </div>
                      </div>
                      <div className="amenities flex flex-wrap gap-2">
                        {tour.amenities?.slice(0, 4).map((amenity, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-900 text-xs rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Details Form */}
                <div className="booking-form bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-6">Booking Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">Departure Date *</label>
                      <input
                        type="date"
                        name="departureDate"
                        value={bookingData.departureDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">Number of Travelers *</label>
                      <div className="flex items-center">
                        <button
                          onClick={handleDecrementTravelers}
                          className="px-4 py-2 border border-gray-300 rounded-l-lg hover:bg-gray-50"
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <div className="flex-1 text-center px-4 py-2 border-t border-b border-gray-300">
                          {bookingData.travelers}
                        </div>
                        <button
                          onClick={handleIncrementTravelers}
                          className="px-4 py-2 border border-gray-300 rounded-r-lg hover:bg-gray-50"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">Room Type</label>
                      <select
                        name="roomType"
                        value={bookingData.roomType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="shared">Shared Accommodation</option>
                        <option value="single">Single Room (Supplement applies)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">Guide Language</label>
                      <select
                        name="guideLanguage"
                        value={bookingData.guideLanguage}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="english">English</option>
                        <option value="french">French</option>
                        <option value="spanish">Spanish</option>
                        <option value="german">German</option>
                        <option value="other">Other (Supplement applies)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bookingData.insurance}
                        onChange={(e) => setBookingData(prev => ({ ...prev, insurance: e.target.checked }))}
                        className="w-5 h-5"
                      />
                      <span className="text-gray-700">
                        Add Travel Insurance (Rs. 2,000 per person) - Recommended
                      </span>
                    </label>
                  </div>

                  <div className="form-group mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Special Requests</label>
                    <textarea
                      name="specialRequests"
                      value={bookingData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Dietary requirements, medical conditions, or other special requests..."
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <h4 className="text-lg font-semibold text-blue-900 mb-4">Lead Traveler Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="form-group">
                      <label className="block text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="guestDetails.name"
                        value={bookingData.guestDetails.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="guestDetails.email"
                        value={bookingData.guestDetails.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="form-group">
                      <label className="block text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="guestDetails.phone"
                        value={bookingData.guestDetails.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-gray-700 mb-2">Nationality *</label>
                      <input
                        type="text"
                        name="guestDetails.nationality"
                        value={bookingData.guestDetails.nationality}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="block text-gray-700 mb-2">Passport Number *</label>
                      <input
                        type="text"
                        name="guestDetails.passportNumber"
                        value={bookingData.guestDetails.passportNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-gray-700 mb-2">Emergency Contact</label>
                      <input
                        type="text"
                        name="guestDetails.emergencyContact"
                        value={bookingData.guestDetails.emergencyContact}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="important-notes bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Important Notes</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <i className="fas fa-info-circle text-blue-900 mt-1"></i>
                      <span>25% deposit required to confirm booking. Balance due 30 days before departure.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="fas fa-undo text-blue-900 mt-1"></i>
                      <span>Free cancellation up to 60 days before departure. 50% refund for cancellations 30-59 days before.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="fas fa-passport text-blue-900 mt-1"></i>
                      <span>Passport must be valid for at least 6 months beyond your return date.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="fas fa-shield-alt text-blue-900 mt-1"></i>
                      <span>Travel insurance is mandatory for all treks above 4,000 meters.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column - Price Summary */}
              <div className="lg:w-96">
                <div className="price-summary bg-white rounded-xl shadow-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-blue-900 mb-6">Price Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tour Price ({bookingData.travelers}x)</span>
                      <span>{formatPrice(tour.price * bookingData.travelers)}</span>
                    </div>
                    
                    {bookingData.roomType === "single" && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Single Room Supplement</span>
                        <span>{formatPrice(8000 * bookingData.travelers)}</span>
                      </div>
                    )}
                    
                    {bookingData.guideLanguage === "other" && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Special Guide Language</span>
                        <span>{formatPrice(5000 * bookingData.travelers)}</span>
                      </div>
                    )}
                    
                    {bookingData.insurance && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Travel Insurance ({bookingData.travelers}x)</span>
                        <span>{formatPrice(2000 * bookingData.travelers)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Charge</span>
                      <span>{formatPrice(calculateTotal() * 0.1)}</span>
                    </div>
                    
                    <div className="flex justify-between text-orange-500">
                      <span>Early Bird Discount</span>
                      <span>-{formatPrice(calculateTotal() * 0.15)}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Amount</span>
                        <span className="text-blue-900">{formatPrice(calculateTotal() * 1.1 * 0.85)}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Including all charges and discount</p>
                    </div>
                  </div>

                  <div className="deposit-info mb-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-900 font-medium mb-2">
                      <i className="fas fa-credit-card"></i>
                      <span>Deposit Required</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Only {formatPrice(calculateTotal() * 1.1 * 0.85 * 0.25)} deposit required now to secure your spot.
                    </p>
                  </div>

                  <div className="secure-booking mb-6">
                    <div className="flex items-center gap-3 text-green-600 mb-3">
                      <i className="fas fa-lock"></i>
                      <span className="font-medium">Secure Booking</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your payment information is encrypted and secure. Flexible payment options available.
                    </p>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    disabled={isProcessing}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-300 flex items-center justify-center gap-3 ${
                      isProcessing
                        ? "bg-blue-700 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-lock"></i>
                        Proceed to Payment
                      </>
                    )}
                  </button>

                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      <i className="fas fa-shield-alt text-green-500 mr-1"></i>
                      Guaranteed lowest price or we'll match it
                    </p>
                  </div>
                </div>

                {/* Support Info */}
                <div className="support-info mt-6 bg-white rounded-xl shadow-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Need Assistance?</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-phone text-blue-900"></i>
                      <div>
                        <div className="font-medium">Call Us</div>
                        <div className="text-sm text-gray-600">+977 1-2345678</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-envelope text-blue-900"></i>
                      <div>
                        <div className="font-medium">Email Us</div>
                        <div className="text-sm text-gray-600">tours@smartnepal.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-comments text-blue-900"></i>
                      <div>
                        <div className="font-medium">Live Chat</div>
                        <div className="text-sm text-gray-600">Available 24/7</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Trust Badges */}
        <section className="trust-badges bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <i className="fas fa-award text-3xl text-blue-900 mb-3"></i>
                <h4 className="font-semibold text-gray-800">Award Winning</h4>
                <p className="text-sm text-gray-600">Best Tour Operator 2023</p>
              </div>
              <div className="text-center">
                <i className="fas fa-user-shield text-3xl text-blue-900 mb-3"></i>
                <h4 className="font-semibold text-gray-800">Safety Certified</h4>
                <p className="text-sm text-gray-600">Fully insured and certified</p>
              </div>
              <div className="text-center">
                <i className="fas fa-heart text-3xl text-blue-900 mb-3"></i>
                <h4 className="font-semibold text-gray-800">Local Experts</h4>
                <p className="text-sm text-gray-600">Born and raised in Nepal</p>
              </div>
              <div className="text-center">
                <i className="fas fa-leaf text-3xl text-blue-900 mb-3"></i>
                <h4 className="font-semibold text-gray-800">Sustainable</h4>
                <p className="text-sm text-gray-600">Eco-friendly tourism</p>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default TourBookingPage;