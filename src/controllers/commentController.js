const Comment = require('../models/comment');
const moment = require('moment');
const mongoose = require('mongoose');
const Post = require('../models/post');

const createComment = async (req, res) => {
  try {
    const { post, upload_date } = req.body;
    const postObj = await Post.findById(post);
    if (!postObj) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    const commentDate = upload_date ? new Date(upload_date) : new Date();

    if (commentDate < postObj.upload_date) {
      return res.status(400).json({
        error: `No se puede comentar antes de la fecha de publicación del post (${postObj.upload_date.toISOString().slice(0,10)})`
      });
    }

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
    post: new mongoose.Types.ObjectId(postId),
    visible: true,
    upload_date: { $gte: dateLimit }
  }).populate('user','nickname');
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


const getAllTheComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('user', 'nickname')

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
    getComments,
    createComment,
    updateComment,
    deleteComment,
    getAllTheComments
}
