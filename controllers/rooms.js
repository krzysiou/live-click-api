const jwt = require('jsonwebtoken');

const checkRooms = (rooms) => {
    return (req, res) => {
        res.json(rooms)
    }
}

const createRoom = (rooms) => {
    return (req, res) => {
      //GET OWNERID AND ROOMID
        const ownerId = req.body.ownerId
        const roomId = req.body.roomId
      
        if(!ownerId){
          res.status(400).json({})
          return
        }
        //CREATE ROOM
        const room = createNewRoom(roomId, ownerId)
        //ADD ROOM TO ARRAY
        rooms.push(room)
        res.status(201).json(room)
      }
}

const addUserToRoom = (users, rooms) => {
  return (req, res) => {
    //GET TOKEN AND ROOMID
    const roomId = req.params.roomId
    const token = req.headers.authorization.split(" ")[1];
    //DECODE TOKEN TO GET USER INFO
    const decoded = jwt.decode(token)
    //FIND USER VIA TOKEN
    const user = users.find(user => user.id === decoded.id)
    //FIND ROOM VIA ROOMID
    const room = rooms.find(room => room.id === roomId)
    //ADD USER TO ROOM
    room.users.push(user)
    res.status(200).json({})
  }
}

const deleteRoom = (rooms) => {
  return (req, res) => {
    //GET OWNERID AND ROOMID
    const ownerId = req.body.ownerId
    const roomId = req.params.roomId
  
    if(!ownerId || !roomId){
      res.status(400).json({})
      return
    }
    //FIND ROOM
    const room = rooms.find(room => room.id === roomId)
    
    //IF AUTHORIZED DELETE ROOM
    if(room && room.ownerId === ownerId){
      room = undefined
      res.status(200).json({})
    } else {
      res.status(401).json({})
    }
  }
}

module.exports = { checkRooms, createRoom, deleteRoom, addUserToRoom }

function createNewRoom(id, ownerId){
  //CREATE OBJECT ROOM
	return {
		id,
		ownerId,
		users: [],
		isPlaying: false,
	}
}