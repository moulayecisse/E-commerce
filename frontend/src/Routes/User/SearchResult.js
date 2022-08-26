import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import SearchInput from "../../components/Search";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./slices/cartSlice";
const SearchResult = () => {
  const [data, setData] = useState([]);
  const { search } = useLocation();
  const [datacategories, setDataCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const parsed = queryString.parse(search);

  const title = parsed.name;
  const categorie = parsed.categorie;
  const dispatch = useDispatch();
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
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get("https://localhost:8000/api/categories");
      // console.log(res.data['hydra:member'])
      setDataCategories(res.data["hydra:member"]);
      // (res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="container mx-auto">
      <div className=" mx-auto flex w-screen justify-center pt-10 ">
        <SearchInput />
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            {" "}
            Resultat de recherche{" "}
            <span className="text-3xl text-red-500">{data.length}</span>{" "}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.length > 0 ? (
              <>
                {data.map((item, index) => (
                  <div key={index} className="item">
                    <div className="item_header">
                      <NavLink to={`/item/${item.id}`}>
                        {item.image && (
                          <img
                            src={`https://localhost:8000${item.image.contentUrl}`}
                            alt={item.name}
                          />
                        )}
                      </NavLink>
                    </div>

                    <div className="item_footer">
                      <h3>
                        <NavLink className="" to={`/item/${item.id}`}>
                          {item.name}
                        </NavLink>
                      </h3>

                      <span className="price">{item.price}€</span>
                      <button
                        className="add"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
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
