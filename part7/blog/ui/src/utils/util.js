export const getToken = () => {
  const userDetails = window.localStorage.getItem('userDetails')
  if (userDetails) {
    return JSON.parse(userDetails).token
  }
  return null
}