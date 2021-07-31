const jwt = require('jsonwebtoken');

const checkRooms = (rooms) => {
    return (req, res) => {
        res.json(rooms)
    }
}

const createRoom = (rooms) => {
    return (req, res) => {
        const ownerId = req.body.ownerId
        const roomId = req.body.roomId
      
        if(!ownerId){
          res.status(400).json({})
          return
        }
    
        const room = createNewRoom(roomId, ownerId)
        rooms.push(room)
        res.status(201).json(room)
      }
}

const addUserToRoom = (users, rooms) => {
  return (req, res) => {
    const roomId = req.params.roomId
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token)
    const user = users.find(user => user.id === decoded.id)
    const room = rooms.find(room => room.id === roomId)
    room.users.push(user)
    res.status(200).json({})
  }
}

const deleteRoom = (rooms) => {
  return (req, res) => {
    const ownerId = req.body.ownerId
    const roomId = req.params.roomId
  
    if(!ownerId || !roomId){
      res.status(400).json({})
      return
    }
  
    const room = rooms[roomId]
  
    if(room && room.ownerId === ownerId){
      rooms[roomId] = undefined
      res.status(200).json({})
    } else {
      res.status(401).json({})
    }
  }
}

module.exports = { checkRooms, createRoom, deleteRoom, addUserToRoom }

function createNewRoom(id, ownerId){
	return {
		id,
		ownerId,
		users: [],
		isPlaying: false,
	}
}