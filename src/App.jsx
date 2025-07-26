import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import EditPropertyPage from './pages/EditPropertyPage.jsx';
// Import Pages
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CreatePropertyPage from './pages/CreatePropertyPage.jsx';
import PropertyDetailsPage from './pages/PropertyDetailsPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> {/* This line is now fixed */}
          <Route path="/property/:id" element={<PropertyDetailsPage />} />

          {/* Protected Routes */}
          <Route
            path="/create-property"
            element={
              <ProtectedRoute>
                <CreatePropertyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
  path="/edit-property/:id"
  element={
    <ProtectedRoute>
      <EditPropertyPage />
    </ProtectedRoute>
  }
/>
        </Routes>
      </main>
    </Router>
  );
}

export default App;