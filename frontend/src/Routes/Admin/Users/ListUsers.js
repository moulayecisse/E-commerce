import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListUsers = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("https://localhost:8000/api/users", {
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

  const deleteUser = async (id) => {
    await axios.delete("https://localhost:8000/api/users/" + id);
    setData(
      data.filter((user) => {
        return user.id !== id;
      })
    );
    toast.success("L'utilisateur a bien ete supprimé", {
      autoClose: 1500,
    });
  };

  return (
    <div className="container mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="z-90 fixed bottom-8 right-8 h-16 w-16 rounded-full border-0 bg-indigo-200 text-xl font-bold text-black drop-shadow-md "
      >
        Back
      </button>
      <ToastContainer position="top-right" outoClose={3000} />
      <div className="mx-auto w-3/5">
        <NavLink
          to="/admin/users/add"
          className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          {" "}
          Ajouter un utilisateur
        </NavLink>
        <h1 className="mt-4 text-3xl font-bold">Utilisateurs</h1>
        <table className="mx-auto table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">adresse</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">update</th>
              <th className="px-4 py-2">delete</th>
            </tr>
          </thead>

          {data.length > 0 ? (
            <>
              {data.map((user, index) => (
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="border px-4 py-2">{user.firstname}</td>
                    <td className="border px-4 py-2">{user.lastname}</td>
                    <td className="border px-4 py-2">{user.email}</td>

                    <td className="border px-4 py-2">
                      <NavLink
                        className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                        to={`/admin/users/edit/${user.id}`}
                      >
                        Edit
                      </NavLink>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="rounded-full bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </>
          ) : (
            <h4 className="text-center">No Users</h4>
          )}
        </table>
      </div>
    </div>
  );
};

export default ListUsers;
