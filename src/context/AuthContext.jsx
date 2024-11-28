










import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [agent, setAgent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://project-capsback-3.onrender.com';

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      setUser(response.data.user);
      setIsAuthenticated(true);
      console.log('token ', response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const register = async (details) => {
    try {
      const response = await axios.post(`${API_URL}/register`, details);
      setUser(response.data.user);
      setIsAuthenticated(true);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${API_URL}/api/auth/check-auth`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setUser(response.data.user);
          setIsAuthenticated(true);
        
        })
        .catch((error) => {
          console.error('Auth check failed:', error);
        });
    }
    setLoading(false);
  }, []);







  // useEffect(() => {
  //   const token = localStorage.getItem('agentToken');
  //   if (token) {
  //     axios.get(`${API_URL}/api/agentAuth/check-auth`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //       .then((response) => {
  //         setAgent(response.data.user);
  //         setIsAuthenticated(true);
  //         console.log(response.data.user)
  //       })
  //       .catch((error) => {
  //         console.error('Auth check failed:', error);
  //       });
  //   }
  //   setLoading(false);
  // }, []);










  return (
    <AuthContext.Provider value={{ user,agent, isAuthenticated, login, register, logout, loading, API_URL }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
