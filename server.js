const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

//serve public folder
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});