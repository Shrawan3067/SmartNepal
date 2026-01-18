import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  CreditCard, 
  Wallet, 
  Shield, 
  Lock, 
  ArrowLeft,
  CheckCircle,
  Calendar,
  Users,
  MapPin,
  Clock
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import Layout from '../components/common/Layout';

const TourPaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [bookingSummary, setBookingSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  // Move navigate call to useEffect
  useEffect(() => {
    if (location.state?.bookingSummary) {
      setBookingSummary(location.state.bookingSummary);
      setLoading(false);
    } else {
      // If no booking data, redirect back to booking page
      const timer = setTimeout(() => {
        // FIXED: Use the correct route pattern
        navigate(`/tour/${id}/book`, { 
          replace: true,
          state: { 
            error: "Please complete the booking form first" 
          }
        });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [location, navigate, id]);

  const paymentMethods = [
    { id: 'credit-card', name: 'Credit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: Wallet },
    { id: 'bank-transfer', name: 'Bank Transfer', icon: Shield }
  ];

  const calculateTotal = () => {
    if (!bookingSummary) return 0;
    const basePrice = bookingSummary.totalAmount || 0;
    const serviceFee = basePrice * 0.10; // 10% service fee
    const taxes = basePrice * 0.13; // 13% VAT
    return basePrice + serviceFee + taxes;
  };

  const handleCardInput = (field, value) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 16) formattedValue = formattedValue.slice(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
    }
    
    if (field === 'expiry') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
    }
    
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }
    
    setCardDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    if (paymentMethod === 'credit-card' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv)) {
      toast.error('Please fill in all card details');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate booking ID
      const bookingId = `BOOK-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      
      navigate(`/tour/${id}/confirmation`, {
        state: { 
          bookingId,
          bookingSummary,
          paymentMethod,
          totalPaid: calculateTotal()
        }
      });
      
      toast.success('Payment successful!');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
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
            <p>Loading payment details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Don't render payment form if no booking data
  if (!bookingSummary) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p>No booking data found. Redirecting...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const totalAmount = calculateTotal();
  const tour = bookingSummary?.tour;

  return (
          <div className="min-h-screen bg-gray-50 py-8 pt-24">
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-900 hover:text-orange-500 mb-6 transition duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to booking details
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-2xl font-bold text-blue-900 mb-2">
                  Payment Details
                </h1>
                <p className="text-gray-600 mb-6">
                  Complete your booking by providing payment information
                </p>

                {/* Payment Methods */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    Select Payment Method
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center transition-all ${
                            paymentMethod === method.id
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-8 h-8 text-blue-900 mb-2" />
                          <span className="font-medium text-blue-900">
                            {method.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Credit Card Form */}
                {paymentMethod === 'credit-card' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => handleCardInput('number', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={(e) => handleCardInput('name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => handleCardInput('expiry', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={(e) => handleCardInput('cvv', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal Info */}
                {paymentMethod === 'paypal' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">
                      You will be redirected to PayPal to complete your payment after clicking "Complete Booking".
                    </p>
                  </div>
                )}

                {/* Bank Transfer Info */}
                {paymentMethod === 'bank-transfer' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Bank Details</h4>
                    <p className="text-blue-800 text-sm mb-2">
                      Please transfer the total amount to the following account:
                    </p>
                    <div className="bg-white p-3 rounded border">
                      <p className="font-mono text-sm">
                        Bank: Global Himalayan Bank<br />
                        Account: 1234567890<br />
                        SWIFT: GHBNP<br />
                        Reference: Tour-{tour?.id}
                      </p>
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="mt-8">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 mr-3 w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I agree to the Terms and Conditions and Privacy Policy. I understand that 
                      cancellations must be made at least 48 hours in advance for a full refund, 
                      and that changes to the booking may incur additional fees.
                    </label>
                  </div>
                </div>

                {/* Security Info */}
                <div className="mt-6 flex items-center text-sm text-gray-600">
                  <Lock className="w-4 h-4 mr-2" />
                  <span>Your payment is secured with SSL encryption</span>
                </div>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-4">
                    Booking Summary
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="pb-4 border-b">
                      <h4 className="font-semibold text-blue-900">{tour?.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {bookingSummary?.bookingData?.departureDate} • {tour?.duration}
                      </p>
                    </div>

                    {/* Tour Details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Departure: {bookingSummary?.bookingData?.departureDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Travelers: {bookingSummary?.bookingData?.travelers}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Duration: {tour?.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Difficulty: {tour?.difficulty}</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Price</span>
                        <span className="font-medium">
                          {formatPrice(bookingSummary?.totalAmount || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service Fee (10%)</span>
                        <span className="font-medium">
                          {formatPrice((bookingSummary?.totalAmount || 0) * 0.10)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">VAT (13%)</span>
                        <span className="font-medium">
                          {formatPrice((bookingSummary?.totalAmount || 0) * 0.13)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-blue-900">Total Amount</span>
                        <span className="text-2xl font-bold text-orange-500">
                          {formatPrice(totalAmount)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Deposit Required: {formatPrice(totalAmount * 0.25)}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isProcessing || !acceptedTerms}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all flex items-center justify-center ${
                    isProcessing || !acceptedTerms
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-3" />
                      Complete Booking
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>100% Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TourPaymentPage;