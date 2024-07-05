const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3001;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to handle sessions
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Serve static files (like CSS and client-side JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route to display the form
app.get('/', (req, res) => {
    res.render('index');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, age, address, password } = req.body;

    // Server-side validation (example)
    if (!name || !email || !age || !address || !password) {
        return res.status(400).send('All fields are required.');
    }

    if (age < 0 || age > 120) {
        return res.status(400).send('Please enter a valid age.');
    }

    if (password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters long.');
    }

    // Store validated data in session
    req.session.userData = { name, email, age, address };

    // Redirect to results page
    res.redirect('/results');
});

// Route to display form dynamically (for client-side routing)
app.get('/form', (req, res) => {
    res.render('index');
});

// Route to display results dynamically (for client-side routing)
app.get('/results', (req, res) => {
    const { name, email, age, address } = req.session.userData || {};
    // Check if userData exists and render result.ejs
    if (name && email && age && address) {
        res.render('result', { name, email, age, address }); // Note the change to 'result'
    } else {
        // Handle case where userData is missing or incomplete
        res.status(404).send('Results not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
