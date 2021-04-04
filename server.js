const express = require('express')
const app = express()
const path = require('path')
const router = express.Router()
const port = 3000
const actions = require('./db/actions')

router.get("/login", (req, res)=>{
  res.redirect("templates/login.html")
})

router.get("/signup", (req, res) => {
  actions.signup("tes2t", "test").then((k) => {console.log(k); res.send(k)})
})

router.get("/", (req, res) => {
  res.redirect("templates/index.html")
})

router.get("/editor", (req, res)=> {
  res.redirect("templates/editor.html")
})

app.use("/", router)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log("server started")
})