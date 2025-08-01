import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import Profile from './pages/Profile';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { TaskManagerProvider } from './context/task-manager-context';

function App() {
  return (
    <div>
      <TaskManagerProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProtectedRoute>
            <Profile />
          </ProtectedRoute>
          } />
        </Routes>
      </TaskManagerProvider>
    </div>

  );


}

export default App;
