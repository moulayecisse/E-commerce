import Label from "../../../components/label";
import Input from "../../../components/input";
import Button from "../../../components/button";
import Errors from "../../../components/errors";
import Select from "../../../components/select";
import axios from "axios";
import swal from "sweetalert";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Register() {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [slug, setSlug] = useState("");
  const [stock, setStock] = useState(0);
  const [categories, setCategories] = useState("");
  const [errors, setErrors] = useState([]);

  const [datacategories, setDataCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const res = await axios.get("https://127.0.0.1:8000/api/categories");
      console.log(res.data["hydra:member"]);
      setDataCategories(res.data["hydra:member"]);
      // (res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async () => {
    const product = { description, name, price, slug, stock, categories };
    product.price = parseFloat(product.price);
    product.stock = parseInt(product.stock);
    try {
      console.log(product);
      const resp = await axios.post(
        "https://127.0.0.1:8000/api/products",
        product
      );
      console.log(resp.data);
      swal(resp.data.message);
    } catch (error) {
      if (error.response) {
        console.log(error);
        // setErrors(Object.values(error.response.data.validation_errors))
      }
    }
  };

  return (
    <>
      <div>
        <title>E-commerce ajouter article</title>
      </div>

      <div className={"w-1/2 mx-auto bg-white p-5 rounded-lg"}>
        <Errors className="mb-5" errors={errors} />

        <div>
          <Label htmlFor="email">Nom de l'article</Label>

          <Input
            id="name"
            type="text"
            value={name}
            className="block mt-1 w-full"
            onChange={(event) => setName(event.target.value)}
            required
            autoFocus
            autoComplete="off"
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="email">Description</Label>

          <Input
            id="description"
            type="text"
            value={description}
            className="block mt-1 w-full"
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="password">Prix</Label>

          <Input
            id="text"
            type="number"
            value={price}
            className="block mt-1 w-full"
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="password">Stock</Label>

          <Input
            id="stock"
            type="number"
            value={stock}
            className="block mt-1 w-full"
            onChange={(event) => setStock(event.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="password">slug</Label>

          <Input
            id="slug"
            type="text"
            value={slug}
            className="block mt-1 w-full"
            onChange={(event) => setSlug(event.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="countries">Categorie</label>
          <select
            onChange={(event) => setCategories(event.target.value)}
            className=" "
          >
            {datacategories.map((option) => (
              <option value={`api/categories/${option.id}`}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* <Select data={categories} /> */}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cover photo
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button onClick={signup} className="ml-3">
            Register
          </Button>
        </div>
      </div>
    </>
  );
}
