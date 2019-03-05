/*
*
* Server
*
*/
const http =  require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const helpers = require('./helpers');
const handlers = require('./handlers');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const server = {};

server.http = http.createServer((req, res) => {
  server.unifiedServer(req, res);
});


server.init = () => {
  server.http.listen(process.env.PORT ? process.env.PORT : config.httpPort, () => {
    console.log('\x1b[32m%s\x1b[0m', `Server is listening up at port ${config.httpPort} and running ${config.envName}`);
  });
}

server.unifiedServer = (req, res) => {
  const payload = {};
  const parsedUrl = url.parse(req.url, true);
  const queryStringObject = parsedUrl.query;
  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/$/g, '');
  const method = req.method.toLowerCase();
  const headers = req.headers;

  // Get Payload if any
  let buffer = '';
  const decoder = new StringDecoder('utf-8');
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });
  req.on('end', ()=>{
    buffer += decoder.end();

    // Construct Data
    const data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': helpers.parseJsonToObject(buffer)
    }

    let chosenHandler = typeof (server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;
    chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler
    debugger;
    chosenHandler(data, (statusCode, payload,contentType) => {

      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      contentType = typeof(contentType) == 'string' ? contentType : 'json';

      // content specific
      var payloadString = ''
      if(contentType === 'json'){
        res.setHeader('Content-Type','application/json');
        payload = typeof(payload) == 'object' ? payload : {};
        payloadString = JSON.stringify(payload);
      } else if(contentType === 'html'){
        res.setHeader('Content-Type','text/html');
        payload = typeof(payload) == 'string' ? payload : '';
        payloadString = payload;
      } else if(contentType === 'favicon'){
        res.setHeader('Content-Type','image/x-icon');
        payload = typeof(payload) !== 'undefined' ? payload : '';
        payloadString = payload;
      } else if(contentType === 'css'){
        res.setHeader('Content-Type','text/css');
        payload = typeof(payload) !== 'undefined' ? payload : '';
        payloadString = payload;
      } else if(contentType === 'png'){
        res.setHeader('Content-Type','image/png');
        payload = typeof(payload) !== 'undefined' ? payload : '';
        payloadString = payload;
      } else if(contentType === 'jpg'){
        res.setHeader('Content-Type','image/jpeg');
        payload = typeof(payload) !== 'undefined' ? payload : '';
        payloadString = payload;
      } else if(contentType === 'plain'){
        res.setHeader('Content-Type','text/pain');
        payload = typeof(payload) !== 'undefined' ? payload : '';
        payloadString = payload;
      }
      // Common for all req
      res.writeHead(statusCode);
      res.end(payloadString);
      console.log('Response ', statusCode, payload, method, queryStringObject);
    });
  });
}

server.router = {
  '' : handlers.index,
  'account/create' : handlers.accountCreate,
  'account/edit' : handlers.accountEdit,
  'account/deleted' : handlers.accountDeleted,
  'session/create' : handlers.sessionCreate,
  'session/deleted' : handlers.sessionDeleted,
  'menu' : handlers.showMenu,
  'cart' : handlers.showCart,
  'order' : handlers.order,
  'api/users' : handlers.users,
  'api/tokens': handlers.tokens,
  'api/login' : handlers.login,
  'api/logout': handlers.logout,
  'api/cart' : handlers.cart,
  'api/menu': handlers.menu,
  'api/order': handlers.order,
  'favicon.ico': handlers.favicon,
  'public': handlers.public
}

module.exports = server;
