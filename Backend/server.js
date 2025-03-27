import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { userValidation } from './routes/index.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This is my view engine
app.set("view engine", "ejs"); //Set EJS as the template engine
app.set("views", path.join(__dirname, "..", "Frontend", "views")); // Set views directory (where your EJS files are)
app.use(express.static(path.join(__dirname, "..", "Frontend", "public"))); // Serve static files (like CSS) from PUBLIC folder

// Middleware
app.use(cors()); 
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false})) //Enable us to access the value the user typed in the registration form

// app.use((req, res) => {
//     res.status(404).send("Page not found");
// });


app.use(function (req, res, next) {
    res.locals.errors = []
    next()
})

app.use("/", userValidation);

app.get("/", (req, res) => {
    res.render("homepage") // Renders homepage.ejs
});

app.get("/login", (req, res) => {
    res.render("login") // Renders login.ejs
});

app.post('/register', async (req, res) => {
    try {
        // Handle user registration (e.g., hashing password, saving to DB)
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        // Handle user registration (e.g., hashing password, saving to DB)
        // res.status(201).json({ message: "Login successful" });
        res.send("Login successful");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to database:", err);
});


//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));