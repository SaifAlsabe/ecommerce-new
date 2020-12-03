import React from 'react';
import './RatingStyle.css';

interface Props {
    rating: number;
    numReviews: number;
}


const Rating: React.FC<Props> = ({ rating, numReviews }) => {

    return (
        <div className="product-rating">
            <b>{rating}</b>

            &nbsp;

            {[...Array(Math.floor(rating))].map((i) =>
                <span className="fa fa-star full"></span>
            )}

            {rating % 1 === 0 ? <></> :
                rating - Math.floor(rating) >= 0.5 ? <>
                    <span className="fa fa-star-half half-full">
                        <span className="fa fa-star-half half-empty"></span>
                    </span>
                </>
                    :
                    <span className="fa fa-star"></span>
            }

            {[...Array(5 - Math.ceil(rating))].map((i) =>
                <span className="fa fa-star"></span>
            )}

            &nbsp;
            
            ({numReviews} reviews)
        </div>
    )

}

export default Rating;