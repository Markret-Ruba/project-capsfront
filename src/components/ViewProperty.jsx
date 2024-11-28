import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { 
  Home,
  Bed,
  Bath,
  Car,
  Sofa,
  DollarSign,
  MapPin,
  Info,
  Tag,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Custom arrow components for the slider
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
  >
    <ChevronLeft className="w-6 h-6 text-gray-800" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
  >
    <ChevronRight className="w-6 h-6 text-gray-800" />
  </button>
);

const ViewProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://project-capsback-3.onrender.com/listings/view/${id}`);
        setProperty(response.data);
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('Failed to load property details. Please try again later.');
      }
    };

    fetchProperty();
  }, [id]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    customPaging: (i) => (
      <div className="w-2 h-2 mx-1 rounded-full bg-white/50 hover:bg-white/80 transition-all" />
    ),
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
            <Home className="w-16 h-16 text-gray-400" />
          </div>
          <p className="mt-4 text-gray-500 text-center">Loading property details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Image Gallery */}
        <div className="relative">
          {property.imageUrls && property.imageUrls.length > 0 ? (
            <div className="aspect-video">
              <Slider {...sliderSettings}>
                {property.imageUrls.map((url, index) => (
                  <div key={index} className="outline-none">
                    <div className="aspect-video relative">
                      <img
                        src={`https://project-capsback-3.onrender.com/uploads/${url}`}
                        alt={`Property ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <Home className="w-20 h-20 text-gray-400" />
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {property.name || 'No Name Available'}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="text-gray-700">{property.address || 'No address available'}</span>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Home className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="text-gray-700">{property.type || 'No type available'}</span>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <DollarSign className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="text-gray-700">
                  Rs.{property.offer ? property.discountPrice : property.regularPrice}
                  {property.offer && (
                    <span className="ml-2 text-sm text-green-600">
                      (Discounted)
                    </span>
                  )}
                </span>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Bed className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="text-gray-700">{property.bedrooms || 'N/A'} Bedrooms</span>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Bath className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="text-gray-700">{property.bathrooms || 'N/A'} Bathrooms</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="text-gray-700">
                  Status: {' '}
                  <span className={property.sold ? 'text-red-500' : 'text-green-500'}>
                    {property.sold ? 'Sold' : 'Available'}
                  </span>
                </span>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Car className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="text-gray-700">
                  Parking: {property.parking ? 'Available' : 'Not Available'}
                </span>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Sofa className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="text-gray-700">
                  Furnished: {property.furnished ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <div className="flex items-center space-x-3 mb-4">
              <Info className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">Description</h2>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                {property.description || 'No description available'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProperty;