export default {
  username: '',
  boards: [],
  boardSelected: {},
  appVersion: JSON.parse(unescape(process.env.PACKAGE_JSON || '%7B%7D')).version
}
