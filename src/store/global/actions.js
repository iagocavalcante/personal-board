const saveUser = ({ commit }, username) => {
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

const createList = ({ commit }, payload) => {
  commit('CREATE_LIST', payload)
}

const deleteList = ({ commit }, payload) => {
  commit('DELETE_LIST', payload)
}

const editList = ({ commit }, payload) => {
  commit('EDIT_LIST', payload)
}

const createTask = ({ commit }, payload) => {
  commit('CREATE_TASK', payload)
}

const deleteTask = ({ commit }, payload) => {
  commit('DELETE_TASK', payload)
}

const editTask = ({ commit }, payload) => {
  commit('EDIT_TASK', payload)
}

const saveTasks = ({ commit }, payload) => {
  commit('SAVE_TASKS', payload)
}

const saveLists = ({ commit }, payload) => {
  commit('SAVE_LISTS', payload)
}

const saveBoards = ({ commit }, payload) => {
  commit('SAVE_BOARDS', payload)
}

const saveBoardSelected = ({ commit }, payload) => {
  commit('SAVE_BOARD_SELECTED', payload)
}

export default {
  saveUser,
  createBoard,
  deleteBoard,
  editBoard,
  createList,
  deleteList,
  editList,
  createTask,
  deleteTask,
  editTask,
  saveLists,
  saveTasks,
  saveBoards,
  saveBoardSelected
}