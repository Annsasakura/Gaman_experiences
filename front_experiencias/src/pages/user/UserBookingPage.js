import { SearchBar } from "../../components/SearchBar";
import { UserBodyBookings } from "../../components/UserBodyBookings";
import { Footer } from "../../components/Footer";

import { Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../components/providers/AuthProvider";

export function UserBookings() {
  const [auth] = useContext(AuthContext);

  return (
    <>
      {auth ? (
        <>
          <SearchBar />
          <UserBodyBookings />
          <Footer />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}
