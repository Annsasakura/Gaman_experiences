import { SearchBar } from "../../components/SearchBar";
import { UserBodyRatings } from "../../components/UserBodyRating";
import { Footer } from "../../components/Footer";
import { Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../components/providers/AuthProvider";

export function UserRatings() {
  const [auth] = useContext(AuthContext);

  return (
    <>
      {auth ? (
        <>
          <SearchBar />
          <UserBodyRatings />
          <Footer />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}
