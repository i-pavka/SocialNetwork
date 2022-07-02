import {instance} from "./instance";
import {FormType} from "../../sc2-features/f1-auth/Login/ui/LoginForm/LoginForm";

export const authAPI = {
  getAuthMe() {
    return instance.get(`auth/me`)
      .then(res => res.data)
  },
  authLogIn(data: FormType) {
    return instance.post(`auth/login`, data)
      .then(res => res.data)
  },
  authLogOut() {
    return instance.delete(`auth/login`)
      .then(res => res.data)
  }
}


