import axios from "axios";

export const axiosClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 15000,
});



export default axiosClient;