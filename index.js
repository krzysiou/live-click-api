const { checkRooms, createRoom, deleteRoom } = require('./controllers/rooms.js');
const { checkUsers, updateUser } = require('./controllers/users.js');
const { json } = require('express');
const express = require('express')
const app = express()
const port = 3000

const rooms = {};
const users = {};

  express.urlencoded({
	extended: true
  })

app.use(express.json())

//managing room
app.get('/rooms', checkRooms(rooms))
app.post('/rooms', createRoom(rooms))
app.delete('/rooms/:roomId', deleteRoom(rooms))

//managing user
app.get('/users', checkUsers(users))
app.patch('/users/:userId', updateUser(users))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})