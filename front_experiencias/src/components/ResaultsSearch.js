import { Link, useLocation } from "react-router-dom";
import { BuscadorFiltro } from "./BuscadorFiltro";
import { useRemoteUrl } from "../http/api";
import { url } from "../http/api";

export const ListResults = ({ datos = [] }) => {
  return datos.map((dato) => (
    <li key={dato.id_activity}>
      <Link to={`/activity/${dato.id_activity}`}>
        <img src={`${url}/uploads/img/${dato.photo_act}`} alt={dato.name_act} />
      </Link>
      <h3>{dato.name_act}</h3>
      <p>{dato.fecha}</p>
    </li>
  ));
};

export const ResaultsSearch = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const type = query.get("type");
  const location = query.get("location");

  let url = "/search";
  if (type && location) {
    url = `/search/?type=${type}&location=${location}`;
  } else if (type) {
    url = `/search/?type=${type}`;
  } else if (location) {
    url = `/search/?location=${location}`;
  }
  const [info] = useRemoteUrl(url);
  const actData = info.data;
  const act = info.type;
  const city = info.location;

  return (
    <section className="searchMain">
      <div className="upSearch">
        <h2>Resultados de búsqueda</h2>
        <BuscadorFiltro cityMap={city} typesMap={act} className="filtro">
          Filtrar
        </BuscadorFiltro>
      </div>
      <ul>
        <ListResults datos={actData} />
      </ul>
    </section>
  );
};
