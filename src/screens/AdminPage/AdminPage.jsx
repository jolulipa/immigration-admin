import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { colors } from "../../ui-config/colors";
import { readUsers } from "../../api/auth";
import { CLIENT_DATA } from "../../constants/storageKeys";
import { useAppContext } from "../../context/Provider";
localStorage.removeItem(CLIENT_DATA);

const AdminPage = () => {
  const [results, setResults] = useState([]);
  const history = useHistory();
  const { state: context } = useAppContext();

  const navigateToUser = (id, email, role) => {
    history.push({
      pathname: "/forms/Concessionary",
      state: {
        id,
        email,
        role,
      },
    });
  };

  const deleteUser = (id) => {
    console.log(id);
  };

  const renderResults = () =>
    results.map((el) => (
      <>
        {el.role === "con" && (
          <tr key={el.id}>
            <td>{el.email}</td>
            <td>
              <Button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  deleteUser(el.id);
                }}
              >
                Delete
              </Button>
            </td>
            <td>{el.role}</td>
            <td>{el.createdAt.split("T")[0]}</td>
            <td>{el.updatedAt.split("T")[0]}</td>
            <td>
              <Button
                className="btn-success btn-sm"
                onClick={() => {
                  const cliEmail = el.email;
                  const cliName = el.email;
                  const cliUser = el.id;
                  localStorage.setItem(
                    CLIENT_DATA,
                    JSON.stringify({ cliEmail, cliName, cliUser })
                  );
                  navigateToUser(el.id, el.email, el.role);
                }}
              >
                Modify Concessionary
              </Button>
            </td>
          </tr>
        )}
      </>
    ));

  const renderTable = (results) => (
    <table className="table table-striped ">
      <thead>
        <tr key={"header"} className="bg-info">
          <th>User email</th>
          <th> Delete Acc</th>
          <th>Role</th>
          <th>Created on</th>
          <th>Modified on</th>
          <th>...Go To..:</th>
        </tr>
      </thead>
      <tbody style={styles.variable}>{renderResults(results)}</tbody>
    </table>
  );

  // La responsabilidad de esto es cargar la data
  useEffect(() => {
    if (context.intake.role !== "adm") {
      alert(`You're not an administrator`);
      navigateToUser(context.intake.userId, context.intake.role);
    }
    (async () => {
      const { results } = await readUsers();
      setResults(results);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container p-3 my-3 ">
      <h2 style={styles.title}>
        ADMINISTRACI??N GENERAL DE LA APP DE THE IMMIGRATION TIME
      </h2>
      <div className="row d-flex justify-content-center">
        <div>
          <p style={styles.paragraph}>
            Esta es la herramenta de <strong>administraci??n general</strong> de
            la app. Aqui el due??o de la app podr?? borrar y/o modificar
            consesionarios.
          </p>
        </div>
        <div>{renderTable(results)}</div>
      </div>
      <div className="row d-flex justify-content-center">
        <Link to="/screens/Registration" className="btn btn-info">
          ADD NEW CONCESSIONARY
        </Link>
      </div>
    </div>
  );
};
const styles = {
  title: {
    fontWeight: "700",
    textAlign: "center",
    color: colors.brown,
    padding: 15,
  },

  paragraph: {
    textAlign: "left",
    fontSize: 18,
    padding: 15,
    margin: 0,
    color: colors.brown,
  },
  variable: {
    color: colors.brown,
  },
};
export default AdminPage;
