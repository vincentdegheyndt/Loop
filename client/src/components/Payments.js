import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'
import * as actions from '../actions'

class Payments extends Component{
    render(){
        return(
            <StripeCheckout
             name="Loop"
             description="$5 for 5 e-mail credits"//change
            //default to us dollars
            amount={500}//in cents = $5
            //callback called by the token we got back from Stripe
            token={token=>this.props.handleToken(token)}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
            {/* eslint-disable-next-line */}
            <a className="btn-floating btn teal lighten-1">
                <i className="material-icons">euro_symbol</i>
            </a>
            </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payments)