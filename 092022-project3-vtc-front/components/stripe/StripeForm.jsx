import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';

export default function CheckoutForm({ setPaymentAccepted }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,

      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: '',
      },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    } else {
      setValidate(false);
      setPaymentAccepted(true);
    }
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <Stack sx={{}}>
      <form id="payment-form" onSubmit={handleSubmit}>
        <Stack>
          <PaymentElement id="payment-element" options={paymentElementOptions} />
        </Stack>
        <Stack sx={{ display: 'flex', alignItems: 'center' }}>
          {validate ? (
            <Button
              sx={{ width: '50%', border: '1px solid black' }}
              variant="contained"
              color="secondary"
              disabled={isLoading || !stripe || !elements}
              type="submit"
            >
              <span>{isLoading ? 'En cours de paiement' : 'Effectuer le prépaiement'}</span>
            </Button>
          ) : (
            <></>
          )}
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </Stack>
      </form>
    </Stack>
  );
}

CheckoutForm.propTypes = {
  setPaymentAccepted: PropTypes.any.isRequired,
};
