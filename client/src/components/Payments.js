import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                name="FergMail"
                description="$5 for 5 email credits"
                // $5 us currency
                amount={500}
                // token = callback function after we receive auth token from stripe api
                token={token => console.log('token', token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
        );
    }
}

export default Payments;