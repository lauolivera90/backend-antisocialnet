const User = require('../models/user')

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

        if (!user) return res.status(404).json({message: "User not found"})

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}


const createUser = async (req, res) => {
    try{
        const { nickname, mail, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ nickname }, { mail }] });
        if (existingUser) {
          const message = existingUser.nickname === nickname
            ? 'El nombre de usuario ya está en uso.'
            : 'El mail ya está en uso.';
          return res.status(409).json({ message });
        }

        const user = new User({ nickname, mail, password });
        await user.save();

        const userObject = await User.findById(user._id);

        res.status(201).json(userObject);
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try{
        const id = req.params.id;
        const body = req.body;

        const user = await User.findByIdAndUpdate(id, body, {new: true});
        if (!user) return res.status(404).json({message: "User not found"})

        res.status(200).json({message: "User updated successfully"});
    }
    catch (error){
        res.status(500).json({error: error.message});
    }
}

const deleteUser = async (req, res) => {
    try{
        const id = req.params.id

        const user = await User.findByIdAndDelete(id, {new: true})
        if (!user) return res.status(404).json({message: "User not found"})
            
        res.status(200).json({message: "User deleted"})
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

const loginUser = async (req, res) => {
  const { nickname, password } = req.body;

  if (!nickname || !password) {
    return res.status(400).json({ message: 'El nickname y la contraseña son requeridos.' });
  }

  try {
    const user = await User.findOne({ nickname }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const userObject = user.toObject();
    delete userObject.password;

    res.status(200).json(userObject);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser,
    loginUser
}
