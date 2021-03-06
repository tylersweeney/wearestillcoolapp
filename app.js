const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

// app.use(express.static('public'));
//set up view engine
app.set('view engine', 'ejs');

//set up cookie session encryption
app.use(cookieSession({
    maxAge: 24 * 60 * 60 *1000,
    keys: [keys.session.cookieKey]
}))

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
})

//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//create home route
app.get('/', (req, res) =>{
  req.session.returnTo = req.path;
  res.render('home', { user: req.user});
});

//create meetups route
app.get('/meetups', (req, res) =>{
    req.session.returnTo = req.path;
    res.render('meetups', { user: req.user});
 });

//create forum route
app.get('/forums', (req,res)=>{
   req.session.returnTo = req.path;
   res.render('forums', {user: req.user});
});

app.get('/reviews', (req,res)=>{
    res.render('reviews', {user: req.user})
})

// const serverConfigs = require('./config/serverConfig');

require('./backend/express')(app, keys);
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('app now listening for requests on port 3000');
});

// const react = require('react');
// const { hot } = require('react-hot-loader');
// module.exports = hot(module)(app);