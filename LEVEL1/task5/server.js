const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3002;

// Dummy database (replace with actual database integration)
let users = [];

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to handle sessions
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Serve static files (like CSS and client-side JS)
app.use(express.static(path.join(__dirname, 'public')));

// RESTful API endpoints

// GET all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// POST create a new user
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === userId);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    } else {
        res.json(user);
    }
});

// PUT update user by ID
app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    users = users.map(u => (u.id === userId ? updatedUser : u));
    res.json(updatedUser);
});

// DELETE user by ID
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    users = users.filter(u => u.id !== userId);
    res.status(204).end();
});

// Route to render index.ejs for front-end interaction
app.get('/', (req, res) => {
    res.render('index');
});

// Route to display results dynamically (for client-side routing)
app.get('/results', (req, res) => {
    const { name, email, age, address } = req.session.userData || {};
    res.render('results', { name, email, age, address });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
