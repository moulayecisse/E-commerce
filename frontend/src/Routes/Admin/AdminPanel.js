import React from "react";
import { NavLink } from "react-router-dom";
const AdminPanel = () => {
  return (
    <div className="container h-96">
      <div className="flex justify-center items-center">
        <NavLink to="/admin/products" className="w-96 hover:bg-sky-700">
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Articles</div>
            </div>
          </div>
        </NavLink>

        <NavLink to="/admin/products" className="w-96 hover:bg-sky-700">
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Categories</div>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminPanel;
