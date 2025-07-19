const http = require('http');
const https = require('https');

const PORT = 3000;

// Unified fetchHTML function
function fetchHTML(url, callback) {
  const client = url.startsWith('https') ? https : http;
  console.log(`🔍 Fetching URL: ${url}`);

  client.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`HTML fetched (${data.length} characters)\n`);
      callback(null, data);
    });
  }).on('error', (err) => {
    console.error('Fetch error:', err.message);
    callback(err);
  });
}

// Extract full article details
function extractFullData(html) {
  const articleRegex = /<article[^>]*class="[^"]*?text-black-coffee[^"]*?"[^>]*>([\s\S]*?)<\/article>/gi;
  const articles = [...html.matchAll(articleRegex)];

  return articles.map((match) => {
    const articleHTML = match[1];

    const titleMatch = articleHTML.match(/<h3[^>]*><div>\s*<a[^>]*>\s*<span>(.*?)<\/span>/);
    const linkMatch = articleHTML.match(/<a[^>]*href="([^"]+)"/);

    return {
      title: titleMatch?.[1]?.trim() ?? null,
      link: linkMatch ? `https://time.com${linkMatch[1].trim()}` : null,
    };
  });
}

// Extract only top 6 articles (title + link)
function extractTopArticles(html) {
  const articleRegex = /<article[^>]*class="[^"]*?text-black-coffee[^"]*?"[^>]*>([\s\S]*?)<\/article>/gi;
  const matches = [...html.matchAll(articleRegex)];

  return matches.slice(0, 6).map((match) => {
    const block = match[1];
    const titleMatch = block.match(/<h3[^>]*><div>\s*<a[^>]*>\s*<span>(.*?)<\/span>/);
    const linkMatch = block.match(/<a[^>]*href="([^"]+)"/);

    return {
      title: titleMatch?.[1]?.trim() ?? null,
      link: linkMatch ? `https://time.com${linkMatch[1].trim()}` : null,
    };
  });
}

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
