const express = require('express')
const router = express.Router()
const supervisorRoutes = require('./supervisor.routes')

router.use('/supervisor', supervisorRoutes)

module.exports = router
