const sqlite3 = require('sqlite3').verbose()

function gen_db() {
  let db = new sqlite3.Database('./test.db', (err) => {
    if (err) {
      throw err;
    }
    else {  
      console.log("connection established")
    }
  });
  return db;
}

const db = gen_db()

function select_user(username) {
  var unique_query = "SELECT * FROM users WHERE name='" + username + "'"

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(unique_query, (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(rows)
      })
    })
  })
}

function create_user(username, password) {
  var query = `INSERT INTO users (name, hashed_pass) VALUES ('${username}','${password}')`
  return new Promise((resolve, reject) => {
    db.run(query, (err, res) => {
      if (err) {
        throw reject(err)
      }
      resolve(res)
    })
  })
}

module.exports.login = function(username, password) {
  var query = "SELECT * FROM users WHERE name=" + username
  db.serialize(() => {
    var ret = db.run(query)
    console.log(ret)
  })  
}

module.exports.signup = function(username, password) {
  return select_user(username)
    .then(
      (res) => {
      if (res.length >= 1) {
        return "user already exists"
      } else {
        create_user(username, password).then(() => {
          return "user created"
        })
        .catch((err) => {
          throw err;
        })
      }
    })
    .catch((err) => {
      throw err;
    })
}