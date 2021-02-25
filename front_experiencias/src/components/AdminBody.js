import { Link } from "react-router-dom";
import { useAuthUrl } from "../http/api";
import { useState, useContext } from "react";
import { AuthContext } from "./providers/AuthProvider";
import { url } from "../http/api";

const ListActivities = ({ datos = [], auth, setError, refetchActivities }) => {
  const handleClick = (actId) => async () => {
    const res = await fetch(`${url}/admin/${actId}`, {
      method: "DELETE",
      headers: {
        Authorization: auth,
      },
    });

    if (res.status !== 200) {
      setError(await res.json());
    } else {
      refetchActivities();
    }
  };
  return datos.map((dato) => (
    <li key={dato.id_activity}>
      <div>
        <h3>{dato.name_act}</h3>
        <p>{dato.fecha}</p>
      </div>
      <div>
        <p>
          <Link to={`/admin/edit/${dato.id_activity}`}>editar</Link> /
          <button onClick={handleClick(dato.id_activity)}>borrar</button>
        </p>
      </div>
    </li>
  ));
};

export const AdminBody = () => {
  const [datos, errorMessage, , refetch] = useAuthUrl("/admin/activities");
  const [auth, setAuth] = useContext(AuthContext);
  const [allErrorMessage, setAllErrorMessage] = useState(errorMessage);
  const activity = datos.activities;

  return (
    <div className="admin-body">
      <div className="admin-header">
        <Link to="/" onClick={(e) => setAuth("")}>
          Cerrar Sesión
        </Link>
        <Link to="/admin/createAct">Crear</Link>
        <Link to="/">Inicio</Link>
      </div>
      <h2>Lista de actividades</h2>
      <p>{allErrorMessage.message}</p>
      <ul className="admin-act">
        <ListActivities
          datos={activity}
          setError={setAllErrorMessage}
          auth={auth}
          refetchActivities={refetch}
        />
      </ul>
    </div>
  );
};
