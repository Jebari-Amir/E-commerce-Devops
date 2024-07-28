import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './stripe';
import CheckoutForm from './CheckoutForm';

const PaymentForm = ({ totalAmount }) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm totalAmount={totalAmount} />
        </Elements>
    );
};

export default PaymentForm;
