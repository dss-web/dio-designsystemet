import http from 'http';
import { createRenderer, patternlibContext } from './handlebars-setup.mjs';

const render = createRenderer();
const port = Number(process.env.PORT) || 5080;

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    try {
      const html = render(patternlibContext);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    }
    catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err instanceof Error ? err.stack : String(err));
    }
  }
  else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Pattern library http://127.0.0.1:${port}`);
});
