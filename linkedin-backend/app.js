var express = require('express');
var app = express();
var session = require('express-session');
var cors = require('cors');
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
var users = require('./routes/users');
var applications = require('./routes/applications');
const multer = require('multer');
var jobs = require('./routes/jobs.js');
var listusernetwork = require('./routes/listusernetworks');
// var {User} = require('./models/user');

const url = "http://localhost:3002";
//const url = "hosting url";
app.use(cors({origin:url,credentials:true}));

app.use(function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', url);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/users', users);
app.use('/apply', applications);
app.use('/applications', applications);
app.use('/jobs',jobs);

app.use('/user', listusernetwork);



app.get("/start",(request,response)=>{
	response.status(200).json({
		msg : "Welcome to Linkedin"
	});
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './resumeFolder');
    },
    filename: (req, file, cb) => {
    const newFilename = `${file.originalname}`;
    console.log("filename : " + newFilename);
    cb(null, newFilename);
    },
  });

const uploadPhoto = multer({ storage });
app.post('/uploadresume', uploadPhoto.single('selectedFile'), (req, res) => {
    console.log("Inside photo upload Handler");
    res.writeHead(200,{
         'Content-Type' : 'text/plain'
         })
});






var server = app.listen(3001,()=>{
    console.log("Linkedin server has started to listen at http://localhost:3001" );
});
