import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [datos, setDatos] = useState(
    JSON.parse(window.localStorage.getItem(key)) || initialValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(datos));
  }, [datos, key]);
  return [datos, setDatos];
};
