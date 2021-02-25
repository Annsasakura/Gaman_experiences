import { UserMenu } from "./UserMenu";
import { useAuthUrl } from "../http/api";
import { UserFormData, UserTextData } from "./auth/Forms";
import { useState, useEffect } from "react";
import Moment from "moment";

export const UserBodyData = () => {
  const [data, errorMessage, , refetch] = useAuthUrl("/user/data");
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userDNI, setUserDNI] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userBday, setUserBday] = useState("");
  const [texto, setTexto] = useState(true);

  let info;
  let dateTime;
  if (data.length <= 0) {
    info = [];
    dateTime = "";
  } else {
    info = data.user;
    dateTime = Moment(info.b_day).format("DD/MM/YYYY");
  }

  useEffect(() => {
    setUserName(info.first_name);
    setUserLastName(info.last_name !== "null" ? info.last_name : "");
    setUserGender(info.sexo);
    setUserBday(dateTime);
    setUserDNI(info.dni);
    setUserEmail(info.email);
    setUserPhone(info.tlfn !== "null" ? info.tlfn : "");
    setUserBio(info.bio !== "null" ? info.bio : "");
  }, [info, dateTime]);

  return (
    <div className="userBook-Rate">
      <UserMenu />
      <div className="book-rate-data">
        <h1>Mi cuenta</h1>
        <button onClick={(e) => setTexto(!texto)} className="us-body">
          {texto ? "editar" : "cancelar"}
        </button>

        {texto ? (
          <UserTextData
            userName={userName}
            userLastName={userLastName}
            userGender={userGender}
            userBday={userBday}
            userDNI={userDNI}
            userEmail={userEmail}
            userPhone={userPhone}
            userBio={userBio}
          />
        ) : (
          <UserFormData
            className="userForm"
            userName={userName}
            setUserName={setUserName}
            userLastName={userLastName}
            setUserLastName={setUserLastName}
            userGender={userGender}
            setUserGender={setUserGender}
            userDNI={userDNI}
            setUserDNI={setUserDNI}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            userPhone={userPhone}
            setUserPhone={setUserPhone}
            userBio={userBio}
            setUserBio={setUserBio}
            refetchData={refetch}
            texto={texto}
            setTexto={setTexto}
          />
        )}

        <p>{errorMessage}</p>
      </div>
    </div>
  );
};
