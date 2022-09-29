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
      // the disconnection was initiated by the server, you need to reconnect manually
      socket.connect();
    }
  });

  // Listen event from client
  socket.on('SET_COUNT', (val) => {
    io.emit('UPDATE_COUNT', val);
  });
});
