import Label from "../../../components/label";
import Input from "../../../components/input";
import Button from "../../../components/button";
import Errors from "../../../components/errors";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategorie = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const addCategorie = async () => {
    const categorie = { name, slug };
    try {
      console.log(categorie);
      const resp = await axios.post(
        "https://localhost:8000/api/categories",
        categorie
      );
      console.log(resp.data);
      navigate(-1);
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
        <title>E-commerce ajouter categorie</title>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="bg-violet-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Back
      </button>
      <div className={"w-1/2 mx-auto bg-white p-5 rounded-lg"}>
        <Errors className="mb-5" errors={errors} />

        <div>
          <Label htmlFor="email">Nom de Categorie</Label>

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
          <Label htmlFor="email">Slug</Label>

          <Input
            id="description"
            type="text"
            value={slug}
            className="block mt-1 w-full"
            onChange={(event) => setSlug(event.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button onClick={addCategorie} className="ml-3">
            Enregistrer
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddCategorie;
