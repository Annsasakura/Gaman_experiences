import { Link } from "react-router-dom";
import { BuscadorFiltro } from "./BuscadorFiltro";
import { useRemoteUrl } from "../http/api";
import { useContext, useState } from "react";
import { AuthContext } from "./providers/AuthProvider";
import { DecodeTokenData } from "../http/api";

export const SearchBar = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const decodeToken = DecodeTokenData(auth);
  const [open, setOpen] = useState(false);

  let role;
  if (!auth) {
    role = [];
  } else {
    role = decodeToken.role;
  }
  const [options] = useRemoteUrl("/search");
  const act = options.type;
  const city = options.location;

  return (
    <nav className={`searchNav ${open ? "open" : ""}`}>
      <button className="nav-ui-toggle" onClick={() => setOpen(!open)}>
        {open ? "✕" : "☰"}
      </button>
      <div className="nav-ui">
        <Link to="/">
          <div className="logoSearch"></div>
        </Link>

        <BuscadorFiltro
          cityMap={city}
          typesMap={act}
          className="formSearchBar"
        />

        <div className="loginSign">
          {auth ? (
            <>
              <Link to="/user">Perfil</Link>
              <Link
                to="/"
                onClick={(e) => setAuth("")}
                className="loginSignSalir"
              >
                Salir
              </Link>
            </>
          ) : (
            <>
              <Link to="/register">Regístrate</Link>
              <Link to="/login" className="loginSignIniciar">
                Iniciar sesión
              </Link>
            </>
          )}
          {role === "A" ? (
            <Link to="/admin/activity" className="admin-nav">
              Admin
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
};
