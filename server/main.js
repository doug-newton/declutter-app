require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user.routes')

const PORT = process.env.PORT ?? 3000
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING

const app = new express()
const router = express.Router()

app.use(express.json())
app.use('/api', router)

router.use('/user', userRoutes)

mongoose.connect(MONGODB_CONNECTION_STRING).then(() => {
    console.log('connected to mongodb')
    app.listen(PORT, () => {
        console.log('api running')
    })
}).catch((error) => {
    console.log(`could not connect to mongodb: ${error}`)
})
