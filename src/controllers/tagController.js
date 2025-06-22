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
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener etiquetas', error });
  }
};


const getTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Etiqueta no encontrada' });
    res.json(tag);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar etiqueta', error });
  }
};

const updateTag = async (req, res) => {
  try {
    const updated = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Etiqueta no encontrada' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar etiqueta', error });
  }
};

const deleteTag = async (req, res) => {
  try {
    const deleted = await Tag.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Etiqueta no encontrada' });
    res.json({ message: 'Etiqueta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar etiqueta', error });
  }
};
module.exports = {
    createTag,
    getTag,
    getTags, 
    updateTag,
    deleteTag
}