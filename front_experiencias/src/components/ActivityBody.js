import { useRemoteUrl } from "../http/api";
import { useParams, useHistory } from "react-router-dom";
import { AuthContext } from "./providers/AuthProvider";
import { useContext, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Moment from "moment";
import ReactStars from "react-rating-stars-component";
import { GiCircle, GiPlainCircle } from "react-icons/gi";
import { url } from "../http/api";

const ListValoraciones = ({ datos = [] }) => {
  return datos.map((dato, index) => (
    <li key={index}>
      <img
        src={
          dato.photo_user === null
            ? "/img/defaultAvatar.png"
            : `${url}/uploads/img/${dato.photo_user}`
        }
        alt="foto de usuario"
      />
      <div>
        <h3>{dato.first_name}</h3>
        <ReactStars
          count={5}
          size={14}
          value={dato.rating}
          edit={false}
          emptyIcon={<GiCircle />}
          filledIcon={<GiPlainCircle />}
          activeColor="#e07a5f"
        />
      </div>
    </li>
  ));
};

const ListLibres = ({ datos = [], className }) => {
  return datos.map((dato, index) => (
    <li key={index} className={className}>
      <img src="/img/default-white.png" alt="plaza libre" />
    </li>
  ));
};

const ListOcupadas = ({ datos = [], className }) => {
  return datos.map(dato => (
    <li key={dato.id} className={className}>
      <img
        src={
          dato.photo === null
            ? "/img/defaultAvatar.png"
            : `${url}/uploads/img/${dato.photo}`
        }
        alt="foto de usuario"
      />
    </li>
  ));
};

export const ActivityBody = () => {
  let { actId } = useParams();
  const [datos, errorMessage] = useRemoteUrl(`/activity/${actId}`);

  const history = useHistory();
  const [auth] = useContext(AuthContext);
  const [acceso, setAcceso] = useState(true);

  const handleClick = () => {
    if (auth === "") {
      setAcceso(false);
    } else {
      history.push(`/activity/${actId}/contract`);
    }
  };

  let valoracion = datos.valoraciones;
  let activity;
  let plazas;

  if (datos.length <= 0) {
    activity = "nanananananna";
    plazas = "batman";
  } else {
    activity = datos.act;
    plazas = datos.plazas;
  }

  let arrayLibres;
  if (plazas.PlazasLibres <= 0) {
    arrayLibres = [];
  } else {
    arrayLibres = new Array(plazas.PlazasLibres).fill("");
  }

  const fecha = Moment(activity.fecha).format("DD/MM/YYYY");

  return (
    <section className="activityBody">
      <section className="actMainBody">
        <h2>{activity.name_act}</h2>
        <Carousel>
          <div>
            <img
              src={`${url}/uploads/img/${activity.photo_act}`}
              alt="imagen actividad 1"
            />
          </div>
          <div>
            <img
              src={`${url}/uploads/img/${activity.photo2}`}
              alt="imgen actividad 2"
            />
          </div>
          <div>
            <img
              src={`${url}/uploads/img/${activity.photo3}`}
              alt="imagen actividad 3"
            />
          </div>
          <div>
            <img
              src={`${url}/uploads/img/${activity.photo4}`}
              alt="imagen actividad 4"
            />
          </div>
          <div>
            <img
              src={`${url}/uploads/img/${activity.photo5}`}
              alt="imagen actividad 5"
            />
          </div>
        </Carousel>
        <p>{activity.description_act}</p>
      </section>
      <aside>
        <h3>Resumen de la actividad</h3>
        <p>{activity.summary_act}</p>
        <ul>
          <li>
            <ul>
              <li>{activity.location}</li>
              <li>{activity.places} plazas</li>
              <li>{activity.price}€</li>
            </ul>
          </li>
          <li className="liFecha">{fecha}</li>
        </ul>
        <button onClick={handleClick}>Contratar</button>
        {acceso ? null : <p>Necesitas estar registrado para poder acceder.</p>}
        <ul className="ulPlazas">
          <ListOcupadas datos={datos.fotos} className="ocupadas" />
          <ListLibres datos={arrayLibres} className="libres" />
        </ul>
      </aside>
      <ul className="ratingAct">
        <ListValoraciones datos={valoracion} />
      </ul>
      <p>{errorMessage.message}</p>
    </section>
  );
};
