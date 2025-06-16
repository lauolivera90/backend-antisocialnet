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

const deleteComment = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Comentario eliminado' });
};

module.exports = {
    getComments,
    createComment,
    deleteComment
}
