class SocketClient {
  constructor (socket) {
    this.socket = socket
  }

  on (event, cb) {
    this.socket.on(event, cb)
  }

  setUserProperties (properties) {
    for (const key in properties) {
      this[key] = properties[key]
    }
  }

  send (event, data) {
    this.socket.emit(event, {
      status: 1,
      err_msg: '',
      data
    })
  }

  error (event, errMsg) {
    if (errMsg.isCustom) {
      this.socket.emit(event, {
        status: errMsg.status,
        err_msg: errMsg.msg,
        data: {}
      })
    } else {
      this.socket.emit(event, {
        status: 500,
        err_msg: 'server error',
        data: errMsg
      })
    }
    console.log(errMsg)
  }
}

module.exports = SocketClient
