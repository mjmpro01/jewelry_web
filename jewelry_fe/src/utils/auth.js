import variables from "../constants/variables"

export const isUserLoggedIn = () => {
  const accessToken = localStorage.getItem(variables.USER_ACCESS_TOKEN);

  return !!accessToken
}

export const getUserProfile = () => {
  const profile = JSON.parse(localStorage.getItem(variables.USER_PROFILE) || '{}')

  return profile
}