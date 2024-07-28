'use client';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import axios from 'axios';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Stronavigation from '../components/storenavigation';
import Footer from '../components/footer';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const { data } = await axios.post('/api/create-payment-intent', {
          amount: 2000, // Example amount in cents
        });
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error(error);
      }
    };

    createPaymentIntent();
  }, []);

  const options = {
    clientSecret,
  };

  return (
    <div>
       <Stronavigation/>
    <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
      <div>
     
        
        {clientSecret ? (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        ) : (
          <div>Loading...</div>
        )}
        
      </div>
    </PayPalScriptProvider>
    
    <Footer/>
    </div>
  );
};

export default PaymentPage;
