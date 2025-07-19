import http from 'http';
import https from 'https';

export function fetchHTML(url, callback) {
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