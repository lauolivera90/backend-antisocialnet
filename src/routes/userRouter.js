const { Router } = require('express')
const userController = require('../controllers/userController')
const router = Router()

router.get('/', userController.getUsers);
router.get('/:nickname', userController.getUser);
router.post('/', userController.createUser);


module.exports = router