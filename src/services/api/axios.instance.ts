import axios from "axios";

const apiUrl = process.env["REACT_APP_API_URL"];

if (!apiUrl) {
  throw new Error("REACT_APP_API_URL environment variable is not defined");
}

export const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});
