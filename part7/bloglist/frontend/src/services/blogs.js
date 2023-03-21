import axios from "axios";
import storageService from "../services/storage";
const baseUrl = "/api/blogs";

const headers = {
  Authorization: storageService.loadUser()
    ? `Bearer ${storageService.loadUser().token}`
    : null,
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const getOne = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const create = async (object) => {
  const request = await axios.post(baseUrl, object, { headers });
  return request.data;
};

const update = async (object) => {
  const request = await axios.put(`${baseUrl}/${object.id}`, object, {
    headers,
  });
  return request.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers });
};

const comment = async (id, comment) => {
  const req = axios.post(`${baseUrl}/${id}/comments`, { comment })
  return req.data
}

export default { getAll, getOne, create, update, remove, comment };
