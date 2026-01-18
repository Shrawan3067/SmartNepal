import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("cards");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [saveCard, setSaveCard] = useState(false);
  const [selectedBank, setSelectedBank] = useState("hdfc");
  const [selectedWallet, setSelectedWallet] = useState("esewa");
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Get booking data from navigation state or use mock data
  const bookingData = location.state || {
    from: "Mumbai",
    to: "Goa",
    date: "Sat, 15 Jul 2023",
    departure: "22:30",
    operator: "SmartNepal Travels",
    busType: "AC Sleeper",
    passengers: 1,
    seats: ["L1", "L2"],
    baseFare: 2398,
    taxes: 200,
    discount: 400,
    insurance: 99
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardDetails({ ...cardDetails, number: value });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setCardDetails({ ...cardDetails, expiry: value });
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCardDetails({ ...cardDetails, cvv: value });
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const copyUpiId = () => {
    const upiId = "SmartNepal.travels@upi";
    navigator.clipboard.writeText(upiId);
    
    // Show toast message (in real app, use a toast component)
    alert("UPI ID copied to clipboard!");
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      alert("Please enter a coupon code");
      return;
    }
    // In real app, validate coupon with API
    alert(`Coupon ${couponCode} applied successfully!`);
    setCouponCode("");
    setShowCoupon(false);
  };

  const handlePayment = () => {
    setIsProcessing(true);

    // Validate based on active payment method
    if (activeTab === "cards") {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        alert("Please fill all card details");
        setIsProcessing(false);
        return;
      }
      
      if (cardDetails.number.replace(/\s/g, '').length !== 16) {
        alert("Please enter a valid 16-digit card number");
        setIsProcessing(false);
        return;
      }
      
      if (cardDetails.cvv.length !== 3) {
        alert("Please enter a valid 3-digit CVV");
        setIsProcessing(false);
        return;
      }
    }

    // Simulate payment processing
    setTimeout(() => {
      const paymentData = {
        method: activeTab,
        amount: bookingData.baseFare + bookingData.taxes - bookingData.discount + bookingData.insurance,
        bookingId: `BOOK${Date.now()}`,
        timestamp: new Date().toISOString()
      };

      console.log("Payment processed:", paymentData);
      
      // Navigate to confirmation page
      navigate("/confirmation", {
        state: {
          ...bookingData,
          paymentData,
          paymentMethod: getPaymentMethodName(activeTab)
        }
      });
    }, 1500);
  };

  const getPaymentMethodName = (method) => {
    switch (method) {
      case "cards": return "Credit/Debit Card";
      case "upi": return "UPI";
      case "netbanking": return "Net Banking";
      case "wallets": return "Digital Wallet";
      default: return method;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalAmount = bookingData.baseFare + bookingData.taxes - bookingData.discount + bookingData.insurance;

  return (
          <div className="payment-page">
        {/* Payment Progress */}
        <section className="payment-progress bg-gray-50 py-6">
          <div className="container mx-auto px-4">
            <div className="progress-steps flex flex-col sm:flex-row sm:justify-between sm:items-center max-w-4xl mx-auto relative">
              <div className="step flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-0">
                <div className="step-number w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-semibold">
                  1
                </div>
                <span className="text-sm font-medium text-blue-900">Seat Selection</span>
              </div>
              <div className="step flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-0">
                <div className="step-number w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-semibold">
                  2
                </div>
                <span className="text-sm font-medium text-blue-900">Passenger Details</span>
              </div>
              <div className="step flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-0">
                <div className="step-number w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
                  3
                </div>
                <span className="text-sm font-medium text-orange-500">Payment</span>
              </div>
              <div className="step flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="step-number w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-semibold">
                  4
                </div>
                <span className="text-sm font-medium text-gray-500">Confirmation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="payment-main py-8">
          <div className="container mx-auto px-4">
            <div className="payment-container flex flex-col lg:flex-row gap-8">
              {/* Payment Options */}
              <section className="payment-options flex-1 bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-blue-900 mb-2">Secure Payment</h1>
                <p className="secure-notice text-orange-500 font-medium mb-6 flex items-center gap-2">
                  <i className="fas fa-lock"></i> Your payment information is encrypted and secure
                </p>

                <div className="payment-tabs flex flex-wrap border-b border-gray-200 mb-6">
                  {[
                    { id: "cards", label: "Credit/Debit Card" },
                    { id: "upi", label: "UPI" },
                    { id: "netbanking", label: "Net Banking" },
                    { id: "wallets", label: "Wallets" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`tab-btn px-4 py-3 font-medium transition-colors ${
                        activeTab === tab.id
                          ? "text-blue-900 border-b-2 border-blue-900"
                          : "text-gray-500 hover:text-blue-900"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Card Payment */}
                {activeTab === "cards" && (
                  <div className="tab-content">
                    <form className="card-form max-w-lg">
                      <div className="form-group mb-4">
                        <label htmlFor="cardNumber" className="block text-gray-700 mb-2 font-medium">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          value={cardDetails.number}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          maxLength={19}
                        />
                        <div className="card-icons flex gap-3 mt-3">
                          <img src="/images/visa.png" alt="Visa" className="h-6" />
                          <img src="/images/mastercard.png" alt="Mastercard" className="h-6" />
                          <img src="/images/rupay.png" alt="Rupay" className="h-6" />
                        </div>
                      </div>

                      <div className="form-group mb-4">
                        <label htmlFor="cardName" className="block text-gray-700 mb-2 font-medium">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="name"
                          value={cardDetails.name}
                          onChange={handleCardChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="form-row flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="form-group flex-1">
                          <label htmlFor="expiryDate" className="block text-gray-700 mb-2 font-medium">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            value={cardDetails.expiry}
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength={5}
                          />
                        </div>
                        <div className="form-group flex-1">
                          <label htmlFor="cvv" className="block text-gray-700 mb-2 font-medium">
                            CVV
                          </label>
                          <div className="cvv-input relative">
                            <input
                              type="text"
                              id="cvv"
                              value={cardDetails.cvv}
                              onChange={handleCvvChange}
                              placeholder="123"
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              maxLength={3}
                            />
                            <i 
                              className="fas fa-question-circle absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-help"
                              title="3-digit code on back of your card"
                            ></i>
                          </div>
                        </div>
                      </div>

                      <div className="save-card mt-6">
                        <label className="checkbox-option flex items-center gap-3 cursor-pointer">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="saveCard"
                              checked={saveCard}
                              onChange={(e) => setSaveCard(e.target.checked)}
                              className="sr-only"
                            />
                            <div className={`checkbox-checkmark w-5 h-5 border rounded flex items-center justify-center ${
                              saveCard ? "bg-blue-900 border-blue-900" : "border-gray-300"
                            }`}>
                              {saveCard && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="text-gray-700">Save this card for faster payments</span>
                        </label>
                      </div>
                    </form>
                  </div>
                )}

                {/* UPI Payment */}
                {activeTab === "upi" && (
                  <div className="tab-content max-w-lg">
                    <div className="upi-container text-center">
                      <div className="upi-qr mb-8">
                        <div className="bg-white border border-gray-300 rounded-lg p-4 inline-block">
                          <div className="w-48 h-48 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-qrcode text-6xl text-gray-400"></i>
                          </div>
                          <p className="text-gray-600">Scan this QR code with any UPI app</p>
                        </div>
                      </div>
                      
                      <div className="or-divider relative my-8">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-gray-500">OR</span>
                        </div>
                      </div>
                      
                      <div className="upi-id bg-gray-50 p-6 rounded-lg">
                        <p className="mb-4 text-gray-700">Send payment directly to our UPI ID:</p>
                        <div className="upi-copy flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded border border-gray-300">
                          <span className="font-medium text-blue-900 text-lg">SmartNepal.travels@upi</span>
                          <button
                            onClick={copyUpiId}
                            className="btn-outline border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-4 py-2 rounded-md transition duration-300 whitespace-nowrap"
                          >
                            <i className="far fa-copy mr-2"></i> Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Net Banking */}
                {activeTab === "netbanking" && (
                  <div className="tab-content">
                    <div className="bank-list max-w-lg">
                      {[
                        { id: "hdfc", label: "HDFC Bank", icon: "🏦" },
                        { id: "sbi", label: "State Bank of Nepal", icon: "🏛️" },
                        { id: "icici", label: "ICICI Bank", icon: "🏢" },
                        { id: "axis", label: "Axis Bank", icon: "💳" },
                        { id: "other", label: "Other Banks", icon: "🏦" }
                      ].map((bank) => (
                        <div key={bank.id} className="bank-option mb-3">
                          <input
                            type="radio"
                            name="bank"
                            id={bank.id}
                            checked={selectedBank === bank.id}
                            onChange={() => setSelectedBank(bank.id)}
                            className="sr-only"
                          />
                          <label
                            htmlFor={bank.id}
                            className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                              selectedBank === bank.id
                                ? "border-blue-900 bg-blue-50"
                                : "border-gray-300 hover:border-blue-900"
                            }`}
                          >
                            <span className="text-2xl">{bank.icon}</span>
                            <span className="font-medium">{bank.label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Wallets */}
                {activeTab === "wallets" && (
                  <div className="tab-content">
                    <div className="wallet-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl">
                      {[
                        { id: "esewa", label: "eSewa", icon: "💼" },
                        { id: "khalti", label: "Khalti", icon: "💰" },
                        { id: "imepay", label: "IME Pay", icon: "📱" }
                      ].map((wallet) => (
                        <div key={wallet.id} className="wallet-option">
                          <input
                            type="radio"
                            name="wallet"
                            id={wallet.id}
                            checked={selectedWallet === wallet.id}
                            onChange={() => setSelectedWallet(wallet.id)}
                            className="sr-only"
                          />
                          <label
                            htmlFor={wallet.id}
                            className={`flex flex-col items-center justify-center p-6 border rounded-lg cursor-pointer transition-all h-full ${
                              selectedWallet === wallet.id
                                ? "border-blue-900 bg-blue-50"
                                : "border-gray-300 hover:border-blue-900"
                            }`}
                          >
                            <span className="text-3xl mb-3">{wallet.icon}</span>
                            <span className="font-medium">{wallet.label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Coupon Section */}
                <div className="coupon-section mt-8 pt-6 border-t border-gray-200">
                  <div className="coupon-toggle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <span className="text-gray-700">Have a coupon code?</span>
                    <button
                      onClick={() => setShowCoupon(!showCoupon)}
                      className="toggle-btn text-blue-900 font-medium flex items-center gap-2"
                    >
                      {showCoupon ? "Hide Coupon" : "Apply Coupon"}
                      <i className={`fas fa-chevron-${showCoupon ? "up" : "down"}`}></i>
                    </button>
                  </div>
                  
                  {showCoupon && (
                    <div className="coupon-input flex gap-3 mt-4">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={applyCoupon}
                        className="btn-outline border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-4 py-2 rounded-md transition duration-300"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
              </section>

              {/* Booking Summary */}
              <aside className="payment-summary w-full lg:w-96 lg:sticky lg:top-24 h-fit">
                <div className="summary-card bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold text-blue-900 mb-6 pb-4 border-b border-gray-200">Booking Summary</h2>
                  
                  <div className="trip-info mb-6">
                    <div className="info-row flex justify-between mb-3">
                      <span className="text-gray-600">Route</span>
                      <span className="font-medium">{bookingData.from} to {bookingData.to}</span>
                    </div>
                    <div className="info-row flex justify-between mb-3">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium">{bookingData.date}</span>
                    </div>
                    <div className="info-row flex justify-between mb-3">
                      <span className="text-gray-600">Departure</span>
                      <span className="font-medium">{bookingData.departure}</span>
                    </div>
                    <div className="info-row flex justify-between mb-3">
                      <span className="text-gray-600">Bus</span>
                      <span className="font-medium">{bookingData.operator} • {bookingData.busType}</span>
                    </div>
                    <div className="info-row flex justify-between mb-3">
                      <span className="text-gray-600">Passengers</span>
                      <span className="font-medium">{bookingData.passengers} Adult{bookingData.passengers > 1 ? 's' : ''}</span>
                    </div>
                    <div className="info-row flex justify-between">
                      <span className="text-gray-600">Seats</span>
                      <span className="font-medium">{bookingData.seats?.join(', ') || 'Not selected'}</span>
                    </div>
                  </div>
                  
                  <div className="fare-summary mb-6">
                    <div className="fare-row flex justify-between mb-3">
                      <span className="text-gray-600">Base Fare</span>
                      <span>{formatPrice(bookingData.baseFare)}</span>
                    </div>
                    <div className="fare-row flex justify-between mb-3">
                      <span className="text-gray-600">Taxes & Fees</span>
                      <span>{formatPrice(bookingData.taxes)}</span>
                    </div>
                    <div className="fare-row flex justify-between mb-3 text-orange-500">
                      <span>Discount</span>
                      <span>-{formatPrice(bookingData.discount)}</span>
                    </div>
                    <div className="fare-row flex justify-between mb-3">
                      <span className="text-gray-600">Travel Insurance</span>
                      <span>{formatPrice(bookingData.insurance)}</span>
                    </div>
                    <div className="fare-row total flex justify-between mt-4 pt-4 border-t border-gray-200">
                      <span className="font-bold text-lg">Total Amount</span>
                      <span className="font-bold text-lg text-blue-900">{formatPrice(totalAmount)}</span>
                    </div>
                  </div>
                  
                  <div className="secure-payment mb-6 py-6 border-t border-b border-gray-200">
                    <div className="secure-badge flex items-center gap-3 text-orange-500 font-medium mb-4">
                      <i className="fas fa-lock"></i>
                      <span>100% Secure Payments</span>
                    </div>
                    <div className="payment-icons flex gap-4">
                      <div className="bg-gray-100 p-2 rounded">
                        <i className="fas fa-shield-alt text-gray-600 text-2xl"></i>
                      </div>
                      <div className="bg-gray-100 p-2 rounded">
                        <i className="fas fa-lock text-gray-600 text-2xl"></i>
                      </div>
                      <div className="bg-gray-100 p-2 rounded">
                        <i className="fas fa-check-circle text-gray-600 text-2xl"></i>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`pay-now-btn w-full py-3 px-4 rounded-md font-semibold text-white transition duration-300 flex items-center justify-center gap-3 ${
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
                      `Pay ${formatPrice(totalAmount)}`
                    )}
                  </button>
                  
                  <div className="cancellation-policy mt-6 text-center text-sm text-gray-600">
                    <p className="flex items-center justify-center gap-2">
                      <i className="fas fa-info-circle text-blue-900"></i>
                      Free cancellation available until 6 hours before departure
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
  );
};

export default PaymentPage;