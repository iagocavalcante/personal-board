const saveUser = ({ commit }, username) => {
  if(checkUsername) setUsernameLocalStorage(username)
  commit('SET_USER', { username })
}

const createBoard = ({ commit }, payload) => {
  commit('CREATE_BOARD', payload)
}

const deleteBoard = ({ commit }, payload) => {
  commit('DELETE_BOARD', payload)
}

const editBoard = ({ commit }, payload) => {
  commit('EDIT_BOARD', payload)
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
  createBoard,
  deleteBoard,
  editBoard
}