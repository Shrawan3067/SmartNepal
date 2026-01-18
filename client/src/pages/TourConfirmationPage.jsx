import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  CheckCircle,
  Download,
  Printer,
  Mail,
  Calendar,
  Users,
  MapPin,
  Share2,
  ArrowLeft,
  Clock,
  User,
  Phone,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Layout from "../components/common/Layout";

const TourConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get booking data from location state
  const { bookingId, bookingSummary, paymentMethod, totalPaid } =
    location.state || {};

  useEffect(() => {
    if (!bookingId) {
      // If no booking data, redirect to tours page
      const timer = setTimeout(() => {
        navigate("/tour-packages", { replace: true });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [bookingId, navigate]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Tour Booking",
          text: `I just booked ${bookingSummary?.tour?.title}!`,
          url: window.location.href,
        });
        toast.success("Shared successfully!");
      } catch (error) {
        console.log("Sharing cancelled:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleDownloadTicket = () => {
    // Create a printable ticket
    const ticketContent = `
      =============================
        TOUR BOOKING CONFIRMATION
      =============================
      
      Booking ID: ${bookingId}
      Tour: ${bookingSummary?.tour?.title}
      Date: ${bookingSummary?.bookingData?.departureDate}
      Travelers: ${bookingSummary?.bookingData?.travelers}
      Total Paid: Rs. ${totalPaid}
      
      Lead Traveler: ${bookingSummary?.bookingData?.guestDetails?.name}
      Email: ${bookingSummary?.bookingData?.guestDetails?.email}
      Phone: ${bookingSummary?.bookingData?.guestDetails?.phone}
      
      Please arrive 15 minutes before the tour starts.
      Bring this confirmation and valid ID.
      
      =============================
          Thank you for booking!
      =============================
    `;

    const blob = new Blob([ticketContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tour-ticket-${bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Ticket downloaded!");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("NPR", "Rs.");
  };

  if (!bookingId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Booking Found
          </h2>
          <p className="text-gray-600 mb-6">
            Your booking session has expired or no booking was found.
          </p>
          <Link
            to="/tour-packages"
            className="inline-flex items-center px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Browse Tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600">
            Your tour has been successfully booked.{" "}
            {bookingSummary?.bookingData?.guestDetails?.email &&
              `A confirmation email has been sent to `}
            <span className="font-semibold">
              {bookingSummary?.bookingData?.guestDetails?.email}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-blue-900">
                    {bookingSummary?.tour?.title}
                  </h2>
                  <p className="text-gray-600">Booking ID: {bookingId}</p>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                  Confirmed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tour Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-blue-900 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Tour Details
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium">
                        {bookingSummary?.bookingData?.departureDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">
                        {bookingSummary?.tour?.duration}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difficulty</span>
                      <span className="font-medium">
                        {bookingSummary?.tour?.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Participant Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-blue-900 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Participant Details
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Travelers</span>
                      <span className="font-medium">
                        {bookingSummary?.bookingData?.travelers}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="font-medium text-orange-500">
                        {formatPrice(totalPaid)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium capitalize">
                        {paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Meeting Point */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-blue-900 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Important Information
                  </h3>
                  <div className="text-gray-700 space-y-1">
                    <p>• Please arrive 15 minutes before departure</p>
                    <p>• Bring a valid ID and passport</p>
                    <p>• Wear comfortable walking shoes</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-blue-900 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Lead Traveler
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      {bookingSummary?.bookingData?.guestDetails?.name}
                    </p>
                    <p className="text-gray-700">
                      {bookingSummary?.bookingData?.guestDetails?.email}
                    </p>
                    <p className="text-gray-700">
                      {bookingSummary?.bookingData?.guestDetails?.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Important Notes
                </h4>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>
                    • 25% deposit required to confirm booking. Balance due 30
                    days before departure.
                  </li>
                  <li>• Free cancellation up to 60 days before departure.</li>
                  <li>
                    • Passport must be valid for at least 6 months beyond return
                    date.
                  </li>
                  <li>• Travel insurance is recommended for all tours.</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <button
                onClick={handleDownloadTicket}
                className="flex items-center justify-center p-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Ticket
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center justify-center p-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Printer className="w-5 h-5 mr-2" />
                Print
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center p-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </button>
              <button
                onClick={() => navigate("/tour-packages")}
                className="flex items-center justify-center p-4 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-colors"
              >
                <Calendar className="w-5 h-5 mr-2" />
                More Tours
              </button>
            </div>
          </div>

          {/* Right Column - Next Steps */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {/* Next Steps */}
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <h3 className="font-bold text-blue-900 mb-4">Next Steps</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-xs font-semibold text-blue-600">
                        1
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">
                        Save your booking
                      </p>
                      <p className="text-sm text-gray-600">
                        Download or print your confirmation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-xs font-semibold text-blue-600">
                        2
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">
                        Check your email
                      </p>
                      <p className="text-sm text-gray-600">
                        For booking details and updates
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-xs font-semibold text-blue-600">
                        3
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">
                        Prepare for travel
                      </p>
                      <p className="text-sm text-gray-600">
                        Review important information above
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="font-bold text-blue-900 mb-2">Need Help?</h3>
                <p className="text-blue-800 text-sm mb-4">
                  Our customer support team is here to assist you
                </p>
                <div className="space-y-2">
                  <a
                    href="mailto:support@smartnepal.com"
                    className="flex items-center text-blue-700 hover:text-blue-800 text-sm"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    support@smartnepal.com
                  </a>
                  <a
                    href="tel:+97712345678"
                    className="flex items-center text-blue-700 hover:text-blue-800 text-sm"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    +977 1-2345678
                  </a>
                </div>
              </div>

              {/* Continue Browsing */}
              <div className="mt-6">
                <Link
                  to="/tour-packages"
                  className="block w-full text-center py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                >
                  Browse More Tours
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>
            Your booking is confirmed. If you need to make any changes, please
            contact us at least 48 hours in advance.
          </p>
          <p className="mt-2">Thank you for choosing Smart Nepal Tours!</p>
        </div>
      </div>
    </div>
  );
};

export default TourConfirmationPage;
