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

function run_query(query) {
  return new Promise((resolve, reject) => {
    db.run(query, (err, res) => {
      if (err) {
        console.log(err)
        throw reject(err)
      }
      resolve(res)
    })
  })
}

function create_user(username, password) {
  var query = `INSERT INTO users (name, hashed_pass) VALUES ('${username}','${password}')`
  return run_query(query)
}

function create_doc(username, content) {
  var query = `INSERT INTO documents (name, content) VALUES ('${username}','${content}')`
  return run_query(query)
}

function update_doc(id, content) {
  var query = `INSERT INTO documents (name, content) VALUES ('${username}','${content}')`
  return run_query(query)
}

module.exports.login = function(username, password) {
  var query = "SELECT * FROM users WHERE name=" + username
  return select_user(username)
    .then((res) => {
      console.log(res)
      if (res.length != 1) {
        return "authentication error"
      }
      else if (res[0].hashed_pass !== password) {
        return "authentication error"
      }
      return "authentication succeeded"
    }).catch((err) => {
      throw err
    })
}

module.exports.signup = function(username, password) {
  return select_user(username)
    .then(
      (res) => {
      if (res.length >= 1) {
        return "user already exists"
      } else {
        return create_user(username, password).then(() => {
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

module.exports.create = function(username, content) {
  return create_doc(username, content)
    .then(
      (res) => {
        if (!res) {
          return "success"
        }
        else {
          return res
        }
      }
    )
    .catch((err) => {
      throw err;
    })
}

module.exports.save = function(username, id, content) {
  return "hi"
}