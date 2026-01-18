import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  Banknote,
  RefreshCw,
  FileText,
  HelpCircle,
  ChevronRight,
  ArrowLeft,
  Search,
  Download,
} from "lucide-react";
import Layout from "../../components/common/Layout";

const RefundStatusHelp = () => {
  const [activeStatus, setActiveStatus] = useState("processing");

  const statuses = [
    {
      id: "processing",
      title: "Processing",
      icon: RefreshCw,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description:
        "Your refund request has been received and is being reviewed",
      timeline: "2-3 business days",
      actions: [
        "Wait for processing to complete",
        "Check your email for updates",
        "No action required at this stage",
      ],
    },
    {
      id: "approved",
      title: "Approved",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Refund has been approved and will be issued shortly",
      timeline: "3-5 business days",
      actions: [
        "Refund will be processed to original payment method",
        "You will receive confirmation email",
        "Check your account in 3-5 days",
      ],
    },
    {
      id: "completed",
      title: "Completed",
      icon: Banknote,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Refund has been processed and funds are on the way",
      timeline: "1-10 business days",
      actions: [
        "Check your bank or credit card statement",
        "Allow time for bank processing",
        "Contact us if not received in 10 days",
      ],
    },
    {
      id: "rejected",
      title: "Rejected",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Refund request could not be approved",
      timeline: "Immediate",
      actions: [
        "Review cancellation policy",
        "Check booking terms",
        "Contact support for clarification",
      ],
    },
  ];

  const refundMethods = [
    {
      method: "Credit/Debit Card",
      timeline: "3-5 business days",
      note: "Appears on next statement",
    },
    {
      method: "PayPal",
      timeline: "24-48 hours",
      note: "Direct to PayPal balance",
    },
    {
      method: "Bank Transfer",
      timeline: "5-10 business days",
      note: "International transfers may take longer",
    },
    {
      method: "Wallet Credit",
      timeline: "Immediate",
      note: "Available for future bookings",
    },
  ];

  const getActiveStatus = () =>
    statuses.find((s) => s.id === activeStatus) || statuses[0];

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
                  <Shield className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Refund Status Help
                </h1>
              </div>
              <p className="text-lg opacity-90">
                Track your refund status and understand the refund process
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Clock className="w-5 h-5" />
                <span>Track Refunds</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-blue-900 mb-4 text-lg">
                Refund Status
              </h3>
              <div className="space-y-2">
                {statuses.map((status) => {
                  const Icon = status.icon;
                  return (
                    <button
                      key={status.id}
                      onClick={() => setActiveStatus(status.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        activeStatus === status.id
                          ? `${status.bgColor} ${status.color} border border-current`
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{status.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>

              <div className="mt-8">
                <h4 className="font-bold text-blue-900 mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <button className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors w-full">
                    <Search className="w-5 h-5" />
                    <span className="font-medium">Check Refund Status</span>
                  </button>
                  <Link
                    to="/help#contact"
                    className="flex items-center gap-3 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    <HelpCircle className="w-5 h-5" />
                    <span className="font-medium">Refund Inquiry</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Current Status */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 ${getActiveStatus().bgColor} rounded-lg`}>
                  {(() => {
                    const ActiveIcon = getActiveStatus().icon;
                    return (
                      <ActiveIcon
                        className={`w-6 h-6 ${getActiveStatus().color}`}
                      />
                    );
                  })()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-blue-900">
                      {getActiveStatus().title}
                    </h2>
                    <div className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-semibold rounded-full">
                      {getActiveStatus().timeline}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">
                    {getActiveStatus().description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* What to Expect */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    What This Means
                  </h3>
                  <div className="space-y-3">
                    {getActiveStatus().actions.map((action, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Next Steps & Timeline
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          Current Status
                        </span>
                        <span className="text-sm text-gray-600">Now</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getActiveStatus().color.replace("text-", "bg-")}`}
                          style={{
                            width:
                              getActiveStatus().id === "processing"
                                ? "25%"
                                : getActiveStatus().id === "approved"
                                  ? "50%"
                                  : getActiveStatus().id === "completed"
                                    ? "100%"
                                    : "0%",
                          }}
                        ></div>
                      </div>
                    </div>

                    {getActiveStatus().id === "processing" && (
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-yellow-900 mb-1">
                              Processing Time
                            </h4>
                            <p className="text-yellow-800 text-sm">
                              Refund processing typically takes 2-3 business
                              days. You will receive an email notification once
                              your refund is approved.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Methods */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-blue-900" />
                <h3 className="text-xl font-bold text-blue-900">
                  Refund Methods & Timelines
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {refundMethods.map((method, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">
                      {method.method}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      Timeline: {method.timeline}
                    </div>
                    <div className="text-xs text-gray-500">{method.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Check Refund Status */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-blue-900 mb-6">
                Check Your Refund Status
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Search className="w-5 h-5 text-blue-900" />
                    <h4 className="font-semibold text-blue-900">
                      Search by Booking ID
                    </h4>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter your booking ID (e.g., BOOK-123456)"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-6 py-2 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors">
                      Check Status
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-700" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Need Documentation?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Download refund receipts and status reports from your
                        account dashboard
                      </p>
                    </div>
                    <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact for Refunds */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Having issues with your refund?
                  </h3>
                  <p>
                    Our refund specialists can investigate and resolve any
                    problems
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/help#contact"
                    className="px-6 py-3 bg-white text-red-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-center"
                  >
                    Contact Refund Team
                  </Link>
                  <button className="px-6 py-3 bg-white/20 border border-white/30 font-semibold rounded-lg hover:bg-white/30 transition-colors">
                    Dispute Resolution
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

export default RefundStatusHelp;
