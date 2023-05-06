const express=require('express');
//const err=["vgg","lll"]
const cookieParser=require('cookie-parser');
const bodyParser = require('body-parser');
const app=express();
//flash = require('express-flash')
const expressLayouts=require('express-ejs-layouts');
const { default: mongoose } = require('mongoose');
//const db=require('./config/mongoose');
//const session=require('express-session');
//const passport=require('passport');
//const passportLocal=require('./config/passport_local_startegy');
//const mongoStore = new (require('connect-mongo')(session))({ url: 'mongodb://localhost/loan_prediction'});
//const sassMiddleWare=require('node-sass-middleware');
const flash=require('connect-flash');
//const customMware=require('./config/middleware');
const port=8001;
/*app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );*/
  //app.use(flash());
/*app.use(sassMiddleWare({\n    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'

}));*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cookieParser());
// Use routes
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use('/uploads',express.static(__dirname+'/uploads'));
app.set('view engine','ejs');

app.set('views','./views');
/*app.use(session({
    secret:'shreyas',
    saveUninitialized:false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection:db,
            
            ttl: 60 * 60 * 24, // session TTL (expiration) in seconds
      autoRemove: 'interval',
      autoRemoveInterval: 10, // interval in minutes to clear expired sessions
    },
    function(err)
    {
        console.log(err || 'connect-mongodb setup ok');
    }
)
}));*/
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(passport.setAuthenticateduser);
//app.use(flash());
//app.use(customMware.setFlash);
const uri="mongodb+srv://slshreyas4:Shreyas98@cluster0.wqau1jg.mongodb.net/?retryWrites=true&w=majority";
async function connect(){
    try{
        await mongoose.connect(uri);
        console.log('Connected to DB!!');
    } catch(err){
        console.error(err);
    }
}
connect();
app.use('/',require('./routes'));
app.use(flash());
app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error in running server');
    }
    else
    {
        console.log('Server is running on'+port);
    }
});
app.get('/script.js', function(req, res) {
    res.sendFile(__dirname + '/script.js');
  });
