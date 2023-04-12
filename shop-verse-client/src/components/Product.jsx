import React from "react";

function Product({ id, slug, name, price }) {
  return (
    <div
      onClick={() => {
        navigate(`/dashboard/admin/update-product/${slug}`);
      }}
      className="card m-2"
      style={{
        width: "15rem",
        padding: "0",
      }}
    >
      <img
        src={`${
          import.meta.env.VITE_BASE_API_URL_DEV
        }/api/v1/product/images/${id}`}
        alt="product"
        height={"200px"}
        className="card-img-top img-fluid"
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <div className="card-text">Rs.{price}</div>
        <div>
          <button className="btn btn-primary btn-sm">Add to Cart</button>
          <button className="btn btn-primary btn-sm m-2">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
