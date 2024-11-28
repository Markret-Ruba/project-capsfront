import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AlertCircle, Home, Image, DollarSign, Bed, Bath, Car, Check, X, Mail } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PropertyViewUpdate = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('details');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const [property, setProperty] = useState({
    name: '',
    description: '',
    address: '',
    type: '',
    email: '',
    bedrooms: 0,
    bathrooms: 0,
    regularPrice: 0,
    discountPrice: 0,
    sold: false,
    parking: false,
    furnished: false,
    imageUrls: []
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`mongodb+srv://markretruba234:Amma234@cluster0.8favv.mongodb.net/listings/view/${id}`);
      setProperty(response.data);
    } catch (err) {
      setError('Failed to load property details.');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!property.name.trim()) {
      errors.name = 'Property name is required';
    }
    
    if (!property.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(property.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!property.address.trim()) {
      errors.address = 'Address is required';
    }

    if (!property.type.trim()) {
      errors.type = 'Property type is required';
    }

    if (property.regularPrice <= 0) {
      errors.regularPrice = 'Regular price must be greater than 0';
    }

    if (property.discountPrice >= property.regularPrice) {
      errors.discountPrice = 'Discount price must be less than regular price';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (name, value) => {
    setProperty(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleImageSelection = (e) => {
    setSelectedImages(Array.from(e.target.files));
  };

  const handleDeleteImage = (url) => {
    setImagesToDelete(prev => [...prev, url]);
    setProperty(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter(imgUrl => imgUrl !== url)
    }));
  };

  const handleSave = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      // Update property details
      await axios.put(`mongodb+srv://markretruba234:Amma234@cluster0.8favv.mongodb.net/listings/update/${id}`, property);

      // Update images if there are changes
      if (selectedImages.length > 0 || imagesToDelete.length > 0) {
        const formData = new FormData();
        selectedImages.forEach(image => {
          formData.append('images', image);
        });
        formData.append('imagesToDelete', JSON.stringify(imagesToDelete));

        await axios.put(`mongodb+srv://markretruba234:Amma234@cluster0.8favv.mongodb.net/listings/update/images/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      // Show success message
      alert('Property updated successfully!');
      fetchProperty();
    } catch (err) {
      if (err.response?.data?.message?.includes('email')) {
        setValidationErrors(prev => ({
          ...prev,
          email: 'Email is required'
        }));
      } else {
        setError('Failed to update property. Please try again.');
      }
    }
  };

  const PropertyField = ({ icon: Icon, label, value, onChange, type = "text", error }) => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Icon className="w-4 h-4" />
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );

  const ToggleField = ({ icon: Icon, label, value, onChange }) => (
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Icon className="w-4 h-4" />
        {label}
      </label>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          value ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500 flex items-center gap-2">
        <AlertCircle className="w-5 h-5" />
        {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Property Details
          </h2>

          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              {['details', 'images'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 text-center text-sm font-medium ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'details' ? (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <PropertyField
                  icon={Home}
                  label="Property Name"
                  value={property.name}
                  onChange={(value) => handleInputChange('name', value)}
                  error={validationErrors.name}
                />
                <PropertyField
                  icon={Home}
                  label="Property Type"
                  value={property.type}
                  onChange={(value) => handleInputChange('type', value)}
                  error={validationErrors.type}
                />
              </div>

              <PropertyField
                icon={Mail}
                label="Contact Email"
                value={property.email}
                onChange={(value) => handleInputChange('email', value)}
                type="email"
                error={validationErrors.email}
              />

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <AlertCircle className="w-4 h-4" />
                  Description
                </label>
                <textarea
                  value={property.description}
                  onChange={e => handleInputChange('description', e.target.value)}
                  className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <PropertyField
                icon={Home}
                label="Address"
                value={property.address}
                onChange={(value) => handleInputChange('address', value)}
                error={validationErrors.address}
              />

              <div className="border-t border-gray-200 my-6" />

              <div className="grid gap-6 md:grid-cols-2">
                <PropertyField
                  icon={Bed}
                  label="Bedrooms"
                  value={property.bedrooms}
                  onChange={(value) => handleInputChange('bedrooms', value)}
                  type="number"
                />
                <PropertyField
                  icon={Bath}
                  label="Bathrooms"
                  value={property.bathrooms}
                  onChange={(value) => handleInputChange('bathrooms', value)}
                  type="number"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <PropertyField
                  icon={DollarSign}
                  label="Regular Price"
                  value={property.regularPrice}
                  onChange={(value) => handleInputChange('regularPrice', value)}
                  type="number"
                  error={validationErrors.regularPrice}
                />
                <PropertyField
                  icon={DollarSign}
                  label="Discount Price"
                  value={property.discountPrice}
                  onChange={(value) => handleInputChange('discountPrice', value)}
                  type="number"
                  error={validationErrors.discountPrice}
                />
              </div>

              <div className="border-t border-gray-200 my-6" />

              <div className="space-y-4">
                <ToggleField
                  icon={Check}
                  label="Sold"
                  value={property.sold}
                  onChange={(value) => handleInputChange('sold', value)}
                />
                <ToggleField
                  icon={Car}
                  label="Parking Available"
                  value={property.parking}
                  onChange={(value) => handleInputChange('parking', value)}
                />
                <ToggleField
                  icon={Home}
                  label="Furnished"
                  value={property.furnished}
                  onChange={(value) => handleInputChange('furnished', value)}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {property.imageUrls.length > 0 && (
                <div className="mb-6">
                  <Slider {...sliderSettings}>
                    {property.imageUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={`https://project-capsback-3.onrender.com/uploads/${url}`}
                          alt={`Property ${index + 1}`}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => handleDeleteImage(url)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </Slider>
                </div>
              )}
              
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Image className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="text-sm text-gray-500">Click to upload images</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelection}
                  />
                </label>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyViewUpdate;