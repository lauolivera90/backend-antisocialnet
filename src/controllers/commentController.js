const Comment = require('../models/comment');
const moment = require('moment');

const createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const getComments = async (req, res) => {
  const { postId } = req.params;
  const maxAgeMonths = process.env.COMMENT_MAX_AGE_MONTHS || 6;

  const dateLimit = moment().subtract(maxAgeMonths, 'months').toDate();

  const comments = await Comment.find({
    post: postId,
    visible: true,
    upload_date: { $gte: dateLimit }
  }).populate('user');

  res.json(comments);
};

const updateComment = async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Comentario no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar comentario', error });
  }
};

const deleteComment = async (req, res) => {
   try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Comentario no encontrado' });
    res.json({ message: 'Comentario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar comentario', error });
  }
};

module.exports = {
    getComments,
    createComment,
    updateComment,
    deleteComment
}
