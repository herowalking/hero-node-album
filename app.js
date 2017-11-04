var express = require('express');
var router = require('./controller/router');

var app = express();

app.set('view engine', 'ejs');

app.use(expres.static('./public'));
app.use(expres.static('./uploads'));



