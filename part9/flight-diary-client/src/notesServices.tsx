import axios from "axios";
import { Entry, NewEntry } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getEntries = () => {
  return axios
    .get<Entry[]>(baseUrl)
    .then(response => response.data)
}

export const createEntry = (object: NewEntry) => {
  return axios
    .post<Entry>(baseUrl, object)
    .then(res => res.data)
}