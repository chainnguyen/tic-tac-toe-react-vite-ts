function eventsCallCenter (io, socket) {
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

module.exports = { eventsCallCenter }
