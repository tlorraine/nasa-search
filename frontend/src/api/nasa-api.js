import axios from "axios";

export const getNasaImages = (query) => {
  return axios.get(`/images/search?q=${query}`)
    .then(response => response.data)
    .catch(error => console.error("failed to fetch nasa images", error));
};

export const getNasaImagesByPage = (query, page) => {
  return axios.get(`/images/search?q=${query}&page=${page}`)
    .then(response => response.data)
    .catch(error => console.error("failed to fetch nasa images", error));
};

export const getNasaDetailsById = (id) => {
  return axios.get(`/images/nasa-details/${id}`)
    .then(response => response.data)
    .catch(error => console.error("failed to fetch nasa images", error));
};
