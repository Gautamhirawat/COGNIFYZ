const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to handle sessions
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Serve static files (like CSS)
app.use(express.static('public'));

// Route to display the form
app.get('/', (req, res) => {
    res.render('index');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, age, address } = req.body;
    
    // Server-side validation
    if (!name || !email || !age || !address) {
        return res.status(400).send('All fields are required.');
    }
    
    if (age < 0 || age > 120) {
        return res.status(400).send('Please enter a valid age.');
    }
    
    // Store validated data in session
    req.session.userData = { name, email, age, address };
    
    res.render('result', { name, email, age, address });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
