import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListProducts = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("https://localhost:8000/api/products", {
        params: {
          "order[id]": "DESC",
        },
      });
      console.log(res.data["hydra:member"]);
      setData(res.data["hydra:member"]);
      // (res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    await axios.delete("https://localhost:8000/api/products/" + id);
    setData(
      data.filter((item) => {
        return item.id !== id;
      })
    );
    toast.success("Votre article a bien ete supprimé", {
      autoClose: 1500,
    });
  };

  return (
    <div className="container mx-auto">
      <ToastContainer position="top-right" outoClose={3000} />
      <div className="mx-auto w-3/5">
        <NavLink
          to="/admin/product/add"
          className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          {" "}
          Ajouter article
        </NavLink>
        <h1 className="text-3xl font-bold ">Products</h1>
        <table className="mx-auto table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Nom de produit</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Categorie</th>
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
                    <td className="border px-4 py-2">
                      {" "}
                      {item.image && (
                        <img
                          src={`https://localhost:8000${item.image.contentUrl}`}
                          alt={item.name}
                          style={{ width: "5rem" }}
                        />
                      )}
                    </td>

                    <td className="border px-4 py-2">{item.categories.name}</td>
                    <td className="border px-4 py-2">{item.description}</td>
                    <td className="border px-4 py-2">{item.price}€</td>
                    <td className="border px-4 py-2">
                      {item.stock === 0 ? "rupture de stock" : item.stock}
                    </td>

                    <td className="border px-4 py-2">
                      <NavLink
                        className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                        to={`/admin/product/edit/${item.id}`}
                      >
                        Edit
                      </NavLink>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="rounded-full bg-red-700 py-2 px-4 font-bold text-white"
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
