import axios from 'axios';
import { Dispatch } from 'redux';
import cookie from 'js-cookie';
import {
    CART_ADD_ITEM_LOADING,
    CART_ADD_ITEM_SUCCESS,
    CART_ADD_ITEM_FAIL,
    CartDispatchTypes,
    CART_REMOVE_ITEM,
} from '../types/cartActionsTypes';
import { RootStore } from '../store';
import { CartItem } from '../types/cartActionsTypes';


// fetch all products
const addToCart = (id: string, qty: string) => (dispatch: Dispatch<CartDispatchTypes>, getState: () => RootStore) => {

    // get state before dispatch
    const { cart: { cartItems } } = getState();

    dispatch({ type: CART_ADD_ITEM_LOADING })

    axios.get(`/api/products/productDetails/${id}`)
        .then((res) => {
            //check for duplicate
            const newItem: CartItem = { ...res.data, qty }
            const product = cartItems?.find(cartItem => cartItem._id === newItem._id)
            if (product) {
                const newCartItems = cartItems?.map(cartItem => cartItem._id === product?._id ? newItem : cartItem)
                dispatch({ type: CART_ADD_ITEM_SUCCESS, payload: newCartItems ? newCartItems : [{ ...res.data, qty }] })
            } else {
                dispatch({ type: CART_ADD_ITEM_SUCCESS, payload: cartItems ? [...cartItems, { ...res.data, qty }] : [{ ...res.data, qty }] })
            }
        }).catch((err) => {
            dispatch({ type: CART_ADD_ITEM_FAIL, payload: err.message });
        }).finally(() => {
            // get state afer dispatch
            const { cart: { cartItems } } = getState();
            // add items to cookie
            cookie.set("cartItems", JSON.stringify(cartItems));
        })

}


const removeFromCart = (id: string) => (dispatch: Dispatch<CartDispatchTypes>, getState: () => RootStore) => {

    const { cart: { cartItems } } = getState();
    const newItems = cartItems?.filter(item => item._id !== id)
    dispatch({ type: CART_REMOVE_ITEM, payload: newItems? newItems: [] })

    // add items to cookie
    cookie.set("cartItems", JSON.stringify(newItems));
}


export { addToCart, removeFromCart }