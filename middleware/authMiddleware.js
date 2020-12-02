const jwt = require('jsonwebtoken');
const User = require('../models/User')

const requireAuth = (req, res, next) => {
    // grab the token 
    const token = req.cookies.jwt;
    // then it might check token is exists or not
    if (token) {
        jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.redirect('/login')
            }
            else {
                next();
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

// check the user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.locals.user = null;
                next();
            }
            else {
                // console.log(decodedToken)
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser }