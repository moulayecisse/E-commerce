import Label from "../../../components/label";
import Input from "../../../components/input";
import Button from "../../../components/button";
import Errors from "../../../components/errors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUsers = () => {
  const { id } = useParams();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [errors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    console.warn(id);

    getUser();
  }, []);

  const [data, setData] = useState([]);
  const getUser = async () => {
    try {
      const res = await axios.get("https://localhost:8000/api/users/" + id);
      console.warn(id);
      setData(res.data);
      // (res.data)
    } catch (error) {
      console.log(error);
    }
  };
  const updateUser = async () => {
    const user = { firstname, lastname, email };
    console.warn(id);
    try {
      console.log(user);
      const resp = await axios
        .request({
          method: "PATCH",
          url: "https://localhost:8000/api/users/1",
          headers: {
            accept: "application/ld+json",
            "Content-Type": "application/merge-patch+json",
          },
          data: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
          }),
        })
        .then(function (response) {
          console.warn(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
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
      <div className={"mx-auto w-1/2 rounded bg-white p-5"}>
        <Errors className="mb-5" errors={errors} />

        <div>
          <Label htmlFor="email">Prénom</Label>

          <Input
            id="firstname"
            type="text"
            defaultValue={data.firstname}
            className="mt-1 block w-full"
            onChange={(event) => setFirstname(event.target.value)}
            autoFocus
            autoComplete="off"
          />
        </div>
        <div>
          <Label htmlFor="email">Nom de l'utilisateur</Label>

          <Input
            id="lastname"
            type="text"
            defaultValue={data.lastname}
            className="mt-1 block w-full"
            onChange={(event) => setLastname(event.target.value)}
            autoFocus
            autoComplete="off"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            defaultValue={data.email}
            className="mt-1 block w-full"
            onChange={(event) => setEmail(event.target.value)}
            autoFocus
            autoComplete="off"
          />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Button onClick={updateUser} className="ml-3">
            Enregistrer
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdateUsers;
