const User = require('../models/User')

const getUsers = async (req, res) => {
    try{
        //revisar si hay que retonar esos campos o mas
        const users = await User.find().select('-__v'); 
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }   
}

const getUser = async (req, res) => {
    try{
        const userNickname = req.params.nickname; 
        //revisar si hay que retonar esos campos o mas
        const users = await User.find({nickname: userNickname}).select('nickname mail _id');
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }   
}

const createUser = async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser
}
