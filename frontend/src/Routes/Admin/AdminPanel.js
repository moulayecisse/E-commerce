import React from "react";
import { NavLink } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="container h-96">
      <div className="flex justify-center items-center">
        <NavLink to="/admin/products" className="text-decoration-none ">
          <div className="px-6 py-4"> Articles</div>
        </NavLink>

        <NavLink to="/admin/categories" className="text-decoration-none">
          <div className="px-6 py-4">Categories</div>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminPanel;
