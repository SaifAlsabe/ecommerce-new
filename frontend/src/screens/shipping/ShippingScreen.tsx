import React, { useState } from 'react';
import './ShippingScreenStyle.css';
import Checkout from '../../components/checkout/Checkout'
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { RouteComponentProps } from 'react-router-dom';
import { userAddress } from '../../actions/userActions';

const ShippingScreen: React.FC<RouteComponentProps> = (props) => {

    const { address } = useSelector((state: RootStore) => state.address)
    const dispatch = useDispatch()


    const [street, setStreet] = useState(address ? address.street : "");
    const [city, setCity] = useState(address ? address.city : "");
    const [state, setState] = useState(address ? address.state : "");
    const [zipcode, setZipcode] = useState(address ? address.zipcode : "");
    const [country, setCountry] = useState(address ? address.country : "")

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userAddress(street, city, state, zipcode, country))
        props.history.push('/payment');

    }

    return (
        <div>

            <Checkout step1 step2></Checkout>

            <div className="form-container">
                <form onSubmit={submitHandler}>
                    <ul className="form-list">
                        <li>
                            <h2>Shipping</h2>
                        </li>

                        <li>
                            <input required placeholder="Street" value={street} type="text" id="street" name="street" onChange={(e) => setStreet(e.target.value)}></input>
                        </li>

                        <li>
                            <input required placeholder="City" value={city} type="text" id="city" name="city" onChange={(e) => setCity(e.target.value)}></input>
                        </li>

                        <li>
                            <input required placeholder="Zipcode" value={zipcode} type="text" id="zipcode" name="zipcode" onChange={(e) => setZipcode(e.target.value)}></input>
                        </li>

                        <li>
                            <input required placeholder="State" value={state} type="text" id="state" name="state" onChange={(e) => setState(e.target.value)}></input>
                        </li>

                        <li>
                            <input required placeholder="Country" value={country} type="text" id="country" name="country" onChange={(e) => setCountry(e.target.value)}></input>
                        </li>

                        <li>
                            <button type="submit" className="button">
                                <b>Continue</b>
                            </button>
                        </li>

                    </ul>
                </form>
            </div>
        </div>
    )
}

export default ShippingScreen