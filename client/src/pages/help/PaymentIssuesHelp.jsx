import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  AlertCircle,
  RefreshCw,
  Lock,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  HelpCircle,
  ChevronRight,
  ArrowLeft,
  Smartphone,
  DollarSign,
} from "lucide-react";
import Layout from "../../components/common/Layout";

const PaymentIssuesHelp = () => {
  const [activeTab, setActiveTab] = useState("declined");

  const issues = [
    {
      id: "declined",
      title: "Payment Declined",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      solutions: [
        "Check your card details are correct",
        "Ensure sufficient funds are available",
        "Contact your bank to authorize the transaction",
        "Try a different payment method",
        "Wait 15 minutes and try again",
      ],
    },
    {
      id: "pending",
      title: "Payment Pending",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      solutions: [
        "Bank transfers may take 1-3 business days",
        "Check your email for payment confirmation",
        "Wait for payment to process",
        "Contact your bank for status",
        "Do not submit multiple payments",
      ],
    },
    {
      id: "double",
      title: "Double Charge",
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      solutions: [
        "Check your bank statement for pending vs posted charges",
        "Pending charges usually drop off in 3-5 business days",
        "Contact our support with transaction IDs",
        "Provide bank statement screenshot",
        "We will refund any duplicate charges",
      ],
    },
    {
      id: "refund",
      title: "Refund Status",
      icon: RefreshCw,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      solutions: [
        "Refunds take 7-10 business days to process",
        "Credit card refunds appear in 3-5 business days",
        "Bank transfers may take 10-14 days",
        "Check with your bank for pending refunds",
        "Contact us with your booking ID for status",
      ],
    },
  ];

  const paymentMethods = [
    {
      type: "Credit/Debit Card",
      issues: [
        "Card declined",
        "Invalid CVV",
        "Expired card",
        "Insufficient funds",
      ],
      resolution: "Contact your bank or try a different card",
    },
    {
      type: "PayPal",
      issues: [
        "Login failed",
        "Insufficient balance",
        "Account limited",
        "Payment pending",
      ],
      resolution: "Check PayPal account status or use alternative method",
    },
    {
      type: "Bank Transfer",
      issues: [
        "Transfer delayed",
        "Wrong reference",
        "Incorrect amount",
        "Bank holidays",
      ],
      resolution: "Contact your bank and provide transaction reference",
    },
  ];

  const getActiveIssue = () =>
    issues.find((i) => i.id === activeTab) || issues[0];

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
                  <CreditCard className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Payment Issues Help
                </h1>
              </div>
              <p className="text-lg opacity-90">
                Resolve payment problems and get answers to common payment
                questions
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Lock className="w-5 h-5" />
                <span>Secure Payments</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-blue-900 mb-4 text-lg">
                Common Issues
              </h3>
              <div className="space-y-2">
                {issues.map((issue) => {
                  const Icon = issue.icon;
                  return (
                    <button
                      key={issue.id}
                      onClick={() => setActiveTab(issue.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        activeTab === issue.id
                          ? `${issue.bgColor} ${issue.color} border border-current`
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{issue.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>

              <div className="mt-8">
                <h4 className="font-bold text-blue-900 mb-4">
                  Need Immediate Help?
                </h4>
                <div className="space-y-3">
                  <Link
                    to="/help#contact"
                    className="flex items-center gap-3 p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Urgent Payment Issue</span>
                  </Link>
                  <Link
                    to="/my-bookings"
                    className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="font-medium">Check Booking Status</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Current Issue */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 ${getActiveIssue().bgColor} rounded-lg`}>
                  {(() => {
                    const ActiveIcon = getActiveIssue().icon;
                    return (
                      <ActiveIcon
                        className={`w-6 h-6 ${getActiveIssue().color}`}
                      />
                    );
                  })()}
                </div>
                <h2 className="text-2xl font-bold text-blue-900">
                  {getActiveIssue().title}
                </h2>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">
                  Try these solutions:
                </h4>
                {getActiveIssue().solutions.map((solution, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-900">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-gray-700">{solution}</span>
                  </div>
                ))}
              </div>

              {activeTab === "declined" && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">
                        Security Note
                      </h4>
                      <p className="text-blue-800 text-sm">
                        For security reasons, we never store your full credit
                        card details. If your card was previously working but
                        now fails, contact your bank as they may have blocked
                        the transaction.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Methods Table */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-blue-900 mb-6">
                Payment Method Specific Issues
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-semibold text-gray-900">
                        Payment Method
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-900">
                        Common Issues
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-900">
                        Recommended Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paymentMethods.map((method, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-4">
                          <div className="font-medium text-gray-900">
                            {method.type}
                          </div>
                        </td>
                        <td className="p-4">
                          <ul className="space-y-1">
                            {method.issues.map((issue, i) => (
                              <li
                                key={i}
                                className="text-sm text-gray-600 flex items-center gap-2"
                              >
                                <AlertCircle className="w-3 h-3 text-gray-400" />
                                {issue}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-gray-700">
                            {method.resolution}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Contact for Payment Issues */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Need help with a specific payment?
                  </h3>
                  <p>Our payment specialists are available to help</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/help#contact"
                    className="px-6 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-center"
                  >
                    Contact Payment Support
                  </Link>
                  <button className="px-6 py-3 bg-white/20 border border-white/30 font-semibold rounded-lg hover:bg-white/30 transition-colors">
                    Check Refund Status
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

export default PaymentIssuesHelp;
