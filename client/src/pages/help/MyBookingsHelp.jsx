import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Search,
  Eye,
  Download,
  Printer,
  Edit,
  XCircle,
  CheckCircle,
  Clock,
  User,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import Layout from "../../components/common/Layout";

const MyBookingsHelp = () => {
  const [activeSection, setActiveSection] = useState("view");

  const sections = [
    {
      id: "view",
      title: "View Your Bookings",
      icon: Eye,
      steps: [
        {
          title: "Login to your account",
          description: "Go to the login page and enter your credentials",
        },
        {
          title: "Navigate to My Bookings",
          description: 'Click on "My Bookings" in the navigation menu',
        },
        {
          title: "Filter and search",
          description:
            "Use filters to find specific bookings by date, status, or type",
        },
      ],
    },
    {
      id: "manage",
      title: "Manage Bookings",
      icon: Edit,
      steps: [
        {
          title: "View booking details",
          description: "Click on any booking to see full details",
        },
        {
          title: "Make changes",
          description:
            'Click "Modify" to change dates, travelers, or other details',
        },
        {
          title: "Cancel booking",
          description: 'Click "Cancel" and follow the cancellation process',
        },
      ],
    },
    {
      id: "documents",
      title: "Access Documents",
      icon: Download,
      steps: [
        {
          title: "Download confirmation",
          description: "Click the download icon next to your booking",
        },
        {
          title: "Print tickets",
          description: "Use the print option for physical copies",
        },
        {
          title: "Email receipts",
          description: "Resend confirmation emails from your booking details",
        },
      ],
    },
  ];

  const commonIssues = [
    {
      question: "I can't see my recent booking",
      answer:
        "Bookings may take up to 30 minutes to appear. If it's been longer, check your email confirmation or contact support.",
      icon: Clock,
    },
    {
      question: "How do I update my travel dates?",
      answer:
        "Go to booking details → Click 'Modify' → Select new dates → Pay any difference if applicable.",
      icon: Edit,
    },
    {
      question: "Can I add more travelers to my booking?",
      answer:
        "Yes, if there's availability. Go to booking details → Click 'Modify' → Update traveler count.",
      icon: User,
    },
    {
      question: "Where is my booking confirmation?",
      answer:
        "Check your email spam folder. You can also download it from the booking details page.",
      icon: Download,
    },
  ];

  const getActiveSection = () =>
    sections.find((s) => s.id === activeSection) || sections[0];

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/help"
            className="inline-flex items-center text-blue-900 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Help Center
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Calendar className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  My Bookings Help
                </h1>
              </div>
              <p className="text-lg opacity-90">
                Learn how to view, manage, and access your travel bookings
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5" />
                <span>Last updated: Today</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-blue-900 mb-4 text-lg">Topics</h3>
              <div className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-50 text-blue-900 border border-blue-200"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{section.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>

              <div className="mt-8">
                <h4 className="font-bold text-blue-900 mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <Link
                    to="/my-bookings"
                    className="flex items-center gap-3 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                    <span className="font-medium">Go to My Bookings</span>
                  </Link>
                  <Link
                    to="/help"
                    className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Need more help?</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Current Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {(() => {
                    const ActiveIcon = getActiveSection().icon;
                    return <ActiveIcon className="w-6 h-6 text-blue-900" />;
                  })()}
                </div>

                <h2 className="text-2xl font-bold text-blue-900">
                  {getActiveSection().title}
                </h2>
              </div>

              <div className="space-y-6">
                {getActiveSection().steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="font-bold text-blue-900">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {step.title}
                      </h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {activeSection === "view" && (
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Search className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">
                        Search Tip
                      </h4>
                      <p className="text-blue-800 text-sm">
                        Use the search bar in My Bookings to find bookings by
                        tour name, booking ID, or date.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Common Issues */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-6">
                Common Questions
              </h3>
              <div className="space-y-4">
                {commonIssues.map((issue, index) => {
                  const Icon = issue.icon;
                  return (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Icon className="w-5 h-5 text-gray-700" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {issue.question}
                          </h4>
                          <p className="text-gray-600">{issue.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Still Need Help */}
            <div className="mt-8 p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Still need help with your bookings?
                  </h3>
                  <p>Our support team is ready to assist you</p>
                </div>
                <div className="flex gap-3">
                  <Link
                    to="/help#contact"
                    className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Contact Support
                  </Link>
                  <button className="px-6 py-3 bg-white/20 border border-white/30 font-semibold rounded-lg hover:bg-white/30 transition-colors">
                    Schedule Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingsHelp;
