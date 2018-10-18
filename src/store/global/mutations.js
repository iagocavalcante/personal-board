const SET_USER = ( state, payload ) => {
  state.username = payload.username !== '' ? payload.username : 'Anonymous'
}

const CREATE_BOARD = ( state, payload ) => {
  const payloadWithId = Object.assign({}, payload, {
    id: uuidv4(),
    lists: [],
    starred: false
  })
  state.boards = state.boards.concat(payloadWithId)
  saveBoardsLocal( state.boards )
}

const DELETE_BOARD = ( state, payload ) => {
  state.boards = state.boards.filter(board => board.id !== payload.id)
  saveBoardsLocal( state.boards )
}

const EDIT_BOARD = ( state, payload ) => {
  state.boards = state.boards.filter(board => board.id !== payload.id)
  state.boards = state.boards.concat(payload)
  saveBoardsLocal( state.boards )
}

const CREATE_LIST = ( state, payload ) => {
  const boardId = payload.board.id
  delete payload.board
  const payloadWithId = Object.assign({}, payload, {
    id: uuidv4(),
    lists: [],
  })
  state.boards.find(board => board.id === boardId).lists.push(payloadWithId)
  saveBoardsLocal( state.boards )
}

const DELETE_LIST = ( state, payload ) => {
  state.boards = state.boards.filter(board => board.id !== payload.id)
  saveBoardsLocal( state.boards )
}

const EDIT_LIST = ( state, payload ) => {
  state.boards = state.boards.filter(board => board.id !== payload.id)
  state.boards = state.boards.concat(payload)
  saveBoardsLocal( state.boards )
}

const CREATE_TASK = ( state, payload ) => {
  const boardId = payload.board.id
  const listId = payload.list.id
  delete payload.board
  delete payload.list
  const payloadWithId = Object.assign({}, payload, {
    id: uuidv4()
  })
  state.boards.find(board => board.id === boardId).lists.find(list => list.id === listId).tasks.push(payloadWithId)
  saveBoardsLocal( state.boards )
}

const DELETE_TASK = ( state, payload ) => {
  state.boards = state.boards.filter(board => board.id !== payload.id)
  saveBoardsLocal( state.boards )
}

const EDIT_TASK = ( state, payload ) => {
  state.boards = state.boards.filter(board => board.id !== payload.id)
  state.boards = state.boards.concat(payload)
  saveBoardsLocal( state.boards )
}

const SAVE_LISTS = ( state, payload ) => {
  state.boards.find(board => board.id === payload.id).lists.concat(payload.lists)
  saveBoardsLocal( state.boards )
}

const SAVE_BOARDS = ( state, payload ) => {
  state.boards = []
  state.boards = state.boards.concat(payload)
  saveBoardsLocal( state.boards )
}

const SAVE_TASKS = ( state, payload ) => {
  state.boards.find(board => board.id === payload.boardId).lists.find(list => list.id === payload.listId).tasks.concat(payload.tasks)
  saveBoardsLocal( state.boards )
}

const saveBoardsLocal = ( updatedBoards ) => {
  const boards = JSON.stringify(updatedBoards)
  window.localStorage.setItem('boards', boards)
}

const uuidv4 = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
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
  SAVE_BOARDS
}