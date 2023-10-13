// Variables declaration
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;


// Import the MongoClient from the MongoDB driver.
const { MongoClient } = require('mongodb');


app.use(bodyParser.urlencoded({ extended: true }));


// Connection URL, Database Name and collection name
const url = 'mongodb://localhost:27017'; // MongoDB URL
const dbName = 'portfolioDB'; // database name
const collectionName = 'portfolio'; // collection name


// Connect to MongoDB
MongoClient.connect(url, (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }

    console.log('Connected to MongoDB');

    // Access your database
    const db = client.db('portfolioDB');

    // Access your collection 
    const collection = db.collection('portfolio');

    // Find documents and convert to an array
    collection.find({}).toArray((err, portfolio) => {
        if (err) {
            console.error('Error querying the collection:', err);
            client.close();
            return;
        }

        // Print the list of portfolio
        console.log('List of Portfolio:');
        console.log(portfolio);

        // Close the MongoDB connection
        client.close();
    });
});





// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/portfolioDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });



app.get('/', async(req, res) => {
    const portfolio = await collection.find({}).toArray();
    res.render('landing/pages/index.ejs', { portfolio });
});





// Create a Project model (if using MongoDB and Mongoose)
const portfolio = mongoose.model('Portfolio', {
    projectName: String,
    description: String,
    githubRepo: String,
    startDate: Date,
    endDate: Date,
    owner: String
});

app.post('/create-project', async(req, res) => {
    const { projectName, description, startDate, endDate, owner } = req.body;

    // new portfolio
    const portfolio = new Portfolio({
        title,
        description,
        githubRepo,
        demoURL,
        startDate,
        endDate,
        owner
    });

});

// Views and public folder Setup 
app.set("view engine", "ejs");

app.use(express.static("public"));


// Landing View Routes
app.get('/', (req, res) => {
    res.render("landing/pages/index.ejs");
});

app.get('/about', (req, res) => {
    res.render('landing/pages/about.ejs');
});

app.get('/contact', (req, res) => {
    res.render('landing/pages/contact.ejs');
});

app.get('/hireme', (req, res) => {
    res.render('landing/pages/hireme.ejs');
});

app.get('/portfolio', (req, res) => {
    res.render('landing/pages/portfolio.ejs');
});

app.get('/service', (req, res) => {
    res.render('landing/pages/service.ejs');
});

// Admin View Routes

app.get('/admin', (req, res) => {
    res.render("admin/pages/index.ejs");
});

app.get('/admin/index', (req, res) => {
    res.render("admin/pages/index.ejs");
});

app.get('/admin/bio', (req, res) => {
    res.render('admin/pages/bio.ejs');
});


app.get('/admin/contact-us', (req, res) => {
    res.render('admin/pages/contact-us.ejs');
});

app.get('/admin/profile', (req, res) => {
    res.render('admin/pages/profile.ejs');
});

app.get('/admin/add-project', (req, res) => {
    res.render('admin/pages/add-project.ejs');
});

app.post('/admin/submitNewProjectForm', (req, res) => {
    res.sendStatus(200);
});

app.post('/admin/submitEditProjectForm', (req, res) => {
    res.sendStatus(200);
});

app.get('/admin/edit-project', (req, res) => {
    res.render('admin/pages/edit-project.ejs');
});

app.get('/admin/projects', (req, res) => {
    res.render('admin/pages/projects.ejs');
});

app.get('/admin/services', (req, res) => {
    res.render('admin/pages/services.ejs');
});

// Server listening port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});