import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/common/Layout";

const TourPackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [tour, setTour] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState("");

  // Default tour data
  const defaultTour = {
    id: 1,
    title: "Everest Base Camp Trek",
    description: "Experience the ultimate Himalayan adventure with views of the world's highest peaks. This iconic trek takes you through Sherpa villages, ancient monasteries, and breathtaking landscapes.",
    duration: "14 days",
    difficulty: "Challenging",
    price: 45000,
    originalPrice: 52000,
    rating: 4.9,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1585506936724-fa0c19c7b388?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    destinations: ["Kathmandu", "Lukla", "Namche Bazaar", "Tengboche", "Dingboche", "Lobuche", "Everest Base Camp", "Kalapatthar"],
    highlights: [
      "Kalapatthar sunrise view of Everest",
      "Sherpa culture and hospitality",
      "Scenic mountain flights to Lukla",
      "Visit to Tengboche Monastery",
      "Acclimatization hikes with stunning views"
    ],
    season: ["March to May", "September to November"],
    bestSeason: "Spring (Mar-May) and Autumn (Sep-Nov)",
    groupSize: "2-12 people",
    amenities: [
      "All necessary trekking permits",
      "Experienced English-speaking guide",
      "Accommodation in tea houses/lodges",
      "All meals during trek",
      "Airport transfers",
      "Domestic flights (Kathmandu-Lukla-Kathmandu)",
      "Trekking equipment (sleeping bag, down jacket)",
      "First aid kit and oxygen cylinder"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Arrive at Tribhuvan International Airport, transfer to hotel, welcome dinner" },
      { day: 2, title: "Kathmandu to Lukla to Phakding", description: "Morning flight to Lukla, trek to Phakding (2,651m)" },
      { day: 3, title: "Phakding to Namche Bazaar", description: "Trek to Namche Bazaar (3,440m), the gateway to Everest" },
      { day: 4, title: "Acclimatization Day", description: "Acclimatization hike to Everest View Hotel, visit local museum" },
      { day: 5, title: "Namche to Tengboche", description: "Trek to Tengboche (3,867m), visit famous monastery" },
      { day: 6, title: "Tengboche to Dingboche", description: "Trek to Dingboche (4,410m), beautiful mountain views" },
      { day: 7, title: "Acclimatization Day", description: "Rest day with short hikes around Dingboche" },
      { day: 8, title: "Dingboche to Lobuche", description: "Trek to Lobuche (4,910m)" },
      { day: 9, title: "Lobuche to Gorak Shep to Everest Base Camp", description: "Trek to Gorak Shep (5,164m), then to Everest Base Camp (5,364m)" },
      { day: 10, title: "Kalapatthar and back to Pheriche", description: "Morning hike to Kalapatthar (5,545m) for sunrise, trek to Pheriche" },
      { day: 11, title: "Pheriche to Namche", description: "Long trek back to Namche Bazaar" },
      { day: 12, title: "Namche to Lukla", description: "Final trek day back to Lukla" },
      { day: 13, title: "Lukla to Kathmandu", description: "Morning flight to Kathmandu, free afternoon" },
      { day: 14, title: "Departure", description: "Transfer to airport for departure" }
    ],
    inclusions: [
      "Airport pickups and drops",
      "Hotel accommodation in Kathmandu",
      "Tea house accommodation during trek",
      "All meals (breakfast, lunch, dinner)",
      "Domestic flights and airport tax",
      "Experienced trekking guide and porters",
      "All necessary permits and TIMS card",
      "Sleeping bag and down jacket",
      "First aid medical kit",
      "Government taxes and office service charge"
    ],
    exclusions: [
      "Nepal entry visa fee",
      "International airfare",
      "Travel insurance",
      "Personal expenses",
      "Tips for guide and porters",
      "Extra night accommodation in Kathmandu",
      "Lunch and dinner in Kathmandu",
      "Hot shower during trek",
      "Personal trekking equipment",
      "Any other expenses not mentioned"
    ],
    requirements: [
      "Valid passport with at least 6 months validity",
      "Travel insurance covering high altitude trekking",
      "Good physical fitness",
      "Previous trekking experience recommended",
      "Proper trekking gear and clothing"
    ],
    faqs: [
      {
        question: "What is the best time for Everest Base Camp trek?",
        answer: "The best seasons are Spring (March to May) and Autumn (September to November) when weather is stable and views are clear."
      },
      {
        question: "How difficult is the trek?",
        answer: "The trek is challenging but achievable for anyone with good physical fitness. Proper acclimatization is key to success."
      },
      {
        question: "What is the accommodation like?",
        answer: "Accommodation is in basic tea houses with shared bathrooms. In Kathmandu, we provide 3-star hotel accommodation."
      },
      {
        question: "What about altitude sickness?",
        answer: "We follow a proper acclimatization schedule. Our guides are trained to recognize symptoms and carry necessary medication."
      }
    ],
    departureDates: [
      { date: "2024-03-15", status: "Available", seats: 8 },
      { date: "2024-03-22", status: "Available", seats: 10 },
      { date: "2024-04-05", status: "Filling Fast", seats: 3 },
      { date: "2024-04-12", status: "Available", seats: 12 },
      { date: "2024-09-14", status: "Available", seats: 15 },
      { date: "2024-09-28", status: "Available", seats: 10 }
    ]
  };

  useEffect(() => {
    if (location.state?.tourPackage) {
      setTour(location.state.tourPackage);
    } else {
      // In real app, fetch tour data based on id
      setTour({ ...defaultTour, id: parseInt(id) });
    }

    // Set default departure date to first available
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 30);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
  }, [id, location]);

  const handleBookNow = () => {
    navigate(`/tour/${id}/book`, { state: { tour } });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(price).replace("NPR", "Rs.");
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`fas ${
              i < Math.floor(rating)
                ? "fa-star text-yellow-500"
                : i === Math.floor(rating) && rating % 1 !== 0
                  ? "fa-star-half-alt text-yellow-500"
                  : "fa-star text-gray-300"
            }`}
          ></i>
        ))}
      </div>
    );
  };

  if (!tour) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p>Loading tour details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
          <div className="tour-details-page">
        {/* Hero Section */}
        <section className="tour-hero bg-gradient-to-r from-blue-900 to-orange-500 text-white pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{tour.title}</h1>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-clock"></i>
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-mountain"></i>
                    <span className="font-medium">{tour.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderStars(tour.rating)}
                    <span>{tour.rating} ({tour.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/tour-packages')}
                className="btn-outline border-white text-white hover:bg-white hover:text-blue-900 self-start lg:self-center px-6 py-2 rounded-lg transition duration-300"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Tours
              </button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="tour-main py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Tour Details */}
              <div className="flex-1">
                {/* Tour Overview */}
                <div className="tour-overview bg-white rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="md:w-1/3">
                      <div className="h-64 rounded-lg overflow-hidden bg-gradient-to-br from-blue-900/20 to-orange-500/20 flex items-center justify-center">
                        <i className="fas fa-mountain text-6xl text-blue-900/50"></i>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h2 className="text-2xl font-bold text-blue-900 mb-4">Tour Overview</h2>
                      <p className="text-gray-700 mb-6">{tour.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <i className="fas fa-calendar text-blue-900 text-xl mb-2"></i>
                          <div className="font-semibold">Duration</div>
                          <div className="text-gray-600">{tour.duration}</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <i className="fas fa-users text-green-900 text-xl mb-2"></i>
                          <div className="font-semibold">Group Size</div>
                          <div className="text-gray-600">{tour.groupSize}</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <i className="fas fa-sun text-yellow-900 text-xl mb-2"></i>
                          <div className="font-semibold">Best Season</div>
                          <div className="text-gray-600">{tour.bestSeason}</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <i className="fas fa-flag text-purple-900 text-xl mb-2"></i>
                          <div className="font-semibold">Difficulty</div>
                          <div className="text-gray-600">{tour.difficulty}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs Navigation */}
                  <div className="border-b border-gray-200 mb-6">
                    <nav className="flex flex-wrap -mb-px">
                      {["overview", "itinerary", "inclusions", "faqs"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`mr-8 py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                            activeTab === tab
                              ? "border-orange-500 text-orange-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="tab-content">
                    {activeTab === "overview" && (
                      <div>
                        <h3 className="text-xl font-semibold text-blue-900 mb-4">Tour Highlights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          {tour.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <i className="fas fa-check text-green-500 mt-1"></i>
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>

                        <h3 className="text-xl font-semibold text-blue-900 mb-4">Destinations</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {tour.destinations.map((destination, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-blue-50 text-blue-900 rounded-full text-sm"
                            >
                              {destination}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-xl font-semibold text-blue-900 mb-4">What's Included</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {tour.amenities.slice(0, 8).map((amenity, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <i className="fas fa-check-circle text-green-500"></i>
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "itinerary" && (
                      <div>
                        <h3 className="text-xl font-semibold text-blue-900 mb-4">Detailed Itinerary</h3>
                        <div className="space-y-6">
                          {tour.itinerary?.map((day) => (
                            <div key={day.day} className="border-l-4 border-orange-500 pl-6 py-2">
                              <div className="flex items-center gap-4 mb-2">
                                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                                  Day {day.day}
                                </div>
                                <h4 className="font-semibold text-lg">{day.title}</h4>
                              </div>
                              <p className="text-gray-600 ml-14">{day.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "inclusions" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xl font-semibold text-blue-900 mb-4">What's Included</h3>
                          <ul className="space-y-3">
                            {tour.inclusions?.map((item, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <i className="fas fa-check text-green-500 mt-1"></i>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-blue-900 mb-4">What's Not Included</h3>
                          <ul className="space-y-3">
                            {tour.exclusions?.map((item, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <i className="fas fa-times text-red-500 mt-1"></i>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {activeTab === "faqs" && (
                      <div>
                        <h3 className="text-xl font-semibold text-blue-900 mb-4">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                          {tour.faqs?.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-800 mb-2">{faq.question}</h4>
                              <p className="text-gray-600">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Requirements & Preparation */}
                <div className="requirements bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Requirements & Preparation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Physical Requirements</h4>
                      <ul className="space-y-2">
                        {tour.requirements?.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <i className="fas fa-check text-blue-900 mt-1"></i>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Recommended Gear</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {["Trekking boots", "Warm clothing", "Sleeping bag", "First aid kit", "Water bottle", "Sunglasses", "Sun hat", "Headlamp"].map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <i className="fas fa-check text-sm text-green-500"></i>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Booking Card */}
              <div className="lg:w-96">
                <div className="booking-card bg-white rounded-xl shadow-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-blue-900 mb-6">Book This Tour</h3>
                  
                  <div className="price-display mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-blue-900">{formatPrice(tour.price)}</span>
                      <span className="text-gray-500 line-through">{formatPrice(tour.originalPrice)}</span>
                      <span className="text-orange-500 font-medium">Save {Math.round((1 - tour.price / tour.originalPrice) * 100)}%</span>
                    </div>
                    <p className="text-gray-600">per person</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">Select Departure Date</label>
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Choose a date</option>
                        {tour.departureDates?.map((departure, index) => (
                          <option key={index} value={departure.date}>
                            {new Date(departure.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })} - {departure.status} ({departure.seats} seats)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">Number of Travelers</label>
                      <div className="flex items-center">
                        <button className="px-4 py-2 border border-gray-300 rounded-l-lg hover:bg-gray-50">
                          <i className="fas fa-minus"></i>
                        </button>
                        <div className="flex-1 text-center px-4 py-2 border-t border-b border-gray-300">
                          1
                        </div>
                        <button className="px-4 py-2 border border-gray-300 rounded-r-lg hover:bg-gray-50">
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="booking-summary mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Price Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Tour Price (1 person)</span>
                        <span>{formatPrice(tour.price)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service Charge</span>
                        <span>{formatPrice(tour.price * 0.1)}</span>
                      </div>
                      <div className="flex justify-between text-orange-500">
                        <span>Discount</span>
                        <span>-{formatPrice(tour.price * 0.1)}</span>
                      </div>
                      <div className="border-t border-gray-300 pt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total Amount</span>
                          <span className="text-blue-900">{formatPrice(tour.price)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="secure-booking mb-6">
                    <div className="flex items-center gap-3 text-green-600 mb-3">
                      <i className="fas fa-lock"></i>
                      <span className="font-medium">Secure Booking</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Free cancellation up to 30 days before departure. Flexible payment options available.
                    </p>
                  </div>

                  <button
                    onClick={handleBookNow}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-3"
                  >
                    <i className="fas fa-calendar-check"></i>
                    Book Now
                  </button>

                  <div className="mt-4 text-center text-sm text-gray-500">
                    <p>Only 25% deposit required to confirm booking</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="contact-info mt-6 bg-white rounded-xl shadow-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Need Help?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Our tour experts are here to help you plan your perfect adventure.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-phone text-blue-900"></i>
                      <span className="font-medium">+977 1-2345678</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-envelope text-blue-900"></i>
                      <span className="font-medium">tours@smartnepal.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-clock text-blue-900"></i>
                      <span className="font-medium">24/7 Support Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Similar Tours */}
        <section className="similar-tours bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">Similar Tours You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-4">
                  <div className="h-40 rounded-lg bg-gradient-to-br from-blue-900/20 to-orange-500/20 flex items-center justify-center mb-4">
                    <i className="fas fa-mountain text-4xl text-blue-900/50"></i>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Annapurna Base Camp Trek</h4>
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>10 days • Moderate</span>
                    <span className="font-bold text-blue-900">Rs. 35,000</span>
                  </div>
                  <button className="w-full btn-outline border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white py-2 rounded-lg text-sm">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
};

export default TourPackageDetails;