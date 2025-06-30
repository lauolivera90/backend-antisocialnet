const express = require('express')
const mongoose = require('mongoose');
const conectarDB = require('./config/db')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');

const router = require('./routes')
require('dotenv').config()
const User = require('./models/User');
const Post = require('./models/post'); 
const Comment = require('./models/comment');
const Tag = require('./models/tag');


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }));


const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', router)

const a = async () => {
}

a()


conectarDB()

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})