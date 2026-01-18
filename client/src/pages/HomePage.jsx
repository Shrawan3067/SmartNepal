import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/common/Layout";
import LazyImage from "../components/common/LazyImage";
import banner from "../assets/images/mount-everest-6395759.jpg";
import offer1 from "../assets/images/offer1.jpeg";
import offer2 from "../assets/images/offer2.jpg";
import offer3 from "../assets/images/offer3.jpeg";
import bus1 from "../assets/images/bus1.jpeg";
import bus2 from "../assets/images/bus2.jpeg";
import bus3 from "../assets/images/bus3.jpeg";

// City data
const cities = [
  "Biratnagar, Morang",
  "Dharan, Sunsari",
  "Itahari, Sunsari",
  "Inaruwa, Sunsari",
  "Bhojpur, Bhojpur",
  "Dhankuta, Dhankuta",
  "Ilam, Ilam",
  "Phidim, Panchthar",
  "Birtamod, Jhapa",
  "Damak, Jhapa",
  "Mechinagar, Jhapa",
  "Rajbiraj, Saptari",
  "Lahan, Siraha",
  "Siraha, Siraha",
  "Udayapur Gadhi, Udayapur",
  "Janakpur, Dhanusha",
  "Jaleshwar, Mahottari",
  "Malangwa, Sarlahi",
  "Gaur, Rautahat",
  "Kalaiya, Bara",
  "Birgunj, Parsa",
  "Simara, Bara",
  "Chandranigahapur, Rautahat",
  "Bardibas, Mahottari",
  "Sarlahi, Sarlahi",
  "Kathmandu, Kathmandu",
  "Lalitpur (Patan), Lalitpur",
  "Bhaktapur, Bhaktapur",
  "Kirtipur, Kathmandu",
  "Madhyapur Thimi, Bhaktapur",
  "Banepa, Kavrepalanchok",
  "Dhulikhel, Kavrepalanchok",
  "Panauti, Kavrepalanchok",
  "Chautara, Sindhupalchok",
  "Melamchi, Sindhupalchok",
  "Bidur, Nuwakot",
  "Trishuli, Nuwakot",
  "Dhunche, Rasuwa",
  "Hetauda, Makwanpur",
  "Markhu, Makwanpur",
  "Pokhara, Kaski",
  "Lekhnath, Kaski",
  "Baglung, Baglung",
  "Kusma, Parbat",
  "Beni, Myagdi",
  "Gorkha, Gorkha",
  "Besisahar, Lamjung",
  "Syangja, Syangja",
  "Tansen, Palpa",
  "Waling, Syangja",
  "Damauli, Tanahun",
  "Bharatpur, Chitwan",
  "Ratnanagar, Chitwan",
  "Butwal, Rupandehi",
  "Bhairahawa, Rupandehi",
  "Tilottama, Rupandehi",
  "Lumbini, Rupandehi",
  "Kapilvastu, Kapilvastu",
  "Taulihawa, Kapilvastu",
  "Gulariya, Bardiya",
  "Nepalgunj, Banke",
  "Kohalpur, Banke",
  "Bansgadhi, Bardiya",
  "Sandhikharka, Arghakhanchi",
  "Tamghas, Gulmi",
  "Musikot, Gulmi",
  "Rampur, Palpa",
  "Birendranagar, Surkhet",
  "Manma, Kalikot",
  "Jumla, Jumla",
  "Dunai, Dolpa",
  "Simikot, Humla",
  "Chandannath, Jumla",
  "Gamgadhi, Mugu",
  "Rara, Mugu",
  "Dhangadhi, Kailali",
  "Tikapur, Kailali",
  "Attariya, Kailali",
  "Mahendranagar, Kanchanpur",
  "Bhimdatta, Kanchanpur",
  "Dipayal, Doti",
  "Silgadhi, Doti",
  "Dadeldhura, Dadeldhura",
  "Amargadhi, Dadeldhura",
  "Baitadi, Baitadi",
  "Dasharathchand, Baitadi",
  "Darchula, Darchula",
  "Daman, Makwanpur",
  "Bandipur, Tanahun",
  "Ghalegaun, Lamjung",
];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("bus");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [filteredFromCities, setFilteredFromCities] = useState(cities);
  const [filteredToCities, setFilteredToCities] = useState(cities);
  const [fromHighlightedIndex, setFromHighlightedIndex] = useState(-1);
  const [toHighlightedIndex, setToHighlightedIndex] = useState(-1);

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);

  // Initialize date picker on focus
  const handleDateFocus = () => {
    const dateInput = document.getElementById("date");
    if (dateInput) {
      dateInput.type = "date";
    }
  };

  // Filter cities for from input
  const filterFromCities = (searchTerm) => {
    if (!searchTerm) {
      setFilteredFromCities(cities);
      return;
    }
    const filtered = cities.filter((city) =>
      city.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredFromCities(filtered);
  };

  // Filter cities for to input
  const filterToCities = (searchTerm) => {
    if (!searchTerm) {
      setFilteredToCities(cities);
      return;
    }
    const filtered = cities.filter((city) =>
      city.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredToCities(filtered);
  };

  // Handle from input change
  const handleFromChange = (e) => {
    const value = e.target.value;
    setFromValue(value);
    filterFromCities(value);
    setFromDropdownOpen(true);
    setFromHighlightedIndex(-1);
  };

  // Handle to input change
  const handleToChange = (e) => {
    const value = e.target.value;
    setToValue(value);
    filterToCities(value);
    setToDropdownOpen(true);
    setToHighlightedIndex(-1);
  };

  // Select from city
  const selectFromCity = (city) => {
    setFromValue(city);
    setFromDropdownOpen(false);
    if (fromRef.current) {
      fromRef.current.focus();
    }
  };

  // Select to city
  const selectToCity = (city) => {
    setToValue(city);
    setToDropdownOpen(false);
    if (toRef.current) {
      toRef.current.focus();
    }
  };

  // Swap from and to values
  const swapCities = () => {
    const temp = fromValue;
    setFromValue(toValue);
    setToValue(temp);

    const tempFiltered = filteredFromCities;
    setFilteredFromCities(filteredToCities);
    setFilteredToCities(tempFiltered);
  };

  // Handle search button click
  const handleSearch = () => {
    if (fromValue.trim() && toValue.trim()) {
      window.location.href = "/search";
    } else {
      alert("Please select both departure and arrival cities");
    }
  };

  // Handle keyboard navigation for from dropdown
  const handleFromKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (fromHighlightedIndex < filteredFromCities.length - 1) {
        setFromHighlightedIndex(fromHighlightedIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (fromHighlightedIndex > 0) {
        setFromHighlightedIndex(fromHighlightedIndex - 1);
      }
    } else if (e.key === "Enter" && fromHighlightedIndex >= 0) {
      e.preventDefault();
      selectFromCity(filteredFromCities[fromHighlightedIndex]);
    } else if (e.key === "Escape") {
      setFromDropdownOpen(false);
    }
  };

  // Handle keyboard navigation for to dropdown
  const handleToKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (toHighlightedIndex < filteredToCities.length - 1) {
        setToHighlightedIndex(toHighlightedIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (toHighlightedIndex > 0) {
        setToHighlightedIndex(toHighlightedIndex - 1);
      }
    } else if (e.key === "Enter" && toHighlightedIndex >= 0) {
      e.preventDefault();
      selectToCity(filteredToCities[toHighlightedIndex]);
    } else if (e.key === "Escape") {
      setToDropdownOpen(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        fromRef.current &&
        !fromRef.current.contains(event.target) &&
        fromDropdownRef.current &&
        !fromDropdownRef.current.contains(event.target)
      ) {
        setFromDropdownOpen(false);
      }
      if (
        toRef.current &&
        !toRef.current.contains(event.target) &&
        toDropdownRef.current &&
        !toDropdownRef.current.contains(event.target)
      ) {
        setToDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section - Hero image loads immediately */}
      <section className="hero w-full relative h-[500px] md:h-[600px] flex items-center">
        <div className="hero-overlay w-full absolute inset-0">
          <LazyImage
            src={banner}
            alt="Hero Background"
            className="w-full h-full object-cover"
            width="1920"
            height="1080"
            eager={true} // Custom prop for eager loading
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-teal-500/50"></div> */}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Travel Across Nepal with Comfort
          </h1>
          <p className="text-lg md:text-xl text-white mb-8">
            <span className="bg-black/50 text-white px-4 py-2 rounded-lg inline-block">
              Book bus tickets to 5000+ destinations at the lowest prices
            </span>
          </p>

          {/* Search Widget */}
          <div className="search-widget bg-white rounded-lg shadow-xl p-4 md:p-6 max-w-6xl mx-auto">
            <div className="search-tabs flex mb-6 border-b border-gray-200">
              <button
                className={`px-4 md:px-6 py-2 md:py-3 font-semibold ${activeTab === "bus" ? "text-blue-800 relative" : "text-gray-600"}`}
                onClick={() => setActiveTab("bus")}
              >
                Bus
                {activeTab === "bus" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
                )}
              </button>
              <button
                className={`px-4 md:px-6 py-2 md:py-3 font-semibold ${activeTab === "hotels" ? "text-blue-800 relative" : "text-gray-600"}`}
                onClick={() => setActiveTab("hotels")}
              >
                Hotels
                {activeTab === "hotels" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
                )}
              </button>
              <button
                className={`px-4 md:px-6 py-2 md:py-3 font-semibold ${activeTab === "tour" ? "text-blue-800 relative" : "text-gray-600"}`}
                onClick={() => setActiveTab("tour")}
              >
                Tour
                {activeTab === "tour" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
                )}
              </button>
            </div>

            <div className="search-form grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* From Input */}
              <div className="form-group relative">
                <label
                  htmlFor="from"
                  className="block text-gray-800 font-medium mb-2"
                >
                  From
                </label>
                <div className="city-dropdown relative">
                  <input
                    ref={fromRef}
                    type="text"
                    id="from"
                    value={fromValue}
                    onChange={handleFromChange}
                    onFocus={() => setFromDropdownOpen(true)}
                    onKeyDown={handleFromKeyDown}
                    placeholder="Leaving from..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={swapCities}
                    className="swap-btn absolute -right-3 bottom-3 bg-white p-2 rounded-full shadow-md text-blue-800 hover:text-blue-600 z-10"
                  >
                    <i className="fas fa-exchange-alt"></i>
                  </button>

                  {fromDropdownOpen && filteredFromCities.length > 0 && (
                    <div
                      ref={fromDropdownRef}
                      className="dropdown-list absolute top-full left-0 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-b-md shadow-lg z-20"
                    >
                      {filteredFromCities.map((city, index) => (
                        <div
                          key={index}
                          className={`dropdown-item px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                            index === fromHighlightedIndex
                              ? "bg-blue-600 text-white"
                              : ""
                          }`}
                          onClick={() => selectFromCity(city)}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* To Input */}
              <div className="form-group relative">
                <label
                  htmlFor="to"
                  className="block text-gray-800 font-medium mb-2"
                >
                  To
                </label>
                <div className="city-dropdown relative">
                  <input
                    ref={toRef}
                    type="text"
                    id="to"
                    value={toValue}
                    onChange={handleToChange}
                    onFocus={() => setToDropdownOpen(true)}
                    onKeyDown={handleToKeyDown}
                    placeholder="Going to..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoComplete="off"
                  />

                  {toDropdownOpen && filteredToCities.length > 0 && (
                    <div
                      ref={toDropdownRef}
                      className="dropdown-list absolute top-full left-0 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-b-md shadow-lg z-20"
                    >
                      {filteredToCities.map((city, index) => (
                        <div
                          key={index}
                          className={`dropdown-item px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                            index === toHighlightedIndex
                              ? "bg-blue-600 text-white"
                              : ""
                          }`}
                          onClick={() => selectToCity(city)}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Date Input */}
              <div className="form-group relative">
                <label
                  htmlFor="date"
                  className="block text-gray-800 font-medium mb-2"
                >
                  Date
                </label>
                <input
                  type="text"
                  id="date"
                  value={dateValue}
                  onChange={(e) => setDateValue(e.target.value)}
                  onFocus={handleDateFocus}
                  placeholder="Select date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <i className="fas fa-calendar-alt absolute right-4 bottom-3 text-gray-500"></i>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="search-btn bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition h-[50px] self-center mt-[10px]"
              >
                Search Buses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Section - Lazy load images */}
      <section className="offers py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-8">
            Special Offers
          </h2>
          <div className="offers-slider grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Offer 1 */}
            <div className="offer-card relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
              <div className="offer-badge absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold z-10">
                20% OFF
              </div>
              <LazyImage
                src={offer1}
                alt="Summer Special"
                className="w-full h-48 object-cover"
                width={400}
                height={192}
                eager={true}
              />
              <div className="offer-content p-5">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Summer Special
                </h3>
                <p className="text-gray-600 text-sm">
                  Use code SUMMER20 for 20% discount
                </p>
              </div>
            </div>

            {/* Offer 2 */}
            <div className="offer-card relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
              <div className="offer-badge absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold z-10">
                ₹200 CASHBACK
              </div>
              <LazyImage
                src={offer2}
                alt="First Booking"
                className="w-full h-48 object-cover"
                width={400}
                height={192}
                eager={true}
              />
              <div className="offer-content p-5">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  First Booking
                </h3>
                <p className="text-gray-600 text-sm">
                  Get ₹200 cashback on your first trip
                </p>
              </div>
            </div>

            {/* Offer 3 */}
            <div className="offer-card relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
              <div className="offer-badge absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold z-10">
                FREE CANCELLATION
              </div>
              <LazyImage
                src={offer3}
                alt="Flexi Tickets"
                className="w-full h-48 object-cover"
                width={400}
                height={192}
                eager={true}
              />
              <div className="offer-content p-5">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Flexi Tickets
                </h3>
                <p className="text-gray-600 text-sm">
                  Cancel anytime with zero charges
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - No images here, just text */}
      <section className="features py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-8 md:mb-12">
            Why Choose SmartNepal?
          </h2>
          <div className="feature-grid grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="feature-card bg-white p-6 md:p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
              <i className="fas fa-shield-alt text-4xl text-orange-500 mb-5"></i>
              <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-3">
                Safe Travel
              </h3>
              <p className="text-gray-600 text-sm">
                Verified operators and sanitized buses
              </p>
            </div>

            <div className="feature-card bg-white p-6 md:p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
              {/* <i className="fas fa-rupee-sign text-4xl text-orange-500 mb-5"></i> */}
              <div className="text-4xl font-[600] text-orange-500 mb-4 md:mb-6">₹</div>
              <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-3">
                Best Prices
              </h3>
              <p className="text-gray-600 text-sm">
                Guaranteed lowest prices on bus tickets
              </p>
            </div>

            <div className="feature-card bg-white p-6 md:p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
              <i className="fas fa-headset text-4xl text-orange-500 mb-5"></i>{" "}
              <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-3">
                24/7 Support
              </h3>
              <p className="text-gray-600 text-sm">
                Our travel experts are always available
              </p>
            </div>

            <div className="feature-card bg-white p-6 md:p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
              <i className="fas fa-bus text-4xl text-orange-500 mb-5"></i>
              <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-3">
                Largest Network
              </h3>
              <p className="text-gray-600 text-sm">
                2,00,000+ buses across Nepal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes - Lazy load images */}
      <section className="popular-routes py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-8 md:mb-12">
            Popular Bus Routes
          </h2>
          <div className="route-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Route 1 */}
            <div className="route-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
              <LazyImage
                src={bus1}
                alt="Janakpur to Kathmandu"
                className="w-full h-48 object-cover"
                width={400}
                height={192}
                eager={true} // Custom prop for eager loading
              />
              <div className="route-content p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Janakpur to Kathmandu
                </h3>
                <p className="text-orange-500 font-semibold mb-4">
                  Starting from ₹999
                </p>
                <Link
                  to="/search?from=Janakpur&to=Kathmandu"
                  className="btn-outline inline-block border-2 border-blue-900 text-blue-900 font-semibold py-2 px-6 rounded hover:bg-blue-900 hover:text-white transition"
                >
                  View Buses
                </Link>
              </div>
            </div>

            {/* Route 2 */}
            <div className="route-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
              <LazyImage
                src={bus2}
                alt="Janakpur to Dharan"
                className="w-full h-48 object-cover"
                width={400}
                height={192}
                eager={true} // Custom prop for eager loading
              />
              <div className="route-content p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Janakpur to Dharan
                </h3>
                <p className="text-orange-500 font-semibold mb-4">
                  Starting from ₹1199
                </p>
                <Link
                  to="/search?from=Janakpur&to=Dharan"
                  className="btn-outline inline-block border-2 border-blue-900 text-blue-900 font-semibold py-2 px-6 rounded hover:bg-blue-900 hover:text-white transition"
                >
                  View Buses
                </Link>
              </div>
            </div>

            {/* Route 3 */}
            <div className="route-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
              <LazyImage
                src={bus3}
                alt="Janakpur to Pokhara"
                className="w-full h-48 object-cover"
                width={400}
                height={192}
                eager={true} // Custom prop for eager loading
              />
              <div className="route-content p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Janakpur to Pokhara
                </h3>
                <p className="text-orange-500 font-semibold mb-4">
                  Starting from ₹1599
                </p>
                <Link
                  to="/search?from=Janakpur&to=Pokhara"
                  className="btn-outline inline-block border-2 border-blue-900 text-blue-900 font-semibold py-2 px-6 rounded hover:bg-blue-900 hover:text-white transition"
                >
                  View Buses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
