import React, { useState, useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {
  Home,
  BedDouble,
  Bath,
  Car,
  Sofa,
  DollarSign,
  Building2,
  MapPin,
  ImagePlus,
  X,
  FileText
} from 'lucide-react';

export default function UserHome() {
  const { user } = useContext(AuthContext);
  console.log(user)





  useEffect(() => {
    console.log(user)
  }, [user]);

  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'sale',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    sold: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [loading, setLoading] = useState(false);

  // ... (keeping all the handlers the same)
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log('selectedFiles:',selectedFiles);
    if (selectedFiles.length + formData.imageUrls.length > 6) {
      setImageUploadError('You can only upload 6 images.');
      return;
    }
    setImageUploadError(false);
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    console.log('imageUrls:',imageUrls);
    setFiles(selectedFiles);
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.concat(imageUrls),
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else if (id === 'sale' || id === 'rent') {
      setFormData((prev) => ({ ...prev, type: id }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Handling form submission...');
    
    // if (!files || files.length === 0) {
    //   console.log('No files uploaded');
    //   alert('You must upload at least one image.');
    //   return;
    // }
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('userId', user.id);
      console.log('user.id:', user.id);
      
      Object.keys(formData).forEach(key => {
        if (key !== 'imageUrls') {
          console.log(`Appending ${key}: ${formData[key]}`);
          formDataToSend.append(key, formData[key]);
        }
      });
      
      files.forEach((file) => {
        console.log('Appending file:', file);
        formDataToSend.append('images', file);
      });
      
      setLoading(true);
      console.log('Sending request to create listing...');
      const token = localStorage.getItem('token');
      console.log('token:',token);
      const response = await axios.post('https://project-capsback-3.onrender.com/listingsnew/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
         'Authorization': `Bearer ${token}`
        },
      });
      
      console.log('Listing created successfully:', response.data);
      alert('Listing created successfully');
      navigate('/user/properties');
    } catch (error) {
      console.error('Error creating listing:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server response:', error.response.data);
        alert(`Failed to create listing: ${error.response.data?.message || 'Unknown server error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        alert('Failed to create listing: No response from the server');
      } else {
        // Something else happened while setting up the request
        alert('Failed to create listing: An unexpected error occurred');
      }
    }}


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8 space-x-3">
          <Building2 className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Create a Listing</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow-xl rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Property Name
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter the property name"
                    id="name"
                    maxLength="62"
                    minLength="10"
                    required
                    onChange={handleChange}
                    value={formData.name}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    placeholder="Describe the property"
                    id="description"
                    required
                    onChange={handleChange}
                    value={formData.description}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Property Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter the full address"
                    id="address"
                    required
                    onChange={handleChange}
                    value={formData.address}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Listing Type
                </label>
                <div className="flex items-center justify-center space-x-6 p-4 bg-gray-50 rounded-lg">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      id="sale"
                      onChange={handleChange}
                      checked={formData.type === 'sale'}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700 font-medium">Sale</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      id="rent"
                      onChange={handleChange}
                      checked={formData.type === 'rent'}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700 font-medium">Rent</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                    Bedrooms
                  </label>
                  <div className="relative">
                    <BedDouble className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      placeholder="Number of bedrooms"
                      id="bedrooms"
                      min="1"
                      required
                      onChange={handleChange}
                      value={formData.bedrooms}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                    Bathrooms
                  </label>
                  <div className="relative">
                    <Bath className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      placeholder="Number of bathrooms"
                      id="bathrooms"
                      min="1"
                      required
                      onChange={handleChange}
                      value={formData.bathrooms}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="regularPrice" className="block text-sm font-medium text-gray-700">
                    Regular Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 w-5 h-5 text-gray-400">Rs.</span> 
                    <input
                      type="number"
                      placeholder="Enter regular price"
                      id="regularPrice"
                      required
                      onChange={handleChange}
                      value={formData.regularPrice}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700">
                    Discount Price
                  </label>
                  <div className="relative">
                  <span className="absolute left-3 top-2 w-5 h-5 text-gray-400">Rs.</span> 
                    <input
                      type="number"
                      placeholder="Enter discount price"
                      id="discountPrice"
                      onChange={handleChange}
                      value={formData.discountPrice}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                  Property Images
                </label>
                <div className="relative">
                  <div className="flex items-center space-x-2 mb-2">
                    <ImagePlus className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Upload Images (Max 6)</span>
                  </div>
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {imageUploadError && (
                    <p className="text-red-500 text-sm mt-1">{imageUploadError}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {formData.imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt="listing preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Features
                </label>
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors">
                    <input
                      type="checkbox"
                      id="parking"
                      onChange={handleChange}
                      checked={formData.parking}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <Car className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Parking Available</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors">
                    <input
                      type="checkbox"
                      id="furnished"
                      onChange={handleChange}
                      checked={formData.furnished}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <Sofa className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Furnished</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto font-medium transition-colors"
            >
              {loading ? 'Creating Listing...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}