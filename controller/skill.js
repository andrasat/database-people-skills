const Skill = require('../models/skill')

module.exports = {

  createSkill: (req, res)=> {
    let newSkill = new Skill({
      name: req.body.name
    })
      .save((err, skill)=> {
        if(err) res.send(err)
        res.send(`${skill.name} created`)
    })
  },
  findSkills: (req, res)=> {
    Skill
      .find({})
      .populate('userId', 'name')
      .exec((err,skills)=> {
      if(err) res.send(err)
      res.send(skills)
    })
  },
  updateSkill: (req, res)=> {
    let userIdInput = req.body.userId.split(',')
    Skill.findById({_id: req.params.id}, (err, skill)=> {
      if(err) res.send(err)
      skill.update({
        name : req.body.name ? req.body.name : skill.name,
        userId : req.body.userId ? userIdInput : skill.userId
      }, (err, raw)=> {
        if(err) res.send(err)
        res.send(raw)
      })
    })
  },
  deleteSkill: (req, res)=> {
    Skill.findByIdAndRemove({_id:req.params.id}, (err, skill)=> {
      if(err) res.send(err)
      res.send(`${skill.name} deleted`)
    })
  },
  seedData: (req, res)=> {
    let skillData = require('../seeders/skillSeed')
    Skill.collection.insert(skillData, (err, skills)=> {
      if(err) res.send(err)
      res.send(`data seeded into database`)
    })
  }

}