import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Search,
  ChevronRight,
  FileText,
  Shield,
  CreditCard,
  User,
  Calendar,
  MapPin,
  Globe,
  Smartphone,
  Headphones,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Layout from "../components/common/Layout";

const HelpPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      id: "booking",
      title: "Booking & Reservations",
      icon: Calendar,
      questions: [
        {
          id: "booking-1",
          question: "How do I book a tour or hotel?",
          answer:
            "To book a tour or hotel, browse our listings, select your preferred option, choose your dates and number of travelers, and proceed through the booking flow. You'll need to provide traveler details and make a payment to confirm your booking.",
        },
        {
          id: "booking-2",
          question: "What payment methods do you accept?",
          answer:
            "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our encrypted payment gateway.",
        },
        {
          id: "booking-3",
          question: "Can I modify my booking after payment?",
          answer:
            "Yes, you can modify your booking up to 48 hours before the scheduled date. Changes may be subject to availability and additional charges. Contact our customer support for assistance.",
        },
        {
          id: "booking-4",
          question: "What is your cancellation policy?",
          answer:
            "Cancellations made 60+ days before departure receive a full refund. 30-59 days: 50% refund. Less than 30 days: no refund. Some special tours may have different policies.",
        },
      ],
    },
    {
      id: "payment",
      title: "Payment & Pricing",
      icon: CreditCard,
      questions: [
        {
          id: "payment-1",
          question: "Is the price displayed the final price?",
          answer:
            "The displayed price includes all mandatory fees and taxes. Additional optional services (insurance, upgrades) will be shown during checkout. There are no hidden charges.",
        },
        {
          id: "payment-2",
          question: "Do you offer payment plans?",
          answer:
            "Yes, for tours above Rs. 50,000, we offer flexible payment plans. You can pay 25% to book and the balance 30 days before departure.",
        },
        {
          id: "payment-3",
          question: "Is my payment information secure?",
          answer:
            "Absolutely! We use 256-bit SSL encryption for all transactions. We never store your full credit card information on our servers.",
        },
      ],
    },
    {
      id: "preparation",
      title: "Travel Preparation",
      icon: MapPin,
      questions: [
        {
          id: "prep-1",
          question: "What should I pack for my tour?",
          answer:
            "Essential items include comfortable walking shoes, weather-appropriate clothing, personal medications, travel documents, and a reusable water bottle. Specific packing lists are provided for each tour.",
        },
        {
          id: "prep-2",
          question: "Do I need travel insurance?",
          answer:
            "While not mandatory, we strongly recommend comprehensive travel insurance for all bookings. It covers trip cancellations, medical emergencies, lost luggage, and other unexpected situations.",
        },
        {
          id: "prep-3",
          question: "What documents do I need to bring?",
          answer:
            "You'll need a valid passport (with at least 6 months validity), visa if required, booking confirmation, travel insurance documents, and any necessary permits for specific activities.",
        },
      ],
    },
    {
      id: "technical",
      title: "Technical Support",
      icon: Smartphone,
      questions: [
        {
          id: "tech-1",
          question: "I'm having trouble logging in. What should I do?",
          answer:
            'Try resetting your password using the "Forgot Password" link. If the issue persists, clear your browser cache or try a different browser. Contact us if you continue to experience problems.',
        },
        {
          id: "tech-2",
          question: "The website isn't loading properly on my device.",
          answer:
            "Make sure you're using a supported browser (Chrome, Firefox, Safari, Edge) with the latest version. Disable any ad-blockers and ensure you have a stable internet connection.",
        },
        {
          id: "tech-3",
          question: "How do I download my booking confirmation?",
          answer:
            'After booking, you can download your confirmation from the confirmation page or from your account dashboard under "My Bookings".',
        },
      ],
    },
  ];

  const contactOptions = [
    {
      title: "Phone Support",
      description: "Call us for immediate assistance",
      icon: Phone,
      details: "+977 1-2345678",
      availability: "24/7",
      buttonText: "Call Now",
      color: "bg-blue-900",
      textColor: "text-blue-900",
    },
    {
      title: "Email Support",
      description: "Send us an email for detailed inquiries",
      icon: Mail,
      details: "support@smartnepal.com",
      availability: "Response within 4 hours",
      buttonText: "Send Email",
      color: "bg-orange-500",
      textColor: "text-orange-500",
    },
    {
      title: "Live Chat",
      description: "Chat with our support agents",
      icon: MessageSquare,
      details: "Available on website",
      availability: "9 AM - 9 PM (NPT)",
      buttonText: "Start Chat",
      color: "bg-green-600",
      textColor: "text-green-600",
    },
  ];

  const toggleFaq = (faqId) => {
    setActiveFaq(activeFaq === faqId ? null : faqId);
  };

  const filteredFaqs = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <>
      {/* Hero Section */}
      <section className="help-hero bg-gradient-to-r from-blue-900 to-orange-500 text-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <HelpCircle className="w-16 h-16" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How can we help you?
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Find answers to common questions or get in touch with our support
              team
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <p className="text-sm mt-3 opacity-80">
                Popular searches:{" "}
                <span className="underline cursor-pointer mx-2">
                  cancellation policy
                </span>
                <span className="underline cursor-pointer mx-2">
                  payment methods
                </span>
                <span className="underline cursor-pointer mx-2">
                  booking modification
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                label: "My Bookings",
                icon: Calendar,
                link: "/help/my-bookings",
              },
              { label: "Manage Account", icon: User, link: "/help/account" },
              {
                label: "Payment Issues",
                icon: CreditCard,
                link: "/help/payment",
              },
              { label: "Tour Changes", icon: MapPin, link: "/help/changes" },
              { label: "Refund Status", icon: Shield, link: "/help/refunds" },
              { label: "Contact Us", icon: Headphones, link: "#contact" },
            ].map((item, index) =>
              item.link.startsWith("#") ? (
                <a
                  key={index}
                  href={item.link}
                  onClick={(e) => {
                    e.preventDefault();
                    const id = item.link.replace("#", "");
                    const element = document.getElementById(id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group cursor-pointer"
                >
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-blue-50 rounded-lg mb-3 group-hover:bg-blue-100 transition-colors">
                      <item.icon className="w-6 h-6 text-blue-900" />
                    </div>
                    <span className="font-medium text-gray-800">
                      {item.label}
                    </span>
                  </div>
                </a>
              ) : (
                <Link
                  key={index}
                  to={item.link}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group"
                >
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-blue-50 rounded-lg mb-3 group-hover:bg-blue-100 transition-colors">
                      <item.icon className="w-6 h-6 text-blue-900" />
                    </div>
                    <span className="font-medium text-gray-800">
                      {item.label}
                    </span>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-lg">
                Browse through our most commonly asked questions
              </p>
            </div>

            {filteredFaqs.map((category) => (
              <div key={category.id} className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <category.icon className="w-6 h-6 text-blue-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.questions.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(item.id)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-800">
                          {item.question}
                        </span>
                        {activeFaq === item.id ? (
                          <ChevronUp className="w-5 h-5 text-blue-900" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-blue-900" />
                        )}
                      </button>

                      {activeFaq === item.id && (
                        <div className="px-6 py-4 border-t border-gray-100">
                          <p className="text-gray-600">{item.answer}</p>
                          {item.id === "booking-4" && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                              <div className="flex items-start gap-2">
                                <Info className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-blue-800">
                                  Need to cancel? Contact our support team
                                  immediately for the best possible outcome.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600">
                  Try searching with different keywords or browse our categories
                  above
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section id="contact" className="contact-options py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                Contact Our Support Team
              </h2>
              <p className="text-gray-600 text-lg">
                We're here to help you with any questions or concerns
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactOptions.map((option, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <div
                    className={`inline-flex p-3 rounded-full ${option.color} bg-opacity-10 mb-4`}
                  >
                    <option.icon className={`w-8 h-8 ${option.textColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center gap-2">
                      <option.icon className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{option.details}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">
                        {option.availability}
                      </span>
                    </div>
                  </div>

                  <button
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white ${option.color} hover:opacity-90 transition-opacity`}
                  >
                    {option.buttonText}
                  </button>
                </div>
              ))}
            </div>

            {/* Additional Support Info */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-blue-900" />
                  <h3 className="text-xl font-bold text-blue-900">
                    International Support
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We provide support in multiple languages including English,
                  Nepali, Hindi, and Chinese.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">English: 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Nepali: 6 AM - 10 PM (NPT)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-blue-900" />
                  <h3 className="text-xl font-bold text-blue-900">
                    Support Resources
                  </h3>
                </div>
                <div className="space-y-3">
                  <Link
                    to="/help/guides"
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-900" />
                      <span className="font-medium">Travel Guides & Tips</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-900" />
                  </Link>
                  <Link
                    to="/help/terms"
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-blue-900" />
                      <span className="font-medium">Terms & Conditions</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-900" />
                  </Link>
                  <Link
                    to="/help/safety"
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-blue-900" />
                      <span className="font-medium">Safety Guidelines</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-900" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="emergency-contact py-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Emergency Contact</h3>
            <p className="mb-6 opacity-90">
              For urgent assistance during your trip, contact our 24/7 emergency
              hotline
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">+977 980-1234567</div>
                <p className="text-sm opacity-80">Domestic Emergency Number</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">+977 1-2345678</div>
                <p className="text-sm opacity-80">
                  International Emergency Number
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm opacity-80">
              This number is monitored 24/7 for emergencies only. For non-urgent
              matters, please use regular support channels.
            </p>
          </div>
        </div>
      </section>

      {/* Support Statistics */}
      <section className="stats-section py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "98%", label: "Customer Satisfaction" },
                { value: "< 2 min", label: "Average Response Time" },
                { value: "24/7", label: "Support Availability" },
                { value: "15+", label: "Languages Supported" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-blue-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HelpPage;
