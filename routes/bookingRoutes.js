const express = require('express');
const bookingController = require('./../controllers/bookingContoller');
const authController = require('./../controllers/authController');
const CSP = 'Content-Security-Policy';
const POLICY =
  "default-src 'self'  https://*.stripe.com;" +
  "base-uri 'self';block-all-mixed-content;" +
  "font-src 'self' https: data:;" +
  "frame-ancestors 'self';" +
  "img-src http://localhost:8000 'self' blob: data:;" +
  "object-src 'none';" +
  "script-src 'self' 'unsafe-inline';" +
  "script-src-attr 'none';" +
  "style-src 'self' https: 'unsafe-inline';" +
  'upgrade-insecure-requests;';

const router = express.Router();

router.use((req, res, next) => {
    res.setHeader(CSP, POLICY);
    next();
  });

router.use(authController.protect);

router.get('/checkout-session/:restid', bookingController.getCheckoutSession);

// router.use(authController.restrictTo('admin', 'lead-guide'));

// router
//   .route('/')
//   .get(bookingController.getAllBookings)
//   .post(bookingController.createBooking);

module.exports = router;