import React from "react";
import { Layout } from "../layout/Layout";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleCartItem = (pid) => {
    try {
      let myCart = [...cart];
      console.log(cart);
      let index = myCart.findIndex((cartItem) => cartItem._id === pid);
      console.log(index);
      myCart.splice(index, 1);
      console.log(myCart);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"Shopping Cart"}>
        <div className="text-center">
          Found {JSON.stringify(cart?.length)} items in cart
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              {auth?.token && auth?.user?.name}
              <div className="container">
                {cart?.map((product) => {
                  return (
                    <div className="row" key={product._id}>
                      <div className="col-md-4">
                        <img
                          src={`${
                            import.meta.env.VITE_BASE_API_URL_DEV
                          }/api/v1/product/images/${product?._id}`}
                          alt={`${product?.slug}`}
                          style={{ width: "10rem" }}
                        />
                      </div>
                      <div className="col-md-8">
                        <h5>{product?.name}</h5>
                        <h6>
                          {Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(product?.price)}
                        </h6>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            handleCartItem(product?._id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-md-4">
              <h5>Shipping Charge: ₹40</h5>
              <h5>
                Products Price:
                {Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(
                  cart?.reduce((total, product) => total + product.price, 0)
                )}
              </h5>
              <h5>
                Total:
                {Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(
                  cart?.reduce((total, product) => total + product.price, 0) +
                    40
                )}
              </h5>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Cart;
