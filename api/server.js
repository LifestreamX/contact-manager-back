const { createServer } = require('http');
const { parse } = require('url');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults({
  static: './build',
});
const PORT = process.env.PORT || 9000;

// Disable caching for API responses
server.use((req, res, next) => {
  res.header('Cache-Control', 'no-store');
  next();
});

server.use(middlewares);

// Rewrite rules to handle API routes
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
);

server.use(router);

const httpServer = createServer(server);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
