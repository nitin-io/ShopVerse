import React, { useEffect, useState } from "react";
import { Layout } from "../../layout/Layout";
import AdminMenu from "../../layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not in process",
    "In process",
    "Shipped",
    "Delivered",
    "Canceled",
  ]);
  const [auth, setAuth] = useAuth();

  const fetchAllOrder = async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/auth/admin-orders`
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

  const handleChange = async (orderId, status) => {
    try {
      await axios.put(
        `${
          import.meta.env.VITE_BASE_API_URL_DEV
        }/api/v1/auth/update-status/${orderId}`,
        { status }
      );
      toast.success("Status updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <AdminMenu />
            </div>
            <div className="col-md-10">
              {orders?.map((order, i) => {
                return (
                  <table class="table caption-top" key={order._id}>
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
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(order._id, value)}
                            defaultValue={order?.status}
                          >
                            {status?.map((status, index) => (
                              <Option key={index} value={status}>
                                {status}
                              </Option>
                            ))}
                          </Select>
                        </td>
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
