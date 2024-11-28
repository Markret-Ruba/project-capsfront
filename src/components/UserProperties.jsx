import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import UserNavBar from './UserNavBar';
import { AuthContext } from '../context/AuthContext';

const UserProperties = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  const userId = user.id;
  console.log(userId)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`https://project-capsback-3.onrender.com/listings/user/${userId}`);
        setListings(response.data);
      } catch (err) {
        console.error('Error fetching listings:', err);
        setError('Failed to load properties. Please try again later.');
      }
    };
    fetchListings();
  }, [userId]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const handleDelete = async (listingId) => {
    try {
      await axios.delete(`https://project-capsback-3.onrender.com/listings/delete/${listingId}`);
      setListings(listings.filter((listing) => listing._id !== listingId));
    } catch (err) {
      console.error('Error deleting listing:', err);
      setError('Failed to delete property.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">User Properties</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-xs mx-auto">
              {listing.imageUrls && listing.imageUrls.length > 0 ? (
                <div className="h-40">
                  <Slider {...sliderSettings}>
                    {listing.imageUrls.map((imageUrl, index) => (
                      <div key={index} className="h-40">
                        <img
                          src={`https://project-capsback-3.onrender.com/uploads/${imageUrl}`}
                          alt={`${listing.name} image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              ) : (
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">{listing.name}</h2>
                <p className="text-gray-600 mt-2 text-sm truncate">Address: {listing.address}</p>
                <p className="text-gray-600 mt-2 text-sm">Regular Price: Rs.{listing.regularPrice}</p>
                <p className="text-gray-600 mt-2 text-sm">Offer Price: Rs.{listing.discountPrice}</p>

                <p className="text-gray-600 mt-2 text-sm">Type: {listing.type}</p>

                <div className="flex justify-between mt-4">
                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 text-sm transition duration-200"
                    onClick={() => (window.location.href = `/user/list/${listing._id}`)}
                  >
                    View
                  </button>
                  <button
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 text-sm transition duration-200"
                    onClick={() => (window.location.href = `/user/update/${listing._id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-sm transition duration-200"
                    onClick={() => handleDelete(listing._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No properties found.</p>
      )}
    </div>
  );
};

export default UserProperties;
