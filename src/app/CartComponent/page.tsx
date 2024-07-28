"use client"
import React, { useState, useEffect } from 'react';
import Stronavigation from "../components/storenavigation";
import Footer from '../components/footer';
import { CartProvider } from '../CartContext/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, } from '@fortawesome/free-solid-svg-icons';
import {  faCcMastercard } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import "./style.css";
import HelpComponent from '../helpcomponent/page';


const DisplayCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalHT, setTotalHT] = useState(0);
    const [totalTTC, setTotalTTC] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [user, setUser] = useState(null);


    useEffect(() => {
        loadCartFromLocalStorage();
    }, []);

    useEffect(() => {
        if (cartItems.length > 0) {
            fetchQuotesForCartItems();
        }
    }, [cartItems]);  

    const loadCartFromLocalStorage = () => {
        try {
            const savedCart = localStorage.getItem("pannier");
            if (savedCart) {
                const loadedCart = JSON.parse(savedCart);
                setCartItems(loadedCart.map(item => {
                    return {
                        ...item,
                        image: item.customDesign || item.image // Utiliser le design personnalisé s'il est disponible
                    };
                }));
            } else {
                console.log("Aucun article dans le panier.");
            }
        } catch (error) {
            console.error("Erreur lors de la lecture du panier dans localStorage:", error);
        }
    };


    const deleteItem = (index :any) => {
        const newCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(newCartItems);
        localStorage.setItem("pannier", JSON.stringify(newCartItems));
        calculateSummary(newCartItems);  // Recalculer le résumé après la suppression
        window.location.href = '/CartComponent';

    };







    const fetchQuotesForCartItems = async () => {
        const updatedCartItems = await Promise.all(cartItems.map(async (item) => {
            const response = await fetch('/api/helloprint/quote', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({items: [{variantKey: item.variantKey, quantity: item.quantity, serviceLevel: 'standard'}]})
            });
            const data = await response.json();
            if (response.ok) {
                return {...item, price: data.data.costSummary.items.centAmountTotal / 100};
            } else {
                console.error('Failed to fetch quote:', data.error);
                return item;  // Retourner l'élément inchangé en cas d'erreur
            }
        }));
        setCartItems(updatedCartItems);
        calculateSummary(updatedCartItems);
    };
    

    const calculateSummary = (items) => {
        let total = 0;
        let taxAmount = 0;
        items.forEach(item => {
            total += parseFloat(item.price);
            taxAmount += (parseFloat(item.price) * 0.20); // Supposons que la TVA est de 20%
        });
        const shipping = total > 100 ? 0 : 2.99;  // Frais de port gratuits pour les commandes de plus de 100 euros
        setTotalHT(total);
        setTaxes(taxAmount);
        setShippingCost(shipping);
        setTotalTTC(total + taxAmount + shipping);
    };









    const cardStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        margin: '10px 0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    };

    const detailStyle = {
        flex: 1,
        margin: '0 20px'
    };

    const imageStyle = {
        width: '120px',
        height: '120px'
    };

    const priceStyle = {
        fontWeight: 'bold',
        fontSize: '24px',
        color: 'green'
    };


    const emptyCartStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
        marginTop: '30px'
    };
    
    const emptyCartMessageStyle = {
        color: '#003366',
        fontSize: '24px',
        marginBottom: '10px'
    };
    
    const emptyCartLinkStyle = {
        color: '#0066cc',
        textDecoration: 'none'
    };
    


    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get('/api/users/me');
            console.log('User Data:', response.data);
            console.log('firstName Data:', response.data.data.username);

            if (response.data && response.data.data) {
              setUser(response.data.data);
            }
          } catch (error) {
            console.log('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);

    
    // console.log("Rendering with quoteData:", quoteData);






    const continueOrder = async () => {
        try {
            if (!user) {
                alert('User information is not available. Please log in.');
                return;
            }
    
            if (cartItems.length === 0) {
                alert("No items in the cart to order.");
                return;
            }
    
            const items = cartItems.map(item => ({
                variantKey: item.variantKey,
                quantity: item.quantity,
                name: item.name,
                image: item.image,
                selectedDate: item.selectedDate,
            }));
    
            console.log("Order items:", items);
    
            const orderReferenceId = `ORD-${new Date().getTime()}`;
    
            const orderDetails = {
                orderReferenceId,
                items,
                totalHT,
                taxes,
                shippingCost,
                totalTTC,
                street: user.street,
                addressComplement: user.addressComplement,
                postalCode: user.postalCode,
                city: user.city,
                country: user.country,
                phoneNumber: user.phoneNumber,
                DateCommande: new Date().toISOString(),
                userx: user._id,
                requestId: '',  
            };
    
            // Create the order in Helloprint
            const helloprintOrder = {
                mode: 'prod',
                shipping: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    addressLine1: user.street,
                    postcode: user.postalCode,
                    city: user.city,
                    country: user.country,
                    phone: user.phoneNumber,
                },
                orderItems: items.map(item => ({
                    variantKey: item.variantKey,
                    serviceLevel: 'standard',
                    quantity: item.quantity,
                })),
                orderReferenceId: orderReferenceId,
            };
    
            console.log('Sending order to Helloprint:', JSON.stringify(helloprintOrder));
    
            const createOrderResponse = await fetch('/api/helloprint/orders/createorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(helloprintOrder),
            });
    
            if (!createOrderResponse.ok) {
                const errorData = await createOrderResponse.text();
                console.error('Error creating order with Helloprint:', errorData);
                throw new Error('Failed to create order with Helloprint');
            }
    
            const createOrderData = await createOrderResponse.json();
            const requestId = createOrderData.requestId;
    
            console.log('Order created with requestId:', requestId);
    
            // Update the orderDetails with the correct requestId
            orderDetails.requestId = requestId;
    
            // Save the order to the local database
            const response = await axios.post('/api/BD/order', orderDetails);
            console.log('Commande créée avec succès', response.data);
    
            // Clear the cart and redirect the user
            localStorage.removeItem("pannier");
            alert('Commande créée avec succès!');
            window.location.href = '/orders';
    
        } catch (error:any) {
            console.error('Erreur lors de la commande:', error.message);
            alert('Erreur lors de la commande: ' + error.message);
        }
    };
    
    


     












      return (
        <div className="bg-gray-100">
            <Stronavigation />
            <br />
            <div style={{ display: 'flex', margin: 'auto', maxWidth: '1200px' }}>
                <div style={{ flex: 3, marginRight: '20px' }}>
                    <h1>Aperçu de votre panier</h1>
                    {cartItems.length > 0 ? cartItems.map((item, index) => (
                        <div key={index} style={cardStyle}>
                            <img src={item.image} alt={item.name} style={imageStyle} />
                            <div style={detailStyle}>
                                <h2>{item.name}</h2>
                                <p>Couleurs: {item.selectedColor}</p>
                                <p>Quantité: {item.quantity}</p>
                                <p>Impression: {item.selectedPrintPosition}</p>
                                <p>Livraison: {item.selectedDate}</p>

                                <p style={priceStyle}>{`${item.price} €`}</p>
                                <button onClick={() => {}}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => deleteItem(index)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </div>
                        </div>
                    ))  : (
                        <div style={emptyCartStyle}>
                            <h2 style={emptyCartMessageStyle}>Oups ... Votre panier est vide !</h2>
                            <p>Trouvez le produit qu'il vous faut <a href="/shop" style={emptyCartLinkStyle}>juste ici</a>.</p>
                        </div>
                    )}
                </div>
                <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px', height:'100%' }}>
                    <h2>Résumé</h2>
                    <p>Total produits HT: {totalHT.toFixed(2)} €</p>
                    <p>Frais de port: {shippingCost.toFixed(2)} €</p>
                    <p>TVA: {taxes.toFixed(2)} €</p>
                    <p>Total TTC: {totalTTC.toFixed(2)} €</p>
                    <button onClick={continueOrder} style={{ width: '100%', padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>Continuer</button>
                    <div>
                      
                    </div>
                </div>
            </div>
<br /><br /><br /><br />
<h2>Comment passer commande ?</h2>

            <div className="order-steps">
                <div className="steps-container">
                    <div className="step">
                        <img src="1.png" alt="Choisir et configurer" />
                        <h3>1. Choisir et configurer</h3>
                        <p>Choisissez le produit qui vous convient le mieux, configurez-le et sélectionnez votre délai de livraison. Ajoutez votre produit au panier et vérifiez soigneusement les détails de votre configuration avant de continuer.</p>
                    </div>
                    <div className="step">
                        <img src="2.png" alt="Finaliser la commande" />
                        <h3>2. Finaliser la commande</h3>
                        <p>Accédez au panier, complétez les informations requises et confirmez votre commande. N'oubliez pas de vérifier les adresses de livraison et de facturation !</p>
                    </div>
                    <div className="step">
                        <img src="3.png" alt="Paiement" />
                        <h3>3. Paiement</h3>
                        <p>On propose plusieurs méthodes de paiement, choisissez celle qui vous convient le mieux !</p>
                    </div>
                    <div className="step">
                        <img src="4.png" alt="On s'occupe du reste" />
                        <h3>4. On s'occupe du reste !</h3>
                        
                    </div>
                </div>
            </div>
            <HelpComponent />

            <Footer />
        </div>
    );
};

export default DisplayCart;