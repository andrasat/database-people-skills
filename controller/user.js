const User = require('../models/user')

module.exports = {

  createUser: (req, res)=> {
    let newUser = new User({
      name: req.body.name
    })
      .save((err, user)=> {
        if(err) res.send(err)
        res.send(`${user.name} created`)
    })
  },
  findUsers: (req, res)=> {
    User
      .find({})
      .populate('skills.skill')
      .exec((err,users)=> {
      if(err) res.send(err)
      res.send(users)
    })
  },
  updateUser: (req, res)=> {
    let skillsInput = req.body.skills.split(',')
    let scoresInput = req.body.scores.split(',')
    let arrOfObj = skillsInput.map((val, i)=> { return {skill: val, score: scoresInput[i]} })
    User.findById({_id: req.params.id}, (err, user)=> {
      if(err) res.send(err)
      user.update({
        name : req.body.name ? req.body.name : user.name,
        skills : req.body.skills ? arrOfObj : user.skills
      }, (err, raw)=> {
        if(err) res.send(err)
        res.send(raw)
      })
    })
  },
  deleteUser: (req, res)=> {
    User.findByIdAndRemove({_id:req.params.id}, (err, user)=> {
      if(err) res.send(err)
      res.send(`${user.name} deleted`)
    })
  },
  addASkilltoUser: (req, res)=> {
    User.findById({_id: req.params.id}, (err, user)=> {
      if(err) res.send(err)
      user.update({
        name : user.name,
        $push: { skills: {skill: req.body.skill, score: req.body.score } }
      }, {
        safe: true,
        upsert: true,
        new: true
      }, (err, raw)=> {
        if(err) res.send(err)
        res.send(raw)
      })
    })
  },
  seedData: (req, res)=> {
    let userData = require('../seeders/userSeed')
    User.collection.insert(userData, (err, users)=> {
      if(err) res.send(err)
      res.send(`data seeded into database`)
    })
  }

}