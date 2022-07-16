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
  setProfilePhoto(photoFile: FormData) {
    return instance.put(`profile/photo`, photoFile, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.data)
  },
}










