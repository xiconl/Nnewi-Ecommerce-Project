import express from 'express'
import bcrypt from 'bcryptjs'
import { userModel } from  '../models/index.js'
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/index.js';

const app = express.Router();

app.get("/", (req, res) => {
    res.render("homepage") // Renders homepage.ejs
});

app.get("/login", (req, res) => {
    res.render("login") // Renders login.ejs
});

// User validation middleware
export const userValidation = ("/register", (req, res, next) => {
    const errors = []

    if (typeof req.body.firstname !== "string") req.body.firstname = "";
    if (typeof req.body.lastname !== "string") req.body.lastname = "";
    if (typeof req.body.email !== "string") req.body.email = "";
    if (typeof req.body.username !== "string") req.body.username = "";
    if (typeof req.body.password !== "string") req.body.password = "";

    req.body.username = req.body.username.trim();
    
    // if (!req.body.firstname) errors.push("You must provide a Firstname");
    if (req.body.firstname && req.body.firstname.length < 6) errors.push("Firstname must not be less than 6 characters");
    if (req.body.firstname && !req.body.firstname.match(/^[a-zA-Z ]+$/)) errors.push("Firstname can only contain letters");

    // if (!req.body.lastname) errors.push("You must provide a Lastname");
    if (req.body.lastname && req.body.lastname.length < 6) errors.push("Lastname must not be less than 6 characters");
    if (req.body.lastname && !req.body.lastname.match(/^[a-zA-Z ]+$/)) errors.push("Lastname can only contain letters");

    // if (!req.body.email) errors.push("You must provide an E-mail");
    if (req.body.email && !req.body.email.match(/^[a-zA-Z0-9@gmail.com]+$/)) errors.push("email can only contain letters and numbers with @ sign");

    // if (!req.body.username) errors.push("You must provide a username");
    if (req.body.username && req.body.username.length < 6) errors.push("Username must not be less than 6 characters");
    if (req.body.username && req.body.username.length > 12) errors.push("Username must not exceed 12 characters");
    if (req.body.username && !req.body.username.match(/^[a-zA-Z0-9]+$/)) errors.push("Username can only contain letters and numbers");

    // if (!req.body.password) errors.push("You must provide a password");
    if (req.body.password && req.body.password.length < 8) errors.push("Password must not be less than 8 characters");
    if (req.body.password && req.body.password.length > 12) errors.push("Password must not exceed 12 characters");

    if (errors.length) {
        return res.render("homepage", {errors});
    }

    next();

});

app.post('/register', async (req, res) => {
    try {
        // Handle user registration (e.g., hashing password, saving to DB)
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// app.use((req, res) => {
//     res.status(404).send("Page not found");
// });


app.post('/register', userValidation, createUser);
app.get('/users', getAllUsers);
app.get('/users/:id', getUserById);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

export default app;

