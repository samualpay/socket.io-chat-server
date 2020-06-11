const errors = require('../../errors')
class ChatManager {
  constructor (io) {
    this.chatRooms = []
    this.io = io
  }

  static initInstance (io) {
    ChatManager.instance = new ChatManager(io)
  }

  createChatRoom (roomId) {
    if (this.chatRooms.includes(roomId)) {
      throw errors.ChatRoomIsExist
    }
    this.chatRooms.push(roomId)
  }

  deleteChatRoom (roomId) {
    if (!this.chatRooms.includes(roomId)) {
      throw errors.ChatRoomIsNotExist
    }
    this.io.sockets.clients(roomId).forEach(client => {
      client.leave(roomId)
    })
    const index = this.chatRooms.indexOf(roomId)
    this.chatRooms.splice(index, 1)
  }

  getChatRooms () {
    const chatRooms = this.chatRooms.map(roomId => {
      const obj = { roomId }
      const clients = this.io.sockets.clients(roomId)
      obj.clients = clients
      return obj
    })
    return chatRooms
  }

  sendMsgToRoomUsers (roomId, event, data) {
    this.io.of(roomId).emit(event, data)
  }

  joinChatRoom (client, roomId) {
    if (!this.chatRooms.includes(roomId)) {
      throw errors.ChatRoomIsNotExist
    }
    client.join(roomId)
    this.sendMsgToRoomUsers(roomId, 'message', { sender: { type: 'system' }, message: { type: 'text', content: `the user "${client.socket.name}" is joined` } })
  }

  leaveChatRoom (client, roomId) {
    if (!this.chatRooms.includes(roomId)) {
      throw errors.ChatRoomIsNotExist
    }
    client.leave(roomId)
    this.sendMsgToRoomUsers(roomId, 'message', { sender: { type: 'system' }, message: { type: 'text', content: `the user "${client.socket.name}" is leaved` } })
  }
}

module.exports = ChatManager
