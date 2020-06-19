import React, {useState} from "react";
import {FaStar} from "react-icons/fa";

const StarRating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return <label>
                    <input type="radio" name="rating" style={{display: "none", cursor: "pointer"}} value={ratingValue}
                           onClick={() => setRating(ratingValue)}/>
                    <FaStar size={40} color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeve = {() => setHover(null)}
                            style={{cursor: "pointer"}}/>
                </label>
            })}

            <label>Rating is {rating}.</label>
        </div>
    )

}

export default StarRating;
