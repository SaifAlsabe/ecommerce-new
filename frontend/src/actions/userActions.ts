import axios from 'axios';
import cookie from 'js-cookie';
import { Dispatch } from 'redux';
import { RootStore } from '../store';
import {
    USER_SIGNUP_FAIL,
    USER_SIGNUP_LOADING,
    USER_SIGNUP_SUCCESS,
    userInfo,
    userSignupDispatchType,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_LOADING,
    userSigninDispatchType,
    USER_SIGNOUT,
    userAddressDispatchType,
    USER_PAYMENT,
    userPaymentDispatchType,
    USER_ADDRESS_LOADING,
    USER_ADDRESS_FAIL,
    USER_ADDRESS_SUCCESS,
} from '../types/userActionsTypes';

// user signup
const userSignup = (userInfo: userInfo) => (dispatch: Dispatch<userSignupDispatchType>) => {

    dispatch({ type: USER_SIGNUP_LOADING });

    axios.post('/api/user/signup', { userInfo })
        .then((res) => {
            cookie.set('user', res.data.name);
            cookie.set('email', res.data.email)
            dispatch({ type: USER_SIGNUP_SUCCESS, payload: res.data });
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: res.data });
        }).catch((err) => {
            dispatch({ type: USER_SIGNUP_FAIL, payload: err.response.data });
        })
}

// user signin
const userSignin = (userInfo: userInfo) => (dispatch: Dispatch<userSigninDispatchType>) => {

    dispatch({ type: USER_SIGNIN_LOADING });

    axios.post('/api/user/signin', { userInfo })
        .then((res) => {
            //username and email
            cookie.set('user', res.data.name);
            cookie.set('email', res.data.email)
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: { email: res.data.email, name: res.data.name } });
            //address
            const address = res.data.address
            cookie.set('address', { address });
            dispatch({ type: USER_ADDRESS_SUCCESS, payload: res.data.address });
        }).catch((err) => {
            const user = ""
            const error = err.response.data
            dispatch({ type: USER_SIGNIN_FAIL, payload: { user , error } });
        })
}

// user signout
const userSignout = () => (dispatch: Dispatch<userSigninDispatchType>) => {

    //remove jwt cookie (http only)
    axios.get('/api/user/logout')

    //remove user cookies
    cookie.remove('email')
    cookie.remove('payment')
    cookie.remove('user');
    cookie.remove('address');

    dispatch({ type: USER_SIGNOUT, payload: null });
}


// get user address from shipping screen
const userAddress = (street: string, city: string, state: string, zipcode: string, country: string) => (dispatch: Dispatch<userAddressDispatchType>) => {

    cookie.set('address', JSON.stringify({ address: { street, city, state, zipcode, country } }));
    dispatch({ type: USER_ADDRESS_SUCCESS, payload: { street, city, state, zipcode, country } });
}

//user payment
const payment = (payment: string) => (dispatch: Dispatch<userPaymentDispatchType>) => {

    cookie.set('payment', payment)

    dispatch({ type: USER_PAYMENT, payload: payment })
    dispatch({ type: USER_PAYMENT, payload: payment })
    dispatch({ type: USER_PAYMENT, payload: payment })

}

// update username
const updateUsername = (username: string, password: string) => (dispatch: Dispatch<userSigninDispatchType>, getState: () => RootStore) => {

    const { userSignin: { user } } = getState()

    dispatch({ type: USER_SIGNIN_LOADING });

    axios.patch('/api/user/update/username', { username, password })
        .then((res) => {
            cookie.set('user', res.data.name);
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: res.data });
        }).catch((err) => {
            const error = err.response.data
            dispatch({ type: USER_SIGNIN_FAIL, payload: { error, user } });
        })
}

// update email
const updateEmail = (email: string, password: string) => (dispatch: Dispatch<userSigninDispatchType>, getState: () => RootStore) => {

    const { userSignin: { user } } = getState()

    dispatch({ type: USER_SIGNIN_LOADING });
    axios.patch('/api/user/update/email', { email, password })
        .then((res) => {
            cookie.set('email', res.data.email);
            cookie.set('email', res.data.email);
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: res.data });
        }).catch((err) => {
            const error = err.response.data
            dispatch({ type: USER_SIGNIN_FAIL, payload: { error, user } });
        })
}


// update address
const updateAddress = (street: string, city: string, state: string, zipcode: string, country: string, password: string) => (dispatch: Dispatch<userAddressDispatchType>) => {

    dispatch({ type: USER_ADDRESS_LOADING });
    axios.patch('/api/user/update/address', { street, city, state, zipcode, country, password })
        .then((res) => {
            const address = res.data
            cookie.set('address', { address });
            dispatch({ type: USER_ADDRESS_SUCCESS, payload: res.data });
        }).catch((err) => {
            dispatch({ type: USER_ADDRESS_FAIL, payload: err.response.data });
        })
}

// get address
const getAddress = () => (dispatch: Dispatch<userAddressDispatchType>) => {

    dispatch({ type: USER_ADDRESS_LOADING });
    axios.get('/api/user/address')
        .then((res) => {
            const address = res.data
            cookie.set('address', { address });
            dispatch({ type: USER_ADDRESS_SUCCESS, payload: res.data });
        }).catch((err) => {
            dispatch({ type: USER_ADDRESS_FAIL, payload: err.response.data });
        })
}

// update password
const updatePassword = (newPassword: string, password: string) => (dispatch: Dispatch<userSigninDispatchType>, getState: () => RootStore) => {

    const { userSignin: { user } } = getState()

    dispatch({ type: USER_SIGNIN_LOADING });

    axios.patch('/api/user/update/password', { newPassword, password })
        .then((res) => {
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: res.data });
        }).catch((err) => {
            const error = err.response.data
            dispatch({ type: USER_SIGNIN_FAIL, payload: { error, user } });
        })
}



export {
    userSignup,
    userSignin,
    userSignout,
    userAddress,
    payment,
    updateUsername,
    updateEmail,
    updateAddress,
    getAddress,
    updatePassword
}
