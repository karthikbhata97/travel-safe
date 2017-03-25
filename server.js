var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(morgan('dev'));

app.use('/client', express.static(__dirname + '/client'));
app.use(express.static(__dirname + 'public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/views/index.html');
});


app.listen(3000, function() {
  console.log("Hello 3k");
})
