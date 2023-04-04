const express = require("express");
const Stripe = require("stripe")
const config = require('config');
const e = require("express");
const key = config.get('STRIPE_SECRET');

const stripe = Stripe(key)

const router = express.Router()
router.post('/payment-checkout', async (req, res) => {
    const {venueName} = req.body;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: venueName,
              
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/user-profile',
      cancel_url: 'http://localhost:3000/user-profile',
    });
  
    res.send({url: session.url});
  });

  module.exports = router;