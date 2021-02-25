const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
    app.post('/api/stripe',requireLogin, async (req,res)=>{
        // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
        const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',//change
        description: '$5 for 5 credits',//change
        source: req.body.id,//returned token
        });

        req.user.credits +=5
        const user = await req.user.save();

        res.send(user)
        //has to be a send at some point.
        //same thing as a return
    });
}