const express = require('express')
const router = express.Router()
const authRequired = require('../middlewares/validateToken.js')
const { create, getTeams, getTaskTeam, addMembers, removeMember } = require('../controllers/team.controller.js')

router.post("/create", authRequired, create)
router.get('/teams', authRequired, getTeams)
router.get('/tasks/:_id', authRequired, getTaskTeam)
router.post('/add',authRequired, addMembers)
router.post('/remove',authRequired,  removeMember)

module.exports = router