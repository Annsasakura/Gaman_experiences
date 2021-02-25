import { useHistory } from "react-router-dom";
import { useState } from "react";

const List = ({ property, datos = [], Tag = "option" }) => {
  return datos.map((dato, index) => (
    <Tag key={`${property}_${index}`} value={dato[property]}>
      {dato[property]}
    </Tag>
  ));
};

const SelectForm = ({ name, id, map, children, setValue, value, property }) => {
  return (
    <select
      onChange={e => setValue(e.target.value)}
      name={name}
      id={id}
      value={value}
    >
      <option value="" disabled>
        {children}
      </option>
      <List property={property} datos={map} />
    </select>
  );
};

export const BuscadorFiltro = ({ cityMap, typesMap, className, children }) => {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  let history = useHistory();
  const handleSubmit = e => {
    e.preventDefault();
    if (location && type) {
      history.push(`/search/?type=${type}&location=${location}`);
    } else if (location) {
      history.push(`/search/?location=${location}`);
    } else if (type) {
      history.push(`/search/?type=${type}`);
    } else {
      history.push("/search");
    }
  };

  return (
    <form method="GET" className={className} onSubmit={handleSubmit}>
      <SelectForm
        name="location"
        id="location"
        map={cityMap}
        setValue={setLocation}
        value={location}
        property="location"
      >
        Ubicación
      </SelectForm>
      <SelectForm
        name="act"
        id="act"
        map={typesMap}
        setValue={setType}
        value={type}
        property="type_act"
      >
        Tipos de actividad
      </SelectForm>

      <button>{children}</button>
    </form>
  );
};
