import { Link } from "react-router-dom";
import { useAuthUrl } from "../http/api";
import { url } from "../http/api";

export const UserMenu = () => {
  const [photo, errorMessage] = useAuthUrl("/user/data");

  let img;
  let sinFoto = false;
  if (photo.length <= 0) {
    img = [];
  } else {
    img = photo.user.photo_user;
    if (img === null) {
      sinFoto = true;
    }
  }

  return (
    <nav className="userMenu">
      <div>
        {sinFoto ? (
          <img src="/img/defaultAvatar.png" alt="imagen usuario" />
        ) : (
          <img src={`${url}/uploads/img/${img}`} alt="imagen usuario" />
        )}
      </div>
      <ul>
        <li>
          <Link to="/user">Mi cuenta</Link>
        </li>
        <li>
          <Link to="/user/bookings">Mis reservas</Link>
        </li>
        <li>
          <Link to="/user/rate">Valoraciones</Link>
        </li>
      </ul>
      <p>{errorMessage.message}</p>
    </nav>
  );
};
