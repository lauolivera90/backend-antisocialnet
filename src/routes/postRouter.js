const { Router } = require('express');
const postController = require('../controllers/postController.js');
const router = Router();

/*El get acepta querys, lo cual permite filtrar posts por usuario 
http://localhost:3000/post?userId=6850d3a11d96986d328a2dda */
router.get('/', postController.getPosts); 
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.get('/:nickname', postController.getPostByUser);

//imagenes

router.put('/:id/image/:idImage', postController.updateImageFromPost);
router.delete('/:id/image/:idImage', postController.deleteImageFromPost);




module.exports = router;