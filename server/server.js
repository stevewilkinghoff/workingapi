//This works - creates api that creates record!!!!


const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

// Configuring the database
const dbConfig = require('../config/keys');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Create the model
const NoteSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

const Note = mongoose.model("Note", NoteSchema, 'testcollection');


// Create a new Note route
app.post('/notes', (req, res) => {
  console.log(req.body);
  const note = new Note({
    title: req.body.title,
    content:req.body.content
  });
  note.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.send(e);
  })
});
