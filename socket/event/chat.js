const paramValid = require('../middlewares/paramValid')
const ChatManager = require('../manager/chatManager')
module.exports = [
  {
    event: 'join',
    runners: [
      paramValid({
        required: ['roomId'],
        properties: {
          roomId: {
            type: 'string'
          }
        }
      }),
      async function (req) {
        const roomId = req.data.roomId
        ChatManager.instance.joinChatRoom(this, roomId)
      }
    ]
  },
  {
    event: 'leave',
    runners: [
      paramValid({
        required: ['roomId'],
        properties: {
          roomId: {
            type: 'string'
          }
        }
      }),
      async function (req) {
        const roomId = req.data.roomId
        ChatManager.instance.leaveChatRoom(this, roomId)
      }
    ]
  },
  {
    event: 'message',
    runners: [
      paramValid({
        required: ['roomId', 'type', 'content'],
        properties: {
          roomId: {
            type: 'string'
          },
          type: {
            type: 'string'
          },
          content: {
            type: 'string'
          }
        }
      }),
      async function (req) {
        const roomId = req.data.roomId
        const type = req.data.type
        const content = req.data.content
        const sender = { type: 'user', account: this.socket.account }
        ChatManager.instance.sendMsgToRoomUsers(roomId, sender, type, content)
      }
    ]
  }
]
