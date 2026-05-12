const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')

const getPosts = async (req, res) => {
    try{
        const {tagId} = req.query;

        const filter = tagId ? {tag: tagId} : {};

        const posts = await Post.find(filter)
        .select("-__v")
        .populate('user', '-__v -password -mail')
        .populate('tag', '-__v');

        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getPost = async (req, res) => {
    try{
        const id = req.params.id

        const post = await Post.findById(id)
        .select("-__v")
        .populate('user', '-__v -password -mail')
        .populate('tag', '-__v');

        if (!post) return res.status(404).json({ error: "Post not found" });

        const comments = await Comment.find({ post: id, visible: true })
        .select("-__v -visible -post")
        .populate('user', '-__v -password -mail');

        res.status(200).json({ ...post.toObject(), comments });
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const createPost = async (req, res) => {
    try{
        const post = new Post(req.body);
        await post.save();
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updatePost = async (req, res) => {
    try{
        const body = req.body;
        const id = req.params.id

        const post = await Post.findByIdAndUpdate(id, body, {new: true});
        if (!post) return res.status(404).json({error: "Post not found"});

        res.status(200).json({message: "Post updated"})
    }
    catch (error){
        res.status(500).json({error: error.message});
    }
}

const deletePost = async (req, res) => {
    try{
        const id = req.params.id
    
        const post = await Post.findByIdAndDelete(id, {new: true})
        if (!post) return res.status(404).json({error: "Post not found"});

        res.status(200).json({message: "Post deleted"});
    }
    catch (error){
        res.status(500).json({error: error.message});
    }
}

const deleteImageFromPost = async (req, res) => {
    try{
       const id = req.params.id;      
        const imageId = req.params.idImage;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const imageIndex = post.image.findIndex(img => img._id.toString() === imageId);

        if (imageIndex === -1) {
            return res.status(404).json({ error: 'Image not found in this post' });
        }

        post.image.splice(imageIndex, 1);

        await post.save();

        res.status(200).json({ message: 'Image deleted successfully', post });
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getPostByUser = async (req, res) => {
    try{
        const nicknamePost = req.params.nickname
        const user = await User.findOne({nickname: nicknamePost})
        if (!user) return  res.status(404).json({ message: "User not found" });
        
        const posts = await Post.find({ user: user._id })
            .select('-__v')
            .populate('user', '-__v -password -mail')
            .populate('tag', '-__v');
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateImageFromPost = async (req, res) => {
    try {
        const id = req.params.id;  
        const imageId = req.params.idImage;
        const { url } = req.body; 

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (!Array.isArray(post.image)) {
            post.image = [];
        }

        const imageIndex = post.image.findIndex(img => img._id.toString() === imageId);

        if (imageIndex === -1) {
            return res.status(404).json({ error: 'Image not found in this post' });
        }

        post.image[imageIndex].url = url;

        await post.save();

        return res.status(200).json({ message: 'Image updated successfully', post });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    deleteImageFromPost,
    updateImageFromPost,
    getPostByUser
}