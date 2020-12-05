const express = require('express')
const routes = require('./routes')
const cors = require('cors')


const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
}))

app.use(express.json())
app.use(routes)
app.use(express.urlencoded({ extended: true }))

app.listen(3333)