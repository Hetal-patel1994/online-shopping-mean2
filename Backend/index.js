const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');

const businessRoute = require('./routes/business.route');
const loginRoute = require('./routes/login.route');

//chnges by hetal on 21-2-19
//mongoose.Promise = global.Promise;

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors({credentials: false}));

// chnged by hetal on 21-2-19
//app.use('/public',express.static('../public'));

app.use(express.static(path.join(__dirname,'public')));

app.use(express.static(path.join(__dirname,'/img_uploads')));

app.use('/KC', loginRoute);
app.use('/KC', businessRoute);

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'))
})


const port = process.env.PORT || 8080;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});