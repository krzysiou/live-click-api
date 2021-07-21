const { checkRooms, createRoom, deleteRoom } = require('./controllers/rooms.js');
const { checkUsers, updateUser, registerUser, loginUser } = require('./controllers/users.js');
const { json } = require('express');
const express = require('express')
const checkAuth = require('./controllers/check-auth')
const app = express()
const port = 3000


const rooms = [];
const users = [];

app.use(express.json())

//managing room
app.get('/rooms', checkRooms(rooms))
app.post('/rooms', createRoom(rooms))
app.delete('/rooms/:roomId', deleteRoom(rooms))

//managing user
app.get('/users', checkUsers(users))
app.post('/users/register', registerUser(users))
app.post('/users/login', loginUser(users))
app.patch('/users/:userId', checkAuth, updateUser(users))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})