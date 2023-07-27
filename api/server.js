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



server.get('/warm-up', (req, res) => {
  res.status(200).send('Function is warm');
});


server.listen(PORT, () => {
  console.log('Server is running');
});



