const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Rest = require('./../models/restaurantModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory=require('./handleFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked rest
    const rest = await  Rest.findById(req.params.restid);
    // console.log(data);

    const session=await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        success_url:`${req.protocol}://${req.get('host')}/`,
        cancel_url:`${req.protocol}://${req.get('host')}/rest/${rest.name}`,
        customer_email: req.user.email,
        client_reference_id: req.params.restid,
        line_items:[{
            name:`${rest.name} Restraunt`, 
            description: rest.summary,
            images:[`/img/tours/${rest.moreimg}`],
            amount: rest.price*100,
            currency:'usd',
            quantity:1
        }]
    });

    // res.redirect(303, session.url);

    res.status(200).json({ 
        status:'success',
        session
    })
});
