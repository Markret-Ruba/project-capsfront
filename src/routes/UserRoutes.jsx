// src/routes/UserRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';


 // User specific navbar
import UserView from '../components/UserView';
import UserProperties from './../components/UserProperties';
import UserHome from './../components/UserHome';
import UserNavBar from '../components/UserNavBar';

const UserRoutes = () => {
  return (
    <>
      <UserNavBar /> {/* Navbar for User */}
      <Routes>
        <Route path="/user/home" element={<UserHome />} />
  
        <Route path="/user/properties" element={<UserProperties />} />
        {/* Add more user routes as needed */}
      </Routes>
    </>
  );
};

export default UserRoutes;
