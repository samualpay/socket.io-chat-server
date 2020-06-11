class CustomError extends Error {
  constructor (message) {
    super(message)
    this.isCustom = true
  }
}
class RequiredParameterNotFound extends CustomError {
  constructor () {
    super('RequiredParameterNotFound')
    this.status = -20001
    this.msg = 'RequiredParameterNotFound'
  }
}
class ChatRoomIsExist extends CustomError {
  constructor () {
    super('ChatRoomIsExist')
    this.status = -20002
    this.msg = 'ChatRoomIsExist'
  }
}
class ChatRoomIsNotExist extends CustomError {
  constructor () {
    super('ChatRoomIsNotExist')
    this.status = -20003
    this.msg = 'ChatRoomIsNotExist'
  }
}

class VerifyTokenError extends CustomError {
  constructor () {
    super('VerifyTokenError')
    this.status = -20004
    this.msg = 'VerifyTokenError'
  }
}
module.exports = {
  RequiredParameterNotFound: new RequiredParameterNotFound(),
  ChatRoomIsExist: new ChatRoomIsExist(),
  ChatRoomIsNotExist: new ChatRoomIsNotExist(),
  VerifyTokenError: new VerifyTokenError()
}
