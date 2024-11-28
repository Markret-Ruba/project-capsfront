// src/pages/CreateProperty.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateProperty = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    description: '',
    price: '',
    location: '',
    imageUrl: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('agentToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      await axios.post('/api/property', formData, config);
      alert('Property registered successfully!');
      history.push('/manage-properties');
    } catch (error) {
      console.error('Error registering property:', error);
    }
  };

  return (
    <div>
      <h2>Register Property</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="propertyName" value={formData.propertyName} onChange={handleChange} placeholder="Property Name" />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CreateProperty;
