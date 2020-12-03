// user signup
export const USER_SIGNUP_LOADING = "USER_SIGNUP_LOADING";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAIL = "USER_SIGNUP_FAIL";

export interface userInfo {
    name?: string;
    email: string;
    password: string;
}

export interface USER_SIGNUP_LOADING {
    type: typeof USER_SIGNUP_LOADING
}

export interface USER_SIGNUP_SUCCESS {
    type: typeof USER_SIGNUP_SUCCESS;
    payload: any
}

export interface USER_SIGNUP_FAIL {
    type: typeof USER_SIGNUP_FAIL;
    payload: string
}

export type userSignupDispatchType = USER_SIGNUP_LOADING | USER_SIGNUP_SUCCESS | USER_SIGNUP_FAIL | USER_SIGNIN_SUCCESS;

export interface UserSignupDefaultState {
    loading: boolean;
    user?: any;
    error?: any;
}

// user signin
export const USER_SIGNIN_LOADING = "USER_SIGNIN_LOADING";
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_FAIL = "USER_SIGNIN_FAIL";

export interface USER_SIGNIN_LOADING {
    type: typeof USER_SIGNIN_LOADING
}

export interface USER_SIGNIN_SUCCESS {
    type: typeof USER_SIGNIN_SUCCESS;
    payload: any
}

export interface USER_SIGNIN_FAIL {
    type: typeof USER_SIGNIN_FAIL;
    payload: any
}

export type userSigninDispatchType = USER_SIGNIN_LOADING | USER_SIGNIN_SUCCESS | USER_SIGNIN_FAIL | USER_SIGNOUT | USER_ADDRESS_SUCCESS;

export interface UserSigninDefaultState {
    loading: boolean;
    user?: any;
    error?: any;
}

//user singout
export const USER_SIGNOUT = "USER_SIGNOUT"

export interface USER_SIGNOUT {
    type: typeof USER_SIGNOUT
    payload: null
}

//user shipping address
export const USER_ADDRESS_SUCCESS = "USER_SHIPPING_ADDRESS"
export const USER_ADDRESS_FAIL = "USER_ADDRESS_FAIL"
export const USER_ADDRESS_LOADING = "USER_ADDRESS_LOADING"

export interface UserAddressDefaultState {
    loading: boolean,
    address?: {
        street: string,
        city: string,
        state: string,
        zipcode: string,
        country: string
    }
    error?: any

}

export interface USER_ADDRESS_SUCCESS {
    type: typeof USER_ADDRESS_SUCCESS
    payload: {
        street: string,
        city: string,
        state: string,
        zipcode: string,
        country: string
    }
}

export interface USER_ADDRESS_FAIL {
    type: typeof USER_ADDRESS_FAIL
    payload: any
}

export interface USER_ADDRESS_LOADING {
    type: typeof USER_ADDRESS_LOADING
}

export type userAddressDispatchType = USER_ADDRESS_SUCCESS | USER_ADDRESS_FAIL | USER_ADDRESS_LOADING;

//user payment method

export const USER_PAYMENT = "USER_PAYMENT"

export interface USER_PAYMENT {
    type: typeof USER_PAYMENT
    payload: string
}

export type userPaymentDispatchType = USER_PAYMENT;

export interface UserPaymentDefaultState {
    method: string
}




