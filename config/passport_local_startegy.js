const passport=require('passport');
const LocalStartegy=require('passport-local').Strategy;
const User=require('../models/user');
passport.use(new LocalStartegy({
  usernameField:'email'
},
function(email,password,done)
{
User.findOne({email:email},function(err,user)
{
   if(err)
   {
       console.log('error in finding user');
       return done(err);
   }
else if(!user || user.password!=password)
{
   console.log('Invalid username/password');
   return done(null,false);
}
else{
return done(null,user);
}
});
}));
//Serialising the user which key is to be kept in the cookies
passport.serializeUser(function(user,done){
   done(null,user.id);
});
//Deserialising the user from the key in the cookie
passport.deserializeUser(function(id,done)
{
User.findById(id,function(err,user)
{
if(err)
{
   console.log('There was an error found');
}
else{
   return done(null,user);
}
});
});
passport.checkAuthentication=function(req,res,next)
{
   if(req.isAuthenticated())
   {
      //If the user is authenticated then only allow him to proceed else redirect back to sign_in.
      return next();
   }

   return res.redirect('/sign_in');
}
passport.setAuthenticateduser=function(req,res,next)
{
   if(req.isAuthenticated())
   {
      //If the user is autenticated then pass locals to response page.
      res.locals.user=req.user;
   }
    next();
}
module.exports=passport;