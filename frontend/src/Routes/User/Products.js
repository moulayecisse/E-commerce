import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import illustration from "./water_resistant__ddhg6jxs53yq_large_2x.jpg";
import SearchInput from "../../components/Search";

const Products = (props) => {
  const [data, setData] = useState([]);
  let cart = {};
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("https://127.0.0.1:8000/api/products");
      console.log(res.data);
      setData(res.data["hydra:member"]);
    } catch (error) {
      console.log(error);
    }
  };
  let addToCart = async (id) => {
    let cartContent = localStorage.getItem("cart");
    let item = {
      id: id,
      quantity: 1,
    };
    if (cartContent) {
      cart = JSON.parse(cartContent);
      if (cart[id]) {
        cart[id].quantity += 1;
      } else {
        cart[id] = item;
      }
    } else {
      cart[id] = item;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  let removeFromCart = async (id) => {
    let cartContent = localStorage.getItem("cart");
    if (cartContent) {
      cart = JSON.parse(cartContent);
      if (cart[id]) {
        cart[id].quantity -= 1;
        if (cart[id].quantity === 0) {
          delete cart[id];
        }
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  function handleChange(e) {
    e.stopPropagation();
    e.preventDefault();
    console.warn(e.target.value);
    addToCart(e.target.value);
  }

  return (
    <div className="container mx-auto pt-3">
      <SearchInput />
      <div className=" ">
        <div>
          <h2 className=" h2">Customers also purchased</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.length > 0 ? (
              <>
                {data.map((item, key) => (
                  <>
                    <div className="container">
                      <div class="container">
                        <NavLink
                          key={key}
                          className=" "
                          to={`/product/${item.id}`}
                        >
                          <div
                            class="card"
                            style={{
                              width: "10em",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={illustration}
                              alt="Front of men&#039;s Basic Tee in black."
                              className="card-img-top"
                            />
                          </div>
                        </NavLink>
                      </div>

                      <div className="container">
                        <div className="">
                          <button
                            key={key}
                            value={item.id}
                            className="
                               
                              btn btn-secondary btn-block my-3"
                            onClick={handleChange}
                          >
                            Add
                          </button>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              <div>{item.name}</div>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">Black</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ${item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
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
Products.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool,
  }).isRequired,
};
const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 500ms linear;
  }

  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 500ms linear;
  }

  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
    }

    .card-footer {
      background: rgba(247, 247, 247);
    }
  }

  .img-container {
    position: relative;
    overflow: hidden;
  }

  .card-img-top {
    transition: all 500ms linear;
  }

  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }

  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    ${"" /* font-size: 1.4rem; */}
    border-radius: 0.5rem 0 0 0;
    transition: all 300ms linear;
    transform: translate(100%, 100%);
  }

  .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }

  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }
`;
