// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './context/AuthContext'; // Context for authentication
import Login from './components/Login';
import Register from './components/Register';
import AgentLogin from './components/AgentLogin';
import AgentRegister from './components/AgentRegister';
import UserHome from './components/UserHome';
import UserProperties from './components/UserProperties';
import ViewProperty from './components/ViewProperty';
import UpdateProperty from './components/UpdateProperty';
import AgentHome from './components/AgentHome';
import Navbar from './components/Navbar';  // Default Navbar
import UserNavBar from './components/UserNavBar';  // User specific Navbar
import AgentNavBar from './components/AgentNavBar'; // Agent specific Navbar
import AgentView from './components/AgentView';
import HomePage from './components/MainHome';
import AgentProfile from './components/AgentProfile';

function App() {
  const userToken = localStorage.getItem('token'); // Token for regular users
  const agentToken = localStorage.getItem('agentToken'); // Token for agents



  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* Conditionally render UserNavBar, AgentNavBar, or Navbar */}
          {userToken ? (
            <UserNavBar />
          ) : agentToken ? (
            <AgentNavBar />
          ) : (
            <Navbar />
          )}

          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={userToken ? <Navigate to="/user/home" /> : agentToken ? <Navigate to="/agent/home" /> : <HomePage/>} 
            />
            <Route 
              path="/login" 
              element={userToken ? <Navigate to="/user/home" /> : agentToken ? <Navigate to="/agent/home" /> : <Login />} 
            />
            <Route 
              path="/register" 
              element={userToken ? <Navigate to="/user/home" /> : agentToken ? <Navigate to="/agent/home" /> : <Register />} 
            />
            <Route 
              path="/agent/login" 
              element={userToken ? <Navigate to="/user/home" /> : agentToken ? <Navigate to="/agent/home" /> : <AgentLogin />} 
            />
            <Route 
              path="/agent/register" 
              element={userToken ? <Navigate to="/user/home" /> : agentToken ? <Navigate to="/agent/home" /> : <AgentRegister />} 
            />

            {/* Protected User Routes */}
            <Route path="/user/home" element={userToken ? <UserHome /> : <Navigate to="/" />} />
            <Route path="/user/properties" element={userToken ? <UserProperties /> : <Navigate to="/" />} />
            <Route path="/user/list/:id" element={userToken ? <ViewProperty /> : <Navigate to="/" />} />
            <Route path="/user/update/:id" element={userToken ? <UpdateProperty /> : <Navigate to="/" />} />

            {/* Protected Agent Routes */}
            <Route path="/agent/home" element={agentToken ? <AgentHome /> : <Navigate to="/" />} />
            <Route path="/agent/view/:id" element={agentToken ? <AgentView /> : <Navigate to="/" />} /> {/* Updated route */}
            <Route path="/agent/profile" element={agentToken ? <AgentProfile /> : <Navigate to="/" />} /> {/* Updated route */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
