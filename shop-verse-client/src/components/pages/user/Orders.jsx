import React, { useEffect, useState } from "react";
import { Layout } from "../../layout/Layout";
import UserMenu from "../../layout/UserMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const fetchAllOrder = async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/auth/orders`
      );
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchAllOrder();
  }, [auth?.token]);

  console.log(orders);
  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <UserMenu />
            </div>
            <div className="col-md-10">
              {orders?.map((order, i) => {
                return (
                  <table className="table caption-top" key={order._id}>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{order.status}</td>
                        <td>{moment(order.createdAt).fromNow()}</td>
                        <td>
                          {order.payment?.success
                            ? "Success"
                            : "Pending / Failed"}
                        </td>
                      </tr>
                    </tbody>
                    <div className="container-fluid">
                      {order.products?.map((product) => {
                        return (
                          <div className="row card flex-row">
                            <div className="col-md-5">
                              <img
                                src={`${
                                  import.meta.env.VITE_BASE_API_URL_DEV
                                }/api/v1/product/images/${product._id}`}
                                alt={product.slug}
                                height={"200px"}
                                className="card-img-left img-fluid"
                              />
                            </div>
                            <div className="col-md-7">
                              <h4>{product.name}</h4>
                              <p>{product.price}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </table>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Orders;
