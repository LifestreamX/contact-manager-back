// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('./db.json');
// const middlewares = jsonServer.defaults({
//   static: './build',
// });
// const PORT = process.env.PORT || 9000;
// server.use(middlewares);
// server.use(
//   jsonServer.rewriter({
//     '/api/*': '/$1',
//   })
// );
// server.use(router);
// server.listen(PORT, () => {
//   console.log('Server is running');
// });

const jsonServer = require('json-server');
const clone = require('clone');
const data = require('./db.json');
const cors = require('cors');

const isProductionEnv = process.env.NODE_ENV === 'production';
const server = jsonServer.create();

// For mocking the POST request, POST request won't make any changes to the DB in the production environment
const router = jsonServer.router(isProductionEnv ? clone(data) : 'db.json', {
  _isFake: isProductionEnv,
});
const middlewares = jsonServer.defaults();

// Custom CORS middleware
const customCorsMiddleware = (req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://contactmanager.tyler-allen.com'
  ); // Replace this with your frontend domain
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    // Preflight request response
    return res.sendStatus(200);
  }

  next();
};

server.use(customCorsMiddleware); // Add the custom CORS middleware here
server.use(middlewares);

server.use((req, res, next) => {
  if (req.path !== '/') router.db.setState(clone(data));
  next();
});

server.use(router);
server.listen(process.env.PORT || 9000, () => {
  console.log('JSON Server is running');
});

// Export the Server API
module.exports = server;
