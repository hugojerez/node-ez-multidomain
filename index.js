// include dependencies
const express = require('express');
const proxy = require('http-proxy-middleware');
// https://www.npmjs.com/package/http-proxy-middleware
const https = require('https');
const http = require('http');
const { readdirSync, statSync, readFileSync } = require('fs')
const { join } = require('path')
const router = {};
const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory())
const foldersWithSameParent = dirs('../')

foldersWithSameParent.forEach(element => {
    [domain, port] = element.split('_')
    if (domain && Number(port)) {
        console.log(domain, port)
        router[domain] = "http://localhost:" + port;
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
    router: router
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

// This line is from the Node.js HTTPS documentation.
var options = {
    key: readFileSync('key.pem'),
    cert: readFileSync('cert.pem')
};


// Create an HTTP service.
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);
// https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/
// openssl genrsa -out key.pem
// openssl req -new -key key.pem -out csr.pem
// openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
// rm csr.pem