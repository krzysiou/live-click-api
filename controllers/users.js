const names = require('../utils/names.js')
const { uuid } = require('uuidv4');

const checkUsers = (users) => {
    return (req, res) => {
        res.json(users)
    }
}

const updateUser = (users) => {
    return (req, res) => {
        const userId = req.params.userId
      
        if(!userId){
          res.status(400).json({})
          return
        }
        
        const name = req.body.name
        if(!name){
            users[userId] = names[Math.floor(Math.random() * names.length)];
        } else {
            users[userId] = name
        }
        res.status(201).json({name: users[userId]})
    }
}

module.exports = { checkUsers, updateUser }