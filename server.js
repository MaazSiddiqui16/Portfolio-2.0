const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const root = __dirname;
dotenv.config({ path: path.join(root, '.env') });

const port = Number(process.env.PORT) || 3000;
const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

if (!accessKey) {
  throw new Error('WEB3FORMS_ACCESS_KEY is missing from .env');
}

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
};

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', chunk => {
      body += chunk;
      if (body.length > 100_000) {
        reject(new Error('Request body is too large'));
        request.destroy();
      }
    });
    request.on('end', () => resolve(body));
    request.on('error', reject);
  });
}

async function handleContact(request, response) {
  try {
    const formData = JSON.parse(await readBody(request));
    const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, access_key: accessKey }),
    });

    const result = await web3FormsResponse.json();
    sendJson(response, web3FormsResponse.status, result);
  } catch (error) {
    console.error('Contact form error:', error.message);
    sendJson(response, 500, { success: false, message: 'Unable to send the message.' });
  }
}

function serveStatic(request, response) {
  const requestedPath = request.url === '/' ? '/index.html' : request.url;
  const filePath = path.resolve(root, `.${requestedPath}`);

  if (!filePath.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(error.code === 'ENOENT' ? 404 : 500);
      response.end(error.code === 'ENOENT' ? 'Not found' : 'Server error');
      return;
    }

    const contentType = mimeTypes[path.extname(filePath)] || 'application/octet-stream';
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(file);
  });
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);

  if (requestUrl.pathname === '/api/contact') {
    if (request.method !== 'POST') {
      sendJson(response, 405, { success: false, message: 'Method not allowed.' });
      return;
    }
    handleContact(request, response);
    return;
  }

  if (request.method !== 'GET') {
    response.writeHead(405);
    response.end('Method not allowed');
    return;
  }

  serveStatic({ ...request, url: requestUrl.pathname }, response);
});

server.listen(port, () => {
  console.log(`Portfolio running at http://localhost:${port}`);
});
