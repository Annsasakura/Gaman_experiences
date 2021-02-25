import { UserMenu } from "./UserMenu";
import { useAuthUrl } from "../http/api";
import { useState, useContext } from "react";
import { AuthContext } from "./providers/AuthProvider";
import ReactStars from "react-rating-stars-component";
import { GiCircle, GiPlainCircle } from "react-icons/gi";
import { url } from "../http/api";

const ListRatingsRead = ({ datos = [] }) => {
  return datos.map((data = []) => (
    <li key={data.id_activity}>
      <img
        src={`${url}/uploads/img/${data.photo_act}`}
        alt="imagen actividad"
      />
      <h3>{data.name_act}</h3>

      <ReactStars
        count={5}
        size={18}
        value={data.rating}
        edit={false}
        emptyIcon={<GiCircle />}
        filledIcon={<GiPlainCircle />}
        activeColor="#e07a5f"
      />
    </li>
  ));
};

const ListRatings = ({ datos = [], refetchRating }) => {
  const [auth] = useContext(AuthContext);
  const [errorRat, setErrorRat] = useState("");

  const ratingChanged = (actId) => async (newRating) => {
    const res = await fetch(`${url}/user/rate/${actId}/${newRating}`, {
      method: "PUT",
      headers: { Authorization: auth },
    });
    if (res.status !== 200) {
      const json = await res.json();
      setErrorRat(json.message);
    } else {
      refetchRating();
    }
  };
  return datos.map((data = []) => (
    <li key={data.id_activity}>
      <img
        src={`${url}/uploads/img/${data.photo_act}`}
        alt="imagen actividad"
      />
      <h3>{data.name_act}</h3>
      <ReactStars
        count={5}
        size={18}
        value={data.rating}
        onChange={ratingChanged(data.id_activity)}
        emptyIcon={<GiCircle />}
        filledIcon={<GiPlainCircle />}
        activeColor="#e07a5f"
      />
      <p>{errorRat}</p>
    </li>
  ));
};

export const UserBodyRatings = () => {
  const [data, errorMessage, , refetch] = useAuthUrl("/user/rate");
  const [verTodo, setVerTodo] = useState(true);
  const [verTodo2, setVerTodo2] = useState(true);

  const porValorar = data.PorValorar;
  const valoradas = data.valoradas;
  let limitPorValorar;
  let limitValoradas;

  if (data.length <= 0) {
    limitPorValorar = [];
    limitValoradas = [];
  } else {
    limitPorValorar = porValorar.filter((enjoied, index) => index < 2);
    limitValoradas = valoradas.filter((enjoied, index) => index < 2);
  }

  return (
    <div className="userBook-Rate">
      <UserMenu />
      <div className="book-rate-data">
        <h1> Valoraciones</h1>
        <div className="up-book-rate-data">
          <h2>Por Valorar</h2>
          <button onClick={(e) => setVerTodo(!verTodo)}>
            {verTodo ? "Ver todo" : "Ver menos"}
          </button>
        </div>
        <ul>
          {verTodo ? (
            <ListRatings datos={limitPorValorar} refetchRating={refetch} />
          ) : (
            <ListRatings datos={porValorar} refetchRating={refetch} />
          )}
        </ul>
        <div className="up-book-rate-data">
          <h2>Valoradas</h2>
          <button onClick={(e) => setVerTodo2(!verTodo2)}>
            {verTodo2 ? "Ver todo" : "Ver menos"}
          </button>
        </div>
        <ul>
          {verTodo2 ? (
            <ListRatingsRead datos={limitValoradas} />
          ) : (
            <ListRatingsRead datos={valoradas} />
          )}
        </ul>
        <p>{errorMessage.message}</p>
      </div>
    </div>
  );
};
