import {instance, instanceBobuk} from "./instance";
import {EditProfileFormType} from "../../sc2-features/f2-profile/ui/EditProfileData/EditProfileData";

export const profileAPI = {
  getProfileData(profileId: string) {
    return instance.get(`profile/${profileId}`)
      .then(res => res.data)
  },
  getProfileStatus(profileId: string) {
    return instance.get(`profile/status/${profileId}`)
      .then(res => res.data)
  },
  changeProfileStatus(status: string, isMain: boolean = true) {
    const finalInstance = isMain ? instance : instanceBobuk // for development
    return finalInstance.put(`profile/status`, {status})
      .then(res => res.data)
  },
  setProfilePhoto(photoFile: FormData) {
    return instance.put(`profile/photo`, photoFile, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.data)
  },
  setProfileData(profileData: EditProfileFormType) {
    return instance.put(`profile`, profileData)
      .then(res => res.data)
  },
}










