"use client";
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrderShippingChart = () => {
  const [orderData, setOrderData] = useState([]);

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
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const data = {
    labels: orderData.map(order => order.shipping[0].city),
    datasets: [
      {
        label: 'Frais de port',
        data: orderData.map(order => order.fraisport),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ]
  };

  return (
    <div>
      <h2>Shipping Costs by City</h2>
      <Bar data={data} />
    </div>
  );
};

export default OrderShippingChart;
