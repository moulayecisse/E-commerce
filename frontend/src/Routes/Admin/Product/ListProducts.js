import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await axios
        .request({
          method: "GET",
          url: "https://localhost:8000/api/products/",
          headers: { Accept: "application/json" },
        })
        .then(function (response) {
          console.log(response.data);
          setData(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    await axios.delete("https://localhost:8000/api/products/" + id);
    setData(
      data.filter((item) => {
        return item.id !== id;
      })
    );
    toast.success("Votre message a bien éte envoyé");
  };

  return (
    <div className="container mx-auto">
      <ToastContainer position="top-right" outoClose={3000} />
      <div className="w-3/5 mx-auto">
        <NavLink
          to="/admin/product/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          {" "}
          Ajouter article
        </NavLink>
        <h1 className="text-3xl font-bold ">Products</h1>
        <table className="table-auto mx-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Nom de produit</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Prix</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">update</th>
              <th className="px-4 py-2">delete</th>
            </tr>
          </thead>

          {data.length > 0 ? (
            <>
              {data.map((item, index) => (
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.description}</td>
                    <td className="border px-4 py-2">{item.price}€</td>
                    <td className="border px-4 py-2">
                      {item.stock === 0 ? "rupture de stock" : item.stock}
                    </td>
                    <td className="border px-4 py-2">
                      <NavLink
                        to={`/admin/product/edit/${item.id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        {" "}
                        update
                      </NavLink>
                    </td>

                    <pre>{JSON.stringify(item.categories)}</pre>

                    <td className="border px-4 py-2">
                      <NavLink
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        to={`/admin/product/edit/${item.id}`}
                      >
                        Edit
                      </NavLink>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => deleteProduct(item.id)}
                      >
                        Delete
                      </button>
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

export default ListProducts;
