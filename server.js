const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))

// Setting up Middleware
app.use((req, res, next) => {
    res.locals.path = req.path
    next()
})


const port = 8000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})