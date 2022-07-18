import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import SearchInput from "../../components/Search";

const Products = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("https://127.0.0.1:8000/api/products");
      console.log(res.data);
      setData(res.data["hydra:member"]);
      // (res.data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto pt-3">
      <SearchInput />
      <div className=" ">
        <div>
          <h2 className=" h2">Customers also purchased</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.length > 0 ? (
              <>
                {data.map((item, index) => (
                  <NavLink
                    key={index}
                    className="group relative"
                    to={`/product/${item.id}`}
                  >
                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                      <img
                        src="https://www.apple.com/v/iphone-13-pro/f/images/overview/design/water_resistant__ddhg6jxs53yq_large_2x.jpg"
                        alt="Front of men&#039;s Basic Tee in black."
                        className="object-center object-cover"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <div>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            ></span>
                            {item.name}
                          </div>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">Black</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ${item.price}
                      </p>
                    </div>
                  </NavLink>
                ))}
              </>
            ) : (
              <h4 className="text-center">No Products</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
