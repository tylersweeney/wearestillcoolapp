const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../backend/entities/user/model');

passport.serializeUser((user, done)=>{
	done(null, user.id)
});

passport.deserializeUser((id, done)=>{
	User.findById(id).then((user)=>{
		done(null, user)
	});

});

passport.use(
    new GoogleStrategy({
    	//options for the google strategy
    	callbackURL:'/auth/google/redirect',
   		clientID:keys.google.clientID,
    	clientSecret: keys.google.clientSecret
	}, (accessToken, refreshToken, profile, done) =>{
		//check if user already exists in our db

		User.findOne({googleId: profile.id}).then((currentUser) => {
			if(currentUser){
				//already have the user
				console.log('user is: ', currentUser);
				console.log(profile);
				done(null,currentUser)
			}else{
				//if not, create user in our db
				new User({
        	username: profile.displayName,
          name: profile.displayName,
					googleId: profile.id,
<<<<<<< HEAD
					thumbnail: profile._json.image.url,
        //   gender: profile.gender || '',
        //   email: profile.emails[0].value || '',
        //   url: profile.url || '',
        //   org: profile.organizations[0].name || '',
        //   title: profile.organizations[0].title || ''
=======
					thumbnail: profile._json.image.url
          // gender: profile.gender || '',
          // email: profile.emails[0].value || '',
          // url: profile.url || '',
          // org: profile.organizations[0].name || '',
          // title: profile.organizations[0].title || ''
>>>>>>> 83e13ecd7ea9367cce5b1869c745a210fddf3acc
    	}).save().then((newUser)=>{
				console.log('new user created: ' + newUser);
				done(null, newUser);
			});
			}
		})


	})
)
