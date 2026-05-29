import { defineStore } from 'pinia'

const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

export const useGlobalStore = defineStore('global', {
  state: () => ({
    username: '',
    boards: [],
    boardSelected: {},
    appVersion: JSON.parse(unescape(process.env.PACKAGE_JSON || '%7B%7D')).version
  }),

  getters: {
    // Add getters here if needed
  },

  actions: {
    saveUser(username) {
      this.username = username !== '' ? username : 'Anonymous'
    },

    createBoard(payload) {
      const payloadWithId = {
        ...payload,
        id: uuidv4(),
        lists: [],
        starred: false
      }
      this.boards.push(payloadWithId)
    },

    deleteBoard(payload) {
      this.boards = this.boards.filter(board => board.id !== payload.id)
    },

    editBoard(payload) {
      this.boards = this.boards.filter(board => board.id !== payload.id)
      this.boards.push(payload)
    },

    createList(payload) {
      const boardId = payload.board.id
      const payloadWithId = {
        ...payload,
        id: uuidv4(),
        tasks: []
      }
      delete payloadWithId.board

      const board = this.boards.find(board => board.id === boardId)
      if (board) {
        board.lists.push(payloadWithId)
        this.boardSelected = { ...board }
      }
    },

    deleteList(payload) {
      this.boards = this.boards.filter(board => board.id !== payload.id)
    },

    editList(payload) {
      this.boards = this.boards.filter(board => board.id !== payload.id)
      this.boards.push(payload)
    },

    createTask(payload) {
      const boardId = payload.board.id
      const listId = payload.list.id
      const payloadWithId = {
        ...payload,
        id: uuidv4()
      }
      delete payloadWithId.board
      delete payloadWithId.list

      const board = this.boards.find(board => board.id === boardId)
      if (board) {
        const list = board.lists.find(list => list.id === listId)
        if (list) {
          list.tasks.push(payloadWithId)
          this.boardSelected = { ...board }
        }
      }
    },

    deleteTask(payload) {
      const board = this.boards.find(board => board.id === payload.boardId)
      if (board) {
        const list = board.lists.find(list => list.id === payload.listId)
        if (list) {
          list.tasks = list.tasks.filter(task => task.id !== payload.task.id)
        }
      }

      const selectedList = this.boardSelected.lists?.find(list => list.id === payload.listId)
      if (selectedList) {
        selectedList.tasks = selectedList.tasks.filter(task => task.id !== payload.task.id)
      }
    },

    editTask(payload) {
      const board = this.boards.find(board => board.id === payload.boardId)
      if (board) {
        const list = board.lists.find(list => list.id === payload.listId)
        if (list) {
          list.tasks = list.tasks.filter(task => task.id !== payload.task.id)
          list.tasks.push(payload.task)
        }
      }

      const selectedList = this.boardSelected.lists?.find(list => list.id === payload.listId)
      if (selectedList) {
        selectedList.tasks = selectedList.tasks.filter(task => task.id !== payload.task.id)
        selectedList.tasks.push(payload.task)
      }
    },

    saveTasks(payload) {
      const board = this.boards.find(board => board.id === payload.boardId)
      if (board) {
        const list = board.lists.find(list => list.id === payload.list.id)
        if (list) {
          list.tasks = [...list.tasks, ...payload.list.tasks]
        }
      }

      const selectedList = this.boardSelected.lists?.find(list => list.id === payload.list.id)
      if (selectedList) {
        selectedList.tasks = [...selectedList.tasks, ...payload.list.tasks]
      }
    },

    saveLists(payload) {
      const board = this.boards.find(board => board.id === payload.id)
      if (board) {
        board.lists = [...board.lists, ...payload.lists]
      }
      if (this.boardSelected) {
        this.boardSelected.lists = [...(this.boardSelected.lists || []), ...payload.lists]
      }
    },

    saveBoards(payload) {
      this.boards = payload
    },

    saveBoardSelected(payload) {
      this.boardSelected = payload
    }
  },

  persist: true
})
