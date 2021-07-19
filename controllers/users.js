const bcrypt = require('bcrypt')

const checkUsers = (users) => {
    return (req, res) => {
        res.json(users)
    }
}

const registerUser = (users) => {
    return async (req, res) => {
        //check if all fields where filled
        if (!req.body.userEmail || !req.body.username || !req.body.userId || !req.body.password) {
            res.status(400).json({error: 'Wrong parameters'})
            return
        }
        //check if username taken
        const usernameTaken = users.map(user => user.username).some(username => username === req.body.username)
        if (usernameTaken) {
            res.status(400).json({error: 'Username taken'})
            return
        }

        try {
            //hashing
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const hashedEmail = await bcrypt.hash(req.body.userEmail, 10)

            //creating object
            let user = {
                id: req.body.userId,
                email: hashedEmail,
                username: req.body.username,
                password: hashedPassword
              }
            //add user to user pool
            users.push(user)
            res.status(201).send()
        } catch (error) {
            res.status(500).send()
        }
    }
}

const loginUser = (users) => {
    return async (req, res) => {
        //find user with given username
        const user = users.find(user => user.username === req.body.username)

        //if not found
        if (user == null) {
          return res.status(400).json({error: 'Cannot find user'})
        }

        try {
            //if password correct
          if(await bcrypt.compare(req.body.password, user.password)){
            res.json({
                id: user.id
            })
            //if password incorrect
          } else {
            res.status(400).json({error: 'Not Allowed'})
          }
        } catch {
          res.status(500).send()
        }
    }
}

const updateUser = (users) => {
    return (req, res) => {
        //check if taken
        const usernameTaken = users.find(user => user.username === req.body.name)
        if (usernameTaken) {
            res.status(400).json({error: 'Username taken'})
            return
        }

        //search for user
        const destinatedUser = users.find(user => user.id === req.params.userId)
        //set name
        if(req.body.name){
            destinatedUser.username = req.body.name
        }
        res.status(201).json()
    }
}

module.exports = { checkUsers, updateUser, registerUser, loginUser }