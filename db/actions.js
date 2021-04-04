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

function check_unique(username) {
  var unique_query = "SELECT * FROM users WHERE name='" + username + "'"
  var db = gen_db()

  var someVar = []
  function setValue(val) {
    someVar = val
  }
  
  db.serialize(() => {
    db.all(unique_query, (err, rows) => {
      if (err) {
        throw err
      }
      setValue(rows)
      console.log(someVar)
    })
  })
}


module.exports.login = function(username, password) {
  var query = "SELECT * FROM users WHERE name=" + username
  var db = gen_db()
  db.serialize(() => {
    var ret = db.run(query)
    console.log(ret)
  })  
}

module.exports.signup = function(username, password) {
  var query = "INSERT INTO users (name, hashed_pass) VALUES ('"+username+"','"+password+"')"
  var db = gen_db()
  
  if (!check_unique(username)) {
    return "user already exists"
  }
  else {
    db.run(query, (err) => {
      if (err) {
        throw err
      }
    })
    return "user created"
  }
}