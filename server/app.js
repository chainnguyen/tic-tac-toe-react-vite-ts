const io = require('socket.io')(5000);

io.on('connection', (socket) => {
  console.log(`[CONNECTED] - ${socket.id}`)

  socket.on('connect_error', () => {
    setTimeout(() => {
      socket.connect();
    }, 500);
  });

  socket.on('disconnecting', (reason) => {});

  // Doc: https://socket.io/docs/v4/client-socket-instance/#disconnect
  socket.on('disconnect', (reason) => {
    console.log(`[DISCONNECTED] - ${socket.id}`)
    if (reason === 'io server disconnect') {
      // The disconnection was initiated by the server, you need to reconnect manually
      socket.connect();
    }
  });

  // Listen event from client
  eventsCallCenter(socket)
});


function eventsCallCenter (socket) {
  socket.on('SWITCH_TYPE_GAME', (type) => {
    io.emit('UPDATE_TYPE_GAME', type);
  });

  socket.on('GAME_STATUS', (status) => {
    io.emit('UPDATE_GAME_STATUS', status)
  });

  socket.on('PLAYING_ACTION', (payload) => {
    io.emit('UPDATE_PLAYING_ACTION', payload)
  });

  socket.on('WAS_WINNER', (payload) => {
    io.emit('UPDATE_WAS_WINNER', payload)
    io.emit('UPDATE_GAME_STATUS', payload.status)
  });

  socket.on('RESET_GAME', (payload) => {
    io.emit('UPDATE_RESET_GAME', payload)
    io.emit('UPDATE_GAME_STATUS', 'unfinished')
  });
}
