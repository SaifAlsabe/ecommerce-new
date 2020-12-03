import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_LOADING,
  PRODUCT_LIST_SUCCESS,
  ProductDispatchTypes,
  ProductsDefaultState,
  ProductDetailsDefaultState,
  ProductDetailsDispatchTypes,
  PRODUCT_DETAILS_LOADING,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL
} from '../types/productActionsTypes';

const productDefaultState: ProductsDefaultState = {
  loading: false
};

const productListReducer = (state: ProductsDefaultState = productDefaultState, action: ProductDispatchTypes): ProductsDefaultState => {
  switch (action.type) {
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case PRODUCT_LIST_LOADING:
      return {
        loading: true,
      }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload
      }
    default:
      return state
  }
};

const productDetailsDefaultState: ProductDetailsDefaultState = {
  loading: false
};

const productDetailsReducer = (state: ProductDetailsDefaultState = productDetailsDefaultState, action: ProductDetailsDispatchTypes): ProductDetailsDefaultState => {
  switch (action.type) {
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case PRODUCT_DETAILS_LOADING:
      return {
        loading: true,
      }
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload
      }
    default:
      return state
  }
};


export { productListReducer, productDetailsReducer }