const User = require('../models/User')

const getUsers = async (req, res) => {
    try{
        const users = await User.find()
        .select('-__v'); 

        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }   
}

const getUser = async (req, res) => {
    try{
        const id = req.params.id;

        const user = await User.findById(id)
        .select('-__v');

        if (!user) return res.status(404).json({message: "User no encontrado"})

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}


const createUser = async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save();

        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateUser = async (req, res) => {
    try{
        const id = req.params.id;
        const body = req.body;

        const user = await User.findByIdAndUpdate(id, body, {new: true});
        if (!user) return res.status(404).json({message: "User no encontrado"})

        res.status(200).json({message: "User actualizado correctamente"});
    }
    catch (error){
        res.status(500).json({error: error.message});
    }
}

const deleteUser = async (req, res) => {
    try{
        const id = req.params.id

        const user = await User.findByIdAndDelete(id, {new: true})
        if (!user) return res.status(404).json({message: "User no encontrado"})
            
        res.status(200).json({message: "Usuario eliminado"})
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser
}
