const jwt = require("jsonwebtoken");
const User = require("../models/usersModal");
const Errorhandler = require("../utils/errorhander");
const cachasycError = require("./cachasycError");

// login chacker

exports.isAuthentictedUser = cachasycError(async (req, res, next) => {
    // console.log("token")
    // console.log(req.cookies.token)
    // console.log("token")
    // console.log(req.user)
    const token = req.cookies.token;
    
    if (!token) {
        return next(new Errorhandler('LOGIN FOR THIS RESORS', 401))

    }
    const decodeddata = jwt.verify(token, process.env.JWT_SECRET)
console.log(decodeddata)
    // for add in produc create user
    //  and verification
    req.user = await User.findById(decodeddata.id);
    next()

})

//user role chacker

exports.authrizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log(roles)
        if (!roles.includes(req.user.role)) {
            return next(new Errorhandler(`you are not admin. Role ${req.user.role} is not allowed to access this resourse`, 403))
        }
        next()
    }

}

