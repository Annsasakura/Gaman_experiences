import { useAuthUrl } from "../http/api";
import { useParams, Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "./providers/AuthProvider";
import { url } from "../http/api";

export const ContractBody = () => {
  let { actId } = useParams();
  const [datos, errorAuthUrl] = useAuthUrl(`/activity/${actId}/contract`);
  const [auth] = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(errorAuthUrl);
  const history = useHistory();

  let resumen;
  if (datos.length <= 0) {
    resumen = "Batman";
  } else {
    resumen = datos.resumen;
  }

  const handleClick = async (e) => {
    e.preventDefault();

    const res = await fetch(`${url}/activity/${actId}/contract`, {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        Authorization: auth,
      },
    });

    if (res.status !== 200) {
      setErrorMessage(await res.json());
    } else {
      await res.json();
      return history.push("/user/bookings");
    }
  };

  return (
    <section className="confirmContract">
      <h2>Confírmanos tu inscripción</h2>
      <h3>{resumen.Actividad}</h3>

      <p>{resumen.Resumen}</p>
      <ul>
        <li>{resumen.fecha}</li>
        <li>{resumen.price}€</li>
      </ul>
      <div className="linkconfirm">
        <Link to={`/activity/${actId}`}>Cancelar</Link>
        <Link to="/user/bookings" onClick={handleClick}>
          Contratar
        </Link>
      </div>

      <div>
        {errorMessage.message && (
          <>
            <p>{errorMessage.message}</p>
            <Link to="/user">Ir a Perfil</Link>
          </>
        )}
      </div>
      <img src="/img/imgContract.png" alt="confirmar" />
    </section>
  );
};
