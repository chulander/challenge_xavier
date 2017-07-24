const socketio = require('socket.io')
module.exports = function (server) {
  const io = socketio(server)
  io.on('connection', (socket) => {
    socket.on('enter room', function (data) {
      socket.join(data.room)
    })
    socket.on('leave room', function (data) {
      socket.leave(data.room)
    })
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

  })
  return io
}
