const session = require ('express-session');

const sessionMiddleware = session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000 // Thời gian hết hạn session (5 phút)
    }
});

const isAuth= (req, res, next)=>{
    if (req.session.isAuth){
        next();
    }else{
        res.redirect('/admin');
    }
}
module.exports = { sessionMiddleware, isAuth };