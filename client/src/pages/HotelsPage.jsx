import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";

const HotelsPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    priceRange: [1000, 10000],
    rating: 0,
    amenities: {
      wifi: false,
      parking: false,
      pool: false,
      spa: false,
      restaurant: false,
      ac: false,
    },
    sortBy: "recommended",
  });

  const hotels = [
    {
      id: 1,
      name: "Hotel Everest View",
      location: "Kathmandu, Thamel",
      price: 8500,
      originalPrice: 10500,
      rating: 4.8,
      reviews: 342,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      amenities: ["Free WiFi", "Parking", "Spa", "Restaurant", "AC"],
      description: "Luxury hotel with mountain views in the heart of Thamel",
      distance: "1.2 km from city center",
    },
    {
      id: 2,
      name: "Pokhara Grande Resort",
      location: "Pokhara, Lakeside",
      price: 7200,
      originalPrice: 8900,
      rating: 4.9,
      reviews: 421,
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      amenities: [
        "Swimming Pool",
        "Free WiFi",
        "Spa",
        "Restaurant",
        "Lake View",
      ],
      description:
        "Premium lakeside resort with breathtaking views of Phewa Lake",
      distance: "On the lakeside",
    },
    {
      id: 3,
      name: "Chitwan Jungle Lodge",
      location: "Chitwan National Park",
      price: 4500,
      originalPrice: 6000,
      rating: 4.6,
      reviews: 189,
      image:
        "https://images.unsplash.com/photo-1552465011-b4e30bf7349d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      amenities: [
        "Jungle View",
        "Restaurant",
        "Wildlife Tours",
        "AC",
        "Free WiFi",
      ],
      description: "Eco-friendly jungle lodge with wildlife safari packages",
      distance: "Inside national park",
    },
    {
      id: 4,
      name: "Lumbini Peace Hotel",
      location: "Lumbini, Maya Devi Temple",
      price: 3800,
      originalPrice: 5000,
      rating: 4.3,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      amenities: [
        "Garden View",
        "Restaurant",
        "Meditation Hall",
        "AC",
        "Free WiFi",
      ],
      description: "Serene hotel perfect for spiritual seekers and pilgrims",
      distance: "500m from Maya Devi Temple",
    },
    {
      id: 5,
      name: "Nagarkot Sunrise Hotel",
      location: "Nagarkot, Bhaktapur",
      price: 6800,
      originalPrice: 8500,
      rating: 4.7,
      reviews: 234,
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      amenities: [
        "Mountain View",
        "Sunrise Point",
        "Heating",
        "Restaurant",
        "Free WiFi",
      ],
      description: "Perfect for sunrise views over the Himalayas",
      distance: "At sunrise viewpoint",
    },
    {
      id: 6,
      name: "Bhaktapur Heritage Inn",
      location: "Bhaktapur Durbar Square",
      price: 5200,
      originalPrice: 6500,
      rating: 4.4,
      reviews: 178,
      image:
        "https://images.unsplash.com/photo-1564501049418-3c27787d01e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      amenities: [
        "Heritage View",
        "Cultural Shows",
        "Restaurant",
        "AC",
        "Free WiFi",
      ],
      description: "Traditional Newari architecture with modern comforts",
      distance: "Adjacent to Durbar Square",
    },
    {
      id: 7,
      name: "Annapurna Mountain Resort",
      location: "Pokhara, Base Camp",
      price: 9200,
      originalPrice: 11500,
      rating: 4.9,
      reviews: 312,
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      amenities: [
        "Mountain View",
        "Spa",
        "Gym",
        "Restaurant",
        "Hot Tub",
        "Free WiFi",
      ],
      description: "Luxury resort for trekkers and mountain enthusiasts",
      distance: "Near trek starting point",
    },
    {
      id: 8,
      name: "Swayambhu City Hotel",
      location: "Kathmandu, Swayambhu",
      price: 4200,
      originalPrice: 5500,
      rating: 4.2,
      reviews: 134,
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      amenities: [
        "Monkey Temple View",
        "Restaurant",
        "AC",
        "Free WiFi",
        "Parking",
      ],
      description: "Comfortable hotel with views of the Monkey Temple",
      distance: "10 min walk to Swayambhunath",
    },
    {
      id: 9,
      name: "Mustang Valley Resort",
      location: "Mustang, Jomsom",
      price: 6500,
      originalPrice: 8000,
      rating: 4.5,
      reviews: 198,
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      amenities: [
        "Valley View",
        "Heating",
        "Restaurant",
        "Cultural Tours",
        "Free WiFi",
      ],
      description: "Unique desert-like landscape in the Himalayan rain shadow",
      distance: "In Jomsom town center",
    },
    {
      id: 10,
      name: "Rara Lake Cottage",
      location: "Mugu, Rara Lake",
      price: 3500,
      originalPrice: 4500,
      rating: 4.1,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      amenities: [
        "Lake View",
        "Boating",
        "Restaurant",
        "Campfire",
        "Basic WiFi",
      ],
      description: "Rustic cottages by Nepal's largest lake",
      distance: "Lakeside property",
    },
    {
      id: 11,
      name: "Bardia Safari Lodge",
      location: "Bardia National Park",
      price: 4800,
      originalPrice: 6200,
      rating: 4.4,
      reviews: 145,
      image:
        "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      amenities: [
        "Jungle View",
        "Safari Tours",
        "Restaurant",
        "AC",
        "Free WiFi",
      ],
      description: "Wildlife haven with tiger and elephant safari packages",
      distance: "Inside buffer zone",
    },
    {
      id: 12,
      name: "Dhulikhel Mountain Retreat",
      location: "Dhulikhel, Kavre",
      price: 5800,
      originalPrice: 7200,
      rating: 4.6,
      reviews: 167,
      image:
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      amenities: [
        "Panoramic View",
        "Yoga Classes",
        "Restaurant",
        "AC",
        "Free WiFi",
      ],
      description: "Peaceful retreat with panoramic Himalayan views",
      distance: "2 km from Dhulikhel town",
    },
  ];

  const handleFilterChange = (filterType, value) => {
    if (filterType === "priceRange") {
      setFilters({ ...filters, priceRange: value });
    } else if (filterType === "rating") {
      setFilters({ ...filters, rating: value });
    } else if (filterType === "sortBy") {
      setFilters({ ...filters, sortBy: value });
    } else {
      setFilters({
        ...filters,
        amenities: {
          ...filters.amenities,
          [filterType]: !filters.amenities[filterType],
        },
      });
    }
  };

  const handleBookNow = (hotel) => {
    navigate(`/hotel-booking/${hotel.id}`, { state: { hotel } });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("NPR", "Rs.");
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

  const filteredHotels = hotels.filter((hotel) => {
    const withinPriceRange =
      hotel.price >= filters.priceRange[0] &&
      hotel.price <= filters.priceRange[1];
    const meetsRating = hotel.rating >= filters.rating;

    // Filter by amenities if any are selected
    const selectedAmenities = Object.keys(filters.amenities).filter(
      (key) => filters.amenities[key],
    );
    const meetsAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((amenity) =>
        hotel.amenities.some((hotelAmenity) =>
          hotelAmenity.toLowerCase().includes(amenity),
        ),
      );

    return withinPriceRange && meetsRating && meetsAmenities;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="hotels-page">
      {/* Hotels Header */}
      <section className="hotels-header bg-gradient-to-r from-blue-900 to-orange-500 text-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Perfect Stay in Nepal
            </h1>
            <p className="text-xl opacity-90">
              Discover amazing hotels, resorts, and lodges across Nepal's most
              beautiful destinations
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="hotels-main py-8">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="filters w-full lg:w-72 bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24 h-fit">
            <div className="filter-section flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-blue-900">Filters</h3>
              <button
                onClick={() =>
                  setFilters({
                    priceRange: [1000, 10000],
                    rating: 0,
                    amenities: {
                      wifi: false,
                      parking: false,
                      pool: false,
                      spa: false,
                      restaurant: false,
                      ac: false,
                    },
                    sortBy: "recommended",
                  })
                }
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
                  min="1000"
                  max="15000"
                  step="500"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    handleFilterChange("priceRange", [
                      filters.priceRange[0],
                      parseInt(e.target.value),
                    ])
                  }
                  className="slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Rating */}
            <div className="filter-section mb-6 pb-6 border-b border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">
                Minimum Rating
              </h4>
              <div className="rating-filter flex gap-2">
                {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleFilterChange("rating", rating)}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      filters.rating === rating
                        ? "bg-blue-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {rating}★ & up
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="filter-section mb-6 pb-6 border-b border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">Amenities</h4>
              <div className="space-y-2">
                {[
                  { id: "wifi", label: "Free WiFi", icon: "fa-wifi" },
                  { id: "parking", label: "Parking", icon: "fa-parking" },
                  {
                    id: "pool",
                    label: "Swimming Pool",
                    icon: "fa-swimming-pool",
                  },
                  { id: "spa", label: "Spa", icon: "fa-spa" },
                  {
                    id: "restaurant",
                    label: "Restaurant",
                    icon: "fa-utensils",
                  },
                  { id: "ac", label: "Air Conditioning", icon: "fa-snowflake" },
                ].map((amenity) => (
                  <label
                    key={amenity.id}
                    className="filter-checkbox flex items-center gap-3 cursor-pointer"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={filters.amenities[amenity.id]}
                        onChange={() => handleFilterChange(amenity.id)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 border rounded flex items-center justify-center ${
                          filters.amenities[amenity.id]
                            ? "bg-blue-900 border-blue-900"
                            : "border-gray-300"
                        }`}
                      >
                        {filters.amenities[amenity.id] && (
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
                    <span className="flex items-center gap-2 text-gray-700">
                      <i className={`fas ${amenity.icon} text-blue-900`}></i>
                      {amenity.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="filter-section">
              <h4 className="font-semibold text-gray-800 mb-4">Sort By</h4>
              <div className="space-y-2">
                {[
                  { id: "recommended", label: "Recommended" },
                  { id: "price-low", label: "Price: Low to High" },
                  { id: "price-high", label: "Price: High to Low" },
                  { id: "rating", label: "Top Rated" },
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

          {/* Hotels Grid */}
          <section className="results flex-1">
            <div className="results-header flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="results-count text-gray-800">
                <span className="text-lg font-medium">
                  {sortedHotels.length} Hotels Found
                </span>
                <span className="ml-4 text-gray-600">
                  {filters.priceRange[0]} - {filters.priceRange[1]} NPR per
                  night
                </span>
              </div>
              <div className="quick-filters flex flex-wrap gap-2">
                <span className="text-gray-600 text-sm">Popular:</span>
                <button className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">
                  Kathmandu
                </button>
                <button className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">
                  Pokhara
                </button>
                <button className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">
                  Luxury
                </button>
                <button className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">
                  Budget
                </button>
              </div>
            </div>

            <div className="hotels-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="hotel-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Hotel Image */}
                  <div className="relative">
                    <div className="h-48 bg-gray-300 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-orange-500/20 flex items-center justify-center">
                        <i className="fas fa-hotel text-4xl text-white/50"></i>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Best Deal
                    </div>
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      {hotel.distance}
                    </div>
                  </div>

                  {/* Hotel Info */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {hotel.name}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <i className="fas fa-map-marker-alt"></i>
                          {hotel.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {renderStars(hotel.rating)}
                          <span className="text-sm font-medium ml-1">
                            {hotel.rating}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          ({hotel.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {hotel.description}
                    </p>

                    {/* Amenities */}
                    <div className="amenities flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-900 text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{hotel.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Price & Action */}
                    <div className="flex justify-between items-center">
                      <div className="price">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-blue-900">
                            {formatPrice(hotel.price)}
                          </span>
                          <span className="text-gray-500 line-through text-sm">
                            {formatPrice(hotel.originalPrice)}
                          </span>
                          <span className="text-orange-500 font-medium text-sm">
                            Save{" "}
                            {Math.round(
                              (1 - hotel.price / hotel.originalPrice) * 100,
                            )}
                            %
                          </span>
                        </div>
                        <span className="text-gray-500 text-sm">per night</span>
                      </div>
                      <button
                        onClick={() => handleBookNow(hotel)}
                        className="btn-primary bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {sortedHotels.length > 0 && (
              <div className="text-center mt-12">
                <button className="btn-outline border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-3 rounded-lg font-semibold transition duration-300">
                  Load More Hotels
                </button>
              </div>
            )}

            {sortedHotels.length === 0 && (
              <div className="text-center py-12">
                <i className="fas fa-search text-5xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No hotels found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters to find more hotels
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Why Book With Us */}
      <section className="why-book bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Why Book Hotels With SmartNepal?
          </h2>
          <div className="benefits-grid grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="benefit-card bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
              <i className="fas fa-shield-alt text-4xl text-orange-500 mb-6"></i>
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                Best Price Guarantee
              </h3>
              <p className="text-gray-600">
                Find a lower price? We'll match it and give you 10% extra off.
              </p>
            </div>
            <div className="benefit-card bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
              <i className="fas fa-check-circle text-4xl text-orange-500 mb-6"></i>
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                Verified Reviews
              </h3>
              <p className="text-gray-600">
                All reviews are verified from real guests who stayed at the
                property.
              </p>
            </div>
            <div className="benefit-card bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
              <i className="fas fa-clock text-4xl text-orange-500 mb-6"></i>
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                Instant Confirmation
              </h3>
              <p className="text-gray-600">
                Get instant booking confirmation and e-ticket upon payment.
              </p>
            </div>
            <div className="benefit-card bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
              <i className="fas fa-headset text-4xl text-orange-500 mb-6"></i>
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Our travel experts are available 24/7 to assist with any issues.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelsPage;
