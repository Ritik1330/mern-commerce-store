const jwt = require("jsonwebtoken")

const sendToken = (user, stauscode, res, req) => {
    const token = user.getJWTToken();
    // const token =   jwt.sign({
    //     id:
    //       user._id
    //   }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })


    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000

        ),
        httpOnly: true
    }

    res.status(stauscode).cookie('token', token, options).json({
        success: true,
        toka: token,
        user

    })

}

module.exports = sendToken