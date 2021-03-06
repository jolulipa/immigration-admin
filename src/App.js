import React from "react";
import AppContextProvider from "./context/Provider";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Intake from "./forms/Intake";
import Concessionary from "./forms/Concessionary";
import WelcomePage from "./screens/WelcomePage";
import LandingPage from "./screens/LandingPage";
import LoginPage from "./screens/LoginPage";
import AdminPage from "./screens/AdminPage";
import ConcessionaryPage from "./screens/ConcessionaryPage";
import Contact from "./screens/Contact";
import Registration from "./screens/Registration";
import Unauthorized from "./components/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import UsersPage from "./screens/UsersPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/forms/Intake/:id" component={Intake} />
        <Route path="/forms/Intake" component={Intake} />
        <Route path="/screens/LoginPage" component={LoginPage} />
        <Route path="/screens/Registration" component={Registration} />
        <Route path="/screens/LandingPage" component={LandingPage} />
        <Route path="/screens/Contact" component={Contact} />
        <PrivateRoute
          path="/forms/Concessionary/:id"
          component={Concessionary}
        />
        <PrivateRoute path="/forms/Concessionary" component={Concessionary} />
        <Route path="/unauthorized" component={Unauthorized} />
        <PrivateRoute path="/screens/AdminPage" component={AdminPage} />
        <PrivateRoute
          path="/screens/ConcessionaryPage"
          component={ConcessionaryPage}
        />
        <PrivateRoute path="/screens/UsersPage" component={UsersPage} />
        <Route path="/" component={WelcomePage} />
      </Switch>
      {/*<Footer />*/}
    </Router>
  );
}

const MyApp = () => (
  <AppContextProvider>
    <ToastContainer />
    <App />
  </AppContextProvider>
);

export default MyApp;
