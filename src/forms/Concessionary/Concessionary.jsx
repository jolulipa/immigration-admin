import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "@rjsf/bootstrap-4";
import schema from "./concessionaryschema";
import uiSchema from "./concessionaryUiSchema";
import { readConOffice, createUpdateConOffice } from "../../api/conAccess";

const Concessionary = () => {
  const [formData, setFormData] = useState();
  const { id } = useParams();
  const isEditMode = !!id;
  const history = useHistory();

  const navigateToPage = () => {
    history.push("/screens/UsersPage");
  };

  useEffect(() => {
    if (!isEditMode) return;
    (async () => {
      const values = await readConOffice(id);
      setFormData(JSON.parse(values.data));
    })();
  }, [isEditMode, id]);

  const extractData = async ({ formData }) => {
    let i;
    for (i = 1; i < 100; i++) {
      formData.p1[`text${i}`] = null;
    }
  };

  const handleSubmit = async ({ formData }) => {
    extractData({ formData });
    const obj = {
      data: JSON.stringify(formData),
      formId: "I130",
      formStatus: "Unpaid",
    };
    console.log(obj);
    await createUpdateConOffice(obj);
    navigateToPage();
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
