const mongoose = require('mongoose')
const Schema = mongoose.Schema

let skillSchema = new Schema({
  name: {type: String, lowercase: true, required: true},
  userId: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

let Skill = mongoose.model('Skill', skillSchema)
module.exports = Skill

Skill.schema.path('name').validate((value, res)=> {
  Skill.findOne({name: value}, (err, skill)=> {
    if(skill) res(false)
  })
}, `Name is already exist`)