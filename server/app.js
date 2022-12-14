// Core
const io = require('socket.io')(5000);
// Hooks
const { eventsCallCenter } = require("./events-center");
const $helper = require("./helper");

// Global variables
const idWarehouse = []
let connectCounter = 0

io.on('connection', (socket) => {
  console.log(`[CONNECTED] - ${socket.id}`)
  connectCounter = io.engine?.clientsCount
  io.emit('CONNECT_COUNTER', connectCounter);

  sortUsersByRoom(socket)
  // Listen event from client
  eventsCallCenter(io, socket)

  socket.on('connect_error', () => {
    setTimeout(() => {
      socket.connect();
    }, 500);
  });

  socket.on('disconnecting', (reason) => {});

  // Doc: https://socket.io/docs/v4/client-socket-instance/#disconnect
  socket.on('disconnect', (reason) => {
    console.log(`[DISCONNECTED] - ${socket.id}`)
    connectCounter = io.engine?.clientsCount

    if (reason === 'io server disconnect') {
      // The disconnection was initiated by the server, you need to reconnect manually
      socket.connect();
    }
  });
});

function sortUsersByRoom (socket) {
  const newRoomId = $helper.generateRoomId(idWarehouse, 15)
  const { rooms } = socket.adapter
  idWarehouse.push(newRoomId)
  socket.join('ROOM-' + newRoomId)
}
