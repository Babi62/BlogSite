const http = require('http');
const fs = require('fs');
const loadash = require('lodash');

const server = http.createServer((request, response) => {
    console.log(request.url, request.method);

    // lodash package
    const num = loadash.random(0, 20);
    console.log(num);

    const greet = loadash.once(() => {
        console.log("Greeting to you, Hello");
    });

    greet();



    //set header content type 
    response.setHeader('content-Type', 'text/html');
    /* 
        response.write('<h1>First Html Response</h1>');
        response.end(); */

    //REturing html pages
    let path = './Html/';
    switch (request.url) {
        case '/':
            path += 'index.html';
            response.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            response.statusCode = 200;
            break;
        case '/about-us':
            response.statusCode = 301; // redirecting if location is moved
            response.setHeader('Location', '/about');
            response.end();
            break;
        default:
            path += '404.html';
            response.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) console.log(err);
        //response.write(data);
        response.end(data);
    })


});




server.listen(3000, 'localhost', () => {
    console.log('listening for request at localhost on port 3000')
});

