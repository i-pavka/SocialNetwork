import {instance} from "./instance";


export const usersAPI = {
  getUsers(currentPage: number, pageSize: number, userName: string = '') {
    return instance.get(`users?page=${currentPage}&count=${pageSize}&term=${userName}`)
      .then(res => res.data)
  },
}










