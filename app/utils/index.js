module.exports = {
  getTeamResultColor(result) {
    switch (result) {
      case '羸':
        return 'red--text accent-1'
      case '輸':
        return 'green--text accent-1'
      default:
        return 'blue--text accent-1'
    }
  }
}