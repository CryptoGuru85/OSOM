const { Router } = require('express')
const assets = require('../data/assets-data.json')
const router = Router()

// assets route
router.get('/assets', function (req, res, next) {
  res.json(assets)
})
module.exports = router
