import React, {useState, useEffect} from 'react';
import "./CSS/checkout.css"
import {useToasts} from "react-toast-notifications";

export const Checkout = (props) => {
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const {addToast} = useToasts();

    // Calculating subtotal value depending on props value
    const calculateSubtotal = () => {
        let result = 0;
        for (let i = 0; i < props.productsList.length; i++) {
            result += (props.productsList[i].quantity * +props.productsList[i].price)
        }
        setSubtotal(result);
    };

    // Checking if shipping should be free or paid
    const calculateShipping = () => {
        if(subtotal > 100 || subtotal === 0) {
            setShipping(0);
        }else {
            setShipping(23.8)
        }
    };

    // Clearing cart and displaying toastify message
    const proceedToCheckout = () => {
        addToast("Your order has been submitted successfully", {
            appearance: `success`,
            autoDismiss: true
        });
        props.submitCallback();
    };

    useEffect(() => {
        calculateSubtotal();
        calculateShipping()
    }, [props.productsList, subtotal]);

    return (
        <div className="checkout-container">
            <div className="top-button-holder">
                <button onClick={proceedToCheckout} className="button-proceed-top">
                    Proceed to checkout
                </button>
            </div>
            <div className="checkout-header">
                <div className="left-half">
                    SHIPPING
                </div>
                <div className="right-half">
                    {"$" + `${shipping.toFixed(2)}`}
                </div>
            </div>
            <div className="totals-container">
                <div className="totals">
                    <p id="totals">CART TOTALS</p>
                </div>
                <div className="checkout-totals">
                    <div className="left-half-checkout">
                        Subtotal
                    </div>
                    <div className="right-half">
                        {"$" + `${subtotal.toFixed(2)}`}
                    </div>
                </div>
                <div className="checkout-grand-total">
                    <div className="left-half-checkout">
                        Grand Total
                    </div>
                    <div className="right-half">
                        {"$" + `${(subtotal+shipping).toFixed(2)}`}
                    </div>
                </div>
                <div className="bottom-button-holder">
                    <button onClick={proceedToCheckout} className="button-proceed-bottom">
                        Proceed to checkout
                    </button>
                </div>
            </div>
        </div>
    )
};