var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic('D:/Projects/Experiments/Projects/node.js/static-server')).listen(8080, function(){
    console.log('Server running on 8080...');
});