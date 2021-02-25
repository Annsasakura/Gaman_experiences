import { useLocation, useHistory } from "react-router-dom";
import { url } from "../http/api";

export function Validate() {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const history = useHistory();

  const code = query.get("code");
  const email = query.get("email");

  const handleClick = async (e) => {
    e.preventDefault();

    await fetch(`${url}/validate/?code=${code}&email=${email}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    });
    history.push("/login");
  };

  return (
    <section className="validate">
      <h2>Validación de cuenta</h2>
      <p>
        Haz click en el botón de abajo para unirte definitivamente a nuestra
        familia.
      </p>
      <button onClick={handleClick}>Confirmar</button>
    </section>
  );
}
