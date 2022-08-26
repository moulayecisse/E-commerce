import Label from "../../../components/label";
import Input from "../../../components/input";
import Button from "../../../components/button";
import Errors from "../../../components/errors";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form";

export default function Register() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
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
    const apiErrors = {};
    try {
      const res = await axios.get("https://localhost:8000/api/categories");
      console.log(res.data["hydra:member"]);
      setDataCategories(res.data["hydra:member"]);
    } catch (error) {
      const { violations } = error.response.data;
      if (violations) {
        console.log(error.response.data.violations);
        violations.forEach((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        console.log(apiErrors);
        setErrors(Object.values(apiErrors));
      }
    }
  };
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);

    await fetch("https://localhost:8000/api/media_objects", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        const imgId = result.id;
        console.log("result.id: ", result.id);

        addProduct(imgId);

        // console.warn(result.id);
      })

      .catch((error) => console.error("error", error));
  };
  //console.log(imageId)
  const addProduct = async (imgId = 110, image) => {
    const click = 0;
    const product = {
      description,
      name,
      price,
      slug,
      stock,
      categories,
      image,
      click,
    };
    product.price = parseFloat(product.price);
    product.stock = parseInt(product.stock);

    product.image = "api/media_objects/" + imgId;

    try {
      axios
        .request({
          method: "POST",
          url: "https://localhost:8000/api/products",
          headers: {
            accept: "application/ld+json",
            "Content-Type": "application/ld+json",
          },
          data: product,
        })
        .then(function (response) {
          console.log(response.data);
          toast.success("Votre article a bien éte ajouté", {
            autoClose: 1500,
          });
          navigate(-1);
        })
        .catch(function (error) {
          console.error(error);
        });
      console.log(product);
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
      <button
        onClick={() => navigate(-1)}
        className="rounded-full bg-violet-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >
        Back
      </button>
      <div className={"mx-auto w-1/2 rounded-lg bg-white p-5"}>
        <ToastContainer position="top-right" outoClose={3000} />
        <Errors className="mb-5" errors={errors} />

        <div>
          <Label htmlFor="email">Nom de l'article</Label>

          <Input
            id="name"
            type="text"
            value={name}
            className="mt-1 block w-full"
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
            className="mt-1 block w-full"
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
            className="mt-1 block w-full"
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
            className="mt-1 block w-full"
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
            className="mt-1 block w-full"
            onChange={(event) => setSlug(event.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="countries">Categorie</label>
          <select
            onChange={(event) => setCategories(event.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            {datacategories.map((option) => (
              <option value={`api/categories/${option.id}`}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cover photo
          </label>
          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
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
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file"
                    accept="image/*"
                    type="file"
                    {...register("file")}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Button onClick={handleSubmit(onSubmit)} className="ml-3">
            Ajouter un produit
          </Button>
        </div>
      </div>
    </>
  );
}
