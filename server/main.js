require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user.routes')
const familyRoutes = require('./routes/family.routes')

const PORT = process.env.PORT ?? 3000
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING

const app = new express()
const router = express.Router()

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    next()
});

app.use('/api', router)

router.use('/user', userRoutes)
router.use('/family', familyRoutes)

mongoose.connect(MONGODB_CONNECTION_STRING).then(() => {
    console.log('connected to mongodb')
    app.listen(PORT, () => {
        console.log('api running')
    })
}).catch((error) => {
    console.log(`could not connect to mongodb: ${error}`)
})
