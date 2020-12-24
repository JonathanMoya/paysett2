const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')
const hostname = 'localhost';
const port = 8080;
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use('/api', require('./routes/api'));

const server = http.createServer(app)

server.listen(port, hostname, () => {
    console.log(`Server running on http://${hostname}:${port}`)
})
