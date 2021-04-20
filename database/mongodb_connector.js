const mongoose = require('mongoose')

const dbURI = 'mongodb://localhost:27017/dommyexample'

module.exports.conn = conn = () => {
    mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .then((result) => console.log('connected to mongoDB'))
        .catch((err) => console.log(err))
}