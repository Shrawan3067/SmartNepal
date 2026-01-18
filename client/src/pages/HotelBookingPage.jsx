import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/common/Layout";

const HotelBookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get hotel data from navigation state or use default
  const passedHotel = location.state?.hotel;

  // Default hotel structure with all required properties
  const defaultHotel = {
    id: parseInt(id) || 1,
    name: `Hotel ${id}`,
    location: 'Location not specified',
    price: 5000 + (parseInt(id) || 1) * 500,
    originalPrice: 6500 + (parseInt(id) || 1) * 500,
    rating: 4.5,
    reviews: 100,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    amenities: ['Free WiFi', 'Parking', 'Restaurant', 'AC'],
    description: 'A comfortable hotel for your stay.',
    distance: 'City center',
    contact: '+977 1-2345678',
    email: 'info@hotel.com',
    // Ensure policies is always an array
    policies: [
      'Check-in: 2:00 PM, Check-out: 12:00 PM',
      'Free cancellation up to 24 hours before check-in',
      'No smoking in rooms',
      'Children under 5 stay free'
    ]
  };

  // Merge passed hotel data with defaults
  const hotel = {
    ...defaultHotel,
    ...passedHotel,
    // Ensure arrays exist
    amenities: passedHotel?.amenities || defaultHotel.amenities,
    policies: passedHotel?.policies || defaultHotel.policies
  };

  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
    rooms: 1,
    roomType: "standard",
    guestDetails: {
      name: "",
      email: "",
      phone: "",
      specialRequests: ""
    },
    paymentMethod: "card"
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(null);

  // Room types available
  const roomTypes = [
    { id: 'standard', name: 'Standard Room', price: hotel.price, maxOccupancy: 2, description: 'Cozy room with basic amenities' },
    { id: 'deluxe', name: 'Deluxe Room', price: Math.round(hotel.price * 1.2), maxOccupancy: 3, description: 'Spacious room with view' },
    { id: 'suite', name: 'Executive Suite', price: Math.round(hotel.price * 1.5), maxOccupancy: 4, description: 'Luxury suite with separate living area' },
    { id: 'family', name: 'Family Suite', price: Math.round(hotel.price * 1.8), maxOccupancy: 5, description: 'Perfect for families with extra beds' }
  ];

  useEffect(() => {
    // Set default check-in to tomorrow and check-out to day after tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    setBookingData(prev => ({
      ...prev,
      checkIn: tomorrow.toISOString().split('T')[0],
      checkOut: dayAfterTomorrow.toISOString().split('T')[0]
    }));

    // Set default room type
    setSelectedRoomType(roomTypes[0]);
  }, []);

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

  const handleIncrement = (field) => {
    setBookingData(prev => ({
      ...prev,
      [field]: Math.min(prev[field] + 1, field === 'rooms' ? 5 : 10)
    }));
  };

  const handleDecrement = (field) => {
    setBookingData(prev => ({
      ...prev,
      [field]: Math.max(prev[field] - 1, field === 'rooms' ? 1 : 0)
    }));
  };

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 1;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const roomPrice = selectedRoomType ? selectedRoomType.price : hotel.price;
    return roomPrice * nights * bookingData.rooms;
  };

  const handleProceedToPayment = () => {
    if (!bookingData.guestDetails.name || !bookingData.guestDetails.email || !bookingData.guestDetails.phone) {
      alert("Please fill in all guest details");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const bookingSummary = {
        hotel: hotel,
        bookingData: bookingData,
        selectedRoomType: selectedRoomType,
        nights: calculateNights(),
        totalAmount: calculateTotal(),
        bookingId: `HOTEL${Date.now()}${hotel.id}`,
        timestamp: new Date().toISOString()
      };

      console.log("Hotel booking processed:", bookingSummary);
      
      // Navigate to hotel confirmation page
      navigate("/payment", {
        state: bookingSummary
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

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`fas ${
              i < Math.floor(rating)
                ? "fa-star text-yellow-500"
                : i === Math.floor(rating) && rating % 1 !== 0
                  ? "fa-star-half-alt text-yellow-500"
                  : "fa-star text-gray-300"
            }`}
          ></i>
        ))}
      </div>
    );
  };

  // Safe function to render policies
  const renderPolicies = () => {
    // Always ensure we have an array
    const policies = hotel.policies || [];
    
    return (
      <ul className="space-y-2">
        {policies.map((policy, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-600">
            <i className="fas fa-info-circle text-blue-900 mt-1"></i>
            <span>{policy}</span>
          </li>
        ))}
        {policies.length === 0 && (
          <li className="text-gray-500 italic">No specific policies listed</li>
        )}
      </ul>
    );
  };

  return (
          <div className="hotel-booking-page">
        {/* Booking Header */}
        <section className="booking-header bg-gradient-to-r from-blue-900 to-orange-500 text-white pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Book Your Stay</h1>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-hotel"></i>
                    <span className="text-xl font-medium">{hotel.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{hotel.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderStars(hotel.rating)}
                    <span>{hotel.rating} ({hotel.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/hotels')}
                className="btn-outline border-white text-white hover:bg-white hover:text-blue-900 self-start lg:self-center px-6 py-2 rounded-lg transition duration-300"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Hotels
              </button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="booking-main py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Hotel Details & Booking Form */}
              <div className="flex-1">
                {/* Hotel Summary Card */}
                <div className="hotel-summary bg-white rounded-xl shadow-lg p-6 mb-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="h-48 rounded-lg overflow-hidden bg-gradient-to-br from-blue-900/20 to-orange-500/20 flex items-center justify-center">
                        <i className="fas fa-hotel text-5xl text-blue-900/50"></i>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h2 className="text-2xl font-bold text-blue-900 mb-3">{hotel.name}</h2>
                      <div className="flex items-center gap-3 text-gray-600 mb-4">
                        <span className="flex items-center gap-2">
                          <i className="fas fa-map-marker-alt"></i>
                          {hotel.location}
                        </span>
                        {hotel.contact && (
                          <span className="flex items-center gap-2">
                            <i className="fas fa-phone"></i>
                            {hotel.contact}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{hotel.description}</p>
                      <div className="amenities flex flex-wrap gap-2 mb-4">
                        {(hotel.amenities || []).slice(0, 5).map((amenity, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-900 text-xs rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                        {(hotel.amenities || []).length > 5 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{(hotel.amenities || []).length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="booking-form bg-white rounded-xl shadow-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-blue-900 mb-6">Booking Details</h3>
                  
                  {/* Dates Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">Check-in Date</label>
                      <input
                        type="date"
                        name="checkIn"
                        value={bookingData.checkIn}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">Check-out Date</label>
                      <input
                        type="date"
                        name="checkOut"
                        value={bookingData.checkOut}
                        onChange={handleInputChange}
                        min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Guests & Rooms */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">Adults</label>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleDecrement('adults')}
                          className="px-4 py-2 border border-gray-300 rounded-l-lg hover:bg-gray-50"
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <div className="flex-1 text-center px-4 py-2 border-t border-b border-gray-300">
                          {bookingData.adults}
                        </div>
                        <button
                          onClick={() => handleIncrement('adults')}
                          className="px-4 py-2 border border-gray-300 rounded-r-lg hover:bg-gray-50"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">Children</label>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleDecrement('children')}
                          className="px-4 py-2 border border-gray-300 rounded-l-lg hover:bg-gray-50"
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <div className="flex-1 text-center px-4 py-2 border-t border-b border-gray-300">
                          {bookingData.children}
                        </div>
                        <button
                          onClick={() => handleIncrement('children')}
                          className="px-4 py-2 border border-gray-300 rounded-r-lg hover:bg-gray-50"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">Rooms</label>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleDecrement('rooms')}
                          className="px-4 py-2 border border-gray-300 rounded-l-lg hover:bg-gray-50"
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <div className="flex-1 text-center px-4 py-2 border-t border-b border-gray-300">
                          {bookingData.rooms}
                        </div>
                        <button
                          onClick={() => handleIncrement('rooms')}
                          className="px-4 py-2 border border-gray-300 rounded-r-lg hover:bg-gray-50"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Room Type Selection */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-3">Select Room Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {roomTypes.map((room) => (
                        <div
                          key={room.id}
                          onClick={() => {
                            setSelectedRoomType(room);
                            setBookingData(prev => ({ ...prev, roomType: room.id }));
                          }}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            selectedRoomType?.id === room.id
                              ? 'border-blue-900 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-900 hover:bg-blue-50/50'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-800">{room.name}</h4>
                            <span className="font-bold text-blue-900">{formatPrice(room.price)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{room.description}</p>
                          <div className="text-xs text-gray-500">
                            Max occupancy: {room.maxOccupancy} persons
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Guest Details */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-blue-900 mb-4">Guest Details</h4>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <label className="block text-gray-700 mb-2">Special Requests</label>
                        <input
                          type="text"
                          name="guestDetails.specialRequests"
                          value={bookingData.guestDetails.specialRequests}
                          onChange={handleInputChange}
                          placeholder="Any special requirements?"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hotel Policies */}
                <div className="policies bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Hotel Policies</h3>
                  {renderPolicies()}
                </div>
              </div>

              {/* Right Column - Price Summary */}
              <div className="lg:w-96">
                <div className="price-summary bg-white rounded-xl shadow-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-blue-900 mb-6">Price Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room Price ({bookingData.rooms}x)</span>
                      <span>{formatPrice((selectedRoomType?.price || hotel.price) * bookingData.rooms)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Number of Nights</span>
                      <span>{calculateNights()} nights</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes & Service Charge</span>
                      <span>{formatPrice(calculateTotal() * 0.13)}</span>
                    </div>
                    <div className="flex justify-between text-orange-500">
                      <span>Discount</span>
                      <span>-{formatPrice(calculateTotal() * 0.1)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Amount</span>
                        <span className="text-blue-900">{formatPrice(calculateTotal() * 1.13 * 0.9)}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Including taxes and discount</p>
                    </div>
                  </div>

                  <div className="secure-booking mb-6">
                    <div className="flex items-center gap-3 text-green-600 mb-3">
                      <i className="fas fa-lock"></i>
                      <span className="font-medium">Secure Booking</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your payment is protected with SSL encryption. Free cancellation available.
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
                        Proceed to Secure Payment
                      </>
                    )}
                  </button>

                  <div className="mt-4 text-center text-sm text-gray-500">
                    <p>You won't be charged until booking is confirmed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Trust Signals */}
        <section className="trust-section bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <i className="fas fa-shield-alt text-3xl text-blue-900 mb-3"></i>
                <h4 className="font-semibold text-gray-800">Secure Payment</h4>
                <p className="text-sm text-gray-600">SSL encrypted</p>
              </div>
              <div className="text-center">
                <i className="fas fa-clock text-3xl text-blue-900 mb-3"></i>
                <h4 className="font-semibold text-gray-800">Instant Confirmation</h4>
                <p className="text-sm text-gray-600">Receive e-ticket instantly</p>
              </div>
              <div className="text-center">
                <i className="fas fa-headset text-3xl text-blue-900 mb-3"></i>
                <h4 className="font-semibold text-gray-800">24/7 Support</h4>
                <p className="text-sm text-gray-600">Always here to help</p>
              </div>
              <div className="text-center">
                <i className="fas fa-trophy text-3xl text-blue-900 mb-3"></i>
                <h4 className="font-semibold text-gray-800">Best Price</h4>
                <p className="text-sm text-gray-600">Guaranteed</p>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default HotelBookingPage;