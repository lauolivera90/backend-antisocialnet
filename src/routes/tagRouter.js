const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.post('/', tagController.createTag);
router.get('/', tagController.getTags);
router.get('/:id', tagController.getTag);
router.update('/:id', tagController.updateTag);
router.delete('/:id', tagController.deleteTag);

module.exports = router;