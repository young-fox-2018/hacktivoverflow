const express = require('express')
const app = express()

const cors = require('cors')
require('dotenv').config()



const PORT = process.env.PORT || 3000
app.use(cors())
    .use(express.urlencoded({ extended : false}))
    .use(express.json())


const UserRoute = require('./routes/user-routes')
const PertanyaanRoute = require('./routes/pertanyaan-routes')
const JawabanRoute = require('./routes/jawaban-routes')
app.get('/', (req, res) => {
    res.send("Masuk Pak Eko")
})
app.use('/users', UserRoute)
app.use('/pertanyaan', PertanyaanRoute)
app.use('/jawaban', JawabanRoute)



app.listen(PORT, function(){
    console.log('Listening to port : ', PORT)
})


const mongoose = require('mongoose')

const DB_TYPE = process.env.NODE_ENV || "development"

mongoose.connect(`mongodb://${process.env.MLAB_USERNAME}:${process.env.MLAB_PASSWORD}@ds135844.mlab.com:35844/hacktivoverflow`, { useNewUrlParser: true })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error :'))

db.once('open', function(){
    console.log('database connected!')
})

module.exports = app


