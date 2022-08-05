import Label from "../../../components/label";
import Input from "../../../components/input";
import Button from "../../../components/button";
import Errors from "../../../components/errors";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(10);
  const [slug, setSlug] = useState("slug");
  const [stock, setStock] = useState(20);
  const [categories, setCategories] = useState("/api/categories/1");
  const [errors] = useState([]);

  const [datacategories, setDataCategories] = useState([]);
  const [item, setData] = useState([]);
  console.log(item);

  useEffect(() => {
    getProduct();
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const res = await axios.get("https://localhost:8000/api/categories");
      console.log(res.data["hydra:member"]);
      setDataCategories(res.data["hydra:member"]);
      // (res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const res = await axios.get("https://localhost:8000/api/products/" + id);
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
      const resp = await axios
        .request({
          method: "PATCH",
          url: "https://localhost:8000/api/products/" + id,
          headers: {
            accept: "application/ld+json",
            "Content-Type": "application/merge-patch+json",
          },
          data: JSON.stringify({
            name: name,
            slug: slug,
            description: "description",
            price: parseFloat(product.price),
            stock: parseInt(product.stock),
            categories: "/api/categories/2",
          }),
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
      navigate(-1);
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

      <div className={"mx-auto w-1/2 rounded bg-white p-5"}>
        <Errors className="mb-5" errors={errors} />

        <div>
          <Label htmlFor="email">Nom de l'article</Label>

          <Input
            id="name"
            type="text"
            defaultValue={item.name}
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
            defaultValue={item.description}
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
            defaultValue={item.price}
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
            defaultValue={item.stock}
            className="mt-1 block w-full"
            onChange={(event) => setStock(event.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="countries">Categorie</label>
          <select
            onChange={(event) => setCategories(event.target.value)}
            className="focus:ring- indigo-500 focus:border- indigo-500   dark:focus:ring- indigo-500 dark:focus:border- indigo-500 block w-full rounded border border-gray-300 bg-gray-600 p-2.5 text-gray-800 dark:border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
          >
            {datacategories.map((option) => (
              <option key={option.id} value={`api/categories/${option.id}`}>
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
            className="mt-1 block w-full"
            onChange={(event) => setSlug(event.target.value)}
            required
          />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Button onClick={updateProduct} className="ml-3">
            Enregistrer
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
