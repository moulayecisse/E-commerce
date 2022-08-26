import Label from "../../components/label";
import Input from "../../components/input";
import Button from "../../components/button";
import Errors from "../../components/errors";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [password_confirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([]);

  const signup = async () => {
    const user = { firstname, lastname, email, password };
    const apiErrors = {};
    try {
      const resp = await axios.post("https://localhost:8000/api/users", user);
      console.log(resp.data);
      navigate("/login");
      toast.success("Félicitation, vous êtes inscrit avec succès", {
        autoClose: 1500,
      });
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

  return (
    <>
      <div>
        <title>ergodnc — Register</title>
      </div>

      <div className={"mx-auto w-1/2 rounded-lg bg-white p-5"}>
        <Errors className="mb-5" errors={errors} />
        <ToastContainer position="top-right" outoClose={3000} />
        <div>
          <Label htmlFor="email">Prénom</Label>

          <Input
            id="firstname"
            type="text"
            value={firstname}
            className="mt-1 block w-full"
            onChange={(event) => setFirstName(event.target.value)}
            required
            autoFocus
            autoComplete="off"
          />
        </div>

        <div>
          <Label htmlFor="lastname">Nom</Label>

          <Input
            id="lastname"
            type="text"
            value={lastname}
            className="mt-1 block w-full"
            onChange={(event) => setLastName(event.target.value)}
            required
            autoFocus
            autoComplete="off"
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            value={email}
            className="mt-1 block w-full"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="password">Password</Label>

          <Input
            id="password"
            type="password"
            value={password}
            className="mt-1 block w-full"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Button onClick={signup} className="ml-3">
            Register
          </Button>
        </div>
      </div>
    </>
  );
}
