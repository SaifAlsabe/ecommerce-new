import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Checkout from '../../components/checkout/Checkout';
import { RootStore } from '../../store';
import './SummaryScreenStyle.css';

const SummaryScreen: React.FC = () => {

    const { address } = useSelector((state: RootStore) => state.address)
    const { street, city, state, zipcode, country } = address? address : { street: "", city: "", state: "", zipcode: "", country: "" }


    const { method } = useSelector((state: RootStore) => state.userPayment)
    const { cartItems } = useSelector((state: RootStore) => state.cart)

    const totalItems = cartItems ? cartItems.reduce((a, c) => a + Number(c.qty), 0) : 0;
    const subtotal = cartItems ? cartItems.reduce((a, c) => a + c.price * Number(c.qty), 0) : 0;
    const tax = subtotal ? Number((subtotal * 0.06).toFixed(2)) : 0;
    const total = subtotal ? subtotal + tax : 0;

    return (
        <div>
            <Checkout step1 step2 step3 step4></Checkout>
            <div className="summary-container">

                <div className="first-column">

                    <div className="shipping-area">
                        <h2>Shipping Address</h2>
                        <address>
                            <p>
                                {street} <br></br>
                                {city}, {state} {zipcode} <br></br>
                                {country}
                            </p>
                        </address>
                    </div>


                    <div className="payment-area">
                        <h2>Payment</h2>
                        <p>Payment Method: {method}</p>
                    </div>


                    <div className="cart-area">
                        <ul className="cart-list-container">

                            <li>
                                <h2>Shopping Cart</h2>
                                <div>Unit Price</div>
                            </li>

                            {cartItems?.map(item => (
                                <li>
                                    <div className="cart-image">
                                        <img src={item.image} alt="product" />
                                    </div>

                                    <div className="cart-name">
                                        <div>
                                            <Link to={`/products/${item._id}`}>
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div>
                                            <p>Qty: {item.qty}</p>
                                        </div>
                                    </div>

                                    <div className="cart-price">${item.price}</div>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <div className="second-column">

                    <div className="cart-action submit-area">
                        <h3> Subtotal ({totalItems} items): ${subtotal} </h3>

                        <h3 id="tax">Tax: ${tax} </h3>

                        <h3>Total: ${total}</h3>

                        <button className="button" disabled={cartItems?.length === 0}>
                            <b>Place Order</b>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SummaryScreen;