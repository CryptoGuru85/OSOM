const { Router } = require('express')
const list = require('../data/currencies-list.json')
const router = Router()

// list route
router.get('/list', function (req, res, next) {
  res.json(list)
})
module.exports = router
