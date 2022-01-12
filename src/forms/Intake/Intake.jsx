import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "@rjsf/bootstrap-4";
import schema from "./Intakeschema";
import uiSchema from "./IntakeUiSchema";
import { readForm, createUpdateForm } from "../../api/formsAccess";
import { CLIENT_DATA } from "../../constants/storageKeys";
import { useAppContext } from "../../context/Provider";

const Intake = () => {
  const [formData, setFormData] = useState();
  const { id } = useParams();
  const isEditMode = !!id;
  const history = useHistory();
  const { state: context } = useAppContext();

  const navigateToTray = (id, email, role) => {
    history.push({
      pathname: "/screens/UsersPage",
      state: {
        id,
        email,
        role,
      },
    });
  };

  useEffect(() => {
    if (!isEditMode) return;
    (async () => {
      const values = await readForm(id);
      setFormData(JSON.parse(values.data));
    })();
  }, [isEditMode, id]);

  const extractData = async ({ cleanData }) => {
    let i = 0;
    for (i = 1; i < 100; i++) {
      formData.p1[`text${i}`] = null;
      formData.p2[`text${i}`] = null;
      formData.p3[`text${i}`] = null;
      formData.p4[`text${i}`] = null;
      formData.p5[`text${i}`] = null;
    }
  };

  const handleSubmit = async ({ formData }) => {
    let cleanData = { ...formData };
    await extractData({ cleanData });
    const { cliUser, cliEmail } = JSON.parse(localStorage.getItem(CLIENT_DATA));
    const obj = {
      data: JSON.stringify(cleanData),
      formId: "Intake",
      formStatus: "unpaid",
      cliUser: cliUser,
    };
    console.log(obj);
    await createUpdateForm(obj);
    navigateToTray(cliUser, cliEmail, context.intake.role);
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
export default Intake;
