const express = require('express')
const mongoose = require('mongoose')
const port = 3000 || process.env.PORT

const app = express()

/* GET ROUTES */
const api = require('./routes/api')

let dbconfig = {
  development: 'mongodb://localhost/dbskill',
  test: 'mongodb://localhost/dbskill_test'
}

/* MONGOOSE CONNECT */
mongoose.Promise = global.Promise
mongoose.connect(dbconfig[app.settings.env], (err)=> {
  err ? console.log(err) : console.log(`connected to ${app.settings.env} database`)
})

/* ROUTES CONNECT */
app.use('/api', api)

/* SERVER PORT */
app.listen(port, ()=> {
  console.log(`listening to ${port}`)
})