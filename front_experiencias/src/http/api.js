import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/providers/AuthProvider";

export const url = "http://localhost:8081";

export const useRemoteUrl = (path) => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [timestamp, setTimestamp] = useState(new Date());

  const refetch = () => setTimestamp(new Date());
  useEffect(() => {
    async function getRemoteData() {
      const res = await fetch(`${url}${path}`, {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });

      if (res.status !== 200) {
        setErrorMessage(await res.json());
      } else {
        setData(await res.json());
      }
    }
    getRemoteData();
  }, [path, timestamp]);

  return [data, errorMessage, refetch];
};

export const useAuthUrl = (path) => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [timestamp, setTimestamp] = useState(new Date());
  const [auth] = useContext(AuthContext);
  const decodedAuth = DecodeTokenData(auth);

  const refetch = () => setTimestamp(new Date());
  useEffect(() => {
    async function getRemoteData() {
      const res = await fetch(`${url}${path}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: auth,
        },
      });

      if (res.status !== 200) {
        setErrorMessage(await res.json());
      } else {
        setData(await res.json());
      }
    }
    getRemoteData();
  }, [path, auth, timestamp]);

  return [data, errorMessage, decodedAuth, refetch];
};

export const DecodeTokenData = (token) => {
  if (!token) {
    return null;
  }
  const tokenPieces = token.split(".");
  const tokenBase64 = tokenPieces[1];
  const decodedToken = atob(tokenBase64);
  return JSON.parse(decodedToken);
};
