import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductScreenStyle.css';
import { RootStore } from "../../store";
import { productDetails } from '../../actions/productActions';
import { RouteComponentProps } from "react-router-dom";
import Rating from '../../components/rating/Rating';
import { addToCart } from '../../actions/cartActions';



const ProductScreen: React.FC<RouteComponentProps> = (props) => {

    const productId = props.location.search.split('&')[0].split("=")[1];


    const [qty, setQty] = useState('1');
    const { loading, product, error } = useSelector((state: RootStore) => state.productDetails)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(productDetails(productId))
    }, [])

    const handleAddToCart = () => {
        dispatch(addToCart(productId, qty))
        props.history.push(`/cart`)
    }


    return (
        loading ? <div>Loading...</div> :
            error ? <div></div> :
                !product?.rating ? <div>loading...</div> :


                    <div className="details">

                        {/* image */}
                        <div className="details-image">
                            <img src={product.image} alt="product"></img>
                        </div>


                        {/* product information */}
                        <div className="details-info">
                            <ul>
                                <li>
                                    <h2>{product.name}</h2>
                                </li>
                                <li>
                                    <Rating rating={product.rating} numReviews={product.numReviews} />
                                </li>
                                <li>
                                    <b>Description:</b>
                                    <div>
                                        {product.description}
                                    </div>
                                </li>
                            </ul>
                        </div>


                        {/* product purchase */}
                        <div className="details-action">
                            <ul>

                                <li>
                                    Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                </li>
                                <li>
                                    Unit Price: <b>${product.price}</b>
                                </li>

                                {
                                    product.countInStock > 0 ?
                                        <li>
                                            Qty: <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {
                                                    [...Array(product.countInStock).keys()].map(x =>
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    )
                                                }
                                            </select>
                                        </li>
                                        : <li></li>
                                }
                                <li>
                                    {
                                        product.countInStock > 0 ?
                                            <button onClick={handleAddToCart} className="button">Add to cart</button> : <div></div>
                                    }
                                </li>

                            </ul>
                        </div>

                    </div>




    )
}

export default ProductScreen;