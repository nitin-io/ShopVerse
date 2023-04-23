import React, { useEffect, useState } from "react";
import { Layout } from "../../layout/Layout";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();

  const iconPosition = {
    position: "absolute",
    right: "5%",
    top: "5%",
    cursor: "pointer",
    color: "blue",
  };

  const fetchWishlist = async () => {
    try {
      if (auth?.token) {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/auth/wishlist`
        );
        data && setWishlist(data?.wishlist[0]?.wishlist);
      } else {
        toast.warn("Please login to access your wishlist");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <>
      <Layout title={"Your Wishlist"}>
        <div className="container">
          <div className="row">
            {wishlist?.map((product) => {
              console.log(product);
              return (
                <div
                  className="card m-2"
                  style={{
                    width: "15rem",
                    padding: "0",
                  }}
                >
                  <MdOutlineDelete
                    style={iconPosition}
                    title="Remove From Wishlist"
                    onClick={async () => {
                      try {
                        await axios.put(
                          `${
                            import.meta.env.VITE_BASE_API_URL_DEV
                          }/api/v1/auth/remove-from-wishlist/${product._id}`
                        );
                        const newWishlist = wishlist.filter(
                          (wItem) => wItem._id !== product._id
                        );
                        setWishlist(newWishlist);
                        toast.success("Remove from wishlist");
                      } catch (err) {
                        console.log(err);
                        toast.error("Something is wrong");
                      }
                    }}
                  />

                  <img
                    src={`${
                      import.meta.env.VITE_BASE_API_URL_DEV
                    }/api/v1/product/images/${product._id}`}
                    alt="product"
                    height={"200px"}
                    className="card-img-top img-fluid"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <div className="card-text">
                      {Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(product?.price)}
                    </div>
                    <div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setCart([...cart, product]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                          );
                          toast.success("Successfully Added Product in Cart");
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Wishlist;
//
