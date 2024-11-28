import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Search,
  Home,
  Car,
  Sofa,
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal,
  XCircle,
  ArrowUpDown,
  Tag,
  MapPin,
  DollarSign,
  Clock
} from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'createdAt_desc', label: 'Latest', icon: Clock },
  { value: 'createdAt_asc', label: 'Oldest', icon: Clock },
  { value: 'discountPrice_desc', label: 'Price High to Low', icon: ArrowUpDown },
  { value: 'discountPrice_asc', label: 'Price Low to High', icon: ArrowUpDown },
];

const AgentHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    sort: 'createdAt',
    order: 'desc',
    unsold: 'true',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const [currentSlides, setCurrentSlides] = useState({});

  // Debounce function to prevent too many API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    let newSidebarData = { ...sidebardata };

    if (id === 'sort_order') {
      const [sortField, sortOrder] = value.split('_');
      newSidebarData = {
        ...newSidebarData,
        sort: sortField,
        order: sortOrder
      };
    } else {
      newSidebarData = {
        ...newSidebarData,
        [id]: type === 'checkbox' ? checked : value,
        type: type === 'radio' ? value : newSidebarData.type,
      };
    }

    setSidebardata(newSidebarData);

    // Update URL and fetch results
    const urlParams = new URLSearchParams(newSidebarData);
    navigate(`/agent/home?${urlParams.toString()}`);
  };

  // Debounced version of handleChange for search input
  const debouncedHandleChange = debounce(handleChange, 500);

  const fetchListings = async (query) => {
    setLoading(true);
    setShowMore(false);
    setError(null);
    
      const token = localStorage.getItem('token');
      await axios.get('https://project-capsback-3.onrender.com/listings/get?' + query, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        console.log(res);
        if (!res.data==200) throw new Error('Network response was not ok');
        const data = res.data;
        setShowMore(data.length > 8);
        setListings(data);
      }).catch(error => {
        setError('Error fetching listings, please try again.');
      })
      setLoading(false);
    
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    fetchListings(urlParams.toString());
  }, [location.search]);

  const handleSlide = (propertyId, direction) => {
    setCurrentSlides(prev => ({
      ...prev,
      [propertyId]: direction === 'next'
        ? ((prev[propertyId] || 0) + 1) % listings.find(l => l._id === propertyId).imageUrls.length
        : ((prev[propertyId] || 0) - 1 + listings.find(l => l._id === propertyId).imageUrls.length) % listings.find(l => l._id === propertyId).imageUrls.length
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <SlidersHorizontal size={20} />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-6">
                {/* Search Input */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Search Properties</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="searchTerm"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search..."
                      value={sidebardata.searchTerm}
                      onChange={(e) => debouncedHandleChange(e)}
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Property Type</label>
                  <div className="mt-2 space-y-2">
                    {['all', 'rent', 'sale'].map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="radio"
                          id={`type_${type}`}
                          name="type"
                          value={type}
                          checked={sidebardata.type === type}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`type_${type}`} className="ml-2 capitalize text-gray-700">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checkboxes */}
                {['parking', 'furnished', 'unsold'].map((field) => (
                  <div key={field}>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        id={field}
                        checked={sidebardata[field]}
                        onChange={handleChange}
                        className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-gray-700 capitalize">{field}</span>
                    </label>
                  </div>
                ))}

                {/* Sort Options */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Sort By</label>
                  <select
                    id="sort_order"
                    onChange={handleChange}
                    value={`${sidebardata.sort}_${sidebardata.order}`}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="flex-1">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
                {error}
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="animate-pulse bg-white rounded-lg shadow-md">
                    <div className="h-48 bg-gray-200 rounded-t-lg" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((property) => (
                  <div
                    key={property._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Image Carousel */}
                    <div className="relative h-48">
                      {property.imageUrls.length > 0 ? (
                        <>
                          <img
                            src={`https://project-capsback-3.onrender.com/uploads/${property.imageUrls[currentSlides[property._id] || 0]}`}
                            alt={property.name}
                            className="w-full h-full object-cover"
                          />
                          {property.imageUrls.length > 1 && (
                            <>
                              <button
                                onClick={() => handleSlide(property._id, 'prev')}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70"
                              >
                                <ChevronLeft size={20} />
                              </button>
                              <button
                                onClick={() => handleSlide(property._id, 'next')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70"
                              >
                                <ChevronRight size={20} />
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <Home size={32} className="text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {property.name}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Tag size={14} className="mr-1" />
                          {property.type}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-500">
                        <MapPin size={16} className="mr-1" />
                        <p className="text-sm truncate">{property.address}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-green-600 font-semibold">
                          Rs.
                          {property.discountPrice}
                        </div>
                        <button
                          onClick={() => navigate(`/agent/view/${property._id}`)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    const startIndex = listings.length;
                    const urlParams = new URLSearchParams({ ...sidebardata, startIndex });
                    fetchListings(urlParams.toString());
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentHome;