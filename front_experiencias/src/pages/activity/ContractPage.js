import { ContractBody } from "../../components/ContractBody";
import { Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../components/providers/AuthProvider";

export function Contract() {
  const [auth] = useContext(AuthContext);

  return <>{auth ? <ContractBody /> : <Redirect to="/" />}</>;
}
