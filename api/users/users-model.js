const db = require('../../database/db-config')

module.exports = {
  getByID,
  addUser,
  findBy,
  getUsers
}

function getByID(id){
  return db('users')
          .where({ id })
          .first()
}

function findBy(column, value){
  return db('users')
          .where(`${column}`, value)
          .first()
}

function addUser(user){
  return db('users')
            .insert(user)
            .then(([id]) => {
              return getByID(id)
            })   
}

function getUsers(){
  return db('users')
}