import axios from "axios";
import { API_URL } from "consts";

if (!API_URL) {
  throw new Error("API_URL is not set in the environment variables");
}

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
