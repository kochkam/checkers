var path = require("path");
var express = require('express');
const { response } = require("express");
const app = express();

const publicPath = path.join(__dirname, '..', 'build');

app.use(express.static(publicPath))

app.get('/*', function (req,res) {
    res.sendFile(path.join(publicPath, 'index.html'));
});


const port = process.env.PORT || 3000;

app.listen(port,() => {
    console.log('Server Up!');
});