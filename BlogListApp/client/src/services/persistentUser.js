const localStorageKey = 'loggedBlogAppUser'
const getUser = () => {
  return window.localStorage.getItem(localStorageKey)
}
const saveUser = (user) => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(user))
}
const removeUser = () => {
  window.localStorage.removeItem(localStorageKey)
}

export default { getUser, saveUser, removeUser }