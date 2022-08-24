import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const ListOrders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("https://127.0.0.1:8000/api/orders_details");

      console.log(res.data["hydra:member"]);
      setData(res.data["hydra:member"]);
      // (res.data)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="mx-auto w-3/5">
        <h1 className="mt-4 text-3xl font-bold">Orders</h1>
        <table className="mx-auto table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Reference</th>
              <th className="px-4 py-2">Name Product</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Date order</th>
            </tr>
          </thead>

          {data.length > 0 ? (
            <>
              {data.map((order, index) => (
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="border px-4 py-2">
                      {order.orders.user.firstname} {order.orders.user.lastname}
                    </td>
                    <td className="border px-4 py-2">
                      {order.orders.reference}
                    </td>
                    <td className="border px-4 py-2">{order.product.name}</td>
                    <td className="border px-4 py-2">
                      {order.product && (
                        <img
                          src={`https://localhost:8000${order.product.image.contentUrl}`}
                          alt="img"
                          style={{ width: "5rem" }}
                        />
                      )}
                    </td>
                    <td className="border px-4 py-2">{order.price}€</td>
                    <td className="border px-4 py-2">
                      {" "}
                      {moment(order.orders.date, "YYYY-MM-DD hh:mm:ss").format(
                        "MM-DD-YYYY, H:mm:ss "
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
            </>
          ) : (
            <h4 className="text-center">No Products</h4>
          )}
        </table>
      </div>
    </div>
  );
};

export default ListOrders;
