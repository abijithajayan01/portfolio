const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // Parse URL and sanitize path
  let reqUrl = decodeURI(req.url.split('?')[0]);
  if (reqUrl === '/' || reqUrl === '') reqUrl = '/index.html';

  let filePath = path.join(PUBLIC_DIR, reqUrl);

  // If path doesn't have extension, check if an .html file exists (e.g. /resume -> /resume.html)
  // Handle PHP files
  if (filePath.endsWith('.php')) {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      body = Buffer.concat(body);
      const { spawn } = require('child_process');
      const phpPath = 'C:\\Users\\Sujithra\\AppData\\Local\\Microsoft\\WinGet\\Packages\\PHP.PHP.8.3_Microsoft.Winget.Source_8wekyb3d8bbwe\\php.exe';
      const phpCmd = fs.existsSync(phpPath) ? phpPath : 'php';

      const proc = spawn(phpCmd, [filePath], {
        cwd: __dirname,
        env: {
          ...process.env,
          REQUEST_METHOD: req.method,
          CONTENT_TYPE: req.headers['content-type'] || 'application/json',
          CONTENT_LENGTH: body.length.toString()
        }
      });

      let out = [];
      proc.stdout.on('data', d => out.push(d));
      proc.stderr.on('data', d => console.error(d.toString()));
      proc.on('close', () => {
        const text = Buffer.concat(out).toString('utf8');
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        });
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        res.end(jsonMatch ? jsonMatch[0] : text);
      });

      proc.stdin.write(body);
      proc.stdin.end();
    });
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!DOCTYPE html><html><body style="font-family: sans-serif; background: #070a12; color: #fff; text-align: center; padding: 50px;">
        <h2>404 - File Not Found</h2>
        <p><a href="/" style="color: #2dd4bf;">Back to Portfolio</a></p>
      </body></html>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const nextPort = PORT + 1;
    console.log(`Port ${PORT} in use, trying port ${nextPort}...`);
    server.listen(nextPort, () => {
      console.log(`\n======================================================`);
      console.log(`🚀 Portfolio running live locally!`);
      console.log(`👉 Local Link: http://localhost:${nextPort}`);
      console.log(`======================================================\n`);
    });
  } else {
    console.error('Server error:', err);
  }
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Portfolio running live locally!`);
  console.log(`👉 Local Link: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});
