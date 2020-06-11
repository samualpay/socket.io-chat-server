const util = require('../common/utils')
class SocketClient {
  constructor (socket) {
    this.socket = socket
    socket.sendMsg = (event, data) => {
      const result = util.successResponse(data)
      socket.emit(event, result)
    }
    socket.error = (event, errMsg) => {
      const result = util.errorResponse(errMsg)
      socket.emit(event, result)
      console.log(errMsg)
    }
  }

  on (event, cb) {
    this.socket.on(event, cb)
  }

  setUserProperties (properties) {
    for (const key in properties) {
      this.socket[key] = properties[key]
    }
  }

  sendMsg (event, data) {
    this.socket.sendMsg(event, data)
  }

  error (event, errMsg) {
    this.socket.error(event, errMsg)
  }

  join (name) {
    this.socket.join(name)
  }

  leave (name) {
    this.socket.leave(name)
  }
}

module.exports = SocketClient
