const http = require('http');
const https = require('https');
const { extractTopArticles } = require('./utils/extractTopArticles');
const { fetchHTML } = require('./utils/fetchHTML');

const PORT = 3000;

// Unified HTTP server
http.createServer((req, res) => {
  const targetURL = 'https://time.com';

  if (req.url === '/' && req.method === 'GET') {
    const data = {
        message: 'Server is running and you can access data from /getTimeStories',
        timestamp: new Date(),
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));

  } else if (req.url === '/getTimeStories' && req.method === 'GET') {
    fetchHTML(targetURL, (err, html) => {
      if (err) {
        res.writeHead(500);
        res.end('Error fetching HTML');
        return;
      }

      const data = extractTopArticles(html);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data, null, 2));
    });

  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
