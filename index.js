// include dependencies
var express = require('express');
var proxy = require('http-proxy-middleware');
const { readdirSync, statSync } = require('fs')
const { join } = require('path')
const router = {};
const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory())
const foldersWithSameParent = dirs('../')

foldersWithSameParent.forEach(element => {
    [domain,port] = element.split('_')
    if(domain && Number(port)){
        console.log(domain,port)
        router[domain] = "http://localhost:"+port;
    }
});
console.log(router);
// proxy middleware options
var options = {
  target: 'http://www.example.org', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    //'^/api/old-path': '/api/new-path', // rewrite path
    //'^/api/remove/path': '/path' // remove base path
  },
  router:router 
//   {
//     // when request.headers.host == 'dev.localhost:3000',
//     // override target 'http://www.example.org' to 'http://localhost:8000'
//     'beta.pituteo.com': 'http://localhost:3000',
//     'api.pituteo.com': 'http://localhost:3001'
//   }
};
 
// create the proxy (without context)
var exampleProxy = proxy(options);
 
 
// mount `exampleProxy` in web server
var app = express();
app.use('/', exampleProxy);
app.listen(80);

