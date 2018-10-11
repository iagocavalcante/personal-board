const SET_USER = (state, payload) => {
  state.data.username = payload.username !== '' ? payload.username : 'Anonymous'
}

export default {
  SET_USER
}