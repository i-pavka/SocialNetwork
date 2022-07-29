import {instance} from "./instance";


export const usersAPI = {
  getUsers(
    currentPage: number,
    pageSize: number,
    userName: string = '',
    isFriends: boolean = false
  ) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}&term=${userName}&friend=${isFriends}`)
      .then(res => res.data)
  },
}










