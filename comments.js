//create a web server
//set up a route to handle incoming requests
//serve up the comments data
//serve up the form
//handle form submissions

//create a web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const comments = require('./comments');

const server = http.createServer((req, res) => {
    //set up a route to handle incoming requests
    if (req.url === '/comments' && req.method === 'GET') {
        comments.get((err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Server Error');
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(data);
        });
    } else if (req.url === '/comments' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let params = qs.parse(body);
            comments.add(params, (err) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Server Error');
                    return;
                }
                res.writeHead(201);
                res.end('Created');
            });
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

//serve up the comments data
//serve up the form
//handle form submissions
//create a form
//set up a route to serve the form
//handle form submissions

const formPath = path.join(__dirname, 'public', 'form.html');

server.on('request', (req, res) => {
    if (req.url === '/form' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.createReadStream(formPath).pipe(res);
    }
});

server.on('request', (req, res) => {
    if (req.url === '/form' && req.method === 'POST') {
        let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    let params = qs.parse(body);
                });
            }
        });
