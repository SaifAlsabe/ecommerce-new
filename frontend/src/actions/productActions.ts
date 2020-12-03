import axios from 'axios';
import { Dispatch } from 'redux'
import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_LOADING,
    PRODUCT_LIST_SUCCESS,
    ProductDispatchTypes,
    PRODUCT_DETAILS_LOADING,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    ProductDetailsDispatchTypes
} from '../types/productActionsTypes';


// fetch all products
const productList = (category: string = "") => (dispatch: Dispatch<ProductDispatchTypes>) => {

    dispatch({ type: PRODUCT_LIST_LOADING })

    axios.get("/api/products", { headers: { category } })
        .then((res) => {
            dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data })
        })
        .catch((err) => {
            dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message });
        })

}

// fetch specific product
const productDetails = (id: string) => (dispatch: Dispatch<ProductDetailsDispatchTypes>) => {

    dispatch({ type: PRODUCT_DETAILS_LOADING })
    axios.get(`/api/products/productDetails/${id}`)
        .then((res) => {
            dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: res.data })
        })
        .catch((err) => {
            dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err.message });
        })

}

export { productList, productDetails };