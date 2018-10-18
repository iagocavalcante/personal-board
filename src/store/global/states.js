export default {
  username: window.localStorage.getItem('username') ? window.localStorage.getItem('username') : 'Anonymous',
  boards: window.localStorage.getItem('boards') ? JSON.parse(window.localStorage.getItem('boards')) : []
}
