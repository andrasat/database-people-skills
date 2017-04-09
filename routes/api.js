const express = require('express')
const router = express.Router()
const User = require('../controller/user')
const Skill = require('../controller/skill')

/* USER Routes */
router.get('/user', User.findUsers)
router.post('/user', User.createUser)
router.put('/user/:id', User.updateUser)
router.delete('/user/:id', User.deleteUser)
router.put('/user/skill/:id', User.addASkilltoUser)
router.get('/user/seed', User.seedData)

/* SKILL Routes */
router.get('/skill', Skill.findSkills)
router.post('/skill', Skill.createSkill)
router.put('/skill/:id', Skill.updateSkill)
router.delete('/skill/:id', Skill.deleteSkill)
router.get('/skill/seed', Skill.seedData)

module.exports = router