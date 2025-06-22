const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Crear comentario
router.post('/', commentController.createComment);

// Obtener comentarios visibles de un post
router.get('/post/:postId', commentController.getComments);

//Actualizar uncomentario

router.update('/:id', commentController.updateComment);

// Eliminar comentario
router.delete('/:id', commentController.deleteComment);

module.exports = router;