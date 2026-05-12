const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');


// GET /comment -> Obtiene todos los comentarios.
// GET /comment?userId={id_del_usuario} -> Filtra comentarios por usuario.
router.get('/', commentController.getAllTheComments);

// GET /comment/post/:postId -> Obtener comentarios visibles de un post (con límite de antigüedad).
router.get('/post/:postId', commentController.getComments);

// POST /comment -> Crear un nuevo comentario.
router.post('/', commentController.createComment);

// PUT /comment/:id -> Actualizar un comentario por su ID.
router.put('/:id', commentController.updateComment);

// DELETE /comment/:id -> Eliminar un comentario por su ID.
router.delete('/:id', commentController.deleteComment);

// Agrega esta línea donde defines tus rutas (usualmente junto a router.get('/', ...))
router.get('/:id', commentController.getComment);


module.exports = router;