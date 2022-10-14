function generateRoomId (idWarehouse, length = 10) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_+^&*$@#~';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return idWarehouse.includes(result)
      ? generateRoomId(idWarehouse, length)
      : result;
}


module.exports = {
  generateRoomId
}
