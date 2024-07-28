"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Stronavigation from "../components/storenavigation";
import Footer from '../components/footer';
import HelpComponent from '../helpcomponent/page';
import Loading from '@/app/loading/loading'; 


const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedOrderIds, setExpandedOrderIds] = useState(new Set());
    const [visibleAddress, setVisibleAddress] = useState(null);
    const [orderStatuses, setOrderStatuses] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userDataJSON = localStorage.getItem('userData');
                if (!userDataJSON) {
                    setError('User is not logged in.');
                    setIsLoading(false);
                    return;
                }
                const userData = JSON.parse(userDataJSON);
                const userId = userData.user.id;

                if (!userId) {
                    setError('User ID not found.');
                    setIsLoading(false);
                    return;
                }

                const response = await axios.get(`/api/BD/order?userId=${userId}`);
                if (response.data.length === 0) {
                    setError("No orders found.");
                    setIsLoading(false);
                } else {
                    setOrders(response.data);
                    setIsLoading(false);
                }
            } catch (error) {
                setError('Failed to fetch orders');
                setIsLoading(false);
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const fetchOrderStatuses = async () => {
            const requests = orders.map(order =>
                axios.get(`/api/helloprint/orders/retrievespecificorder?requestId=${order.requestId}`)
            );
            try {
                const responses = await Promise.all(requests);
                const statuses = responses.reduce((acc, response) => {
                    const requestId = response.data.data.requestId;
                    const status = response.data.data.status;
                    if (requestId && status) {
                        acc[requestId] = status;
                    }
                    return acc;
                }, {});
                setOrderStatuses(statuses);
            } catch (error) {
                console.error('Error fetching order statuses:', error);
            }
        };
        

        fetchOrderStatuses();
    }, [orders]);


    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1800);
    
        return () => clearTimeout(timer);
      }, []);

    const toggleDetails = (id) => {
        const newSet = new Set(expandedOrderIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setExpandedOrderIds(newSet);
    };

    const toggleAddressVisibility = (orderId) => {
        setVisibleAddress(visibleAddress === orderId ? null : orderId);
    };

   

    return (
        <div className="bg-white">
                  {loading && <Loading />} 

            <Stronavigation />
            <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
                <h1>Your Orders</h1>
                {isLoading ? (
                    <p>Loading orders...</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <div key={order._id} style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr) 100px',
                                    gap: '10px',
                                    alignItems: 'center',
                                    background: '#fff',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                }}>
                                    <div>
                                        <div style={{ fontWeight: 'bold', marginBottom: '13px' }}>Commande</div>
                                        <div>#{order.orderReferenceId}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 'bold', marginBottom: '13px' }}>Date de la commande</div>
                                        <div>{new Date(order.DateCommande).toLocaleDateString()}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 'bold', marginBottom: '13px' }}>Statut</div>
                                        <div>{orderStatuses[order.requestId]}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 'bold', marginBottom: '13px' }}>Total</div>
                                        <div>{order.totalttc.toFixed(2)} €</div>
                                    </div>
                                    <button onClick={() => toggleDetails(order._id)} style={{
                                        backgroundColor: 'white',
                                        color: 'black',
                                        border: '1px solid #ccc',
                                        borderRadius: '5px',
                                        padding: '10px 20px',
                                        cursor: 'pointer'
                                    }}>Détails</button>
                                    {expandedOrderIds.has(order._id) && (
                                        <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                                            <hr />
                                            <br />
                                            {order.items.map((item, index) => (
                                                <div key={index} style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'auto auto auto',
                                                    gap: '20px',
                                                    alignItems: 'center',
                                                    marginBottom: '10px'
                                                }}>
                                                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                                                    <div>
                                                        <strong>Produit</strong>
                                                        <p style={{ margin: '0' }}>{item.name}</p>
                                                    </div>
                                                    <div>
                                                        <strong>Quantité</strong>
                                                        <p style={{ margin: '0' }}>{item.quantity}</p>
                                                    </div>
                                                    <div>
                                                        <strong>Date De Livraison</strong>
                                                        <p style={{ margin: '0', marginBottom: '13px' }}>{item.selectedDate}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            <button style={{ gridRowStart: 2 }} onClick={() => toggleAddressVisibility(order._id)}>Adresse de livraison</button>
                                            {visibleAddress === order._id && (
                                                <div style={{ gridColumn: '1 / -1' }}>
                                                    <p>{order.shipping[0].street}, {order.shipping[0].city}, {order.shipping[0].postalCode}, {order.shipping[0].country}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            // Render an empty state or a placeholder for orders
                            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#777' }}>
                                <p>No orders available to display.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <HelpComponent />
            <Footer />
        </div>
    );
};

export default OrdersPage;
