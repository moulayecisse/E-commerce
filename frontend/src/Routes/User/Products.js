import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import SearchInput from "../../components/Search";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "./slices/cartSlice";
import ReactPaginate from "react-paginate";

const Products = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [data, setData] = useState([]);
  const itemsPerPage = 8;
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.products);
  // const { data, error, isLoading } = useGetAllProductsQuery();
  // console.log("Api", data);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const { search } = useLocation();
  const parsed = queryString.parse(search);

  const categorie = parsed.categorie;

  const getData = async () => {
    try {
      const res = await axios.get("https://127.0.0.1:8000/api/products", {
        params: {
          "categories.slug": categorie,
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
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  }, [data]);

  useEffect(() => {
    getData();
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="container mx-auto">
      <div className=" mx-auto flex justify-center pt-10 ">
        <SearchInput />
      </div>

      <div className="bg-white">
        <div className="home-container">
          {status === "success" ? (
            <>
              <h3>New Arrivals </h3>
              <div className="products">
                {currentItems &&
                  currentItems?.map((product, index) => (
                    <div key={index} className="product">
                      <h3 className="md:whitespace-line   whitespace-normal">
                        {product.name}
                      </h3>
                      {product.image && (
                        <img
                          className="m-0 p-0"
                          src={`https://localhost:8000${product.image.contentUrl}`}
                          alt={product.name}
                        />
                      )}
                      <div className="details">
                        <span>{product.desc}</span>
                        <span className="price">${product.price}</span>
                      </div>
                      <button
                        className="button mb-12"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add To Cart
                      </button>
                      <NavLink className="button" to={`/product/${product.id}`}>
                        Voir plus
                      </NavLink>
                    </div>
                  ))}
              </div>
              <div className="flex items-center justify-between border-t border-gray-300 bg-white px-4 py-3 sm:px-6">
                <div>
                  <p className="  text-gray-600">
                    Showing <span className="font-normal">1</span> to{" "}
                    <span className="font-normal">10</span> of{" "}
                    <span className="font-normal">97</span> results
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
                    "relative z-0 inline-flex rounded shadow-md -space-x-px"
                  }
                  pageLinkClassName={
                    "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border   font-normal"
                  }
                  previousLinkClassName={
                    "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border   font-normal"
                  }
                  nextLinkClassName={
                    "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border   font-normal"
                  }
                  breakClassName={
                    "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border   font-normal"
                  }
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              </div>
            </>
          ) : status === "pending" ? (
            <p>Loading...</p>
          ) : (
            <p>Unexpected error occured...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
