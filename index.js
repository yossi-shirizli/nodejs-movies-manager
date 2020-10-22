const fs = require('fs');
const http = require('http');
const url = require('url');

//SERVER
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === '/' || pathName === '/overview') {
    res.end('Hii ovr');
  } else if (pathName === '/product') {
    res.end('Hii pdt');
  }
  res.writeHead(404, {
    'Content-type': 'text/html',
    'my-own-header': 'hey me',
  });
  res.end('Page not found');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listenning to requests on port 3000....');
});
