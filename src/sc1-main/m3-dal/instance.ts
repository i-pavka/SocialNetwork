import axios from 'axios';
import {apiConfig} from "../../sc3-utils/config";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": apiConfig.NETWORK_KEY as string
  },
})

export const instanceBobuk = axios.create({  // for development
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": apiConfig.NETWORK_KEY_BOBUK as string
  },
})