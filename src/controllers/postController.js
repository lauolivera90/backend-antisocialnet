const Post = require('../models/post')
const User = require('../models/User')

const getPosts = async (req, res) => {
    try{
        const {userId} = req.query;

        const filter = userId ? {user: userId} : {};

        const posts = await Post.find(filter)
        .select("-__v")
        .populate('user tag', '-_id -__v -password -mail',);

        res.status(200).json(posts);
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
        if (!post) return res.status(404).json({error: "Post no encontrado"});

        res.status(200).json({message: "Post actualizado"})
    }
    catch (error){
        res.status(500).json({error: error.message});
    }
}

const deletePost = async (req, res) => {
    try{
        const id = req.params.id
    
        const post = await Post.findByIdAndDelete(id, {new: true})
        if (!post) return res.status(404).json({error: "Post no encontrado"});

        res.status(200).json({message: "Post eliminado"});
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
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        const imageIndex = post.image.findIndex(img => img._id.toString() === imageId);

        if (imageIndex === -1) {
            return res.status(404).json({ error: 'Image no encontrada en este post' });
        }

        post.image.splice(imageIndex, 1);

        await post.save();

        res.status(200).json({ message: 'Image eliminada correctamente', post });
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getPostByUser = async (req, res) => {
    try{
        const nicknamePost = req.params.nickname
        const user = await User.findOne({nickname: nicknamePost})
        if (!user) return  res.status(404).json({ message: "Usuario no encontrado" });
        const posts = await Post.find({ user: user._id }).populate('user', 'nickname mail -_id');
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
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        if (!Array.isArray(post.image)) {
            post.image = [];
        }

        const imageIndex = post.image.findIndex(img => img._id.toString() === imageId);

        if (imageIndex === -1) {
            return res.status(404).json({ error: 'Image no encontrada en este post' });
        }

        post.image[imageIndex].url = url;

        await post.save();

        return res.status(200).json({ message: 'Image actualizada correctamente', post });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    deleteImageFromPost,
    updateImageFromPost,
    getPostByUser
}