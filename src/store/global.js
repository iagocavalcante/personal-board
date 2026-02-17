import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

export const useGlobalStore = defineStore('global', () => {
  const username = ref('')
  const boards = ref([])
  const boardSelected = ref({})
  const appVersion = ref('1.0.0')

  // Getters
  const getUsername = computed(() => username.value)
  const getBoards = computed(() => boards.value)

  // Actions
  function setUsername(name) {
    username.value = name || 'Anonymous'
    saveToStorage()
  }

  function setBoardSelected(board) {
    boardSelected.value = board
  }

  function createBoard(payload) {
    const newBoard = {
      id: uuidv4(),
      title: payload.title,
      description: payload.description,
      starred: false,
      lists: []
    }
    boards.value.push(newBoard)
    saveToStorage()
  }

  function deleteBoard(payload) {
    boards.value = boards.value.filter(b => b.id !== payload.id)
    saveToStorage()
  }

  function editBoard(payload) {
    const index = boards.value.findIndex(b => b.id === payload.id)
    if (index !== -1) {
      boards.value[index] = { ...boards.value[index], ...payload }
      if (boardSelected.value.id === payload.id) {
        boardSelected.value = boards.value[index]
      }
      saveToStorage()
    }
  }

  function saveBoards(newBoards) {
    boards.value = newBoards
    saveToStorage()
  }

  function createList(payload) {
    const boardId = payload.board.id
    const newList = {
      id: uuidv4(),
      title: payload.title,
      tasks: []
    }
    const board = boards.value.find(b => b.id === boardId)
    if (board) {
      board.lists.push(newList)
      boardSelected.value = { ...board }
      saveToStorage()
    }
  }

  function createTask(payload) {
    const boardId = payload.board.id
    const listId = payload.list.id
    const newTask = {
      id: uuidv4(),
      title: payload.title,
      description: payload.description
    }
    
    const board = boards.value.find(b => b.id === boardId)
    if (board) {
      const list = board.lists.find(l => l.id === listId)
      if (list) {
        list.tasks.push(newTask)
        boardSelected.value = { ...board }
        saveToStorage()
      }
    }
  }

  function deleteTask(payload) {
    const { boardId, listId, task } = payload
    const board = boards.value.find(b => b.id === boardId)
    if (board) {
      const list = board.lists.find(l => l.id === listId)
      if (list) {
        list.tasks = list.tasks.filter(t => t.id !== task.id)
        boardSelected.value = { ...board }
        saveToStorage()
      }
    }
  }

  function editTask(payload) {
    const { boardId, listId, task } = payload
    const board = boards.value.find(b => b.id === boardId)
    if (board) {
      const list = board.lists.find(l => l.id === listId)
      if (list) {
        list.tasks = list.tasks.filter(t => t.id !== task.id)
        list.tasks.push(task)
        boardSelected.value = { ...board }
        saveToStorage()
      }
    }
  }

  function saveLists(payload) {
    const board = boards.value.find(b => b.id === payload.id)
    if (board) {
      board.lists = payload.lists
      boardSelected.value = { ...board }
      saveToStorage()
    }
  }

  function saveTasks(payload) {
    const board = boards.value.find(b => b.id === payload.boardId)
    if (board) {
      const list = board.lists.find(l => l.id === payload.list.id)
      if (list) {
        list.tasks = payload.list.tasks
        boardSelected.value = { ...board }
        saveToStorage()
      }
    }
  }

  function saveToStorage() {
    localStorage.setItem('personal-board', JSON.stringify({
      username: username.value,
      boards: boards.value
    }))
  }

  function loadFromStorage() {
    const data = localStorage.getItem('personal-board')
    if (data) {
      const parsed = JSON.parse(data)
      username.value = parsed.username || ''
      boards.value = parsed.boards || []
    }
  }

  return {
    username,
    boards,
    boardSelected,
    appVersion,
    getUsername,
    getBoards,
    setUsername,
    setBoardSelected,
    createBoard,
    deleteBoard,
    editBoard,
    saveBoards,
    createList,
    createTask,
    deleteTask,
    editTask,
    saveLists,
    saveTasks,
    loadFromStorage
  }
})
