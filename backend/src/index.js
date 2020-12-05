const express = require('express')
const routes = require('./routes')
const cors = require('cors')


const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333)