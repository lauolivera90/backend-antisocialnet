const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// CRUD básico de etiquetas
router.post('/', tagController.createTag);
router.get('/', tagController.getTags);
router.get('/:id', tagController.getTagById);

module.exports = router;