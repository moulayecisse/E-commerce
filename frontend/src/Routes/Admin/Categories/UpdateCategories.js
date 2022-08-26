import Label from "../../../components/label";
import Input from "../../../components/input";
import Button from "../../../components/button";
import Errors from "../../../components/errors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategories = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  const [data, setData] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get(
        "https://localhost:8000/api/categories/" + id
      );
      console.log(res);
      setData(res.data);
      // (res.data)
    } catch (error) {
      console.log(error);
    }
  };
  const updateCategorie = async () => {
    const categorie = { name, slug };
    try {
      console.log(categorie);
      const response = await axios
        .request({
          method: "PATCH",
          url: "https://localhost:8000/api/categories/" + id,
          headers: {
            accept: "application/ld+json",
            "Content-Type": "application/merge-patch+json",
          },
          data: categorie,
        })
        .then(function (response) {
          console.warn(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
      navigate(-1);
    } catch (error) {
      if (error.response) {
        console.error(error);
        // setErrors(Object.values(error.response.data.validation_errors))
      }
    }
  };
  return (
    <>
      <div>
        <title>E-commerce ajouter categorie</title>
      </div>

      <div className={"mx-auto w-1/2 rounded-lg bg-white p-5"}>
        <Errors className="mb-5" errors={errors} />

        <div>
          <Label htmlFor="email">Nom de Categorie</Label>

          <Input
            id="name"
            type="text"
            defaultValue={data.name}
            className="mt-1 block w-full"
            onChange={(event) => setName(event.target.value)}
            required
            autoFocus
            autoComplete="off"
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="email">Slug</Label>

          <Input
            id="description"
            type="text"
            defaultValue={data.slug}
            className="mt-1 block w-full"
            onChange={(event) => setSlug(event.target.value)}
            required
          />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Button onClick={updateCategorie} className="ml-3">
            Enregistrer
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdateCategories;
