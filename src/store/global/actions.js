const saveUser = ({ commit }, username) => {
  if(checkUsername) setUsernameLocalStorage(username)
  commit('SET_USER', { username })
}

const checkUsername = () => {
  if (window.localStorage.getItem('username')) return true
  return false
}

const setUsernameLocalStorage = (username) => {
  window.localStorage.setItem('username', username)
}

export default {
  saveUser,
}