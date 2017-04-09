const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  name: String,
  skill: [{type: String, ref: 'Skill'}]
})

let User = mongoose.model('User', userSchema)
module.exports = User