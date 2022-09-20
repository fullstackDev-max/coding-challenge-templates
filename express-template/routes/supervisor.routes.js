const { submitSupervisor } = require('../controllers/supervisor.controller')
const { submitSupervisorValidator } = require('../middlewares/supervisor')

const supervisorRoutes = require('express').Router()

supervisorRoutes.post('/submit', submitSupervisorValidator, submitSupervisor)

module.exports = supervisorRoutes
