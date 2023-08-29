const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4 for generating unique IDs
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

//define routes for two different URLs ("/" and "/notes")
//When users visit these URLs, they will be served corresponding HTML files 
//("index.html" and "notes.html") from the "public" directory of the application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});
//GET request on http://localhost:3001/api/notes to get information from db.json file
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    // if (err) {
    //   return res.status(500).json({ error: 'Error reading data' });
    // }
    const notes = JSON.parse(data);
    return res.json(notes);
  });
});

// app.post('/api/notes', (req, res) => {
//   let dataBase = fs.readFileSync('./db/db.json', 'utf8');
//   dataBase = JSON.parse(dataBase);
  
//   const newNote = {
//     title: req.body.title,
//     text: req.body.text,
//     id: uuidv4(), // Generate a unique ID
//   };
  
//   dataBase.push(newNote);
  
//   fs.writeFileSync('./db/db.json', JSON.stringify(dataBase, null, 2));
//   res.json(newNote);
// });

// app.delete('/api/notes/:id', (req, res) => {
//   let dataBase = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
//   let deleteNotes = dataBase.filter(item => item.id !== req.params.id);
  
//   fs.writeFileSync('./db/db.json', JSON.stringify(deleteNotes, null, 2));
//   res.json(deleteNotes);
// });
//app listening at http://localhost:3001 and server is open
app.listen(PORT, () =>
  console.log(`App listening on PORT ${PORT}`)
);





    


// //all notes send to json if user accesses /api/notes
// app.get("/api/notes", (req, res) => {
//   fs.readFile('./db/db.json', 'utf8', (err, data) =>{
//     let notes = JSON.parse(data);
//     return res.json(notes);
//   });
//     });
// //POST request for create information in data base
//     app.post("/api/notes", (req, res) => {
//     let dataBase = fs.readFileSync('./db/db/json');
//     dataBase = JSON.parse(dataBase)
//     //create new note object
//   let notesForUser = { 
//     title: req.body.title, 
//     text: req.body.text, 
//     id: id 
//     }
//     dataBase.push(notesForUser);
//     fs.writeFileSync('./db/db/json', JSON.stringify(dataBase))
//     res.json(dataBase);
//     });
// //DELETE information from data base
// app.delete('/api/notes/:id',(req,res) => {
//   let dataBase = JSON.parse(fs.readFileSync('.db/db.json'))
//   let deleteNotes = dataBase.filter(item => item.id !== req.params.id);
//   fs.writeFileSync('./db/db.json', JSON.stringify(deleteNotes));
//   res.json(deleteNotes);
// })

// app.listen(PORT, () =>
//   console.log(`App listening on PORT ${PORT}`)
// );
