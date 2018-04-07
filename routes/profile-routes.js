const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        //if user is not logged in
        //set session variable for returning to page after login
        req.session.returnTo = '/profile';
        res.redirect('/auth/login');
    }else{
        //if logged in
        next();
    }
};

router.get('/', authCheck, (req,res)=>{
    res.render('profile', { user: req.user});
})

module.exports = router;