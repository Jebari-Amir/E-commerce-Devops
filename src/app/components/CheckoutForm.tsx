'use client';
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { PayPalButtons } from '@paypal/react-paypal-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);

    if (paymentMethod === 'card') {
      if (!stripe || !elements) {
        return;
      }

      const cardElement = elements.getElement(CardNumberElement);

      if (cardElement) {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (error) {
          setError(error.message || 'An unexpected error occurred.');
          setProcessing(false);
        } else {
          try {
            const { data } = await axios.post('/api/create-payment-intent', {
              amount: 2000,
            });

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(data.clientSecret, {
              payment_method: paymentMethod.id,
            });

            if (confirmError) {
              setError(confirmError.message || 'An unexpected error occurred.');
              setProcessing(false);
            } else {
              setError(null);
              setSuccess(true);
              setProcessing(false);
              toast.success('Payment successful!', {
                onClose: () => router.push('/orders')
              });
            }
          } catch (error) {
            setError('An unexpected error occurred.');
            setProcessing(false);
          }
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white min-h-screen flex justify-center items-center">
      <ToastContainer />
      <div className="space-y-16">
        <div className="flex justify-center mb-4">
          <button
            type="button"
            className={`mr-4 px-4 py-2 ${paymentMethod === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setPaymentMethod('card')}
          >
            Pay with Card
          </button>
          <button
            type="button"
            className={`px-4 py-2 ${paymentMethod === 'paypal' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setPaymentMethod('paypal')}
          >
            Pay with PayPal
          </button>
        </div>

        {paymentMethod === 'card' ? (
          <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-black shadow-2xl transition-transform transform hover:scale-110">
            <div className="relative object-cover w-full h-full rounded-xl bg-gray-200 flex justify-center items-center"></div>
            <div className="w-full px-8 absolute top-8">
              <div className="flex justify-between">
                <div>
                  <h1 className="font-medium tracking-widest py-4">Credit card</h1>
                </div>
                <img className="w-14 h-14" src="visa.png" />
                <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
              </div>
              <div className="pt-1">
                <p className="font-light">Card Number</p>
                <CardNumberElement className="font-medium tracking-more-wider w-full" />
              </div>
              <div className="pt-6 pr-6">
                <div className="flex justify-between">
                  <div>
                    <p className="font-light text-xs">Valid</p>
                    <CardExpiryElement className="font-medium tracking-wider text-sm" />
                  </div>
                  <div>
                    <p className="font-light text-xs">CVV</p>
                    <CardCvcElement className="font-medium tracking-wider text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-black shadow-2xl transition-transform transform hover:scale-110">
            <PayPalButtons
              createOrder={async (data, actions) => {
                const { data: paymentIntent } = await axios.post('/api/create-payment-intent', {
                  amount: 2000,
                });
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: '20.00', // PayPal needs the amount in string format
                    },
                  }],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(details => {
                  toast.success('Payment successful!', {
                    onClose: () => router.push('/orders')
                  });
                });
              }}
              onError={(err) => {
                console.error(err);
                setError('An unexpected error occurred.');
              }}
            />
          </div>
        )}

        {paymentMethod === 'card' && (
          <button type="submit" disabled={!stripe || processing} className="bg-blue-500 text-white px-4 py-2 rounded">
            {processing ? 'Processing...' : 'Pay'}
          </button>
        )}

        {error && <div>{error}</div>}
        {success && <div>Payment successful!</div>}
      </div>
    </form>
  );
};

export default CheckoutForm;
