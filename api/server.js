const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults({
  static: './build',
});

const PORT = process.env.PORT || 9000;

// Enable CORS for all origins
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  next();
});

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
