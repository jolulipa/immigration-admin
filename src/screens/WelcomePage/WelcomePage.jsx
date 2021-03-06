import React from "react";
import { Link, useHistory } from "react-router-dom";
import { colors } from "../../ui-config/colors";
import Footer from "../../components/Footer";
import { useAppContext } from "../../context/Provider";

const WelcomePage = () => {
  const history = useHistory();
  const { state: context } = useAppContext();

  if (context.intake.role === "adm") {
    history.push("/screens/AdminPage");
  }

  return (
    <div className="container">
      <h2 style={styles.title}>BIENVENIDO A THE IMMIGRATION TIME</h2>
      <div className="row">
        <p style={styles.paragraph}>
          Esta es la aplicación para administración de sistema completo de
          immigración. Esta parte del sistema permitirá al Administrador único
          del sistema hacer las siguientes tareas:
        </p>
        <ol
          style={{
            marginLeft: 20,
            marginBottom: 20,
            fontSize: 14,
          }}
        >
          <li>crear oficinas concesionarias</li>
          <li>crear usuarios concesionarios</li>
          <li>administrar las cuentas y pagos de los concesionarios</li>
          <li>Borrar Registros</li>
        </ol>
      </div>
      <div className="d-flex flex-row">
        <Link
          className="p2"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textDecoration: "none",
            marginBottom: 20,
            fontSize: 20,
          }}
          to="/screens/UsersPage"
        >
          <button className="btn btn-danger" type="button">
            Bandeja Administrador Gral
          </button>
        </Link>
        <Link
          className="p2"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textDecoration: "none",
            marginBottom: 20,
            fontSize: 20,
          }}
          to="/screens/ConcessionaryPage"
        >
          <button className="btn btn-success" type="button">
            Bandeja de Concesionarios
          </button>
        </Link>
      </div>
      <div className="card">
        <Footer />
      </div>
    </div>
  );
};
const styles = {
  title: {
    paddingTop: 20,
    fontWeight: "500",
    textAlign: "center",
    color: colors.brown,
  },

  paragraph: {
    textAlign: "justify",
    fontSize: 18,
    padding: 15,
    margin: 0,
    color: colors.brown,
  },

  navigate: {
    fontSize: 14,
    padding: 7,
    marginLeft: 25,
    margin: 30,
    width: 180,
    height: 30,
  },
  navigate2: {
    verticalAlign: 10,
    fontSize: 12,
    paddingBottom: 15,
    paddingTop: 2,
    width: 80,
    height: 25,
  },
};
export default WelcomePage;
