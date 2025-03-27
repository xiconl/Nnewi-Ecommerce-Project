import { userModel } from '../models/index.js'
import bcrypt from 'bcryptjs'


// Create a new user
export const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, username, password } = req.body;
        
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.render("homepage", {errors: ["User already exists"]});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            firstname,
            lastname,
            email,
            username,
            password: hashedPassword
        });

        await newUser.save();
        await newUser.connect();
        res.redirect("/login");
    } catch (error) {
        console.error("Error creating user:", error);
        res.render("homepage", {errors: ["Server error during registration"]});
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const { firstname, lastname, email, username } = req.body;
        
        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            { firstname, lastname, email, username },
            { new: true }
        ).select('-password');
        
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

