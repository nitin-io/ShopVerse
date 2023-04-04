import React, { useEffect, useState } from "react";
import Product from "./../Product";

function ProductContainer() {
  const [products, setProducts] = useState([]);

  async function renderProducts() {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/product/products`
    );
    const data = await response.json();
    setProducts(data.allProducts);
  }

  useEffect(() => {
    renderProducts();
  }, []);

  return (
    <section className="container mx-auto my-5">
      <div className="row g-4">
        {products?.map((product) => {
          return (
            <div className="col-md-4">
              <Product
                name={product.name}
                price={product.price}
                key={product._id}
                id={product._id}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProductContainer;
