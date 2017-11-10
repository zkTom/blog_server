const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

let PORT = 3001;
let HOST = '127.0.0.1';
const VIEWS = __dirname + "/views";


app = express();
app.use(cookieParser('Tom'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set("views", VIEWS);
app.set("view engine", "ejs");
app.set('port', process.env.PORT || PORT);
app.use(express.static(__dirname + '/public'));


app.use('/', require('../router/index'));
app.use('/login',require('../router/login'))
app.use('/register',require('../router/register'))
app.use('/user', require('../router/user'));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500);
    res.send({ error: err.message });
});

app.use(function (req, res, next) {
    res.status(404);
    res.send({ error: "can not find" });
});

// http.createServer(app).listen(app.get('port'), HOST, function () {
//     console.log('Express started on address:' + HOST + ':' + app.get('port'));
// });
module.exports=app
