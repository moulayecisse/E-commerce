import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import SearchInput from "../../components/Search";
import queryString from "query-string";

const SearchResult = () => {
  const [data, setData] = useState([]);
  const { search } = useLocation();
  const [datacategories, setDataCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const parsed = queryString.parse(search);

  const title = parsed.name;

  useEffect(() => {
    getData();
    getCategories();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`https://localhost:8000/api/products`, {
        params: {
          name: title,
          page: 1,
        },
      });
      console.log(res);
      setData(res.data["hydra:member"]);
      // (res.data)
    } catch (error) {
      console.error(error);
    }
  };

  function handleCategoryChange(data) {
    setSelectedCategory(data);
    console.log(selectedCategory);
  }

  const getCategories = async () => {
    try {
      const res = await axios.get("https://localhost:8000/api/categories");
      // console.log(res.data['hydra:member'])
      setDataCategories(res.data["hydra:member"]);
      // (res.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className=" mx-auto flex w-screen justify-center pt-10 ">
        <div>
          {datacategories.map((categorie, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(categorie.name)}
              value={categorie.name}
            >
              {categorie.name}
            </button>
          ))}{" "}
        </div>
        <SearchInput />
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h3 className="text-xl font-bold  text-gray-800">
            {" "}
            Resultat de recherche{" "}
            <span className="text-xl text-red-500">{data.length}</span>{" "}
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.length > 0 ? (
              <>
                {data.map((item, index) => (
                  <NavLink
                    key={index}
                    className="group relative"
                    to={`/product/${item.id}`}
                  >
                    <div className="min-h-80 aspect-w-1 aspect-h-1 lg:aspect-none w-full overflow-hidden rounded  group-hover:opacity-75 lg:h-60">
                      <img
                        src="https://www.apple.com/v/iphone-13-pro/f/images/overview/design/water_resistant__ddhg6jxs53yq_large_2x.jpg"
                        alt="Front of men&#039;s Basic Tee in black."
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="  text-gray-600">
                          <div>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            ></span>
                            {item.name}
                          </div>
                        </h3>
                        <p className="mt-1   text-gray-500">Black</p>
                      </div>
                      <p className="  font-normal text-gray-800">
                        ${item.price}
                      </p>
                    </div>
                  </NavLink>
                ))}
              </>
            ) : (
              <h3 className="text-center">pas de result</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
