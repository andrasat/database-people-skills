const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  name: String,
  skills: [
    {
     skill: {type: Schema.Types.ObjectId , ref: 'Skill'},
     score: {type: Number, default: 0, min: 0, max: 100}
    }
  ]
})

let User = mongoose.model('User', userSchema)
module.exports = User