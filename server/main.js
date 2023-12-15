require('dotenv').config()
const express = require('express')
const port = process.env.PORT ?? 3000

const app = new express()
const router = express.Router()

router.get('/api', (req, res) => {
    res.status(200).json({
        message: 'hello world'
    })
})

app.use(router)

app.listen(port, () => {
    console.log('api running')
})