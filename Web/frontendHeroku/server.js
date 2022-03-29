

const express = require('express');
const app = express();
const port = 4000;


app.use(express.static(__dirname + "/dist/"));
app.get(/.*/,function(req,res ) {
  res.sendFile(__dirname + "/dist/index.html");
})

/*

const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 4000;
app.listen(port);

*/