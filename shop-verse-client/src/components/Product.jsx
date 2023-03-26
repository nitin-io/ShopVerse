import React from "react";

function Product(props){
    return(
        <div className="product-item" id={props.id}>
            <img src="https://picsum.photos/seed/picsum/200/300" alt="product" height="200px" width="300px"/>
            <h2>{props.name}</h2>
            <h3>₹{props.price}</h3>
            <div>
            <button>Add to wishlist</button>
            <button>Add to cart</button>
            </div>
        </div>
    )
}

export default Product;