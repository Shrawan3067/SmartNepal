import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";

const HotelConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    if (location.state) {
      setBookingData(location.state);
    } else {
      // If no data passed, create mock data or redirect
      navigate('/hotels');
    }
  }, [location.state, navigate]);

  if (!bookingData) {
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

  const { hotel, bookingData: bookingDetails, selectedRoomType, nights, totalAmount, bookingId } = bookingData;

  const handleDownloadVoucher = () => {
    // In real app, generate and download PDF voucher
    alert("Voucher download will start shortly");
  };

  const handlePrintVoucher = () => {
    window.print();
  };

  const handleBookAnother = () => {
    navigate('/hotels');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(price).replace("NPR", "Rs.");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateCheckoutDate = () => {
    const checkIn = new Date(bookingDetails.checkIn);
    checkIn.setDate(checkIn.getDate() + nights);
    return checkIn.toISOString().split('T')[0];
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

  return (
          <div className="hotel-confirmation-page">
        {/* Confirmation Hero */}
        <section className="confirmation-hero bg-gradient-to-r from-blue-900 to-orange-500 text-white pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="check-circle w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <i className="fas fa-check text-4xl text-orange-500"></i>
              </div>
              <h1 className="text-4xl font-bold mb-4">Hotel Booking Confirmed!</h1>
              <p className="text-xl opacity-90">
                Your hotel reservation has been successfully confirmed. Details have been sent to your email.
              </p>
              <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
                <span className="font-mono font-bold">Booking ID: {bookingId}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="confirmation-main py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Booking Details */}
              <div className="flex-1">
                {/* Voucher Actions */}
                <div className="voucher-actions bg-white rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-2xl font-bold text-blue-900">Your Hotel Voucher</h2>
                    <div className="flex gap-3">
                      <button
                        onClick={handleDownloadVoucher}
                        className="btn-outline border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-4 py-2 rounded-lg transition duration-300 flex items-center gap-2"
                      >
                        <i className="fas fa-download"></i>
                        Download Voucher
                      </button>
                      <button
                        onClick={handlePrintVoucher}
                        className="btn-outline border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-4 py-2 rounded-lg transition duration-300 flex items-center gap-2"
                      >
                        <i className="fas fa-print"></i>
                        Print Voucher
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hotel Voucher */}
                <div className="hotel-voucher bg-white rounded-xl shadow-lg p-6 mb-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-xl">
                            SN
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">SmartNepal Travels</h3>
                            <p className="text-gray-600">Hotel Booking Voucher</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-600"><strong>Booking ID:</strong> {bookingId}</p>
                          <p className="text-gray-600"><strong>Booking Date:</strong> {new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <div className="bg-gray-100 p-4 rounded-lg inline-block">
                          <div className="w-32 h-32 bg-gradient-to-br from-blue-900 to-orange-500 flex items-center justify-center">
                            <div className="text-white text-center">
                              <div className="grid grid-cols-4 gap-1 mb-2">
                                {[...Array(16)].map((_, i) => (
                                  <div key={i} className={`w-4 h-4 rounded ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent border border-white'}`}></div>
                                ))}
                              </div>
                              <span className="text-xs font-mono">VOUCHER QR</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-bold text-blue-900 mb-2">Hotel Details</h4>
                        <p className="font-semibold">{hotel.name}</p>
                        <p className="text-gray-600">{hotel.location}</p>
                        <p className="text-gray-600">{hotel.contact || 'Contact hotel for details'}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-bold text-green-900 mb-2">Guest Details</h4>
                        <p className="font-semibold">{bookingDetails.guestDetails.name}</p>
                        <p className="text-gray-600">{bookingDetails.guestDetails.email}</p>
                        <p className="text-gray-600">{bookingDetails.guestDetails.phone}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-blue-900 font-bold text-lg mb-1">CHECK-IN</div>
                        <div className="text-2xl font-bold">{formatDate(bookingDetails.checkIn)}</div>
                        <div className="text-gray-600">From 2:00 PM</div>
                      </div>
                      <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-blue-900 font-bold text-lg mb-1">NIGHTS</div>
                        <div className="text-2xl font-bold">{nights}</div>
                        <div className="text-gray-600">Night Stay</div>
                      </div>
                      <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-blue-900 font-bold text-lg mb-1">CHECK-OUT</div>
                        <div className="text-2xl font-bold">{formatDate(calculateCheckoutDate())}</div>
                        <div className="text-gray-600">Until 12:00 PM</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold text-gray-800 mb-3">Booking Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Room Type:</span>
                          <span className="font-semibold">{selectedRoomType?.name || 'Standard Room'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Guests:</span>
                          <span className="font-semibold">{bookingDetails.adults} Adult(s), {bookingDetails.children} Child(ren)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rooms:</span>
                          <span className="font-semibold">{bookingDetails.rooms} Room(s)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Special Requests:</span>
                          <span className="font-semibold">{bookingDetails.guestDetails.specialRequests || 'None'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-300 pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Present this voucher at check-in</p>
                          <p className="text-sm text-gray-600">Valid ID required</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">For assistance, call:</p>
                          <p className="font-bold text-blue-900">+977 1-2345678</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hotel Details */}
                <div className="hotel-details bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Hotel Information</h3>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="h-48 rounded-lg overflow-hidden bg-gradient-to-br from-blue-900/20 to-orange-500/20 flex items-center justify-center">
                        <i className="fas fa-hotel text-5xl text-blue-900/50"></i>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h4 className="text-lg font-semibold mb-2">{hotel.name}</h4>
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{hotel.location}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        {renderStars(hotel.rating)}
                        <span className="font-medium">{hotel.rating} ({hotel.reviews} reviews)</span>
                      </div>
                      <p className="text-gray-600 mb-4">{hotel.description}</p>
                      <div className="amenities flex flex-wrap gap-2">
                        {(hotel.amenities || []).slice(0, 6).map((amenity, index) => (
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

                {/* Important Information */}
                <div className="important-info bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Important Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-info-circle text-blue-900 mt-1"></i>
                      <div>
                        <h4 className="font-semibold mb-1">Check-in Instructions</h4>
                        <p className="text-gray-600">Please present this voucher and a valid government-issued ID at check-in. Early check-in is subject to availability.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <i className="fas fa-undo text-blue-900 mt-1"></i>
                      <div>
                        <h4 className="font-semibold mb-1">Cancellation Policy</h4>
                        <p className="text-gray-600">Free cancellation until 24 hours before check-in. After that, 50% of the total amount will be charged.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <i className="fas fa-headset text-blue-900 mt-1"></i>
                      <div>
                        <h4 className="font-semibold mb-1">Need Help?</h4>
                        <p className="text-gray-600">Our customer support team is available 24/7 at +977 1-2345678 or support@smartnepal.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Price Summary & Actions */}
              <div className="lg:w-96">
                <div className="price-summary bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-6">Payment Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room Charges ({nights} nights × {bookingDetails.rooms} rooms)</span>
                      <span>{formatPrice((selectedRoomType?.price || hotel.price) * nights * bookingDetails.rooms)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes & Service Charge (13%)</span>
                      <span>{formatPrice(totalAmount * 0.13)}</span>
                    </div>
                    <div className="flex justify-between text-orange-500">
                      <span>Discount Applied (10%)</span>
                      <span>-{formatPrice(totalAmount * 0.1)}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Paid</span>
                        <span className="text-blue-900">{formatPrice(totalAmount * 1.13 * 0.9)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="payment-method mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Payment Method</h4>
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <i className="fas fa-credit-card text-blue-900"></i>
                      <span>Credit/Debit Card •••• 1234</span>
                    </div>
                  </div>

                  <div className="secure-badge flex items-center gap-2 text-green-600 mb-6">
                    <i className="fas fa-shield-alt"></i>
                    <span className="font-medium">Payment Secured & Confirmed</span>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="next-steps bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">What's Next?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-blue-900">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Check your email</h4>
                        <p className="text-sm text-gray-600">We've sent your voucher to {bookingDetails.guestDetails.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-blue-900">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Save the voucher</h4>
                        <p className="text-sm text-gray-600">Download or print your voucher for check-in</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-blue-900">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Enjoy your stay</h4>
                        <p className="text-sm text-gray-600">Present your voucher at the hotel reception</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons space-y-3">
                  <button
                    onClick={handleBookAnother}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-hotel"></i>
                    Book Another Hotel
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="w-full btn-outline border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white py-3 px-4 rounded-lg transition duration-300"
                  >
                    Back to Homepage
                  </button>
                </div>

                {/* Support Info */}
                <div className="support-info mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">24/7 Support Available</h4>
                  <p className="text-sm text-gray-600 mb-3">Need help with your booking?</p>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-phone text-blue-900"></i>
                    <span className="font-medium">+977 1-2345678</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <i className="fas fa-envelope text-blue-900"></i>
                    <span className="font-medium">support@smartnepal.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Why Choose Us */}
        <section className="why-choose bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
              Why Book Hotels With SmartNepal?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <i className="fas fa-shield-alt text-4xl text-orange-500 mb-4"></i>
                <h3 className="font-bold text-blue-900 mb-2">Secure Booking</h3>
                <p className="text-gray-600">Your payment and personal information are protected with bank-level security.</p>
              </div>
              <div className="text-center p-6">
                <i className="fas fa-check-circle text-4xl text-orange-500 mb-4"></i>
                <h3 className="font-bold text-blue-900 mb-2">Best Price Guarantee</h3>
                <p className="text-gray-600">Find a lower price elsewhere? We'll match it and give you 10% extra off.</p>
              </div>
              <div className="text-center p-6">
                <i className="fas fa-headset text-4xl text-orange-500 mb-4"></i>
                <h3 className="font-bold text-blue-900 mb-2">Dedicated Support</h3>
                <p className="text-gray-600">Our travel experts are available 24/7 to assist with any issues.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default HotelConfirmationPage;