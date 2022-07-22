import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
    toast.success("Votre article a bien ete supprimé");
  };

  return (
    <div className="container mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="z-90 fixed bottom-8 right-8 h-16 w-16 rounded-full border-0 bg-indigo-500 text-xl font-bold text-white drop-shadow-md"
      >
        Back
      </button>
      <ToastContainer position="top-right" outoClose={3000} />
      <div className="mx-auto w-3/5">
        <NavLink
          to="/admin/product/add"
          className="rounded-full bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-500"
        >
          {" "}
          Ajouter article
        </NavLink>
        <h1 className="text-xl font-bold ">Products</h1>
        <table className="mx-auto table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Nom de produit</th>
              <th className="px-4 py-2">Image</th>
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
                  <tr key={index}>
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

                    <td className="border px-4 py-2">{item.description}</td>
                    <td className="border px-4 py-2">{item.price}€</td>
                    <td className="border px-4 py-2">
                      {item.stock === 0 ? "rupture de stock" : item.stock}
                    </td>

                    <td className="border px-4 py-2">
                      <NavLink
                        className="rounded-full bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-500"
                        to={`/admin/product/edit/${item.id}`}
                      >
                        Edit
                      </NavLink>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="rounded-full bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-500"
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
            <></>
          )}
        </table>
      </div>
    </div>
  );
};

export default ListProducts;
