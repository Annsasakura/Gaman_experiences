import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer">
      <section className="footerSup">
        <div className="footerSupIzq">
          <h2>Tu sitio para experimentar</h2>
          <h3>Síguenos</h3>
          <ul className="ulRedes">
            <li>
              <a href="https://www.facebook.com/">
                <img
                  className="logos"
                  src="/icons/facebook.svg"
                  alt="logo facebook"
                />
              </a>
            </li>
            <li className="marginLeft">
              <a href="https://www.instagram.com/">
                <img
                  className="logos"
                  src="/icons/instagram.svg"
                  alt="logo instagram"
                />
              </a>
            </li>
            <li className="marginLeft">
              <a href="https://www.youtube.com/">
                <img
                  className="logos"
                  src="/icons/youtube.svg"
                  alt="logo youtube"
                />
              </a>
            </li>
            <li className="marginLeft">
              <a href="https://twitter.com">
                <img
                  className="logos"
                  src="/icons/twitter.svg"
                  alt="logo twitter"
                />
              </a>
            </li>
          </ul>
        </div>
        <section className="enlacesFooter">
          <ul className="ulCuenta">
            <li>
              <h3>Tu Cuenta</h3>
            </li>
            <li>
              <Link to="/user/data">Ajustes</Link>
            </li>
            <li>
              <Link to="/user/bookings">Reservas</Link>
            </li>
            <li>
              <Link to="/user/rate">Valoraciones</Link>
            </li>
            <li>
              <Link to="/register">Registro</Link>
            </li>
            <li>
              <Link to="/login">Iniciar Sesión</Link>
            </li>
          </ul>

          <ul className="ulAcceso">
            <li>
              <h3>Acceso directo</h3>
            </li>
            <li>
              <Link to="/search">Actividades</Link>
            </li>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/privacy">Privacidad</Link>
            </li>
            <li>
              <Link to="/accesibility">Accesibilidad</Link>
            </li>
          </ul>

          <ul className="ulAbout">
            <li>
              <h3>Gaman</h3>
            </li>
            <li>
              <Link to="/about">Acerca de</Link>
            </li>
          </ul>
        </section>
      </section>

      <section className="sectionLineFooter">
        <div className="lineFooterTop"></div>
      </section>

      <section className="footerInf">
        <div className="divImgFooter">
          <Link to="/">
            <img
              className="gamanFooter"
              src="/logos/gaman_blanco.png"
              alt="logo gaman"
            />
          </Link>
        </div>

        <Link to="/register" className="aFooter">
          Registrarse
        </Link>
      </section>
    </div>
  );
};
