const Post = require('../models/post')
const User = require('../models/User')

const getPosts = async (req, res) => {
    try{
        const {userId} = req.query;

        //Permite filtrar por id de usuario
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

        // Buscar el post por su ID
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        // Buscar el índice de la imagen en el array 'images'
        const imageIndex = post.image.findIndex(img => img._id.toString() === imageId);

        // Si la imagen no está en el array
        if (imageIndex === -1) {
            return res.status(404).json({ error: 'Image no encontrada en este post' });
        }

        // Eliminar la imagen del array
        post.image.splice(imageIndex, 1);

        // Guardar el post actualizado
        await post.save();

        // Responder con el post actualizado
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
        const id = req.params.id;      // El ID del post
        const imageId = req.params.idImage; // El ID de la imagen
        const { url } = req.body; // La nueva URL de la imagen que se quiere actualizar

        // Buscar el post por su ID
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        // Asegurarse de que el campo 'images' sea un array
        if (!Array.isArray(post.image)) {
            post.image = []; // Si no es un array, lo inicializamos como un array vacío
        }

        // Buscar el índice de la imagen en el array 'images'
        const imageIndex = post.image.findIndex(img => img._id.toString() === imageId);

        // Si la imagen no está en el array
        if (imageIndex === -1) {
            return res.status(404).json({ error: 'Image no encontrada en este post' });
        }

        // Actualizar la URL de la imagen
        post.image[imageIndex].url = url;

        // Guardar el post actualizado
        await post.save();

        // Responder con el post actualizado
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