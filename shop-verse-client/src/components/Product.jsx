import React from "react";

function Product(){
    return(
        <div className="product-item">
            <img src="https://picsum.photos/seed/picsum/200/300" alt="product" height="200px" width="300px"/>
            <h2>Product Name</h2>
            <h3>$100</h3>
            <p>Discription</p>
            <div>
            <button>Add to wishlist</button>
            <button>Add to cart</button>
            </div>
        </div>
    )
}

export default Product;