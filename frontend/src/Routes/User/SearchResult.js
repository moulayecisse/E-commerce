import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import SearchInput from "../../components/Search";

import queryString from "query-string";

const SearchResult = () => {
  const [data, setData] = useState([]);
  const { search } = useLocation();

  const parsed = queryString.parse(search);

  console.log(parsed.categorie);
  const title = parsed.name;
  const categorie = parsed.categorie;
  useEffect(() => {
    getData();
  }, []);

  const getData = async (search) => {
    try {
      const res = await axios.get(
        `https://localhost:8000/api/products?name=${title}&categories.id=${categorie}`
      );
      console.log(res.data);

      setData(res.data["hydra:member"]);
      // (res.data)
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data.length);
  return (
    <div className="container mx-auto">
      <div className=" flex p-6  flex-col w-96 mx-auto h-32 ">
        <SearchInput />
      </div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            {" "}
            Resultat de recherche{" "}
            <span className="text-red-500 text-3xl">{data.length}</span>{" "}
          </h2>
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
                        className="img-fluid img-thumbnail"
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
              <h4 className="text-center">pas de result</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
