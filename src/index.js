const express = require('express')
const mongoose = require('mongoose');
const conectarDB = require('./config/db')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const router = require('./routes')
require('dotenv').config()
const User = require('./models/User'); // Asegurate que esté bien la ruta
const Post = require('./models/post'); // Asegurate que esté bien la ruta
const Comment = require('./models/comment');
const Tag = require('./models/tag');


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())


//const swaggerDocument = YAML.load('./docs/swagger.yaml');
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', router)



conectarDB()



//construir de 0 la base de datos mediante terminar: docker compose down -v -> docker compose up --build

//si quieren borrar los datos ingresados
async function limpiarUsuarios() {
  //await User.deleteMany({});
   //await Post.deleteMany({});

  console.log('Todos los usuarios fueron eliminados');
}

limpiarUsuarios();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})