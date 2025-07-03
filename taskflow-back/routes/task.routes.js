const express = require('express')
const {create, deleteTask, getTasks, updateTask, updateTaskStatus} = require('../controllers/task.controller.js')

const router = express.Router()
const authRequired = require('../middlewares/validateToken.js')

router.post("/create", authRequired, create)
router.post("/delete", authRequired, deleteTask)
router.get('/viewTask', authRequired, getTasks)
router.post('/update/:_id', authRequired, updateTask)
router.post('/updatestatus/:_id', authRequired, updateTaskStatus)

module.exports = router