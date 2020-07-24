const SET_USER = (state, payload) => {
  state.username = payload.username !== '' ? payload.username : 'Anonymous'
}

const SAVE_BOARD_SELECTED = (state, payload) => {
  state.boardSelected = payload
}

const CREATE_BOARD = (state, payload) => {
  const payloadWithId = Object.assign({}, payload, {
    id: uuidv4(),
    lists: [],
    starred: false
  })
  state.boards = state.boards.concat(payloadWithId)
}

const DELETE_BOARD = (state, payload) => {
  state.boards = state.boards.filter(board => board.id !== payload.id)
}

const EDIT_BOARD = (state, payload) => {
  state.boards = state.boards.filter(board => board.id !== payload.id)
  state.boards = state.boards.concat(payload)
}

const CREATE_LIST = (state, payload) => {
  const boardId = payload.board.id
  delete payload.board
  const payloadWithId = Object.assign({}, payload, {
    id: uuidv4(),
    tasks: []
  })
  state.boards.find(board => board.id === boardId).lists.push(payloadWithId)
  state.boards.map(board => {
    if (board.id === boardId) state.boardSelected = { ...board }
  })
}

const DELETE_LIST = (state, payload) => {
  state.boards = state.boards.filter(board => board.id !== payload.id)
}

const EDIT_LIST = (state, payload) => {
  state.boards = state.boards.filter(board => board.id !== payload.id)
  state.boards = state.boards.concat(payload)
}

const CREATE_TASK = (state, payload) => {
  const boardId = payload.board.id
  const listId = payload.list.id
  delete payload.board
  delete payload.list
  const payloadWithId = Object.assign({}, payload, {
    id: uuidv4()
  })
  state.boards.find(board => board.id === boardId).lists.find(list => list.id === listId).tasks.push(payloadWithId)
  state.boards.map(board => {
    if (board.id === boardId) state.boardSelected = { ...board }
  })
}

const DELETE_TASK = (state, payload) => {
  state.boards.find(board => board.id === payload.boardId)
    .lists.find(list => list.id === payload.listId)
    .tasks = state.boards.find(board => board.id === payload.boardId)
      .lists.find(list => list.id === payload.listId)
      .tasks.filter(task => task.id !== payload.task.id)
  state.boardSelected.lists.find(list => list.id === payload.listId)
    .tasks = state.boards.find(board => board.id === payload.boardId)
      .lists.find(list => list.id === payload.listId)
      .tasks.filter(task => task.id !== payload.task.id)
}

const EDIT_TASK = (state, payload) => {
  state.boards = state.boards.filter(board => board.id !== payload.id)
  state.boards = state.boards.concat(payload)
}

const SAVE_LISTS = (state, payload) => {
  state.boards.find(board => board.id === payload.id).lists.concat(payload.lists)
  state.boardSelected.lists.concat(payload.lists)
}

const SAVE_BOARDS = (state, payload) => {
  state.boards = []
  state.boards = state.boards.concat(payload)
}

const SAVE_TASKS = (state, payload) => {
  state.boards.find(board => board.id === payload.boardId).lists.find(list => list.id === payload.list.id).tasks.concat(payload.list.tasks)
  state.boardSelected.lists.find(list => list.id === payload.list.id).tasks.concat(payload.list.tasks)
}

const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

export default {
  SET_USER,
  CREATE_BOARD,
  DELETE_BOARD,
  EDIT_BOARD,
  CREATE_LIST,
  DELETE_LIST,
  EDIT_LIST,
  CREATE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SAVE_LISTS,
  SAVE_TASKS,
  SAVE_BOARDS,
  SAVE_BOARD_SELECTED
}
