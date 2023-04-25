import { useEffect, useState } from "react";
import { Layout } from "../layout/Layout";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [dropInInstance, setDropInInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clientToken, setClientToken] = useState("");

  const navigate = useNavigate();

  // Get Braintree Token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_API_URL_DEV
        }/api/v1/product/braintree/token`
      );
      console.log(data);
      setClientToken(data?.response?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((cartItem) => cartItem._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await dropInInstance.requestPaymentMethod();
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_BASE_API_URL_DEV
        }/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      console.log(data);
      setLoading(false);
      setCart([]);
      localStorage.removeItem("cart");
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

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
            {cart.length > 0 && (
              <div className="col-md-4">
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
                    cart?.reduce((total, product) => total + product.price, 0)
                  )}
                </h5>
                {auth?.user?.address ? (
                  <>
                    <div>
                      <h4>Current Address</h4>
                      <p>Address: {auth?.user?.address?.addressLine}</p>
                      <p>City: {auth?.user?.address?.city}</p>
                      <p>State: {auth?.user?.address?.state}</p>
                      <p>Zip Code: {auth?.user?.address?.zipCode}</p>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => {
                          navigate("/dashboard/user/profile");
                        }}
                      >
                        Update Address
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => {
                        navigate("/login", { state: "/cart" });
                      }}
                    >
                      Login To Checkout
                    </button>
                  </>
                )}
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                      }}
                      onInstance={(instance) => {
                        setDropInInstance(instance);
                      }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={
                        loading || !dropInInstance || !auth?.user?.address
                      }
                    >
                      {loading ? "Processing..." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Cart;
