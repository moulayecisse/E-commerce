import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Outlet } from "react-router-dom";
import SearchInput from "../../components/Search";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "./slices/cartSlice";
import ReactPaginate from "react-paginate";
import PopularCart from "../../components/PopularCart";

const Products = ({ category }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [data, setData] = useState([]);
  const itemsPerPage = 8;
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("https://127.0.0.1:8000/api/products", {
        params: {
          "categories.slug": category,
          "order[id]": "DESC",
        },
      });
      setData(data.data["hydra:member"]);
    };

    fetchData();
  }, [category]);

  const getData = async () => {
    try {
      const res = await axios.get("https://127.0.0.1:8000/api/products", {
        params: {
          "categories.slug": category,
          "order[id]": "DESC",
        },
      });
      setData(res.data["hydra:member"]);
      // (res.data)
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [data]);

  useEffect(() => {
    getData();
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="container">
      <div className=" mx-auto flex w-screen justify-center pt-10 ">
        <SearchInput />
      </div>

      <div className="container">
        <h1 className="text-center">Les articles les plus consultés</h1>
        <PopularCart />
      </div>

      <div className="container">
        <div className="items_wrapper">
          {status === "success" ? (
            <>
              <h2 className="title">Dernier produits</h2>
              <div className="products">
                {currentItems &&
                  currentItems?.map((product, index) => (
                    <div key={index} className="item">
                      <div className="item_header">
                        <NavLink to={`/product/${product.id}`}>
                          {product.image && (
                            <img
                              src={`https://localhost:8000${product.image.contentUrl}`}
                              alt={product.name}
                            />
                          )}
                        </NavLink>
                      </div>

                      <div className="item_footer">
                        <h3>
                          <NavLink className="" to={`/product/${product.id}`}>
                            {product.name}
                          </NavLink>
                        </h3>

                        <span className="price">{product.price}€</span>
                        <button
                          className="add"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">10</span> of{" "}
                    <span className="font-medium">97</span> results
                  </p>
                </div>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=" >"
                  onPageChange={handlePageClick}
                  pageCount={pageCount}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                  containerClassName={
                    "relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  }
                  pageLinkClassName={
                    "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  }
                  previousLinkClassName={
                    "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  }
                  nextLinkClassName={
                    "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  }
                  breakClassName={
                    "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  }
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              </div>
            </>
          ) : status === "pending" ? (
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <p>Unexpected error occured...</p>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Products;
