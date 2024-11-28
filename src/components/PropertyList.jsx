// src/components/PropertyList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProperties, deleteProperty } from '../actions/propertyActions';

const PropertyList = () => {
  const dispatch = useDispatch();
  const properties = useSelector(state => state.properties);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProperty(id));
  };

  return (
    <div className="property-list">
      <h2>Properties</h2>
      <ul>
        {properties.map(property => (
          <li key={property._id}>
            {property.title} - {property.status}
            <button onClick={() => handleDelete(property._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
