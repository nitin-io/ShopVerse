import React, { useEffect, useState } from "react";
import Product from "./../Product";

function ProductContainer() {
    const [products, setProducts] = useState([])

  async function renderProducts() {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL_DEV}/product/all`
    );
    const data = await response.json();
    setProducts(data.allProducts);
  }

  useEffect(() => {
    renderProducts();
  }, []);

  return (
    <section className="product-container">
      {products?.map((product) => {
        return (
          <Product
            name={product.name}
            price={product.price}
            key={product._id}
            id={product._id}
          />
        );
      })}
    </section>
  );
}

export default ProductContainer;
