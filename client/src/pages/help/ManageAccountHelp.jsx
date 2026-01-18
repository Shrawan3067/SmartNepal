import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Lock,
  Mail,
  Smartphone,
  Shield,
  Bell,
  Globe,
  CreditCard,
  Trash2,
  Download,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import Layout from "../../components/common/Layout";

const ManageAccountHelp = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const sections = [
    {
      id: "profile",
      title: "Profile Settings",
      icon: User,
      items: [
        {
          title: "Update personal information",
          description: "Change your name, date of birth, and contact details",
        },
        {
          title: "Profile picture",
          description: "Upload or change your profile photo",
        },
        {
          title: "Communication preferences",
          description: "Manage how we contact you (email, SMS, notifications)",
        },
      ],
    },
    {
      id: "security",
      title: "Security & Privacy",
      icon: Lock,
      items: [
        {
          title: "Change password",
          description: "Update your account password regularly",
        },
        {
          title: "Two-factor authentication",
          description: "Add an extra layer of security to your account",
        },
        {
          title: "Privacy settings",
          description: "Control what information is visible to others",
        },
      ],
    },
    {
      id: "payment",
      title: "Payment Methods",
      icon: CreditCard,
      items: [
        {
          title: "Add payment method",
          description: "Save credit cards or PayPal for faster checkout",
        },
        {
          title: "Manage saved cards",
          description: "Update or remove stored payment methods",
        },
        {
          title: "Billing addresses",
          description: "Add or edit your billing information",
        },
      ],
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      items: [
        {
          title: "Email notifications",
          description: "Choose which emails you want to receive",
        },
        {
          title: "Push notifications",
          description: "Control app and browser notifications",
        },
        {
          title: "SMS alerts",
          description: "Manage text message notifications",
        },
      ],
    },
  ];

  const securityTips = [
    "Use a strong, unique password",
    "Enable two-factor authentication",
    "Never share your login credentials",
    "Log out from shared devices",
    "Regularly review account activity",
    "Keep your recovery email updated",
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
                  <User className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Manage Account Help
                </h1>
              </div>
              <p className="text-lg opacity-90">
                Learn how to manage your account settings and preferences
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Shield className="w-5 h-5" />
                <span>Secure & Private</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-blue-900 mb-4 text-lg">
                Account Settings
              </h3>
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
                    to="/account"
                    className="flex items-center gap-3 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Go to Account Settings</span>
                  </Link>
                  <Link
                    to="/help/security"
                    className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Security Guide</span>
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
                {getActiveSection().items.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                      <button className="text-blue-900 hover:text-orange-500 font-medium text-sm">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-blue-900" />
                <h3 className="text-xl font-bold text-blue-900">
                  Security Best Practices
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {securityTips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-6">
                Account Management
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Download Account Data
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Get a copy of all your account information
                    </p>
                  </div>
                  <button className="mt-2 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 transition-colors">
                    <Download className="w-4 h-4" />
                    Request Data
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-red-200 bg-red-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-red-900 mb-1">
                      Delete Account
                    </h4>
                    <p className="text-red-700 text-sm">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <button className="mt-2 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Delete Account
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

export default ManageAccountHelp;
