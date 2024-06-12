// src/components/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2>Welcome to your Dashboard</h2>
        <p>You have successfully logged in/registered!</p>
        <nav>
          <ul>
            <li><Link to="/register">Register Another User</Link></li>
            <li><Link to="/login">Login Another User</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Dashboard;




