const express = require('express')
const morgan = require('morgan')
const path = require('path')
const db = require('./database/mongodb_connector')
const User = require('./database/user_schema')

const app = express()
const root = path.join(__dirname+'/views/')
const upload = require('./middleware/multer_handler')
app.use(express.static(root))
app.use(express.static('storage'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('dev'))

app.use('/index', (req, res) => res.sendFile('index.html', {root}))
app.use('/profile', (req, res) => res.sendFile('profile.html', {root}))

app.use('/update', upload.single('image'), (req, res) => {

    let user = new User()
    user.name = req.body.name
    user.file = req.file.filename

    user.save(err => {
        if (err)
            return res.sendStatus(400);
        res.sendFile('profile.html', {root})
    })
})

app.use('/search', (req, res) => {
    const {name} = req.body
    User.findOne({name}, (err, user) => {
        if (err) res.json(err)
        else res.json(user ? user.file : '')
    })
})

app.get('/', (req, res) => res.redirect('/index'))

db.conn() // open database connection
const port = 8000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})