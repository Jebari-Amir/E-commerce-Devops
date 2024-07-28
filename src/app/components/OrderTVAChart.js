"use client";
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const OrderTVAChart = () => {
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
    labels: orderData.map(order => order.orderReferenceId),
    datasets: [
      {
        label: 'TVA',
        data: orderData.map(order => order.tva),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
      }
    ]
  };

  return (
    <div>
      <h2>TVA by Order</h2>
      <Pie data={data} />
    </div>
  );
};

export default OrderTVAChart;
