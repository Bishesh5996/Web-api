import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="user-info">
        <h2>Welcome back, {user?.name}!</h2>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Phone:</strong> {user?.phone}</p>
        <p><strong>Role:</strong> {user?.role}</p>
        <p><strong>Member since:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="success-message">
        🎉 Your Thrift Hub account is set up and ready! 
        {user?.role === 'seller' ? ' You can now start listing items for sale.' : ' You can now browse and purchase items.'}
      </div>
    </div>
  );
};

export default Dashboard;
