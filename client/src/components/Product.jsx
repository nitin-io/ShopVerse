import React from "react";

function Product(){
    return(
        <div className="product-item">
            <img src="https://picsum.photos/seed/picsum/200/300" alt="product" height="200px" width="300px"/>
            <h1>Product Name</h1>
            <h2>$100</h2>
            <p>Discription</p>
        </div>
    )
}

export default Product;