import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListCategories = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("https://localhost:8000/api/categories");
      console.log(res.data["hydra:member"]);
      setData(res.data["hydra:member"]);
      // (res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    await axios.delete("https://localhost:8000/api/categories/" + id);
    setData(
      data.filter((item) => {
        return item.id !== id;
      })
    );
    toast.success("La catégorie a bien été supprimée");
  };

  return (
    <div className="container mx-auto">
      <ToastContainer position="top-right" outoClose={3000} />
      <div className="mx-auto w-3/5">
        <NavLink
          to="/admin/categorie/add"
          className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          {" "}
          Ajouter categorie
        </NavLink>
        <h1 className="text-3xl font-bold ">Categories</h1>
        <table className="mx-auto table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Nom de categorie</th>

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
                      <NavLink
                        className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                        to={`/admin/categorie/edit/${item.id}`}
                      >
                        Edit
                      </NavLink>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="rounded-full bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
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

export default ListCategories;
