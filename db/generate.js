const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('./test.db', (err) => {
  if (err) {
    throw err;
  }
  else {  
    console.log("connection established")
  }
});

var gen_user_table = "CREATE TABLE IF NOT EXISTS users(\
  id INTEGER PRIMARY KEY AUTOINCREMENT,\
  name TEXT,\
  hashed_pass TEXT\
  )"

var gen_document_table = "CREATE TABLE IF NOT EXISTS documents(\
  id INTEGER PRIMARY KEY AUTOINCREMENT,\
  name TEXT,\
  content TEXT, \
  created TEXT, \
  updated TEXT, \
  FOREIGN KEY (name) \
    REFERENCES users (name) \
      ON DELETE CASCADE \
      ON UPDATE NO ACTION \
  )"

db.run(gen_user_table, (err) => {
  if (err) {
    throw err;
  }
  else {
    console.log("successfully created users table")
  }
})

db.run(gen_document_table, (err) => {
  if (err) {
    throw err;
  }
  else {
    console.log("successfully created documents table")
  }
})

db.close((err) => {
  if (err) {
    throw err;
  }
  else {
    console.log("successfully closed")
  }
})
