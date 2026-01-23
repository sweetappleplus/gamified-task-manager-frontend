import axios from "axios";

export const API_URL = process.env["REACT_APP_API_URL"];

if (!API_URL) {
  throw new Error("REACT_APP_API_URL environment variable is not defined");
}

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
