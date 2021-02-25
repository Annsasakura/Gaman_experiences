import { Footer } from "../components/Footer";
import { SearchBar } from "../components/SearchBar";
import { Link } from "react-router-dom";
import { useRemoteUrl } from "../http/api";
import { url } from "../http/api";

const ListPopulares = ({ datos = [] }) => {
  return datos.map((dato) => (
    <li key={dato.id}>
      <Link to={`/search/?type=${dato.type}`}>
        <img src={`${url}/uploads/img/${dato.photo}`} alt={dato.name} />
      </Link>
      <h3>{dato.name}</h3>
    </li>
  ));
};

export function Home() {
  const [info] = useRemoteUrl("/");

  return (
    <div className="home">
      <SearchBar />
      <header>
        <div className="headerMain">
          <h1>Tu sitio para experimentar</h1>
          <p>
            Curabitur aliquet neque eros, at feugiat arcu consectetur in.
            Curabitur dapibus nisl quis velit vulputate pellentesque. Integer
            enim nibh, porttitor id neque sed, mattis lobortis nulla. Nunc
            finibus molestie mauris, vitae feugiat metus blandit a.
          </p>
        </div>
      </header>

      <section className="populares">
        <h2>Experiencias recomendadas</h2>
        <h2>por los usuarios</h2>
        <ul className="ulPopulares">
          <ListPopulares datos={info} />
        </ul>
      </section>
      <section className="emblematicos">
        <h2>Lugares emblemáticos </h2>
        <ul className="ulEmblematicos">
          <li>
            <Link to="/search/?location=A%20Coruña">
              <img src="/img/emb4.jpg" alt="A Coruña" />
            </Link>
            <h3>A Coruña</h3>
          </li>
          <li>
            <Link to="/search/?location=Vigo">
              <img src="/img/emb2.jpg" alt="Vigo" />
            </Link>
            <h3>Vigo</h3>
          </li>
          <li>
            <Link to="/search/?location=Lugo">
              <img src="/img/emb1.jpg" alt="Lugo" />
            </Link>
            <h3>Lugo</h3>
          </li>
          <li>
            <Link to="/search/?location=Ourense">
              <img src="/img/emb3.jpg" alt="Ourense" />
            </Link>
            <h3>Ourense</h3>
          </li>
        </ul>
      </section>
      <Footer />
    </div>
  );
}
