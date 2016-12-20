var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('server/routes');


var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.all('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, function() {
  console.log('Server Running on ' + PORT);
});
