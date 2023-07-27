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

// JSON Server module
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');

const PORT = process.env.PORT || 9000;

// Make sure to use the default middleware
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(
  // Add custom route here if needed
  jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id',
  })
);

server.use(router);
// Listen to port
server.listen(PORT, () => {
  console.log('Server is running');
});

// Export the Server API
module.exports = server;
