import { InputElement } from "./utils/InputElement";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../components/providers/AuthProvider";
import { url } from "../http/api";

export const FileElement = ({ children, id, setFile, required }) => {
  return (
    <fieldset>
      <input
        id={id}
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required={required}
      />
      <label htmlFor={id}>{children}</label>
    </fieldset>
  );
};

export const AdminCreaterBody = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const [titulo, setTitulo] = useState();
  const [type, setType] = useState();
  const [fecha, setFecha] = useState();
  const [plazas, setPlazas] = useState();
  const [localizacion, setLocalizacion] = useState();
  const [precio, setPrecio] = useState();
  const [descripcion, setDescripcion] = useState();
  const [resumen, setResumen] = useState();
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("photo_act", file);
    data.append("name_act", titulo);
    data.append("type_act", type);
    data.append("description_act", descripcion);
    data.append("summary_act", resumen);
    data.append("places", plazas);
    data.append("price", precio);
    data.append("d_start", fecha);
    data.append("location", localizacion);
    data.append("photo2", file2);
    data.append("photo3", file3);
    data.append("photo4", file4);
    data.append("photo5", file5);

    const res = await fetch(`${url}/admin/createAct`, {
      method: "POST",
      headers: { Authorization: auth },
      body: data,
    });

    if (res.status !== 200) {
      setErrorMessage(await res.json());
    } else {
      return history.push("/admin/activity");
    }
  };

  return (
    <div className="admin-body">
      <div className="admin-header">
        <Link to="/" onClick={(e) => setAuth("")}>
          Cerrar Sesión
        </Link>
        <Link to="/admin/activity">Listado</Link>
        <Link to="/">Inicio</Link>
      </div>
      <h2>Añadir actividad</h2>

      <form onSubmit={handleSubmit} method="POST" className="admin-form">
        <InputElement
          id="titulo"
          value={titulo || ""}
          setValue={setTitulo}
          type="text"
          name="Titulo"
          required={true}
        >
          Titulo actividad
        </InputElement>

        <InputElement
          id="tipoActividad"
          value={type || ""}
          setValue={setType}
          type="text"
          name="Tipo de actividad"
          required={true}
        >
          Tipo de actividad
        </InputElement>

        <InputElement
          id="fecha"
          value={fecha || ""}
          setValue={setFecha}
          type="date"
          name="Fecha de inicio"
          required={true}
        >
          Fecha de inicio
        </InputElement>

        <InputElement
          id="plazas"
          value={plazas || ""}
          setValue={setPlazas}
          type="text"
          name={"Plazas"}
          required={true}
        >
          Plazas
        </InputElement>

        <InputElement
          id="localizacion"
          value={localizacion || ""}
          setValue={setLocalizacion}
          type="text"
          name="localizacion"
          required={true}
        >
          Localizacion
        </InputElement>

        <InputElement
          id="precio"
          value={precio || ""}
          setValue={setPrecio}
          type="text"
          name="precio"
          required={true}
        >
          Precio
        </InputElement>

        <fieldset className="descripcion">
          <label htmlFor="descripcion">Descripcion</label>
          <textarea
            id="descripcion"
            value={descripcion || ""}
            onChange={(e) => setDescripcion(e.target.value)}
            name="descripcion"
            maxLength={1000}
            rows={4}
            required
          />
        </fieldset>

        <fieldset className="resumen">
          <label htmlFor="resumen">Resumen</label>
          <textarea
            id="resumen"
            value={resumen || ""}
            onChange={(e) => setResumen(e.target.value)}
            name="resumen"
            maxLength={255}
            rows={4}
            required
          />
        </fieldset>

        <FileElement
          children="Selecciona una foto"
          id="photo1"
          setFile={setFile}
          required={true}
        />
        <FileElement
          children="Selecciona una foto"
          id="photo2"
          setFile={setFile2}
          required={false}
        />
        <FileElement
          children="Selecciona una foto"
          id="photo3"
          setFile={setFile3}
          required={false}
        />
        <FileElement
          children="Selecciona una foto"
          id="photo4"
          setFile={setFile4}
          required={false}
        />
        <FileElement
          children="Selecciona una foto"
          id="photo5"
          setFile={setFile5}
          required={false}
        />

        <button>Crear Actividad</button>
        <p>{errorMessage.message}</p>
      </form>
    </div>
  );
};
