import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { productDetailsReducer, productListReducer } from './reducers/productReducer';
import { userAddressReducer, userPaymentReducer, userSigninReducer, userSignupReducer } from './reducers/userReducers';
import cookie from 'js-cookie'
import { cartReducer } from './reducers/cartReducers';
import { CartItem } from './types/cartActionsTypes';
import { UserAddressDefaultState } from './types/userActionsTypes';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    userSignup: userSignupReducer,
    userSignin: userSigninReducer,
    cart: cartReducer,
    address: userAddressReducer,
    userPayment: userPaymentReducer,
});

// get user cookies
const method = cookie.get('payment') || ""
const userName = cookie.get('user') || null;
const userEmail = cookie.get('email') || null;
const cartItems: CartItem[] = cookie.getJSON("cartItems") || []
const userAddress: UserAddressDefaultState = cookie.getJSON("address") || {
    loading: false,
    address: {
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: ""
    }
}

//initial state of store
const storeInitialState = {
    productList: {
        loading: false
    },
    productDetails: {
        loading: false
    },
    userSignup: {
        loading: false
    },
    userSignin: {
        loading: false,
        user: {
            name: userName,
            email: userEmail
        }
    },
    cart: {
        loading: false,
        cartItems: cartItems
    },
    address: userAddress,
    userPayment: {
        method: method
    }
}


const store = createStore(reducer, storeInitialState, composeWithDevTools(applyMiddleware(thunk)));

export type RootStore = ReturnType<typeof reducer>

export default store;