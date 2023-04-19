const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codial_devlopment');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to db"));
db.once('open',function()
{
    console.log("Successfully connected");
});
module.exports=db;