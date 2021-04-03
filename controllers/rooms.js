const { uuid } = require('uuidv4');

const checkRooms = (rooms) => {
    return (req, res) => {
        res.json(rooms)
    }
}

const createRoom = (rooms) => {
    return (req, res) => {
        const ownerId = req.body.ownerId
      
        if(!ownerId){
          res.status(400).json({})
          return
        }
      
        const roomId = uuid()
      
        const room = createNewRoom(roomId, ownerId)
        rooms[room.id] = room
        res.status(201).json(room)
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

module.exports = { checkRooms, createRoom, deleteRoom }

function createNewRoom(id, ownerId){
	console.log(id, ownerId)
	return {
		id,
		ownerId,
		users: [],
		isPlaying: false,
	}
}