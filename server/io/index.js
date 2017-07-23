const socketio = require('socket.io')
let count = 0
module.exports = function (server) {
  const io = socketio(server)
  io.on('connection', (socket) => {
    console.log('socket connected server side')
    socket.on('enter room', function (data) {
      console.log('someone joining room')
      socket.join(data.room)
    })
    socket.on('leave room', function(data){
      socket.leave(data.room)
    })
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    count++

    // io.emit('news', {msg: 'One more person is online', count: count})
    // io.emit('private',
    //   {msg: 'Welcome you are the ' + count + ' person here'})
    //
    // io.on('private', function (data) {
    //   console.log('private:', data)
    // })
    //
    // io.on('disconnect', function () {
    //   count--
    //   io.emit('news', {msg: 'Someone went home', count: count})
    // })
  })
  return io
}
