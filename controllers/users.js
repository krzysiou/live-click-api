require('dotenv').config()

const bcrypt = require('bcrypt')
const {registerValidation, loginValidation, usernameUpdateValidation} = require('./validation')
const jwt = require('jsonwebtoken')

const checkUsers = (users) => {
    return (req, res) => {
        res.json(users)
    }
}

const registerUser = (users) => {
    return async (req, res) => {
        //REGISTRATION VALIDATE
        const { error } = registerValidation(req.body)
        if (error) return res.status(400).json({error: error.details[0].message})
        //CHECK IF USERNAME TAKEN
        const usernameTaken = users.map(user => user.username).some(username => username === req.body.username)
        if (usernameTaken) {
            res.status(400).json({error: 'Username taken'})
            return
        }
        try {
            //HASHING
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const hashedEmail = await bcrypt.hash(req.body.email, 10)
            //CREATE USER
            const user = {
                id: req.body.userId,
                email: hashedEmail,
                username: req.body.username,
                password: hashedPassword
              }
            //ADD USER
            users.push(user)
            res.status(201).send()
        } catch (error) {
            res.status(500).send()
        }
    }
}

const loginUser = (users) => {
    return async (req, res) => {
        //LOGIN VALIDATE
        const { error } = loginValidation(req.body)
        if (error) return res.status(400).json({error: error.details[0].message})
        //FIND USER
        const user = users.find(user => user.username === req.body.username)
        //IF NOT FOUND
        if (user == null) {
          return res.status(400).json({error: 'Cannot find user'})
        }
        try {
            //IF PASSWORD CORRECT
            if(await bcrypt.compare(req.body.password, user.password)){
                //GENERATE JWT
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                res.json({
                id: user.id,
                accessToken: accessToken 
                })
            } 
            //IF PASSWORD INCORRECT
            else {
            res.status(400).json({error: 'Not Allowed'})
            }
        } catch {
          res.status(500).send()
        }
    }
}

const updateUser = (users) => {
    return (req, res) => {
        //USERNAME UPDATE VALIDATE
        const { error } = usernameUpdateValidation(req.body)
        if (error) return res.status(400).json({error: error.details[0].message})
        //IF TAKEN
        const usernameTaken = users.find(user => user.username === req.body.userame)
        if (usernameTaken) {
            res.status(400).json({error: 'Username taken'})
            return
        }
        //FIND USER
        const destinatedUser = users.find(user => user.id === req.params.userId)
        //SET NAME
        if(req.body.username){
            destinatedUser.username = req.body.username
        }
        res.status(201).json()
    }
}

module.exports = { checkUsers, updateUser, registerUser, loginUser }