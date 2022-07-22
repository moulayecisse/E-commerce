import React from "react";
import { NavLink } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="container h-96">
      <div className="flex items-center justify-center">
        <NavLink to="/admin/products" className="w-96 hover:bg-sky-600">
          <div className="max-w-sm overflow-hidden rounded shadow-md">
            <div className="px-5 py-4">
              <div className="mb-2 text-xl font-bold">Articles</div>
            </div>
          </div>
        </NavLink>

        <NavLink to="/admin/categories" className="w-96 hover:bg-sky-600">
          <div className="max-w-sm overflow-hidden rounded shadow-md">
            <div className="px-5 py-4">
              <div className="mb-2 text-xl font-bold">Categories</div>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminPanel;
