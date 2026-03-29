# 🚀 Anti-Social Net - Backend 
Este proyecto constituye el núcleo lógico y de persistencia para una red social. Desarrollado como parte de la materia Estrategias de Persistencia, el objetivo principal fue diseñar una arquitectura de datos robusta utilizando MongoDB y documentar las interfaces de comunicación mediante Swagger.

# ⚙️ Instalación y Configuración (Quick Start)
Para levantar el entorno de desarrollo y poblar la base de datos, ejecutá los siguientes comandos:

1. Levantar Infraestructura (Docker)
Asegurate de tener Docker instalado para iniciar el contenedor de la base de datos:

docker compose up -d

2. Instalación de dependencias

npm install

3. Poblado de la Base de Datos (Seeding)
Para facilitar la evaluación del proyecto, incluimos un script que genera usuarios, tags, publicaciones y comentarios de prueba:

npm run seed

4. Iniciar Servidor

npm run dev

# 🛠️ Tecnologías y Arquitectura
Entorno: Node.js

Base de Datos: MongoDB (NoSQL) con Mongoose para el modelado de esquemas.

Documentación: Swagger (Disponible en /api-docs una vez iniciado el servidor).

Contenedores: Docker para la orquestación de servicios.

# 🗃️ Modelos de Persistencia
La API gestiona la persistencia de las siguientes entidades (ver carpeta src/models):

User: Gestión de perfiles y credenciales.

Post: Publicaciones con soporte para imágenes y vinculación de etiquetas.

Comment: Interacciones de usuarios en publicaciones.

Tag: Sistema de categorización y filtrado.

Image: Manejo de metadatos de medios.

# 👨‍💻 Integrantes del grupo "Semáforos en Rojo"
Lautaro Olivera

Ezequiel Ortiz

Martín Lubris Vadell

Jonatan Jofre

💡 Este proyecto forma parte de la materia Estrategias de Persistencia de la Tecnicatura en Programación (UNAHUR).
