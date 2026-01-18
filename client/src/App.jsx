import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/common/Layout";
import HomePage from "./pages/HomePage";
import HotelsPage from "./pages/HotelsPage";
import SearchPage from "./pages/SearchPage";
import SeatsPage from "./pages/SeatsPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DemoPage from "./pages/DemoPage";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import HotelBookingPage from "./pages/HotelBookingPage";
import HotelConfirmationPage from "./pages/HotelConfirmationPage";
import TourPackages from "./pages/TourPackages";
import TourPackageDetails from "./pages/TourPackageDetails";
import TourBookingPage from "./pages/TourBookingPage";
import TourPaymentPage from "./pages/TourPaymentPage";
import TourConfirmationPage from "./pages/TourConfirmationPage";
import HelpPage from "./pages/HelpPage";
import MyBookingsHelp from "./pages/help/MyBookingsHelp";
import ManageAccountHelp from "./pages/help/ManageAccountHelp";
import PaymentIssuesHelp from "./pages/help/PaymentIssuesHelp";
import TourChangesHelp from "./pages/help/TourChangesHelp";
import RefundStatusHelp from "./pages/help/RefundStatusHelp";


function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hotels" element={<HotelsPage />} />
              <Route path="/hotel-booking/:id" element={<HotelBookingPage />} />
              <Route
                path="/hotel-confirmation"
                element={<HotelConfirmationPage />}
              />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/seats" element={<SeatsPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />

              {/* Tour Package Routes - MUST be before dynamic routes */}
              <Route path="/tour-packages" element={<TourPackages />} />

              {/* Tour Detail & Booking Flow Routes */}
              <Route
                path="/tour-package/:id"
                element={<TourPackageDetails />}
              />
              <Route path="/tour/:id/book" element={<TourBookingPage />} />
              <Route path="/tour/:id/payment" element={<TourPaymentPage />} />
              <Route
                path="/tour/:id/confirmation"
                element={<TourConfirmationPage />}
              />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/help/my-bookings" element={<MyBookingsHelp />} />
              <Route path="/help/account" element={<ManageAccountHelp />} />
              <Route path="/help/payment" element={<PaymentIssuesHelp />} />
              <Route path="/help/changes" element={<TourChangesHelp />} />
              <Route path="/help/refunds" element={<RefundStatusHelp />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </Layout>
          <Toaster position="top-right" />
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
