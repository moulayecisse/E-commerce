import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { addToCart } from "./slices/cartSlice";
import { useDispatch } from "react-redux";
import ReactStars from "react-stars";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetails = () => {
  // les articles plus consultés
  let dispatch = useDispatch();
  let { id } = useParams();
  id = parseInt(id);
  //   console.warn(id);
  let [data, setData] = useState({});
  let [click, setClick] = useState();
  useEffect(() => {
    getProduct();
    // getNotation();
  }, []);
  let patchClick = (data) => {
    console.warn(data.click);
    setClick(data.click ?? 0);

    axios
      .request({
        method: "PATCH",
        url: "https://localhost:8000/api/products/254",
        headers: {
          accept: "application/ld+json",
          "Content-Type": "application/merge-patch+json",
        },
        data: '{ "click": ' + (click + 1) + "}",
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  let getProduct = () => {
    axios
      .request({
        method: "GET",
        url: "https://localhost:8000/api/products/" + id,
        headers: { accept: "application/json" },
      })
      .then(function (response) {
        console.warn(response.data.click);
        setData(response.data);
        patchClick(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // navigate("product/cart");
  };
  const ratingChanged = (newRating) => {
    // console.warn(newRating);

    axios({
      method: "post",
      url: "https://localhost:8000/api/notations",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      data: JSON.stringify({
        commentary: "string",
        suggestions: "string",
        notationDate: new Date().toISOString().slice(0, 19).replace("T", " "),
        rankingStars: newRating,
        productId: "/api/products/" + id,
        userId: "/api/users/72",
      }),
    })
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  // const [selectedColor, setSelectedColor] = useState(product.colors[0])
  // const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const reviews = { href: "#", average: 4, totalCount: 117 };
  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item container">
              <div className="flex items-center">
                {data.categories && (
                  <a href={data.categories.name}>{data.categories.name}</a>
                )}
              </div>
            </li>
          </ol>
        </nav>
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="">
            {data.image && (
              <img
                src={`https://localhost:8000${data.image.contentUrl}`}
                alt={data.name}
              />
            )}
          </div>
        </div>
        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {data.name}
            </h1>
          </div>
          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">{data.price} € </p>
            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    half={false}
                    color2={"#ffd700"}
                  />
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>
            <form className="mt-10">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
              </div>
              <div className=" text-2xl">
                {" "}
                {data.stock === 0
                  ? " rupture de stock"
                  : data.stock + " examplaires disponible"}
              </div>
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => handleAddToCart(data)}
              >
                Add to bag
              </button>
            </form>
          </div>
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{data.description}</p>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{data.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
