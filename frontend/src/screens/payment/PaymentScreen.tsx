import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Checkout from '../../components/checkout/Checkout';
import {payment} from '../../actions/userActions'
import './PaymentScreenStyle.css';

const PaymentScreen: React.FC<RouteComponentProps> = (props) => {

    const [paymentMethod, setpaymentMethod] = useState("");

    const dispatch = useDispatch()


    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(payment(paymentMethod))
        props.history.push('/summary');

    }

    return (
        <>
            <Checkout step1 step2 step3></Checkout>
            <div className="form-container">
                <form onSubmit={submitHandler}>
                    <ul className="form-list">
                        <li>
                            <h2>Payment</h2>
                        </li>

                        <li>
                            <div className="payment">
                                <div className="payment-option">
                                    <input required type="radio" className="payment-method" name="payment-method" id="Paypal" value="Paypal" onChange={(e) => setpaymentMethod(e.target.value)}></input>
                                    <label htmlFor="Paypal"><b>Paypal</b></label>
                                </div>
                                <div className="payment-option">
                                    <input required type="radio" className="payment-method" name="payment-method" id="credit" value="Credit/Debit Card" onChange={(e) => setpaymentMethod(e.target.value)}></input>
                                    <label htmlFor="credit"><b>Credit/Debit Card</b></label>
                                </div>
                            </div>
                        </li>

                        <li>
                            <button type="submit" className="button">
                                <b>Continue</b>
                            </button>
                        </li>
                    </ul>
                </form >
            </div>
        </>
    )
}

export default PaymentScreen;