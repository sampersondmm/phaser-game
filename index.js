var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req,res){
  res.render('index');
})

app.listen(8081,function(){
  console.log('server has started')
})
