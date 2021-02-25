import { SearchBar } from "../../components/SearchBar";
import { UserBodyData } from "../../components/UserBodyData";
import { Footer } from "../../components/Footer";
import { Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../components/providers/AuthProvider";

export function User() {
  const [auth] = useContext(AuthContext);

  return (
    <>
      {auth ? (
        <>
          <SearchBar />
          <UserBodyData />
          <Footer />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}
