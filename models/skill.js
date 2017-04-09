const mongoose = require('mongoose')
const Schema = mongoose.Schema

let skillSchema = new Schema({
  name: {type: String, lowercase: true, required: true},
  score: {type: Number, default: 0, min: 0, max: 100}
  userId: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

let Skill = mongoose.model('Skill', userSchema)
module.exports = Skill

Skill.schema.path('name').validate((value, res)=> {
  Skill.findOne({name: value}, (err, skill)=> {
    if(skill) res(false)
  })
}, `${value} name is already exist`)