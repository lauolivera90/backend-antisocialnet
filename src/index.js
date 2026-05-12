const express = require('express')
const mongoose = require('mongoose');
const connectDB = require('./config/db')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');

const router = require('./routes')
require('dotenv').config()
const User = require('./models/user');
const Post = require('./models/post'); 
const Comment = require('./models/comment');
const Tag = require('./models/tag');


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({ origin: ['http://localhost:5173', 'https://anti-social-net.vercel.app', 'http://192.168.1.2:5173'] }));


const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', router)

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
};

startServer();