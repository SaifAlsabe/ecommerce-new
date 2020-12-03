import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { RootStore } from '../../store';
import './CartScreenStyle.css';



const CartScreen: React.FC<RouteComponentProps> = (props) => {


    const { cartItems } = useSelector((state: RootStore) => state.cart)
    const { user } = useSelector((state: RootStore) => state.userSignin)

    const dispatch = useDispatch();

    const removeFromCartHandler = (productId: string) => {
        dispatch(removeFromCart(productId))
    }


    // continue to checkout if logged in else redirect to login page 
    const checkoutHandler = () => {
        props.history.push("/shipping")
    }

    return (
        <div className="cart">

            <div className="cart-list">
                <ul className="cart-list-container">

                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Unit Price</div>
                    </li>

                    {
                        cartItems?.length === 0 ?
                            <div>
                                Cart is Empty
                            </div>
                            :
                            cartItems?.map(item => (
                                <li key={item._id}>
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
                                            <>Qty: </>
                                            <select value={item.qty} onChange={(e) => dispatch(addToCart(item._id, e.target.value))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map(x =>
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <button type="button" className="remove-button" onClick={() => removeFromCartHandler(item._id)}>
                                            Remove Item
                                        </button>
                                    </div>

                                    <div className="cart-price">${item.price}</div>
                                </li>
                            ))
                    }

                </ul>
            </div>

            <div className="cart-action">

                <h3>
                    Subtotal ({cartItems?.reduce((a: any, c: any) => Number(a) + Number(c.qty), 0)} items)
                    ${cartItems?.reduce((a: any, c: any) => a + c.price * c.qty, 0)}
                </h3>

                <button onClick={checkoutHandler} className="button" disabled={cartItems?.length === 0}>
                    <b>Proceed to Checkout</b>
                </button>

            </div>

        </div>
    )
}

export default CartScreen;