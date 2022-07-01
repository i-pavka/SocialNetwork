import axios from 'axios';
import {apiConfig} from "./config";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": apiConfig.NETWORK_KEY as string
  },
})
