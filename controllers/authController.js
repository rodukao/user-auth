const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Register a new user
exports.registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body

        //Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists.'})
        }

        //Create new user
        const newUser = new User({name, email, password});
        await newUser.save();

        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message})
    }
};

//Login user
exports.loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        //Check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        //Check password
        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        //Generate JWT
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({message: 'Login successful', token});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
};

//Get user profile (protected route)
exports.getProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}