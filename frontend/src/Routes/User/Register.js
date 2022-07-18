import Label from "../../components/label";
import Input from "../../components/input";
import Button from "../../components/button";
import Errors from "../../components/errors";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [password_confirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([]);

  const signup = async () => {
    const user = { firstname, lastname, email, password };
    const apiErrors = {};
    try {
      const resp = await axios.post("https://127.0.0.1:8000/api/users", user);
      console.log(resp.data);
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

      <div className={"w-1/2 mx-auto bg-white p-5 mt-3 rounded-lg"}>
        <Errors className="mb-5" errors={errors} />
        <div>
          <Label htmlFor="email">Prénom</Label>

          <Input
            id="firstname"
            type="text"
            value={firstname}
            className="block mt-1 w-full"
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
            className="block mt-1 w-full"
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
            className="block mt-1 w-full"
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
            className="block mt-1 w-full"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
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
