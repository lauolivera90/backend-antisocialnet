const { Router } = require('express')
const postController = require('../controllers/postController.js')
const router = Router()

//router.get('/:nickname', postController.getPostByUser);
router.get('/', postController.getPosts); //util para probar pero es innecesario
router.post('/', postController.createPost);


module.exports = router