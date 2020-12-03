import {
    CartDefaultState,
    CartDispatchTypes,
    CART_ADD_ITEM_LOADING,
    CART_ADD_ITEM_SUCCESS,
    CART_ADD_ITEM_FAIL,
    CART_REMOVE_ITEM,
} from "../types/cartActionsTypes";

const cartDefaultState: CartDefaultState = {
    loading: false,
    cartItems: []
};

const cartReducer = (state: CartDefaultState = cartDefaultState, action: CartDispatchTypes): CartDefaultState => {
    switch (action.type) {
        //add item
        case CART_ADD_ITEM_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CART_ADD_ITEM_LOADING:
            return {
                loading: true,
            }
        case CART_ADD_ITEM_SUCCESS:
            return {
                loading: false,
                cartItems: action.payload
            }
        // remove item
        case CART_REMOVE_ITEM:
            return {
                loading: false,
                cartItems: action.payload
            }
        //default
        default:
            return state
    }
};

export { cartReducer }