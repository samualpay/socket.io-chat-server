class SocketClient {
  constructor (socket) {
    this.socket = socket
    socket.sendMsg = (event, data) => {
      socket.emit(event, {
        status: 1,
        err_msg: '',
        data
      })
    }
    socket.error = (event, errMsg) => {
      if (errMsg.isCustom) {
        socket.emit(event, {
          status: errMsg.status,
          err_msg: errMsg.msg,
          data: {}
        })
      } else {
        socket.emit(event, {
          status: 500,
          err_msg: 'server error',
          data: errMsg
        })
      }
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
