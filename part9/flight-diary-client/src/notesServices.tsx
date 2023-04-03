import axios from "axios";
import { Entry } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getEntries = () => {
  return axios
    .get<Entry[]>(baseUrl)
    .then(response => response.data)
}