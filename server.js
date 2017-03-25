var express = require('express'),
    app = express(),
    mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');

app.listen(3000, function() {
  console.log("Hello 3k");
})
