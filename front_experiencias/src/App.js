import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/MainPage";
import { Privacy } from "./pages/PrivacyPage";
import { Accesibility } from "./pages/AccesibilityPage";
import { About } from "./pages/AboutPage";
import { Register } from "./pages/RegisterPage";
import { Login } from "./pages/LoginPage";
import { User } from "./pages/user/UserMainPage";
import { UserBookings } from "./pages/user/UserBookingPage";
import { UserRatings } from "./pages/user/UserRatingPage";
import { AdminAct } from "./pages/admin/AdminMainPage";
import { AdminCreater } from "./pages/admin/AdminCreatertPage";
import { AdminEdit } from "./pages/admin/AdminEditPage";
import { Search } from "./pages/activity/ActivitySearchPage";
import { Validate } from "./pages/ValidatePage";
import { Activity } from "./pages/activity/ActivityPage";
import { Contract } from "./pages/activity/ContractPage";
import { AuthProvider } from "./components/providers/AuthProvider";

function App() {
  return (
    <AuthProvider value={""}>
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/validate">
            <Validate />
          </Route>

          <Route exact path="/user">
            <User />
          </Route>

          <Route path="/user/bookings">
            <UserBookings />
          </Route>

          <Route path="/user/rate">
            <UserRatings />
          </Route>

          <Route path="/admin/activity">
            <AdminAct />
          </Route>

          <Route path="/admin/createAct">
            <AdminCreater />
          </Route>

          <Route path="/admin/edit/:id">
            <AdminEdit />
          </Route>

          <Route path="/search">
            <Search />
          </Route>

          <Route exact path="/activity/:actId">
            <Activity />
          </Route>

          <Route path="/activity/:actId/contract">
            <Contract />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/privacy">
            <Privacy />
          </Route>

          <Route path="/accesibility">
            <Accesibility />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
