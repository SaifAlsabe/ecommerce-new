export interface product {
    _id: string;
    name: string;
    category: string;
    image: string;
    price: number;
    brand: string;
    countInStock: number;
    description: string;
    rating: number;
    numReviews: number;
}

export const PRODUCT_LIST_LOADING = "PRODUCT_LIST_LOADING";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";

export interface PRODUCT_LIST_LOADING {
    type: typeof PRODUCT_LIST_LOADING;
}

export interface PRODUCT_LIST_SUCCESS {
    type: typeof PRODUCT_LIST_SUCCESS;
    payload: product[];
}

export interface PRODUCT_LIST_FAIL {
    type: typeof PRODUCT_LIST_FAIL;
    payload: string
}


export type ProductDispatchTypes = PRODUCT_LIST_LOADING | PRODUCT_LIST_SUCCESS | PRODUCT_LIST_FAIL;

export interface ProductsDefaultState {
    loading: boolean,
    products?: product[],
    error?: string
}

export const PRODUCT_DETAILS_LOADING = "PRODUCT_DETAILS_LOADING";
export const PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS";
export const PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL";

export interface PRODUCT_DETAILS_LOADING {
    type: typeof PRODUCT_DETAILS_LOADING;
}

export interface PRODUCT_DETAILS_SUCCESS {
    type: typeof PRODUCT_DETAILS_SUCCESS;
    payload: product;
}

export interface PRODUCT_DETAILS_FAIL {
    type: typeof PRODUCT_DETAILS_FAIL;
    payload: string
}

export type ProductDetailsDispatchTypes = PRODUCT_DETAILS_LOADING | PRODUCT_DETAILS_SUCCESS | PRODUCT_DETAILS_FAIL;

export interface ProductDetailsDefaultState {
    loading: boolean,
    product?: product,
    error?: string
}


