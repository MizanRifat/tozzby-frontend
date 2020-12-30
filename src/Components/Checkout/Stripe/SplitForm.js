import React, { useState, useContext,useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { AppContext } from '../../../Routes';
import { useHistory } from 'react-router-dom';
import { OrderContext } from '../Checkout';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function CheckoutForm() {

  const { cartItems, setCartItems } = useContext(AppContext);
  const { order, setOrder } = useContext(OrderContext);

  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState('');
  const [billingDetails, setBillingDetails] = useState({});


  const iframeStyles = {
    base: {
      fontSize: "16px",

    },
    complete: {
      // iconColor: "#cbf4c9"
    }
  };

  const cardElementOpts = {
    iconStyle: "solid",
    // style: iframeStyles,
    hidePostalCode: true
  }

  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };



  const handleFormSubmit = async ev => {
    ev.preventDefault();

    setLoading(true)
    if (!stripe || !elements) {

      return;
    }

    const cardElement = elements.getElement("card");

    try {
      const { data: clientSecret } = await axios.post(`${process.env.REACT_APP_DOMAIN}/api/stripe/payment_intents`, {

      },
        {
          withCredentials: true
        });
      console.log({ clientSecret })

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      console.log({ result })

      if (result.error) {
        setCheckoutError(result.error.message);
        setLoading(false)
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          const { data: order } = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/stripe/success?token=true`,
            {
              withCredentials: true
            });

          console.log({ order })
          setOrder(order.order)
          setCartItems({})
          setLoading(false)
          history.push(`/checkout/order_success`)

        }
      }


    } catch (err) {
      setCheckoutError(err.message);
      setLoading(false)
    }
  };


  useEffect(()=>{
    setBillingDetails({
      name: `${cartItems.customer_first_name} ${cartItems.customer_last_name}` ,
      email: cartItems.customer_email,
    })
  },[cartItems])

  return (
    <form onSubmit={handleFormSubmit}>

      <CardElement
        options={cardElementOpts}
        onChange={handleCardDetailsChange}
      />

      <small style={{color:'red'}}>{checkoutError}</small>

      <div className="" style={{ position: 'relative' }}>

        <Button type="submit" variant='contained' color='primary' disabled={loading} style={{ marginTop: '16px' }}>
          Pay {cartItems.formated_grand_total}
        </Button>
        {
          loading || Object.entries(cartItems).length == 0 ? 
          <CircularProgress size={20} style={{ position: 'absolute', top: '25px', left: '41px' }} />
          : ''
        }
      </div>
    </form>
  );
};