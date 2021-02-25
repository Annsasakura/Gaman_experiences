import { AdminEditBody } from "../../components/AdminEditBody";
import { Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../components/providers/AuthProvider";
import { DecodeTokenData } from "../../http/api";

export function AdminEdit() {
  const [auth] = useContext(AuthContext);
  const decodeToken = DecodeTokenData(auth);

  let role;
  if (!auth) {
    role = [];
  } else {
    role = decodeToken.role;
  }
  return <>{role === "A" ? <AdminEditBody /> : <Redirect to="/" />}</>;
}
