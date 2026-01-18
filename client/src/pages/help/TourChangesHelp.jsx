import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Users,
  Edit,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  DollarSign,
  HelpCircle,
  ChevronRight,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import Layout from "../../components/common/Layout";

const TourChangesHelp = () => {
  const [activeSection, setActiveSection] = useState("dates");

  const changeOptions = [
    {
      id: "dates",
      title: "Change Dates",
      icon: Calendar,
      possible: true,
      conditions: [
        "Must be requested at least 48 hours before departure",
        "Subject to availability",
        "Price differences may apply",
        "No change fee if requested 7+ days in advance",
      ],
      process: [
        "Go to My Bookings",
        "Select the booking to modify",
        "Choose new dates",
        "Review price changes",
        "Confirm changes",
      ],
    },
    {
      id: "participants",
      title: "Change Participants",
      icon: Users,
      possible: true,
      conditions: [
        "Maximum group size restrictions apply",
        "Additional charges for extra participants",
        "Reductions may have cancellation fees",
        "Must maintain minimum group size",
      ],
      process: [
        "Access booking details",
        'Click "Modify Participants"',
        "Update traveler count",
        "Review new pricing",
        "Confirm changes",
      ],
    },
    {
      id: "tour",
      title: "Change Tour",
      icon: MapPin,
      possible: false,
      conditions: [
        "Not allowed once booked",
        "Consider cancelling and rebooking",
        "Cancellation fees may apply",
        "Subject to availability for new tour",
      ],
      process: [
        "Cancel existing booking",
        "Review cancellation fees",
        "Book new tour",
        "Pay any difference",
      ],
    },
    {
      id: "details",
      title: "Update Details",
      icon: Edit,
      possible: true,
      conditions: [
        "Traveler names can be updated",
        "Contact information can be changed",
        "Special requests can be modified",
        "Some details may have restrictions",
      ],
      process: [
        "Go to booking details",
        'Click "Edit Traveler Info"',
        "Update required fields",
        "Save changes",
      ],
    },
  ];

  const feesStructure = [
    {
      period: "More than 30 days",
      changeFee: "No fee",
      cancellationFee: "25% of total",
    },
    {
      period: "15-30 days",
      changeFee: "10% of difference",
      cancellationFee: "50% of total",
    },
    {
      period: "7-14 days",
      changeFee: "25% of difference",
      cancellationFee: "75% of total",
    },
    {
      period: "Less than 7 days",
      changeFee: "Not allowed",
      cancellationFee: "100% of total",
    },
  ];

  const getActiveOption = () =>
    changeOptions.find((o) => o.id === activeSection) || changeOptions[0];

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
                    <MapPin className="w-8 h-8" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    Tour Changes Help
                  </h1>
                </div>
                <p className="text-lg opacity-90">
                  Learn how to modify your tour bookings and understand change
                  policies
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <RefreshCw className="w-5 h-5" />
                  <span>Flexible Changes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="font-bold text-blue-900 mb-4 text-lg">
                  Change Types
                </h3>
                <div className="space-y-2">
                  {changeOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setActiveSection(option.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                          activeSection === option.id
                            ? "bg-blue-50 text-blue-900 border border-blue-200"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{option.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {option.possible ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8">
                  <h4 className="font-bold text-blue-900 mb-4">
                    Quick Actions
                  </h4>
                  <div className="space-y-3">
                    <Link
                      to="/my-bookings"
                      className="flex items-center gap-3 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                      <span className="font-medium">Modify Booking</span>
                    </Link>
                    <Link
                      to="/help#contact"
                      className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <HelpCircle className="w-5 h-5" />
                      <span className="font-medium">Request Change</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Current Option */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {(() => {
                      const Icon = getActiveOption().icon;
                      return <Icon className="w-6 h-6 text-blue-900" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-blue-900">
                        {getActiveOption().title}
                      </h2>
                      {getActiveOption().possible ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                          Change Possible
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
                          Change Not Allowed
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Conditions */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Conditions & Restrictions
                    </h3>
                    <div className="space-y-3">
                      {getActiveOption().conditions.map((condition, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{condition}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Process */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Change Process
                    </h3>
                    <div className="space-y-4">
                      {getActiveOption().process.map((step, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="font-bold text-blue-900">
                                {index + 1}
                              </span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Step {index + 1}
                            </h4>
                            <p className="text-gray-600">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fees Structure */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="w-6 h-6 text-blue-900" />
                  <h3 className="text-xl font-bold text-blue-900">
                    Fees & Charges Schedule
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Time Before Departure
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Change Fee
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Cancellation Fee
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {feesStructure.map((fee, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="p-4">
                            <div className="font-medium text-gray-900">
                              {fee.period}
                            </div>
                          </td>
                          <td className="p-4">
                            <div
                              className={`font-semibold ${
                                fee.changeFee === "No fee"
                                  ? "text-green-600"
                                  : "text-gray-700"
                              }`}
                            >
                              {fee.changeFee}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-gray-700">
                              {fee.cancellationFee}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-800 text-sm">
                      Note: Change fees are calculated based on the price
                      difference between your original booking and the modified
                      booking. All fees are in NPR.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact for Changes */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Need help with tour changes?
                    </h3>
                    <p>
                      Our team can assist with modifications and answer your
                      questions
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/help#contact"
                      className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-center"
                    >
                      Request Change
                    </Link>
                    <Link
                      to="/my-bookings"
                      className="px-6 py-3 bg-white/20 border border-white/30 font-semibold rounded-lg hover:bg-white/30 transition-colors text-center"
                    >
                      View My Bookings
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TourChangesHelp;
