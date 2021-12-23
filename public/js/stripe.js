/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51K9VKvSDT08YQIF8dvGpzu0vTtgehZj45oEWfFO3vztfX6qvVW1ADQLfrqGxIIdJKGWYFKA0tYSFuFJFt4FIoF4Y00EVLrZVLG');

export const bookRest = async restid => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${restid}`);
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err.message);
    showAlert('error', err);
  }
};