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
      
        if(!ownerId){
          res.status(400).json({})
          return
        }
        const flag = rooms.find(r => r.id === ownerId)
        if(!flag){
          //CREATE ROOM
          const room = createNewRoom(ownerId)
          //ADD ROOM TO ARRAY
          rooms.push(room)
          res.status(201).json(room)
        } else {
          res.status(400).json({})
        }
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
    const flag = room.users.find(usr => usr.id === user.id)
    if(!flag){
      room.users.push(user)
    }
    res.status(200).json({})
  }
}

const removeUserFromRoom = (users, rooms) => {
  return (req, res) => {
    //GET TOKEN AND ROOMID
    const roomId = req.params.roomId
    const token = req.headers.authorization.split(" ")[1];
    //DECODE TOKEN TO GET USER INFO
    const decoded = jwt.decode(token)
    //FIND ROOM VIA ROOMID
    const room = rooms.find(room => room.id === roomId)
    //ADD USER TO ROOM
    room.users = room.users.filter(user => user.id !== decoded.id)
    res.status(200).json({userId: decoded.id})
  }
}

const deleteRoom = (rooms) => {
  return (req, res) => {
    //GET OWNERID AND ROOMID
    const roomId = req.params.roomId
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.decode(token)
    const userId = decoded.id
    if(!roomId){
      res.status(400).json({})
      return
    }
    //FIND ROOM
    const room = rooms.find(room => room.id === roomId)
    //IF AUTHORIZED DELETE ROOM
    if(room && room.ownerId === userId){
      index = rooms.findIndex(r => r.id === roomId)
      rooms.splice(index,1)

      res.status(200).json({})
    } else {
      res.status(401).json({})
    }
  }
}

const userToBracket = (users, rooms) => {
  return (req, res) => {
    //GET OWNERID AND ROOMID
    const roomId = req.params.roomId
    const userId = req.userData.id
  
    if(!roomId){
      res.status(400).json({})
      return
    }

    //FIND ROOM
    const room = rooms.find(room => room.id === roomId)
    //FIND USER
    const user = users.find(user => user.id === userId)
    //CHECK IF USER ALREADY IN BRACKET
    const flag = room.bracket.includes(user, 0)

    //IF AUTHORIZED
    if(room.isPlaying){
      if(room && room.bracket.length < 3){
        //IF USER NOT IN BRACKET
        if(!flag){
          room.bracket.push(user)
          res.status(200).json({})
        } else {
          res.status(400).json({error: 'You already clicked'})
        }
      } else {
        res.status(401).json({error: 'Too late'})
      }
    } else {
      res.status(400).json({error: 'Not playing right now'})
    }
  }
}

const clearBracket = (rooms) => {
  return (req, res) => {
    //GET OWNERID AND ROOMID
    const roomId = req.params.roomId
    const userId = req.userData.id
    
    if(!roomId){
      res.status(400).json({})
      return
    }
    
    //FIND ROOM
    const room = rooms.find(room => room.id === roomId)

    //IF AUTHORIZED CLEAR BRACKET
    if(room && userId === room.ownerId){
      room.isPlaying = false
      room.bracket = []
      res.status(200).json({})
    } else {
      res.status(400).json({error: 'Error'})
    }
  }
}

const play = (rooms) => {
  return (req, res) => {
    //GET OWNERID AND ROOMID
    const roomId = req.params.roomId
    const userId = req.userData.id
    
    if(!roomId){
      res.status(400).json({})
      return
    }
    
    //FIND ROOM
    const room = rooms.find(room => room.id === roomId)

    //IF AUTHORIZED START GAME IN 5 SECONDS
    if(room && userId === room.ownerId && room.isPlaying === false){
      setTimeout(changeStatus, 5000, room)
      res.status(200).json({})
    } else {
      res.status(400).json({error: 'Error'})
    }
  }
}

module.exports = { checkRooms, createRoom, deleteRoom, addUserToRoom, removeUserFromRoom, userToBracket, clearBracket, play }

function createNewRoom(ownerId){
  //CREATE OBJECT ROOM
	return {
		id: ownerId,
		ownerId,
		users: [],
    bracket: [],
    isPlaying: false
	}
}

function changeStatus(room){
  //CHANGE ROOM STATUS
  room.isPlaying = true
  return
}