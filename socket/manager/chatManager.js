const errors = require('../../errors')
const emitEvent = require('../enum/emitEvent')
class ChatManager {
  constructor (io) {
    this.chatRooms = []
    this.io = io
    this.msgs = {}
  }

  static initInstance (io) {
    ChatManager.instance = new ChatManager(io)
  }

  createChatRoom (roomId) {
    if (this.chatRooms.includes(roomId)) {
      throw errors.ChatRoomIsExist
    }
    this.chatRooms.push(roomId)
    this.msgs[roomId] = []
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
    delete this.msgs[roomId]
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

  getMsgs (roomId) {
    const result = this.msgs[roomId] || []
    return result
  }

  sendEventToRoomUsers (roomId, event, data) {
    if (!this.chatRooms.includes(roomId)) {
      throw errors.ChatRoomIsNotExist
    }
    this.io.of(roomId).emit(event, data)
  }

  sendMsgToRoomUsers (roomId, sender, type, content) {
    const data = { sender, message: { type, content } }
    this.sendEventToRoomUsers(roomId, emitEvent.message(roomId), data)
    this.msgs[roomId].push(data)
  }

  updateRoomInfoForUser (roomId) {
    const users = []
    this.io.sockets.clients(roomId).forEach(client => {
      users.push(client.socket.account)
    })
    this.sendEventToRoomUsers(roomId, emitEvent.roomInfo(roomId), { users })
  }

  joinChatRoom (client, roomId) {
    if (!this.chatRooms.includes(roomId)) {
      throw errors.ChatRoomIsNotExist
    }
    client.join(roomId)
    this.sendMsgToRoomUsers(roomId, { type: 'system' }, 'text', `the user "${client.socket.name}" is joined`)
    this.updateRoomInfoForUser(roomId)
  }

  leaveChatRoom (client, roomId) {
    if (!this.chatRooms.includes(roomId)) {
      throw errors.ChatRoomIsNotExist
    }
    client.leave(roomId)
    this.sendMsgToRoomUsers(roomId, { type: 'system' }, 'text', `the user "${client.socket.name}" is leaved`)
    this.updateRoomInfoForUser(roomId)
  }
}

module.exports = ChatManager
