const miscRouter = require('express').Router()

miscRouter.get('/', (req, res) => {
  res.json({ message: 'pong', time: new Date().toISOString() })
})

module.exports = miscRouter