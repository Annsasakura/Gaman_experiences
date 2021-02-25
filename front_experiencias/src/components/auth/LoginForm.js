import { UserFormLogin } from "./Forms";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { AuthContext } from "../providers/AuthProvider";
import { url } from "../../http/api";

export const LoginForm = () => {
  const [, setAccesToken] = useLocalStorage("auth", "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setAuth] = useContext(AuthContext);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.status !== 200) {
      setErrorMessage(await res.json());
      setAuth("");
    } else {
      const json = await res.json();
      setAccesToken(json.token);
      setAuth(json.token);

      history.push("/");
    }
  };

  return (
    <UserFormLogin
      onSubmit={handleLogin}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      errorMessage={errorMessage}
    />
  );
};
