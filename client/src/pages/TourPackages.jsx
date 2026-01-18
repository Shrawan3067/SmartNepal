import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";

const TourPackages = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    priceRange: [5000, 50000],
    duration: "all",
    destinations: [],
    difficulty: "all",
    sortBy: "popular"
  });

  const tourPackages = [
    {
      id: 1,
      title: "Everest Base Camp Trek",
      description: "Experience the ultimate Himalayan adventure with views of the world's highest peaks.",
      duration: "14 days",
      difficulty: "Challenging",
      price: 45000,
      originalPrice: 52000,
      rating: 4.9,
      reviews: 289,
      image: "https://images.unsplash.com/photo-1585506936724-fa0c19c7b388?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      destinations: ["Kathmandu", "Lukla", "Namche Bazaar", "Everest Base Camp"],
      highlights: ["Kalapatthar sunrise", "Sherpa culture", "Mountain flights"],
      season: ["Mar-May", "Sep-Nov"],
      groupSize: "2-12 people",
      amenities: ["Permits", "Guide", "Accommodation", "Meals", "Transport"]
    },
    {
      id: 2,
      title: "Annapurna Circuit Trek",
      description: "Complete circuit around the Annapurna Massif with diverse landscapes and cultures.",
      duration: "18 days",
      difficulty: "Moderate",
      price: 38000,
      originalPrice: 45000,
      rating: 4.8,
      reviews: 342,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      destinations: ["Kathmandu", "Pokhara", "Manang", "Thorong La Pass"],
      highlights: ["Thorong La Pass", "Muktinath Temple", "Natural hot springs"],
      season: ["Mar-May", "Sep-Nov"],
      groupSize: "2-15 people",
      amenities: ["Permits", "Guide", "Accommodation", "Meals", "Transport"]
    },
    {
      id: 3,
      title: "Langtang Valley Trek",
      description: "Beautiful valley trek close to Kathmandu with Tibetan Buddhist culture.",
      duration: "10 days",
      difficulty: "Easy",
      price: 28000,
      originalPrice: 35000,
      rating: 4.7,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      destinations: ["Kathmandu", "Syabrubesi", "Langtang Village", "Kyanjin Gompa"],
      highlights: ["Langtang National Park", "Cheese factory", "Local Tamang culture"],
      season: ["Year-round"],
      groupSize: "2-10 people",
      amenities: ["Permits", "Guide", "Accommodation", "Meals"]
    },
    {
      id: 4,
      title: "Upper Mustang Trek",
      description: "Explore the forbidden kingdom with unique Tibetan culture and desert landscapes.",
      duration: "16 days",
      difficulty: "Moderate",
      price: 55000,
      originalPrice: 65000,
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      destinations: ["Pokhara", "Jomsom", "Lo Manthang", "Kagbeni"],
      highlights: ["Forbidden Kingdom", "Tibetan culture", "Ancient caves"],
      season: ["Mar-Nov"],
      groupSize: "2-8 people",
      amenities: ["Special permit", "Guide", "Accommodation", "Meals", "Transport"]
    },
    {
      id: 5,
      title: "Chitwan Jungle Safari",
      description: "Wildlife adventure in Nepal's premier national park with diverse fauna.",
      duration: "4 days",
      difficulty: "Easy",
      price: 18000,
      originalPrice: 22000,
      rating: 4.6,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1552465011-b4e30bf7349d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      destinations: ["Kathmandu", "Chitwan National Park"],
      highlights: ["Elephant safari", "Bird watching", "Canoe ride", "Tharu culture"],
      season: ["Oct-Mar"],
      groupSize: "2-20 people",
      amenities: ["Park fees", "Guide", "Accommodation", "All meals", "Activities"]
    },
    {
      id: 6,
      title: "Pokhara Adventure Package",
      description: "Complete adventure package with paragliding, boating, and trekking.",
      duration: "5 days",
      difficulty: "Easy",
      price: 25000,
      originalPrice: 30000,
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      destinations: ["Kathmandu", "Pokhara"],
      highlights: ["Paragliding", "Boating", "Davis Falls", "World Peace Pagoda"],
      season: ["Year-round"],
      groupSize: "2-15 people",
      amenities: ["Activities", "Guide", "Accommodation", "Transport"]
    },
    {
      id: 7,
      title: "Manaslu Circuit Trek",
      description: "Remote and challenging trek around the world's eighth highest mountain.",
      duration: "21 days",
      difficulty: "Challenging",
      price: 65000,
      originalPrice: 75000,
      rating: 4.9,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      destinations: ["Kathmandu", "Arughat", "Samdo", "Larkya La Pass"],
      highlights: ["Larkya La Pass", "Remote villages", "Buddhist monasteries"],
      season: ["Mar-May", "Sep-Nov"],
      groupSize: "2-12 people",
      amenities: ["Special permit", "Guide", "Porters", "Accommodation", "Meals"]
    },
    {
      id: 8,
      title: "Lumbini Spiritual Tour",
      description: "Birthplace of Lord Buddha with historical and spiritual significance.",
      duration: "3 days",
      difficulty: "Easy",
      price: 12000,
      originalPrice: 15000,
      rating: 4.5,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      destinations: ["Kathmandu", "Lumbini"],
      highlights: ["Maya Devi Temple", "World Peace Pagoda", "Monastery tour"],
      season: ["Year-round"],
      groupSize: "2-25 people",
      amenities: ["Guide", "Accommodation", "Meals", "Entrance fees"]
    },
    {
      id: 9,
      title: "Rara Lake Trek",
      description: "Trek to Nepal's largest lake in the remote far-western region.",
      duration: "12 days",
      difficulty: "Moderate",
      price: 35000,
      originalPrice: 42000,
      rating: 4.8,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      destinations: ["Kathmandu", "Talcha", "Rara Lake", "Gamgadhi"],
      highlights: ["Rara Lake", "Remote wilderness", "Unique culture"],
      season: ["Mar-May", "Sep-Nov"],
      groupSize: "2-10 people",
      amenities: ["Permits", "Guide", "Accommodation", "Meals", "Flights"]
    },
    {
      id: 10,
      title: "Helicopter Tour to Everest",
      description: "Luxury helicopter tour with close-up views of Mount Everest.",
      duration: "1 day",
      difficulty: "Easy",
      price: 250000,
      originalPrice: 300000,
      rating: 5.0,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      destinations: ["Kathmandu", "Everest Region"],
      highlights: ["Everest close-up", "Helicopter ride", "Breakfast at Everest View Hotel"],
      season: ["Year-round"],
      groupSize: "5 people max",
      amenities: ["Helicopter", "Pilot", "Breakfast", "Permits"]
    },
    {
      id: 11,
      title: "Bhutan Cultural Tour",
      description: "Explore the last Himalayan kingdom with rich Buddhist culture.",
      duration: "7 days",
      difficulty: "Easy",
      price: 95000,
      originalPrice: 110000,
      rating: 4.8,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1575446913961-3f1e389fd1a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      destinations: ["Paro", "Thimphu", "Punakha", "Tiger's Nest"],
      highlights: ["Tiger's Nest", "Dzong architecture", "Bhutanese culture"],
      season: ["Mar-Jun", "Sep-Nov"],
      groupSize: "2-12 people",
      amenities: ["Bhutan visa", "Guide", "Accommodation", "All meals", "Transport"]
    },
    {
      id: 12,
      title: "Family Nepal Experience",
      description: "Perfect family tour combining culture, nature, and adventure.",
      duration: "10 days",
      difficulty: "Easy",
      price: 65000,
      originalPrice: 78000,
      rating: 4.7,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1564501049418-3c27787d01e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      destinations: ["Kathmandu", "Pokhara", "Chitwan"],
      highlights: ["Cultural sites", "Boating", "Wildlife safari", "Easy hikes"],
      season: ["Year-round"],
      groupSize: "2-15 people",
      amenities: ["All activities", "Guide", "Family-friendly accommodation", "Meals"]
    }
  ];

  const handleFilterChange = (filterType, value) => {
    if (filterType === "priceRange") {
      setFilters({ ...filters, priceRange: value });
    } else if (filterType === "destinations") {
      const newDestinations = filters.destinations.includes(value)
        ? filters.destinations.filter(d => d !== value)
        : [...filters.destinations, value];
      setFilters({ ...filters, destinations: newDestinations });
    } else {
      setFilters({ ...filters, [filterType]: value });
    }
  };

  const handleViewDetails = (packageId) => {
    const tourPackage = tourPackages.find(p => p.id === packageId);
    navigate(`/tour-package/${packageId}`, { state: { tourPackage } });
  };

  const handleBookNow = (packageId) => {
    const tourPackage = tourPackages.find(p => p.id === packageId);
    navigate(`/tour-package/${packageId}`, { state: { tourPackage } });
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

  const filteredPackages = tourPackages.filter(pkg => {
    const withinPriceRange = pkg.price >= filters.priceRange[0] && pkg.price <= filters.priceRange[1];
    const matchesDuration = filters.duration === "all" || 
      (filters.duration === "short" && parseInt(pkg.duration) <= 7) ||
      (filters.duration === "medium" && parseInt(pkg.duration) > 7 && parseInt(pkg.duration) <= 14) ||
      (filters.duration === "long" && parseInt(pkg.duration) > 14);
    const matchesDifficulty = filters.difficulty === "all" || pkg.difficulty === filters.difficulty;
    const matchesDestinations = filters.destinations.length === 0 || 
      filters.destinations.some(dest => pkg.destinations.some(p => p.toLowerCase().includes(dest.toLowerCase())));

    return withinPriceRange && matchesDuration && matchesDifficulty && matchesDestinations;
  });

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "duration":
        return parseInt(a.duration) - parseInt(b.duration);
      default:
        return b.reviews - a.reviews;
    }
  });

  const uniqueDestinations = Array.from(
    new Set(tourPackages.flatMap(pkg => pkg.destinations))
  ).slice(0, 8);

  return (
          <div className="tour-packages-page">
        {/* Hero Section */}
        <section className="tour-hero bg-gradient-to-r from-blue-900 to-orange-500 text-white pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Nepal's Wonders</h1>
              <p className="text-xl opacity-90 mb-8">
                From Himalayan peaks to jungle safaris, experience the adventure of a lifetime
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <i className="fas fa-mountain mr-2"></i>
                  <span>Trekking</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <i className="fas fa-paw mr-2"></i>
                  <span>Wildlife</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <i className="fas fa-spa mr-2"></i>
                  <span>Culture</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <i className="fas fa-helicopter mr-2"></i>
                  <span>Adventure</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="tour-main py-8">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="filters w-full lg:w-80 bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24 h-fit">
              <div className="filter-section flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-blue-900">Filters</h3>
                <button
                  onClick={() => setFilters({
                    priceRange: [5000, 50000],
                    duration: "all",
                    destinations: [],
                    difficulty: "all",
                    sortBy: "popular"
                  })}
                  className="text-orange-500 font-medium hover:text-orange-600"
                >
                  Clear All
                </button>
              </div>

              {/* Price Range */}
              <div className="filter-section mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Price Range</h4>
                <div className="price-slider">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Rs. {filters.priceRange[0]}</span>
                    <span>Rs. {filters.priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="250000"
                    step="5000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange("priceRange", [filters.priceRange[0], parseInt(e.target.value)])}
                    className="slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="filter-section mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Duration</h4>
                <div className="duration-filter flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All" },
                    { id: "short", label: "≤ 7 days" },
                    { id: "medium", label: "8-14 days" },
                    { id: "long", label: "> 14 days" }
                  ].map((duration) => (
                    <button
                      key={duration.id}
                      onClick={() => handleFilterChange("duration", duration.id)}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        filters.duration === duration.id
                          ? "bg-blue-900 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {duration.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="filter-section mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Difficulty Level</h4>
                <div className="space-y-2">
                  {["all", "Easy", "Moderate", "Challenging"].map((difficulty) => (
                    <label
                      key={difficulty}
                      className="radio-option flex items-center gap-3 cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          type="radio"
                          name="difficulty"
                          checked={filters.difficulty === difficulty}
                          onChange={() => handleFilterChange("difficulty", difficulty)}
                          className="sr-only"
                        />
                        <div className="w-5 h-5 border rounded-full flex items-center justify-center">
                          {filters.difficulty === difficulty && (
                            <div className="w-2.5 h-2.5 bg-blue-900 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <span className="text-gray-700">{difficulty === "all" ? "All Levels" : difficulty}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Destinations */}
              <div className="filter-section mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Destinations</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {uniqueDestinations.map((destination) => (
                    <label
                      key={destination}
                      className="filter-checkbox flex items-center gap-3 cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={filters.destinations.includes(destination)}
                          onChange={() => handleFilterChange("destinations", destination)}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 border rounded flex items-center justify-center ${
                            filters.destinations.includes(destination)
                              ? "bg-blue-900 border-blue-900"
                              : "border-gray-300"
                          }`}
                        >
                          {filters.destinations.includes(destination) && (
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
                      <span className="text-gray-700">{destination}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="filter-section">
                <h4 className="font-semibold text-gray-800 mb-4">Sort By</h4>
                <div className="space-y-2">
                  {[
                    { id: "popular", label: "Most Popular" },
                    { id: "rating", label: "Highest Rated" },
                    { id: "price-low", label: "Price: Low to High" },
                    { id: "price-high", label: "Price: High to Low" },
                    { id: "duration", label: "Duration: Short to Long" }
                  ].map((option) => (
                    <label
                      key={option.id}
                      className="radio-option flex items-center gap-3 cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          type="radio"
                          name="sort"
                          checked={filters.sortBy === option.id}
                          onChange={() => handleFilterChange("sortBy", option.id)}
                          className="sr-only"
                        />
                        <div className="w-5 h-5 border rounded-full flex items-center justify-center">
                          {filters.sortBy === option.id && (
                            <div className="w-2.5 h-2.5 bg-blue-900 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Tour Packages Grid */}
            <section className="results flex-1">
              <div className="results-header flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="results-count text-gray-800">
                  <span className="text-lg font-medium">{sortedPackages.length} Tour Packages Found</span>
                  <span className="ml-4 text-gray-600">
                    Rs. {filters.priceRange[0]} - Rs. {filters.priceRange[1]}
                  </span>
                </div>
                <div className="quick-filters flex flex-wrap gap-2">
                  <span className="text-gray-600 text-sm">Popular:</span>
                  <button 
                    onClick={() => handleFilterChange("difficulty", "Easy")}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                  >
                    Easy Treks
                  </button>
                  <button 
                    onClick={() => handleFilterChange("difficulty", "Challenging")}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                  >
                    Challenging
                  </button>
                  <button 
                    onClick={() => handleFilterChange("duration", "short")}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                  >
                    Short Tours
                  </button>
                </div>
              </div>

              <div className="tour-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedPackages.map((tour) => (
                  <div
                    key={tour.id}
                    className="tour-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Tour Image */}
                    <div className="relative h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-orange-500/40 flex items-center justify-center">
                        <i className="fas fa-mountain text-5xl text-white/60"></i>
                      </div>
                      <div className="absolute top-3 right-3 flex gap-2">
                        <div className="bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {tour.duration}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tour.difficulty === "Easy" ? "bg-green-100 text-green-800" :
                          tour.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {tour.difficulty}
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        Best Seller
                      </div>
                    </div>

                    {/* Tour Info */}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-gray-800">{tour.title}</h3>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            {renderStars(tour.rating)}
                            <span className="text-sm font-medium ml-1">{tour.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">({tour.reviews} reviews)</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>

                      {/* Destinations */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-gray-700 text-sm mb-2">
                          <i className="fas fa-route"></i>
                          <span className="font-medium">Destinations:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tour.destinations.slice(0, 3).map((dest, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-blue-900 text-xs rounded"
                            >
                              {dest}
                            </span>
                          ))}
                          {tour.destinations.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              +{tour.destinations.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-gray-700 text-sm mb-2">
                          <i className="fas fa-star"></i>
                          <span className="font-medium">Highlights:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tour.highlights.slice(0, 2).map((highlight, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-orange-50 text-orange-900 text-xs rounded"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Season & Group */}
                      <div className="flex justify-between text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <i className="fas fa-calendar"></i>
                          {tour.season.join(", ")}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="fas fa-users"></i>
                          {tour.groupSize}
                        </span>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex justify-between items-center">
                        <div className="price">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-blue-900">
                              {formatPrice(tour.price)}
                            </span>
                            <span className="text-gray-500 line-through text-sm">
                              {formatPrice(tour.originalPrice)}
                            </span>
                            <span className="text-orange-500 font-medium text-sm">
                              Save {Math.round((1 - tour.price / tour.originalPrice) * 100)}%
                            </span>
                          </div>
                          <span className="text-gray-500 text-sm">per person</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetails(tour.id)}
                            className="btn-outline border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-4 py-2 rounded-lg text-sm transition duration-300"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleBookNow(tour.id)}
                            className="btn-primary bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition duration-300"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              {sortedPackages.length > 0 && (
                <div className="text-center mt-12">
                  <button className="btn-outline border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-3 rounded-lg font-semibold transition duration-300">
                    Load More Packages
                  </button>
                </div>
              )}

              {sortedPackages.length === 0 && (
                <div className="text-center py-12">
                  <i className="fas fa-search text-5xl text-gray-300 mb-4"></i>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No tour packages found</h3>
                  <p className="text-gray-600">Try adjusting your filters to find more packages</p>
                </div>
              )}
            </section>
          </div>
        </main>

        {/* Why Choose Us */}
        <section className="why-choose bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
              Why Choose SmartNepal for Tours?
            </h2>
            <div className="benefits-grid grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="benefit-card bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
                <i className="fas fa-certificate text-4xl text-orange-500 mb-6"></i>
                <h3 className="text-xl font-bold text-blue-900 mb-4">Local Experts</h3>
                <p className="text-gray-600">
                  Our guides are local experts with years of experience in the Himalayas.
                </p>
              </div>
              <div className="benefit-card bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
                <i className="fas fa-shield-alt text-4xl text-orange-500 mb-6"></i>
                <h3 className="text-xl font-bold text-blue-900 mb-4">Safety First</h3>
                <p className="text-gray-600">
                  Your safety is our priority with trained guides and proper equipment.
                </p>
              </div>
              <div className="benefit-card bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
                <i className="fas fa-leaf text-4xl text-orange-500 mb-6"></i>
                <h3 className="text-xl font-bold text-blue-900 mb-4">Sustainable Travel</h3>
                <p className="text-gray-600">
                  We promote responsible tourism that supports local communities.
                </p>
              </div>
              <div className="benefit-card bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
                <i className="fas fa-hands-helping text-4xl text-orange-500 mb-6"></i>
                <h3 className="text-xl font-bold text-blue-900 mb-4">24/7 Support</h3>
                <p className="text-gray-600">
                  Our support team is available round the clock during your journey.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default TourPackages;