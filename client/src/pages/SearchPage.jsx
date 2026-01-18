import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/common/Layout";

const SearchPage = () => {
  const [activeSort, setActiveSort] = useState("departure");
  const [activePage, setActivePage] = useState(1);
  const [timeValue, setTimeValue] = useState(12);
  const [priceValue, setPriceValue] = useState(2500);
  const [expandedBus, setExpandedBus] = useState(null);

  // Bus data
  const buses = [
    {
      id: 1,
      featured: true,
      badge: "BEST DEAL",
      departure: "22:30",
      arrival: "07:00",
      duration: "8h 30m",
      operatorLogo: "/images/bus-logo.png", // Changed to proper logo path
      operatorName: "SmartNepal Travels",
      busType: "AC Sleeper (2+1)",
      amenities: ["wifi", "charging", "washroom", "blanket"],
      price: 1299,
      originalPrice: 1799,
      discount: 28,
      seatsLeft: 3,
      boardingPoints: [
        { time: "22:15", location: "Mumbai Central Bus Stand" },
        { time: "07:00", location: "Panjim Bus Stand, Goa" },
      ],
      facilities: ["AC", "Sleeper", "TV"],
      rating: 4.5,
      reviews: 128,
    },
    {
      id: 2,
      featured: false,
      departure: "08:00",
      arrival: "18:00",
      duration: "10h 0m",
      operatorLogo: "/images/bus-logo.png",
      operatorName: "National Express",
      busType: "AC Seater (2+2)",
      amenities: ["charging", "blanket"],
      price: 999,
      originalPrice: 1299,
      discount: 23,
      seatsLeft: 12,
      boardingPoints: [
        { time: "07:45", location: "Janakpur Bus Park" },
        { time: "18:00", location: "Kathmandu Bus Park" },
      ],
      facilities: ["AC", "Seater"],
      rating: 4.2,
      reviews: 96,
    },
    {
      id: 3,
      featured: false,
      departure: "12:00",
      arrival: "21:30",
      duration: "9h 30m",
      operatorLogo: "/images/bus-logo.png",
      operatorName: "City Link",
      busType: "Non-AC Seater (2+2)",
      amenities: [],
      price: 799,
      originalPrice: 999,
      discount: 20,
      seatsLeft: 8,
      boardingPoints: [
        { time: "11:45", location: "Janakpur Central" },
        { time: "21:30", location: "Kathmandu Central" },
      ],
      facilities: ["Seater"],
      rating: 4.0,
      reviews: 45,
    },
    {
      id: 4,
      featured: false,
      departure: "15:00",
      arrival: "23:30",
      duration: "8h 30m",
      operatorLogo: "/images/bus-logo.png",
      operatorName: "Royal Cruiser",
      busType: "Luxury AC (2+1)",
      amenities: ["wifi", "charging", "washroom", "blanket", "tv"],
      price: 1899,
      originalPrice: 2499,
      discount: 24,
      seatsLeft: 2,
      boardingPoints: [
        { time: "14:45", location: "Janakpur Luxury Terminal" },
        { time: "23:30", location: "Kathmandu Luxury Terminal" },
      ],
      facilities: ["Luxury", "AC", "TV"],
      rating: 4.8,
      reviews: 201,
    },
  ];

  // State for filters
  const [filters, setFilters] = useState({
    busTypes: {
      ac: true,
      nonAc: true,
      sleeper: false,
      luxury: false,
    },
    amenities: {
      wifi: false,
      charging: false,
      washroom: false,
      blanket: false,
    },
    operators: {
      smartNepal: true,
      nationalExpress: true,
      cityLink: false,
      royalCruiser: false,
    },
  });

  const handleSort = (sortType) => {
    setActiveSort(sortType);
    console.log("Sorted by:", sortType);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    console.log("Page changed to:", page);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: {
        ...prev[filterType],
        [value]: !prev[filterType][value],
      },
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      busTypes: {
        ac: false,
        nonAc: false,
        sleeper: false,
        luxury: false,
      },
      amenities: {
        wifi: false,
        charging: false,
        washroom: false,
        blanket: false,
      },
      operators: {
        smartNepal: false,
        nationalExpress: false,
        cityLink: false,
        royalCruiser: false,
      },
    });
  };

  const handleViewSeats = (busId) => {
    window.location.href = `/seats?bus=${busId}`;
  };

  const handleModifySearch = () => {
    window.location.href = "/";
  };

  const toggleBusDetails = (busId) => {
    if (expandedBus === busId) {
      setExpandedBus(null);
    } else {
      setExpandedBus(busId);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("₹", "₹");
  };

  const renderAmenityIcon = (amenity) => {
    switch (amenity) {
      case "wifi":
        return <i className="fas fa-wifi"></i>;
      case "charging":
        return <i className="fas fa-bolt"></i>;
      case "washroom":
        return <i className="fas fa-restroom"></i>;
      case "blanket":
        return <i className="fas fa-tshirt"></i>;
      case "tv":
        return <i className="fas fa-tv"></i>;
      default:
        return null;
    }
  };

  // Function to render logo with fallback
  const renderOperatorLogo = (bus) => {
    const fallbackLogo = (
      <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold">
        {bus.operatorName.charAt(0)}
      </div>
    );

    return (
      <div className="operator-logo-wrapper">
        {bus.operatorLogo && bus.operatorLogo !== "/images/bus.jpeg" ? (
          <img
            src={bus.operatorLogo}
            alt={bus.operatorName}
            className="operator-logo w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML = "";
              e.target.parentNode.appendChild(fallbackLogo);
            }}
          />
        ) : (
          fallbackLogo
        )}
      </div>
    );
  };

  return (
          <div className="search-page">
        {/* Search Header */}
        <section className="search-header bg-blue-900 text-white pt-24 pb-8">
          <div className="container mx-auto px-4">
            <div className="search-summary flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Janakpur to Kathmandu</h1>
                <p className="trip-date text-gray-200 mt-1">
                  Sat, 15 Jul 2023 • 1 Passenger
                </p>
              </div>
              <button
                onClick={handleModifySearch}
                className="btn-outline border-2 border-white text-white hover:bg-white hover:text-blue-900 self-start md:self-center px-4 py-2 rounded-md transition duration-300"
              >
                Modify Search
              </button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="search-main py-8">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
            {/* Filters Section */}
            <aside className="filters w-full lg:w-72 bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-24 h-fit">
              <div className="filter-section flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-blue-900">Filters</h3>
                <button
                  onClick={handleClearFilters}
                  className="text-orange-500 font-medium hover:text-orange-600 transition duration-300"
                >
                  Clear All
                </button>
              </div>

              {/* Departure Time */}
              <div className="filter-section mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">
                  Departure Time
                </h4>
                <div className="time-slider">
                  <div className="time-range flex justify-between text-sm text-gray-600 mb-2">
                    <span>6 AM</span>
                    <span>12 PM</span>
                    <span>6 PM</span>
                    <span>12 AM</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={timeValue}
                    onChange={(e) => setTimeValue(e.target.value)}
                    className="slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Bus Types */}
              <div className="filter-section mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Bus Types</h4>
                <div className="filter-options space-y-2">
                  {[
                    { id: "ac", label: "AC", checked: filters.busTypes.ac },
                    {
                      id: "nonAc",
                      label: "Non-AC",
                      checked: filters.busTypes.nonAc,
                    },
                    {
                      id: "sleeper",
                      label: "Sleeper",
                      checked: filters.busTypes.sleeper,
                    },
                    {
                      id: "luxury",
                      label: "Luxury",
                      checked: filters.busTypes.luxury,
                    },
                  ].map((type) => (
                    <label
                      key={type.id}
                      className="filter-checkbox flex items-center gap-3 cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={type.checked}
                          onChange={() =>
                            handleFilterChange("busTypes", type.id)
                          }
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 border rounded flex items-center justify-center ${
                            type.checked
                              ? "bg-blue-900 border-blue-900"
                              : "border-gray-300"
                          }`}
                        >
                          {type.checked && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-gray-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="filter-section mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Amenities</h4>
                <div className="filter-options space-y-2">
                  {[
                    {
                      id: "wifi",
                      label: "WiFi",
                      checked: filters.amenities.wifi,
                    },
                    {
                      id: "charging",
                      label: "Charging Port",
                      checked: filters.amenities.charging,
                    },
                    {
                      id: "washroom",
                      label: "Washroom",
                      checked: filters.amenities.washroom,
                    },
                    {
                      id: "blanket",
                      label: "Blanket",
                      checked: filters.amenities.blanket,
                    },
                  ].map((amenity) => (
                    <label
                      key={amenity.id}
                      className="filter-checkbox flex items-center gap-3 cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={amenity.checked}
                          onChange={() =>
                            handleFilterChange("amenities", amenity.id)
                          }
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 border rounded flex items-center justify-center ${
                            amenity.checked
                              ? "bg-blue-900 border-blue-900"
                              : "border-gray-300"
                          }`}
                        >
                          {amenity.checked && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-gray-700">{amenity.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Operators */}
              <div className="filter-section mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Operators</h4>
                <div className="filter-options space-y-2">
                  {[
                    {
                      id: "smartNepal",
                      label: "SmartNepal Travels",
                      checked: filters.operators.smartNepal,
                    },
                    {
                      id: "nationalExpress",
                      label: "National Express",
                      checked: filters.operators.nationalExpress,
                    },
                    {
                      id: "cityLink",
                      label: "City Link",
                      checked: filters.operators.cityLink,
                    },
                    {
                      id: "royalCruiser",
                      label: "Royal Cruiser",
                      checked: filters.operators.royalCruiser,
                    },
                  ].map((operator) => (
                    <label
                      key={operator.id}
                      className="filter-checkbox flex items-center gap-3 cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={operator.checked}
                          onChange={() =>
                            handleFilterChange("operators", operator.id)
                          }
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 border rounded flex items-center justify-center ${
                            operator.checked
                              ? "bg-blue-900 border-blue-900"
                              : "border-gray-300"
                          }`}
                        >
                          {operator.checked && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-gray-700">{operator.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="filter-section">
                <h4 className="font-semibold text-gray-800 mb-4">
                  Price Range
                </h4>
                <div className="price-range">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="min-price">₹500</span>
                    <span className="max-price">₹5000</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    value={priceValue}
                    onChange={(e) => setPriceValue(e.target.value)}
                    className="slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </aside>

            {/* Results Section */}
            <section className="results flex-1">
              <div className="results-header flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="results-count text-gray-800">
                  <span className="font-medium">
                    {buses.length} Buses Found
                  </span>
                  <button className="fastest-filter ml-4 text-blue-900 font-medium hover:text-blue-700 transition duration-300">
                    Fastest <i className="fas fa-chevron-down ml-1"></i>
                  </button>
                </div>
                <div className="sort-options flex items-center gap-2">
                  <span className="sort-label text-gray-600 text-sm">
                    Sort by:
                  </span>
                  {["departure", "duration", "price", "ratings"].map(
                    (sortType) => (
                      <button
                        key={sortType}
                        onClick={() => handleSort(sortType)}
                        className={`sort-btn px-3 py-1 rounded text-sm transition duration-300 ${
                          activeSort === sortType
                            ? "bg-gray-100 text-blue-900 font-medium"
                            : "text-gray-600 hover:text-blue-900"
                        }`}
                      >
                        {sortType.charAt(0).toUpperCase() + sortType.slice(1)}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Bus Cards */}
              {/* Bus Cards */}
              <div className="bus-cards space-y-6">
                {buses.map((bus) => (
                  <div
                    key={bus.id}
                    className={`bus-card bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer ${
                      bus.featured ? "border-2 border-teal-500" : "border"
                    } ${expandedBus === bus.id ? "border-blue-900" : ""}`}
                    onClick={() => toggleBusDetails(bus.id)}
                  >
                    {bus.featured && (
                      <div className="bus-badge bg-orange-500 text-white text-sm font-medium py-1 px-4 inline-block rounded-br-lg">
                        {bus.badge}
                      </div>
                    )}

                    {/* Main Bus Info */}
                    <div className="bus-main p-6">
                      <div className="bus-info flex-1">
                        <div className="bus-timings flex items-center gap-4 mb-4">
                          <span className="departure text-2xl font-bold text-gray-800">
                            {bus.departure}
                          </span>
                          <div className="duration flex-1 flex flex-col items-center">
                            <span className="text-sm text-gray-600">
                              {bus.duration}
                            </span>
                            <div className="route-line relative w-full h-px bg-gray-300 mt-2">
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-900"></div>
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-teal-500"></div>
                            </div>
                          </div>
                          <span className="arrival text-2xl font-bold text-gray-800">
                            {bus.arrival}
                          </span>
                        </div>

                        <div className="bus-operator flex items-center gap-3">
                          {renderOperatorLogo(bus)}
                          <span className="operator-name font-medium">
                            {bus.operatorName}
                          </span>
                          <span className="bus-type text-sm text-gray-600 ml-auto">
                            {bus.busType}
                          </span>
                        </div>
                      </div>

                      {/* Amenities - CHANGED TO FLEX-ROW */}
                      <div className="bus-amenities flex flex-row justify-center gap-3 mx-6">
                        {bus.amenities.map((amenity, index) => (
                          <div
                            key={index}
                            className="amenity w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-blue-900 border border-gray-200"
                            title={
                              amenity.charAt(0).toUpperCase() + amenity.slice(1)
                            }
                          >
                            {renderAmenityIcon(amenity)}
                          </div>
                        ))}
                      </div>

                      {/* Price & Action */}
                      <div className="bus-price flex flex-col items-end">
                        <div className="price-container text-right mb-2">
                          <span className="price text-3xl font-bold text-blue-900">
                            {formatPrice(bus.price)}
                          </span>
                          <span className="original-price text-lg text-gray-500 line-through ml-2">
                            {formatPrice(bus.originalPrice)}
                          </span>
                          <div className="discount text-orange-500 font-medium text-sm">
                            {bus.discount}% OFF
                          </div>
                        </div>
                        <span className="seats-left text-red-600 text-sm mb-3">
                          Only {bus.seatsLeft} seats left
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewSeats(bus.id);
                          }}
                          className="btn-primary bg-orange-500 text-white font-semibold py-2 px-6 rounded hover:bg-orange-600 transition duration-300"
                        >
                          View Seats
                        </button>
                      </div>
                    </div>

                    {/* Expand Icon */}
                    <div className="flex justify-center border-t border-gray-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBusDetails(bus.id);
                        }}
                        className="expand-btn text-blue-900 font-medium py-2 px-4 hover:bg-gray-50 w-full transition duration-300"
                      >
                        <i
                          className={`fas fa-chevron-${
                            expandedBus === bus.id ? "up" : "down"
                          } mr-2`}
                        ></i>
                        {expandedBus === bus.id
                          ? "Hide Details"
                          : "View Details"}
                      </button>
                    </div>

                    {/* Bus Details (Expandable) */}
                    {expandedBus === bus.id && (
                      <div className="bus-details px-6 pb-6 border-t border-gray-200 mt-2 animate-slideDown">
                        {/* Boarding Points */}
                        <div className="boarding-points mb-6">
                          <h4 className="font-semibold text-gray-800 mb-3">
                            Boarding & Dropping Points
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {bus.boardingPoints?.map((point, index) => (
                              <div
                                key={index}
                                className="boarding-point flex items-center gap-3 bg-gray-50 p-3 rounded-md"
                              >
                                <div className="time-point flex items-center gap-3">
                                  <div className="time-badge bg-blue-900 text-white px-3 py-1 rounded-md font-medium">
                                    {point.time}
                                  </div>
                                  <span className="location text-gray-700">
                                    {point.location}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Facilities */}
                        <div className="bus-facilities mb-6">
                          <h4 className="font-semibold text-gray-800 mb-3">
                            Facilities
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {bus.facilities.map((facility, index) => (
                              <span
                                key={index}
                                className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-blue-900 font-medium"
                              >
                                {facility === "AC" && (
                                  <i className="fas fa-snowflake"></i>
                                )}
                                {facility === "Sleeper" && (
                                  <i className="fas fa-bed"></i>
                                )}
                                {facility === "TV" && (
                                  <i className="fas fa-tv"></i>
                                )}
                                {facility === "Seater" && (
                                  <i className="fas fa-chair"></i>
                                )}
                                {facility === "Luxury" && (
                                  <i className="fas fa-crown"></i>
                                )}
                                {facility}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="bus-rating flex justify-between items-center">
                          <div className="rating-info">
                            <div className="stars flex items-center gap-1 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <i
                                  key={i}
                                  className={`fas ${
                                    i < Math.floor(bus.rating)
                                      ? "fa-star text-yellow-500"
                                      : i === Math.floor(bus.rating) &&
                                          bus.rating % 1 !== 0
                                        ? "fa-star-half-alt text-yellow-500"
                                        : "fa-star text-gray-300"
                                  }`}
                                ></i>
                              ))}
                              <span className="ml-2 text-gray-800 font-medium">
                                {bus.rating}
                              </span>
                            </div>
                            <span className="text-gray-600 text-sm">
                              Based on {bus.reviews} reviews
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("View reviews for bus:", bus.id);
                            }}
                            className="btn-outline border-2 border-blue-900 text-blue-900 font-medium py-2 px-6 rounded hover:bg-blue-900 hover:text-white transition duration-300"
                          >
                            View Reviews
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="pagination flex justify-center items-center gap-3 mt-12">
                <button
                  className={`page-btn flex items-center gap-1 px-4 py-2 border rounded transition duration-300 ${
                    activePage === 1
                      ? "border-gray-300 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:border-blue-900 hover:text-blue-900"
                  }`}
                  disabled={activePage === 1}
                  onClick={() => handlePageChange(activePage - 1)}
                >
                  <i className="fas fa-chevron-left"></i>
                  Previous
                </button>

                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`page-btn px-4 py-2 border rounded transition duration-300 ${
                      activePage === page
                        ? "bg-blue-900 text-white border-blue-900"
                        : "border-gray-300 text-gray-700 hover:border-blue-900 hover:text-blue-900"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className={`page-btn flex items-center gap-1 px-4 py-2 border rounded transition duration-300 ${
                    activePage === 3
                      ? "border-gray-300 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:border-blue-900 hover:text-blue-900"
                  }`}
                  disabled={activePage === 3}
                  onClick={() => handlePageChange(activePage + 1)}
                >
                  Next
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </section>
          </div>
        </main>

        {/* Why Choose Us Banner */}
        <section className="why-choose-us bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
              Why Book With SmartNepal?
            </h2>
            <div className="benefits-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="benefit-card bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
                <i className="fas fa-shield-alt text-5xl text-orange-500 mb-6"></i>
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  Safe & Secure
                </h3>
                <p className="text-gray-600">
                  Your security is our priority. All bookings are 100% secure.
                </p>
              </div>
              <div className="benefit-card bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
                <i className="fas fa-rupee-sign text-5xl text-orange-500 mb-6"></i>
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  Best Price Guarantee
                </h3>
                <p className="text-gray-600">
                  Found a better price? We'll match it and give you 10% off.
                </p>
              </div>
              <div className="benefit-card bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
                <i className="fas fa-headset text-5xl text-orange-500 mb-6"></i>
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  24/7 Customer Support
                </h3>
                <p className="text-gray-600">
                  Our travel experts are always available to assist you.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default SearchPage;
