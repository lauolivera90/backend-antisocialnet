# Guía de Uso de la API "Antisocial Net"

Este documento describe todos los endpoints disponibles en la API, organizados por entidad, con ejemplos de uso.

**URL Base:** `http://localhost:3000`

---

##  entidad: Usuarios

### 1. Obtener todos los usuarios

- **Endpoint:** `GET /user`
- **Descripción:** Devuelve una lista de todos los usuarios registrados.
- **Ejemplo:**
  ```bash
  curl -X GET http://localhost:3000/user
  ```

### 2. Obtener un usuario por ID

- **Endpoint:** `GET /user/:id`
- **Descripción:** Devuelve los datos de un usuario específico.
- **Ejemplo:**
  ```bash
  curl -X GET http://localhost:3000/user/60d21b4667d0d8992e610c85
  ```

### 3. Registrar un nuevo usuario

- **Endpoint:** `POST /user`
- **Descripción:** Crea un nuevo usuario. Valida que el `nickname` y `mail` no estén en uso.
- **Ejemplo:**
  ```bash
  curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{
    "nickname": "nuevo_usuario",
    "mail": "nuevo@mail.com",
    "password": "password123"
  }'
  ```

### 4. Iniciar sesión (Autenticación)

- **Endpoint:** `POST /user/login`
- **Descripción:** Autentica a un usuario con su `nickname` y `password`.
- **Ejemplo:**
  ```bash
  curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "nickname": "cat_lover",
    "password": "123456"
  }'
  ```

### 5. Actualizar un usuario

- **Endpoint:** `PUT /user/:id`
- **Descripción:** Modifica los datos de un usuario existente.
- **Ejemplo:**
  ```bash
  curl -X PUT http://localhost:3000/user/60d21b4667d0d8992e610c85 \
  -H "Content-Type: application/json" \
  -d '{
    "avatar": "https://nueva-url-avatar.com/img.png"
  }'
  ```

### 6. Eliminar un usuario

- **Endpoint:** `DELETE /user/:id`
- **Descripción:** Elimina un usuario de la base de datos.
- **Ejemplo:**
  ```bash
  curl -X DELETE http://localhost:3000/user/60d21b4667d0d8992e610c85
  ```

---

## Entidad: Posts

### 1. Obtener todos los posts (con filtro por etiqueta)

- **Endpoint:** `GET /post`
- **Descripción:** Devuelve todos los posts. Opcionalmente, puede filtrarse por `tagId`.
- **Ejemplo (todos):**
  ```bash
  curl -X GET http://localhost:3000/post
  ```
- **Ejemplo (filtrado por etiqueta):**
  ```bash
  curl -X GET "http://localhost:3000/post?tagId=60d21b4667d0d8992e610c8c"
  ```

### 2. Obtener un post por ID

- **Endpoint:** `GET /post/:id`
- **Descripción:** Devuelve un post específico junto con sus comentarios.
- **Ejemplo:**
  ```bash
  curl -X GET http://localhost:3000/post/60d21b4667d0d8992e610c90
  ```

### 3. Crear un nuevo post

- **Endpoint:** `POST /post`
- **Descripción:** Crea una nueva publicación.
- **Ejemplo:**
  ```bash
  curl -X POST http://localhost:3000/post \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Este es mi nuevo post desde curl",
    "user": "60d21b4667d0d8992e610c85",
    "tag": ["60d21b4667d0d8992e610c8d"]
  }'
  ```

### 4. Obtener posts por usuario

- **Endpoint:** `GET /post/user/:nickname`
- **Descripción:** Devuelve todos los posts de un usuario específico.
- **Ejemplo:**
  ```bash
  curl -X GET http://localhost:3000/post/user/cat_lover
  ```

---

## Entidad: Comentarios

### 1. Obtener comentarios (con filtro por usuario)

- **Endpoint:** `GET /comment`
- **Descripción:** Devuelve todos los comentarios. Opcionalmente, puede filtrarse por `userId`.
- **Ejemplo (todos):**
  ```bash
  curl -X GET http://localhost:3000/comment
  ```
- **Ejemplo (filtrado por usuario):**
  ```bash
  curl -X GET "http://localhost:3000/comment?userId=60d21b4667d0d8992e610c85"
  ```

### 2. Obtener comentarios de un post

- **Endpoint:** `GET /comment/post/:postId`
- **Descripción:** Devuelve los comentarios de un post específico, con un límite de antigüedad (por defecto, 6 meses).
- **Ejemplo:**
  ```bash
  curl -X GET http://localhost:3000/comment/post/60d21b4667d0d8992e610c91
  ```

### 3. Crear un nuevo comentario

- **Endpoint:** `POST /comment`
- **Descripción:** Añade un nuevo comentario a una publicación.
- **Ejemplo:**
  ```bash
  curl -X POST http://localhost:3000/comment \
  -H "Content-Type: application/json" \
  -d '{
    "post": "60d21b4667d0d8992e610c91",
    "user": "60d21b4667d0d8992e610c85",
    "text": "¡Qué buen post!"
  }'
  ```

---

## Entidad: Tags (Etiquetas)

### 1. Obtener todas las etiquetas

- **Endpoint:** `GET /tag`
- **Descripción:** Devuelve una lista de todas las etiquetas disponibles.
- **Ejemplo:**
  ```bash
  curl -X GET http://localhost:3000/tag
  ```

### 2. Obtener una etiqueta por ID

- **Endpoint:** `GET /tag/:id`
- **Descripción:** Devuelve una etiqueta específica.
- **Ejemplo:**
  ```bash
  curl -X GET http://localhost:3000/tag/60d21b4667d0d8992e610c8c
  ```

### 3. Crear una nueva etiqueta

- **Endpoint:** `POST /tag`
- **Descripción:** Crea una nueva etiqueta. El nombre debe ser único.
- **Ejemplo:**
  ```bash
  curl -X POST http://localhost:3000/tag \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mascotas"
  }'
  ```