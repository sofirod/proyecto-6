const user = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const registerUser = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuario ya registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
}
const loginUser = async(req,res)=>{
    const { email, password } = req.body;

    try {
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }   
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: existingUser._id, name: existingUser.name, email: existingUser.email } });    
    }catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
    }
const verifyToken = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Token no proporcionado o inválido' });
    }
    res.status(200).json({ message: 'Token válido', user: req.user });

}
const updateUser = async (req, res) => {
    const { name, email } = req.body;
    const userId = req.user.id;

    try {
        const updatedUser = await user.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true }
        );
    }   catch (error) {
         return res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }}
module.exports= {
    registerUser, 
    loginUser,
    verifyToken,
    updateUser
};