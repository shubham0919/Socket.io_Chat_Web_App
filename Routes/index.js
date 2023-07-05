const express = require('express')
const route = express.Router()
const apiController = require('../Controller/apiController')


route.use('/',require('./apiRoute'))

route.get('/',apiController.home)


module.exports = route