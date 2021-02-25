import { Link } from "react-router-dom";
import { InputElement } from "../utils/InputElement";
import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { url } from "../../http/api";

export const UserFormLogin = ({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  errorMessage = "",
}) => {
  return (
    <form method="POST" onSubmit={onSubmit} className="loginForm">
      <h2>Iniciar sesión</h2>
      <InputElement
        id="emailLogin"
        value={email}
        setValue={setEmail}
        type="email"
        name="Correo electrónico"
        required
      />

      <InputElement
        id="passwordLogin"
        value={password}
        setValue={setPassword}
        type="password"
        name="Contraseña"
        required
      />

      <InputElement id="submitRegister" type="submit" value="Continuar" />
      <Link to="/" className="cancelLog">
        Cancelar
      </Link>

      <p className="textLogin">
        ¿Aún no formas parte de nuestra familia?{" "}
        <Link to="/register"> Regístrate.</Link>
      </p>
      <img src="img/img1-2.png" alt="imagen de turismo" />

      <p style={{ color: "#40434d", fontSize: "1rem" }}>
        {errorMessage.message}
      </p>
    </form>
  );
};

export const UserFormRegister = ({
  handleRegister,
  nombre,
  setNombre,
  fechaNac,
  setFechaNac,
  email,
  setEmail,
  password,
  setPassword,
  repeatPassword,
  setRepeatPassword,
  errorMessage = "",
}) => {
  return (
    <form method="POST" onSubmit={handleRegister} className="registerForm">
      <h2>Registro</h2>
      <InputElement
        id="nombre"
        value={nombre}
        setValue={setNombre}
        type="text"
        name={"Nombre"}
        required
      />

      <InputElement
        id="fechaNac"
        value={fechaNac}
        setValue={setFechaNac}
        type="date"
        required
      >
        Fecha de nacimiento
      </InputElement>
      <p>Debes ser mayor de edad para poder registrarte.</p>

      <InputElement
        id="email"
        value={email}
        setValue={setEmail}
        type="mail"
        name={"Correo electrónico"}
        required
      />

      <InputElement
        id="password"
        value={password}
        setValue={setPassword}
        type="password"
        name={"Contraseña"}
        required
      />

      <InputElement
        id="validatePassword"
        value={repeatPassword}
        setValue={setRepeatPassword}
        type="password"
        name={"Repetir constraseña"}
        className="repeatPasswordRegister"
        required
      />
      <p className="textRegistro">
        Tu nombre es público. Usaremos tu dirección de correo electrónico para
        enviarte notificacciones. Al hacer click en Continuar confirmas que
        aceptas las <Link to="/about">Condiciones de servicio</Link> de Gaman.
        Gestionaremos la información tal y como se describe en la
        <Link to="/privacy"> Política de privacidad</Link>.
      </p>
      <InputElement id="submitRegister" type="submit" value="Continuar" />
      <Link to="/" className="cancelLog">
        Cancelar
      </Link>
      <p className="textRegistro">
        ¿Ya estás registrado? <Link to="/login">Iniciar sesión.</Link>
      </p>
      <p style={{ color: "#40434d", fontSize: "1rem" }}>
        {errorMessage.message}
      </p>
      <img src="img/img1-1.png" alt="imagen de turismo" />
    </form>
  );
};

export const UserFormData = ({
  userName,
  setUserName,
  userLastName,
  setUserLastName,
  userGender,
  setUserGender,
  userDNI,
  setUserDNI,
  userEmail,
  setUserEmail,
  userPhone,
  setUserPhone,
  userBio,
  setUserBio,
  refetchData,
  texto,
  setTexto,
}) => {
  const [file, setFile] = useState(null);
  const [auth] = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("photo", file);
    data.append("nombre", userName);
    data.append("apellido", userLastName);
    data.append("dni", userDNI);
    data.append("bio", userBio);
    data.append("sexo", userGender);
    data.append("tlfn", userPhone);
    const res = await fetch(`${url}/user/data`, {
      method: "PUT",
      headers: { Authorization: auth },
      body: data,
    });

    if (res.status !== 200) {
      setErrorMessage(await res.json());
    } else {
      refetchData();
      setTexto(!texto);
    }
  };

  return (
    <form onSubmit={handleSubmit} method="PUT">
      <InputElement
        id="userName"
        value={userName || ""}
        setValue={setUserName}
        type="text"
        name={"Nombre"}
        required={true}
      >
        Nombre
      </InputElement>

      <InputElement
        id="userLastName"
        value={userLastName || ""}
        setValue={setUserLastName}
        type="text"
        name={"Apellidos"}
        required={false}
      >
        Apellidos
      </InputElement>
      <label htmlFor="Gender" className="userGenero">
        Sexo
      </label>
      <select
        onChange={(e) => setUserGender(e.target.value)}
        id="Gender"
        name="Gender"
        value={userGender || ""}
      >
        <option value="" disabled>
          Sexo
        </option>
        <option value="Mujer">Mujer</option>
        <option value="Hombre">Hombre</option>
        <option value="Otros">Otros</option>
      </select>

      <InputElement
        id="userDNI"
        value={userDNI || ""}
        setValue={setUserDNI}
        type="text"
        name={"Dni"}
        required={true}
      >
        DNI
      </InputElement>

      <InputElement
        id="userEmail"
        value={userEmail || ""}
        setValue={setUserEmail}
        type="email"
        name={"Email"}
        required={true}
      >
        Email
      </InputElement>

      <InputElement
        id="userPhone"
        value={userPhone || ""}
        setValue={setUserPhone}
        type="tel"
        name={"Teléfono"}
        required={false}
      >
        Teléfono
      </InputElement>

      <fieldset className="userBio">
        <label htmlFor="userBio">Biografia</label>
        <textarea
          id="userBio"
          value={userBio || ""}
          onChange={(e) => setUserBio(e.target.value)}
          placeholder="Cuéntanos algo sobre ti"
          maxLength={200}
          rows={4}
        />
      </fieldset>

      <fieldset>
        <input
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file" className="imgUser">
          Selecciona una imagen
        </label>
      </fieldset>

      <button>Actualizar datos</button>
      <p>{errorMessage.message}</p>
    </form>
  );
};

const SectionElement = ({ titulo, parrafo }) => {
  return (
    <section className="us-body-sec">
      <h3>{titulo}</h3>
      <p>{parrafo}</p>
    </section>
  );
};

export const UserTextData = ({
  userName,
  userLastName,
  userGender,
  userBday,
  userDNI,
  userEmail,
  userPhone,
  userBio,
}) => {
  return (
    <section className="us-body-text">
      <SectionElement titulo="Nombre" parrafo={userName} />
      <SectionElement titulo="Apellidos" parrafo={userLastName} />
      <SectionElement titulo="Sexo" parrafo={userGender} />
      <SectionElement titulo="Fecha de nacimiento" parrafo={userBday} />
      <SectionElement titulo="Dni" parrafo={userDNI} />
      <SectionElement titulo="Correo electrónico" parrafo={userEmail} />
      <SectionElement titulo="Teléfono" parrafo={userPhone} />
      <SectionElement titulo="Biografía" parrafo={userBio} />
    </section>
  );
};
