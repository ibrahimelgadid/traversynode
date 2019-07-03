var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
    "html":'text/html',
    "jpeg":'image/jpeg',
    "jpg":'image/jpeg',
    "png":'image/png',
    "js":'text/javascript',
    "css":'text/css',
}


http.createServer((req,res)=>{
    var url = url.parse(req.url).pathname;
    
    var fileName = path.join(process.cwd(),unescape(url))
    console.log('loading '+ url)
    var stats;

    try {
        stats  = fs.lstatSync(fileName);
    } catch  (res){
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.write('404 Not Found');
        res.end();
        return;
    }

}).listen(8000, (err, done)=>{
    if(err)throw err;
    console.log('done')
})