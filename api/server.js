const jsonServer = require('json-server');
const { fs } = require('memfs'); // Import memfs
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults({
  static: './build',
});

// Import and use micro-cors middleware
const cors = require('micro-cors')();
server.use(cors);

const PORT = process.env.PORT || 9000;

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
);

// Intercept the router.db object with the in-memory file system
router.db._.write = () => {
  fs.writeFileSync('./db.json', JSON.stringify(router.db.getState()));
};

// Load initial data from the file system
router.db.setState(JSON.parse(fs.readFileSync('./db.json', 'utf8')));

server.use(router);

server.listen(PORT, () => {
  console.log('Server is running');
});
