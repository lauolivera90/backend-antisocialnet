const express = require('express')
const conectarDB = require('./config/db')
const router = require('./routes')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/', router)

conectarDB()

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})