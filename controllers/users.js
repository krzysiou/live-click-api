const names = require('../utils/names.js')
const { uuid } = require('uuidv4');

const checkUsers = (users) => {
    return (req, res) => {
        res.json(users)
    }
}

const addUser = (users) => {
    return (req, res) => {
        const usrnm = req.body.username
        const userId = req.body.userId
        const passwd = req.body.password

        const usernameTaken = Object.values(users).map(user => user.username).some(username => username === usrnm)
        if (usernameTaken) {
            res.status(400).json({error: 'Username taken'})
            return
        }
        
        let user = {
            username: usrnm,
            password: passwd
          };
        users[userId] = user;

        res.status(201).json(users)
    }
}

const updateUser = (users) => {
    return (req, res) => {
        const userId = req.params.userId
      
        if(!userId){
          res.status(400).json({})
          return
        }
        
        const usrname = req.body.name
        if(usrname){
            users[userId].username = usrname
        }
        res.status(201).json({name: users[userId].username})
    }
}

module.exports = { checkUsers, updateUser, addUser }