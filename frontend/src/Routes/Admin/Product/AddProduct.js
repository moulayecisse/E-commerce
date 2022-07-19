import Label from "../../../components/label";
import Input from "../../../components/input";
import Button from "../../../components/button";
import Errors from "../../../components/errors";
import axios from "axios";
import swal from "sweetalert";
import React, { useEffect, useState } from "react";

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
          <label className="">Cover photo</label>
          <div className=" ">
            <div className="space-y-1 text-center">
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className=" ">
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
