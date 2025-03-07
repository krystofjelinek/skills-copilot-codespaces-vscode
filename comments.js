// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// Read comments from file
app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Failed to read comments');
    } else {
      res.send(data);
    }
  });
});

// Add a comment
app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Failed to read comments');
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          res.status(500).send('Failed to write comments');
        } else {
          res.send('Comment added');
        }
      });
    }
  });
});

// Start web server
app.listen(3001, () => {
  console.log('Web server started on localhost:3001');
});