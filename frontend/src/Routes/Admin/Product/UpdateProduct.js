import Label from "../../../components/label";
import Input from "../../../components/input";
import Button from "../../../components/button";
import Errors from "../../../components/errors";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  console.log(id);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [slug, setSlug] = useState("");
  const [stock, setStock] = useState(0);
  const [categories, setCategories] = useState("");
  const [errors, setErrors] = useState([]);

  const [datacategories, setDataCategories] = useState([]);
  const [item, setData] = useState([]);
  console.log(item);

  useEffect(() => {
    getProduct();
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

  const getProduct = async () => {
    try {
      const res = await axios.get("https://127.0.0.1:8000/api/products/" + id);
      console.log(res);
      setData(res.data);
      // (res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async () => {
    const product = { description, name, price, slug, stock, categories };
    product.price = parseFloat(product.price);
    product.stock = parseInt(product.stock);

    try {
      console.log(product);
      const resp = await axios.put(
        "https://127.0.0.1:8000/api/products/" + id,
        product
      );
      console.log(resp.data);
    } catch (error) {
      if (error.response) {
        console.log(error);

        //  setErrors(Object.values(error.response.data.validation_errors))
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
            defaultValue={item.name}
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
            defaultValue={item.description}
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
            defaultValue={item.price}
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
            defaultValue={item.stock}
            className="block mt-1 w-full"
            onChange={(event) => setStock(event.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="countries">Categorie</label>
          <select
            onChange={(event) => setCategories(event.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {datacategories.map((option) => (
              <option value={`api/categories/${option.id}`}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <Label htmlFor="password">slug</Label>

          <Input
            id="slug"
            type="text"
            defaultValue={item.slug}
            className="block mt-1 w-full"
            onChange={(event) => setSlug(event.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button onClick={updateProduct} className="ml-3">
            Enregistrer
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
