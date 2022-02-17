const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid-random');

const app = express();
const PORT = process.env.PORT || 3000;

//serve public folder
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

app.post('/api/notes', (req, res) => {
    //saves note to db
    fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
        if (err) {
            throw err;
        }
        const oldNotes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = uuid();
        oldNotes.push(newNote);
        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(oldNotes), (err) => {
            if (err) {
                throw err;
            }
            res.sendStatus(200);
        });
    });
});

app.get('/api/notes', (req, res) => {
    //gets all notes from db
    fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

app.delete('/api/notes/:id', (req, res) => {
    //deletes note from db
    fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
        if (err) throw err;
        const oldNotes = JSON.parse(data);
        const noteId = req.params.id;
        const newNotes = oldNotes.filter(note => note.id !== noteId);
        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(newNotes), (err) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});