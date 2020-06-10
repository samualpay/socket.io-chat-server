const userEvent = require('./event/user')
function SocketHandler (io) {
  function loadEvent (socket, events) {
    events.forEach(elem => {
      socket.on(elem.event, (data) => {
        const req = { data }
        function iteratorFunctions (runners, index) {
          if (index < runners.length) {
            const nextFunctioon = iteratorFunctions(runners, index + 1)
            const currentFunction = async function () {
              if (runners.length > index) {
                const runner = runners[index]
                await runner.apply(socket, [req, nextFunctioon])
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
    loadEvent(socket, userEvent)
  })
}
module.exports = SocketHandler
