"use client";
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OrderChart = () => {
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
    labels: orderData.map(order => new Date(order.DateCommande).toLocaleDateString()),
    datasets: [
      {
        label: 'Total TTC',
        data: orderData.map(order => order.totalttc),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Total HT',
        data: orderData.map(order => order.totalht),
        fill: false,
        borderColor: '#d50000',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h2>Orders Chart</h2>
      <Line data={data} />
    </div>
  );
};

export default OrderChart;
