import { product } from "./productActionsTypes";

export interface CartItem extends product {
    qty: string
}

// add item to cart
export const CART_ADD_ITEM_LOADING = "CART_ADD_ITEM_LOADING";
export const CART_ADD_ITEM_SUCCESS = "CART_ADD_ITEM_SUCCESS";
export const CART_ADD_ITEM_FAIL = "CART_ADD_ITEM_FAIL";

export interface CART_ADD_ITEM_LOADING {
    type: typeof CART_ADD_ITEM_LOADING;
}

export interface CART_ADD_ITEM_SUCCESS {
    type: typeof CART_ADD_ITEM_SUCCESS;
    payload: CartItem[];
}

export interface CART_ADD_ITEM_FAIL {
    type: typeof CART_ADD_ITEM_FAIL;
    payload: string
}

// remove item from cart
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";


export interface CART_REMOVE_ITEM {
    type: typeof CART_REMOVE_ITEM;
    payload: CartItem[];
}

export type CartDispatchTypes = CART_ADD_ITEM_LOADING
    | CART_ADD_ITEM_SUCCESS
    | CART_ADD_ITEM_FAIL
    | CART_REMOVE_ITEM

export interface CartDefaultState {
    loading: boolean,
    cartItems?: CartItem[],
    error?: string
}