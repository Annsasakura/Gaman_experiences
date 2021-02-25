import { UserMenu } from "./UserMenu";
import { useAuthUrl } from "../http/api";
import { ListResults } from "./ResaultsSearch";
import { useState } from "react";
import { url } from "../http/api";

const ListBooking = ({ datos = [] }) => {
  return datos.map((data = []) => (
    <li key={data.id_activity}>
      <img
        src={`${url}/uploads/img/${data.photo_act}`}
        alt="imagen actividad"
      />
      <h3>{data.name_act}</h3>
      <p>{data.fecha}</p>
    </li>
  ));
};

export const UserBodyBookings = () => {
  const [data, errorMessage] = useAuthUrl("/user/booking/");
  const [verTodo, setVerTodo] = useState(true);
  const [verTodo2, setVerTodo2] = useState(true);

  const porDisfrutar = data.PorDisfrutar;
  const disfrutadas = data.disfrutadas;
  let limitPorDisfrutar;
  let limitDisfrutadas;

  if (data.length <= 0) {
    limitPorDisfrutar = [];
    limitDisfrutadas = [];
  } else {
    limitPorDisfrutar = porDisfrutar.filter((enjoied, index) => index < 2);
    limitDisfrutadas = disfrutadas.filter((enjoied, index) => index < 2);
  }
  return (
    <div className="userBook-Rate">
      <UserMenu />
      <div className="book-rate-data">
        <h1>Mis reservas</h1>
        <div className="up-book-rate-data">
          <h2>Por Disfrutar</h2>
          <button onClick={(e) => setVerTodo(!verTodo)}>
            {verTodo ? "Ver todo" : "Ver menos"}
          </button>
        </div>
        <ul>
          {verTodo ? (
            <ListResults datos={limitPorDisfrutar} />
          ) : (
            <ListResults datos={porDisfrutar} />
          )}
        </ul>
        <div className="up-book-rate-data">
          <h2>Disfrutadas</h2>
          <button onClick={(e) => setVerTodo2(!verTodo2)}>
            {verTodo2 ? "Ver todo" : "Ver menos"}
          </button>
        </div>
        <ul>
          {verTodo2 ? (
            <ListBooking datos={limitDisfrutadas} />
          ) : (
            <ListBooking datos={disfrutadas} />
          )}
        </ul>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};
