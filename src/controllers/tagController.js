const Tag = require('../models/tag');

const createTag = async (req, res) => {
  try {
    const tag = new Tag(req.body);
    await tag.save();
    res.status(201).json(tag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTags = async (req, res) => {
  const tags = await Tag.find();
  res.json(tags);
};

const getTagById = async (req, res) => {
  const tag = await Tag.findById(req.params.id);
  if (!tag) return res.status(404).json({ error: 'Etiqueta no encontrada' });
  res.json(tag);
};

module.exports = {
    createTag,
    getTagById,
    getTags
}