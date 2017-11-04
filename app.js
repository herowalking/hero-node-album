var express = require('express');
var router = require('./controller/router');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(express.static('./uploads'));

app.get('/', router.showIndex);

app.listen(3000);



