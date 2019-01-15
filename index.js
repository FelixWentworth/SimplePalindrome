var express = require('express');
var routeHandler = require('./routes/handler');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', routeHandler)

app.get('/', function(req, res) {
	res.render('index.html');
});

var port = 3000;
app.listen(port, function() {
	console.log('Server', process.pid, 'listening on port', port);
});

