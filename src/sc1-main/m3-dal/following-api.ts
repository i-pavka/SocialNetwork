import {instance} from "./instance";
import {FollowType} from "../../sc2-features/f5-users/bll/usersReducer";


export const followingAPI = {
  userFollow(userId: number, action: FollowType) {
    if(action === 'follow') {
      return instance.post(`follow/${userId}`)
        .then(res => ({dataResponse: res.data, isFollow: true}))
    } else {
      return instance.delete(`follow/${userId}`)
        .then(res => ({dataResponse: res.data, isFollow: false}))
    }
  },
}

