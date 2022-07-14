import {instance} from "./instance";

export const profileAPI = {
  getProfileData(profileId: string) {
    return instance.get(`profile/${profileId}`)
      .then(res => res.data)
},
  getProfileStatus(profileId: string) {
    return instance.get(`profile/status/${profileId}`)
      .then(res => res.data)
  },
  changeProfileStatus(status: string) {
    return instance.put(`profile/status`, {status})
      .then(res => res.data)
  },
}










