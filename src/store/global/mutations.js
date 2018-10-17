const SET_USER = ( state, payload ) => {
  state.username = payload.username !== '' ? payload.username : 'Anonymous'
}

const CREATE_BOARD = ( state, payload ) => {
  const payloadWithId = Object.assign({}, payload, {
    id: uuidv4(),
    lists: [],
    tasks: [],
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
  EDIT_BOARD
}