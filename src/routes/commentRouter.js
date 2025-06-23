const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');



// Crear comentario
router.post('/', commentController.createComment);

// Obtener comentarios visibles de un post
router.get('/:postId', commentController.getComments); // le quiete el /post/:postId

//Actualizar uncomentario

router.put('/:id', commentController.updateComment);

// Eliminar comentario
//router.delete('/:id', commentController.deleteComment);

// Obtine todos lo comentarios 
router.get('/', commentController.getAllTheComments);

module.exports = router;