import { useState } from "react";
import { UserFormRegister } from "./Forms";
import { useHistory } from "react-router-dom";
import { url } from "../../http/api";

export const RegisterForm = () => {
  const [nombre, setNombre] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch(`${url}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        nombre,
        fechaNac,
        email,
        password,
        repeatPassword,
      }),
    });

    if (res.status !== 200) {
      setErrorMessage(await res.json());
    } else {
      await res.json();
      return history.push("/login");
    }
  };

  return (
    <UserFormRegister
      handleRegister={handleRegister}
      nombre={nombre}
      setNombre={setNombre}
      fechaNac={fechaNac}
      setFechaNac={setFechaNac}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      repeatPassword={repeatPassword}
      setRepeatPassword={setRepeatPassword}
      errorMessage={errorMessage}
    />
  );
};
