const express = require('express')

// Create express instance
const app = express()

// Require API routes
const list = require('./routes/list')
const assets = require('./routes/assets')
// Import API Routes
app.use(list)
app.use(assets)
// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
