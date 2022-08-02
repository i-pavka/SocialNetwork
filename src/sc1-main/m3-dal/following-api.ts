import {instance, instanceBobuk} from "./instance";
import {FollowType} from "../../sc2-features/f5-users/bll/usersReducer";

export const followingAPI = {

  userFollow(userId: number, action: FollowType,  isMain: boolean = true) {
    const finalInstance = isMain ? instance : instanceBobuk // for development
    if(action === 'follow') {
      return finalInstance.post(`follow/${userId}`)
        .then(res => ({dataResponse: res.data, isFollow: true}))
    } else {
      return finalInstance.delete(`follow/${userId}`)
        .then(res => ({dataResponse: res.data, isFollow: false}))
    }
  },
}

