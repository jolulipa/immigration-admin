import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Form from "@rjsf/bootstrap-4";
import schema from "./concessionaryschema";
import uiSchema from "./concessionaryUiSchema";
import { readConOffice, createUpdateConOffice } from "../../api/conAccess";
import { CLIENT_DATA } from "../../constants/storageKeys";

const Concessionary = () => {
  const [formData, setFormData] = useState();
  const { cliUser } = JSON.parse(localStorage?.getItem(CLIENT_DATA));
  const isEditMode = !!cliUser;
  const history = useHistory();

  const navigateToAdmin = () => {
    history.push("/screens/AdminPage");
  };

  useEffect(() => {
    if (!isEditMode) return;
    (async () => {
      const values = await readConOffice(cliUser);
      if (values) {
        console.log("Datos leidos en BD concesionario:", values);
        setFormData(JSON.parse(values.data));
      } else {
        console.log("creando registro nuevo en conce");
      }
    })();
  }, [isEditMode, cliUser]);

  const extractData = async ({ formData }) => {
    let i;
    for (i = 1; i < 100; i++) {
      delete formData.p1[`text${i}`];
    }
  };

  const handleSubmit = async ({ formData }) => {
    extractData({ formData });
    const obj = {
      officeEmail: formData.p1.conEmail,
      officeName: formData.p1.conName,
      description: formData.p1.conOffice,
      rate: formData.p1.rentRate,
      concessionary: cliUser,
      data: JSON.stringify(formData),
    };
    console.log("datos a crear en conce:", obj);
    await createUpdateConOffice(obj);
    navigateToAdmin();
  };

  return (
    <div className="container justify-content-sm-center">
      <div
        className="col-sm-4 "
        style={{
          backgroundColor: "#7ed6fc",
          margin: 20,
          padding: 15,
          borderRadius: "10px",
          border: "5px solid #3f3434",
        }}
      >
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Concessionary;
