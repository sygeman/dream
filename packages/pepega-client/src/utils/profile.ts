interface IProfile {
  serviceName: string;
  serviceId: string;
}

export const profilesToObject = (profiles: IProfile[]) => {
  const profilesObj = {};

  profiles.forEach(profile => {
    profilesObj[profile.serviceName] = profile;
  });

  return profilesObj;
};
