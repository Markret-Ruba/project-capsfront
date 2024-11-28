// src/pages/ManagePropertiesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ManagePropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem('agentToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.get('/api/properties', config);
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('agentToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      await axios.delete(`/api/property/${id}`, config);
      setProperties(properties.filter(property => property._id !== id));
      alert('Property deleted successfully!');
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleEdit = (id) => {
    history.push(`/edit-property/${id}`);
  };

  return (
    <div>
      <h2>Your Properties</h2>
      <ul>
        {properties.map((property) => (
          <li key={property._id}>
            <div>
              <p>{property.propertyName}</p>
              <button onClick={() => handleEdit(property._id)}>Edit</button>
              <button onClick={() => handleDelete(property._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePropertiesPage;
