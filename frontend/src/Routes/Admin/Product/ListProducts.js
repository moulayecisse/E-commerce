import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

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
    console.log("Votre message a bien éte envoyé");
  };

  return (
    <div className="container mx-auto">
      <div className=" ">
        <div className="table-responsive">
          <h2 className="  ">Products</h2>
          <NavLink to="/admin/product/add" className=" btn btn-light btn-sm">
            {" "}
            Add products
          </NavLink>
          <table className="table  table-borderless">
            <thead>
              <tr>
                <th className="px-4 py-2">Nom de produit</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Prix</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">Update</th>
                <th className="px-4 py-2">Edit</th>
                <th className="px-4 py-2">Delete</th>
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
                          className=""
                        >
                          {" "}
                          update
                        </NavLink>
                      </td>
                      {/* <pre>{JSON.stringify(item.categories)}</pre> */}
                      <td className="border px-4 py-2">
                        <button class="btn btn-warning">
                          <NavLink
                            className=""
                            to={`/admin/product/edit/${item.id}`}
                          >
                            Edit
                          </NavLink>
                        </button>
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          className="btn btn-danger"
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
    </div>
  );
};

export default ListProducts;
