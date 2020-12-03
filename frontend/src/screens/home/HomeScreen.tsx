import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productList } from '../../actions/productActions';
import './HomeScreenStyle.css';
import { RootStore } from "../../store";
import { Link, RouteComponentProps } from 'react-router-dom';
import Rating from '../../components/rating/Rating';

interface RouteInfo {
    category?: string;
}

interface ComponentProps extends RouteComponentProps<RouteInfo> {
}


const HomeScreen: React.FC<ComponentProps> = (props) => {

    const { loading, products, error } = useSelector((state: RootStore) => state.productList)

    const dispatch = useDispatch()

    //get category and dispatch
    const category = props.match.params.category? props.match.params.category :  ""
    useEffect(() => {
        dispatch(productList(category))
    }, [category])


    return (
        loading ? <div></div> :
            error ? <div></div> :
                <div className="home">

                    <ul className="products">

                        {products && products.map(product => (
                            <li key={product._id}>
                                <div className="product">

                                    <Link to={`/product?ID=${product._id}&Category=${product.category}`}>
                                        <img className="product-image" src={product.image} alt="product" />
                                    </Link>

                                    <div className="product-name">
                                        <Link to={`/product?ID=${product._id}&Category=${product.category}`}>{product.name}</Link>
                                    </div>

                                    <div className="product-brand">{product.brand}</div>

                                    <div className="product-price">${product.price}</div>

                                    <Rating rating={product.rating} numReviews={product.numReviews} />

                                </div>
                            </li>
                        ))}

                    </ul>

                </div>
    )
}

export default HomeScreen;