import React, { useEffect, useState } from 'react';
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
  Mail,
  DollarSign,
  MapPin,
  Info,
  Tag,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors"
  >
    <ChevronLeft className="w-6 h-6" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors"
  >
    <ChevronRight className="w-6 h-6" />
  </button>
);

const PropertyView = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`https://project-capsback-3.onrender.com/listings/view/${id}`);
        const data = await response.json();
        setProperty(data);
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
      <div className="w-2 h-2 mx-1 rounded-full bg-white/50 hover:bg-white transition-all" />
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Image Gallery */}
        <div className="relative h-[400px]">
          {property.imageUrls && property.imageUrls.length > 0 ? (
            <Slider {...sliderSettings}>
              {property.imageUrls.map((url, index) => (
                <div key={index} className="outline-none h-[400px]">
                  <img
                    src={`https://project-capsback-3.onrender.com/uploads/${url}`}
                    alt={`Property ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-400">
              <Home size={48} />
              <p className="mt-2">No images available</p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {property.name || 'No Name Available'}
            </h1>
            <div className="flex items-center text-gray-600">
              <MapPin size={18} className="mr-2 flex-shrink-0" />
              <p className="line-clamp-2">{property.address || 'No address available'}</p>
            </div>
          </div>

          {/* Price Tag */}
          <div className="inline-block bg-blue-100 rounded-lg px-4 py-2">
            <div className="flex items-center text-red-800 font-bold text-xl">
             
              <span className='line-through'>Rs.{property.offer ? property.discountPrice : property.regularPrice}</span>
              {property.offer && (
                <span className="ml-2 text-sm text-red-600 line-through">
                  Rs.{property.regularPrice}
                </span>
              )}
            </div>
          </div>
<div></div>
          <div className="inline-block bg-blue-100 rounded-lg px-4 py-2">
            <div className="flex items-center text-green-800 font-bold text-xl">
             
              <span>Rs.{property.offer ? property.discountPrice : property.discountPrice}</span>
              {property.offer && (
                <span className="ml-2 text-sm text-green-600 line-through">
                  Rs.{property.discountPrice}
                </span>
              )}
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Bed size={20} />, text: `${property.bedrooms || '0'} Beds` },
              { icon: <Bath size={20} />, text: `${property.bathrooms || '0'} Baths` },
              { icon: <Car size={20} />, text: property.parking ? 'Parking' : 'No Parking' },
              { icon: <Sofa size={20} />, text: property.furnished ? 'Furnished' : 'Unfurnished' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg text-gray-600">
                {feature.icon}
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Status Tags */}
          <div className="flex flex-wrap gap-2">
            <div className={`flex items-center px-3 py-1 rounded-full ${
              property.sold ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {property.sold ? (
                <>
                  <XCircle size={16} className="mr-1" />
                  <span>Sold</span>
                </>
              ) : (
                <>
                  <CheckCircle size={16} className="mr-1" />
                  <span>Available</span>
                </>
              )}
            </div>
            <div className="flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800">
              <Tag size={16} className="mr-1" />
              <span>{property.type || 'Not Specified'}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center text-gray-900 font-semibold">
              <Info size={20} className="mr-2" />
              <h2>Description</h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 leading-relaxed">
                {property.description || 'No description available'}
              </p>
            </div>
          </div>

          {/* Contact */}
          {property.email && (
            <div className="mt-6">
              <a
                href={`mailto:${property.email}`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail size={18} className="mr-2" />
                Contact Agent
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyView;