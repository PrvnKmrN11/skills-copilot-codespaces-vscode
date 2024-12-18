// Create web server
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const comments = require('./comments');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (req.method === 'GET' && pathname === '/comments') {
    const postId = query.postId;
    const postComments = comments.getComments(postId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(postComments));
  } else if (req.method === 'POST' && pathname === '/comments') {
    let body = '';
    req.on('data', (data) => {
      body += data;
    });
    req.on('end', () => {
      const newComment = JSON.parse(body);
      comments.addComment(newComment);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newComment));
    });
  } else {
    const filename = pathname === '/' ? '/index.html' : pathname;
    const filepath = path.join(__dirname, 'public', filename);
    fs.readFile(filepath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': mime.getType(filepath) });
        res.end(data);
      }
    });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});