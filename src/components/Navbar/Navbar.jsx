import React from "react";
import { NavLink, useHistory } from "react-router-dom";
// import Burger from "./Burger";
import { AUTH_TOKEN, CLIENT_DATA } from "../../constants/storageKeys";
import { INTAKE_TYPE } from "../../context/types";
import { useAppContext } from "../../context/Provider";
import "./styles.css";

const Navbar = () => {
  const { state } = useAppContext();
  const { updateIntake } = useAppContext();
  const { email } = state.intake;
  const history = useHistory();

  const navigateToWelcome = () => {
    history.push("/screens/Welcome");
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(CLIENT_DATA);
    localStorage.removeItem(INTAKE_TYPE);
    updateIntake("");
    console.log("Local Storage Was Reset-logout");
    alert(`You have logged out of the system`);
    navigateToWelcome();
  };
  return (
    <div className="super-root">
      <div className="line-container">
        <div className="col-6">The Immigration Time ADMIN</div>
        <div className="col d-none d-md-block d-xl-block">
          E-mail
          <div>negocio@gmail.com</div>
        </div>
        <div className="col d-none d-md-block d-xl-block status">
          {!!email && `Bienvenido ${email}`}
          <button className="button" type="button" onClick={handleLogout}>
            {email ? `Logout` : "No User"}
          </button>
        </div>
      </div>
      <div className="row navbar">
        <NavLink
          to="/"
          className="col-1 d-none d-md-block d-lg-block d-xl-block"
          style={{
            marginLeft: 20,
          }}
        >
          HOME
        </NavLink>
        <NavLink
          to="/screens/LandingPage"
          className="col-1 d-none d-md-block d-lg-block d-xl-block"
        >
          SERVICES
        </NavLink>
        <NavLink
          to="/screens/Contact"
          className="col-1 d-none d-md-block d-lg-block d-xl-block"
        >
          CONTACT
        </NavLink>
        <NavLink
          to="/screens/LoginPage"
          className="col-1 d-none d-md-block d-lg-block d-xl-block"
        >
          LOGIN
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
