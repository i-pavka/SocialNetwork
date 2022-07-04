import {instance} from "./instance";

export const profileAPI = {
  getProfileData(profileId: string) {
    return instance.get(`profile/${profileId}`)
      .then(res => res.data)
}
}










