const express = require('express')
const app = express()
const path = require('path')
const router = express.Router()
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000
const actions = require('./db/actions')

router.get("/login", (req, res)=>{
  actions.login("te4t","test").then((k) => res.send(k))
})

router.get("/signup", (req, res) => {
  actions.signup("te4t", "test").then((k) => res.send(k))
})

router.post("/save_doc", (req, res) => {
  if (req.method === 'POST') {
    username = req.body.username
    content = req.body.content

    // if id, update
    if (req.body.id) {
      console.log("here")
    } else {
      actions.create(username, content).then((k) => {
        res.send(JSON.stringify(k))
      })
    }
  }
})

router.get("/fetch_docs", (req,res) => {
  username = "andy"
  actions.fetch(username).then((k) => res.send(k))
})

router.get("/", (req, res) => {
  res.redirect("templates/login.html")
})

router.get("/editor", (req, res)=> {
  res.redirect("templates/editor.html")
})

router.get("/dashboard", (req, res)=> {
  res.redirect("templates/dashboard.html")
})

app.use("/", router)

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log("server started")
})