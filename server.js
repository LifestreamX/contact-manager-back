const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults({
  static: './build',
});
const PORT = process.env.PORT || 9000;
server.use(middlewares);
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
);
server.use(router);
server.listen(PORT, () => {
  console.log('Server is running');
});

var http = require('http');
setInterval(function () {
  http.get('https://contactmanager.tyler-allen.com');
}, 300000); // every 5 minutes (300000)


