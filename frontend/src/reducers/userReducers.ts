import {
    userSignupDispatchType,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_LOADING,
    USER_SIGNUP_SUCCESS,
    UserSignupDefaultState,
    UserSigninDefaultState,
    USER_SIGNIN_LOADING,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    userSigninDispatchType,
    USER_SIGNOUT,
    userAddressDispatchType,
    UserAddressDefaultState,
    UserPaymentDefaultState,
    userPaymentDispatchType,
    USER_PAYMENT,
    USER_ADDRESS_SUCCESS,
    USER_ADDRESS_LOADING,
    USER_ADDRESS_FAIL
} from "../types/userActionsTypes"

const userSignupDefaultState: UserSignupDefaultState = {
    loading: false,
}


// user signup
const userSignupReducer = (state: UserSignupDefaultState = userSignupDefaultState, action: userSignupDispatchType): UserSignupDefaultState => {

    switch (action.type) {
        case USER_SIGNUP_LOADING:
            return {
                loading: true,
            }
        case USER_SIGNUP_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            }
        case USER_SIGNUP_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }

}

// user signin
const userSigninReducer = (state: UserSigninDefaultState = userSignupDefaultState, action: userSigninDispatchType): UserSigninDefaultState => {

    switch (action.type) {
        case USER_SIGNIN_LOADING:
            return {
                loading: true,
            }
        case USER_SIGNIN_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            }
        case USER_SIGNIN_FAIL:
            return {
                loading: false,
                user: action.payload.user,
                error: action.payload.error,
            }
        case USER_SIGNOUT:
            return {
                loading: false,
                user: action.payload,
            }
        default:
            return state;
    }

}


// user address
const userAddressDefaultState: UserAddressDefaultState = {
    loading: false,
    address: {
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: ""
    }

}

const userAddressReducer = (state: UserAddressDefaultState = userAddressDefaultState, action: userAddressDispatchType): UserAddressDefaultState => {

    switch (action.type) {
        case USER_ADDRESS_LOADING:
            return {
                loading: true
            }
        case USER_ADDRESS_SUCCESS:
            return {
                loading: false,
                address: action.payload
            }
        case USER_ADDRESS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }

}

// user payment
const userPaymentDefaultState: UserPaymentDefaultState = {
    method: ""
}

const userPaymentReducer = (state: UserPaymentDefaultState = userPaymentDefaultState, action: userPaymentDispatchType): UserPaymentDefaultState => {

    switch (action.type) {
        case USER_PAYMENT:
            return {
                method: action.payload
            }
        default:
            return state;
    }

}

export { userSignupReducer, userSigninReducer, userAddressReducer, userPaymentReducer }