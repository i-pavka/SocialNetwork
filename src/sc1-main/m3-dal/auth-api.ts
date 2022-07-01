import {instance} from "./instance";

export const authAPI = {
  getAuthMe() {
    return instance.get(`auth/me`)
      .then(res => res.data)
  },
  authLogIn(email: string, password: string, rememberMe: boolean) {
    return instance.post(`auth/login`, {email, password, rememberMe})
      .then(res => res.data)
  },
  authLogOut() {
    return instance.delete(`auth/login`)
      .then(res => res.data)
  }
}


