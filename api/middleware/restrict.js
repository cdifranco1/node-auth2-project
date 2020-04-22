const jwt = require('jsonwebtoken')

const restrict = async (req, res, next) => {
  // check if JSON token is valid (verify)
  const  { token } = req.cookies
  console.log(req.cookies)

  if (!token){
    return res.status(401).json({ message: "Please log in."})
  }

  try {
    // if token is valid, pass to next, can add payload to the request
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err){
        return res.status(401).json({ message: "You shall not pass."})
      }
      
      req.token = decoded
      console.log(decoded)
  
      next()
    })
  } catch(err){
    next(err)
  }
}

module.exports = restrict