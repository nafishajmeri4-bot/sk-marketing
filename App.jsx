import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import BranchDashboard from './pages/BranchDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NewComplaint from './pages/NewComplaint';
import Billing from './pages/Billing';
import AllComplaints from './pages/AllComplaints';
import BanksBranches from './pages/BanksBranches';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => setUser(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={login} />} />

        {/* Branch Routes */}
        <Route
          path="/branch"
          element={user?.role === 'branch' ? <BranchDashboard user={user} onLogout={logout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/branch/new-complaint"
          element={user?.role === 'branch' ? <NewComplaint user={user} onLogout={logout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/branch/billing"
          element={user?.role === 'branch' ? <Billing user={user} onLogout={logout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/branch/history"
          element={user?.role === 'branch' ? <BranchDashboard user={user} onLogout={logout} /> : <Navigate to="/login" />}
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={user?.role === 'admin' ? <AdminDashboard user={user} onLogout={logout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/complaints"
          element={user?.role === 'admin' ? <AllComplaints user={user} onLogout={logout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/branches"
          element={user?.role === 'admin' ? <BanksBranches user={user} onLogout={logout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/billing"
          element={user?.role === 'admin' ? <Billing user={user} onLogout={logout} /> : <Navigate to="/login" />}
        />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
