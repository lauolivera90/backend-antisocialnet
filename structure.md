# Estructura del Proyecto "Antisocial Net"

Este documento detalla la organización de las carpetas y archivos principales del backend del proyecto.

```
/
├── src/
│   ├── controllers/
│   │   ├── commentController.js
│   │   ├── postController.js
│   │   ├── tagController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── comment.js
│   │   ├── image.js
│   │   ├── post.js
│   │   ├── tag.js
│   │   └── user.js
│   └── routes/
│       ├── commentRouter.js
│       ├── index.js
│       ├── postRouter.js
│       ├── tagRouter.js
│       └── userRouter.js
├── .env                # Archivo para variables de entorno (no versionado)
├── .gitignore          # Archivos y carpetas ignorados por Git
├── docker-compose.yml  # Configuración de Docker para la base de datos
├── package.json        # Dependencias y scripts del proyecto
├── README.md           # Documentación general del proyecto
└── seed.cjs            # Script para poblar la base de datos con datos de prueba
```