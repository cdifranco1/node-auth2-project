const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('./users-model')

const restrict = require('../middleware/restrict')

const router = express.Router()

router.post('/register', async (req, res, next) => {
  const user = req.body
  if (!user.department){
    return res.status(400).json({ message: "Please include user department."})
  }
  
  try {
    // check if username already exists
    const existingUser = await Users.findBy('username', user.username)
  
    if (existingUser){
      return res.status(409).json({ message: 'Username not available.'})
    }
  
    // if username free, hash password and add to database
    const hash = bcrypt.hashSync(user.password, 8)
    user.password = hash
    
    const newUser = await Users.addUser(user)
    res.status(201).json(newUser)

  } catch(err){
    next(err)
  }
})



router.post('/login', async (req, res, next) => {
  // check if password matches for username in database
  const { username, password } = req.body
  console.log(username, password)

  try {
    const user = await Users.findBy('username', username)

    if (!user){
      return res.status(401).json({ message: "Invalid credentials." })
    }
    
    const validUser = bcrypt.compareSync(password, user.password)

    if (!validUser){
      return res.status(401).json({ message: "Invalid credentials."})
    }

    const payload = {
      userId: user.id,
      userRole: "normal"
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)

    res.cookie("token", token).json(`Welcome ${user.username}`)
    // res.json({
    //   message: `Welcome ${user.username}`,
    //   token: token
    // })

  } catch(err) {
    next(err)
  }
})


router.get('/users', restrict, async (req, res, next) => {
  try {
    const users = await Users.getUsers()

    res.status(200).json(users)

  } catch(err){

    next(err)

  }
})




module.exports = router