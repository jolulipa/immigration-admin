import { baseUrl } from "./configuration";
import { AUTH_TOKEN } from "../constants/storageKeys";
import JWT from "jwt-decode";

let hasAccess = false;
const token = localStorage.getItem(AUTH_TOKEN) || "";

if (!!token) {
  const decodedExp = JWT(token);
  const currentTimestamp = Date.now() / 1000;
  hasAccess = decodedExp.exp > currentTimestamp;
} else {
  hasAccess = false;
}

const handleError = () => {
  console.log("User has no access.");
};

export const readAllCons = async () => {
  const response = await fetch(`${baseUrl}/api/conce/readAllCons`, {
    method: "GET",
    headers: {
      jwt: token,
    },
  });
  const datos = await response.json();
  return await datos.results;
};

export const readConOffice = async (id) => {
  const response = await fetch(
    `${baseUrl}/api/conce/public/readConOffice/${id}`,
    {
      method: "GET",
      headers: {
        jwt: token,
      },
    }
  ).catch((error) => console.log(error));
  const datos = await response.json();
  return await datos;
};

export const createUpdateConOffice = async (values) => {
  try {
    const response = await fetch(`${baseUrl}/api/conce/createUpdateConOffice`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        jwt: token,
      },
    });
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.log("ERROR RETURNED", error);
  }
};

export const deleteConOffice = async (id) => {
  if (hasAccess) {
    await fetch(`${baseUrl}/api/conce/deleteConOffice/${id}`, {
      method: "DELETE",
      headers: {
        jwt: token,
      },
    });
  } else {
    handleError();
  }
};

export const print = async (id) =>
  await fetch(`${baseUrl}/api/forms/print/${id}`, {
    method: "GET",
    headers: {
      jwt: token,
    },
  });
