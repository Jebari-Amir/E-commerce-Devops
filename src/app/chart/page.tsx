"use client";
import React, { useEffect, useState } from 'react';
import OrderChart from '../components/OrderChart';
import OrderShippingChart from '../components/OrderShippingChart';
import OrderTVAChart from '../components/OrderTVAChart';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [orderData, setOrderData] = useState([]);
  const [totalTTC, setTotalTTC] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = localStorage.getItem('userData');
        const userId = userData ? JSON.parse(userData).user.id : null;

        if (!userId) {
          console.error('No user ID found');
          return;
        }

        const response = await axios.get(`/api/BD/order?userId=${userId}`);

        if (response.data && Array.isArray(response.data)) {
          setOrderData(response.data);

          // Calculate the total TTC
          const total = response.data.reduce((sum, order) => sum + order.totalttc, 0);
          setTotalTTC(total);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="summary-card">
        <h3>Total TTC</h3>
        <p>${totalTTC.toFixed(2)}</p>
      </div>
      <div className="summary-card">
        <h3>Expenses</h3>
        <p>$235,312</p>
      </div>
      <div className="summary-card">
        <h3>Profits</h3>
        <p>$135,965</p>
      </div>
      <div className="chart-container">
        <OrderChart />
      </div>
      <div className="chart-container">
        <OrderShippingChart />
      </div>
      <div className="chart-container">
        <OrderTVAChart />
      </div>
    </div>
  );
};

export default Dashboard;
