export default {
  username: window.localStorage.getItem('username') ? window.localStorage.getItem('username') : 'Anonymous',
  boards: window.localStorage.getItem('boards') ? JSON.parse(window.localStorage.getItem('boards')) : [],
  cards: window.localStorage.getItem('cards') ? JSON.parse(window.localStorage.getItem('cards')) : [],
  tasks: window.localStorage.getItem('tasks') ? JSON.parse(window.localStorage.getItem('tasks')) : [],
}
