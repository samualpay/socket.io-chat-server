const userEvent = require('./event/user')
const SocketClient = require('./socketClient')
function SocketHandler (io) {
  function loadEvent (socketClient, events) {
    events.forEach(elem => {
      socketClient.on(elem.event, (data) => {
        const req = { data }
        function iteratorFunctions (runners, index) {
          if (index < runners.length) {
            const nextFunctioon = iteratorFunctions(runners, index + 1)
            const currentFunction = async function () {
              if (runners.length > index) {
                const runner = runners[index]
                try {
                  await runner.apply(socketClient, [req, nextFunctioon])
                } catch (err) {
                  socketClient.error(elem.event, err)
                }
              }
            }
            return currentFunction
          } else {
            return function () { }
          }
        }
        (iteratorFunctions(elem.runners, 0))()
      })
    })
  }
  io.sockets.on('connection', (socket) => {
    const socketClient = new SocketClient(socket)
    loadEvent(socketClient, userEvent)
  })
}
module.exports = SocketHandler
