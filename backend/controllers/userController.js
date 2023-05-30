const User = require("../models/usersModal");
const ErrorHander = require("../utils/errorhander");
const cachasycError = require("../middleware/cachasycError");
const sendToken = require("../utils/jwtTokan");
const getJWTToken = require("../models/usersModal")
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto")


// resiter user
exports.registerUser = cachasycError(async (req, res, next) => {
    console.log("register called")


    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this ids id of avtar",
            url: "this url id of avtar"
        }
    })
    sendToken(user, 200, res)
    // const token = user.getJWTToken()
    // res.status(201).json({
    //     success: true,
    //     toka: token,
    //     user

    // })
}
)

// login user
exports.loginUser = cachasycError(async (req, res, next) => {

    // req.body.id = 
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHander("enter email and password", 400))

    };

    const user = await User.findOne({ email: email, }).select("+password");

    if (!user) {
        return next(new ErrorHander("invalid use and password", 401))

    };
    const isPasswordMatch = await user.comarepassword(password)



    if (!isPasswordMatch) {
        return next(new ErrorHander("invalid password", 401))

    };

    sendToken(user, 200, res, req)

    console.log(req.body.id)

    // const token = user.getJWTToken()
    // res.status(201).json({
    //     success:true,
    //     toka :token,
    //     // email
    //     // user

    // });



}
);


// logout user
exports.logoutUser = cachasycError(async (req, res, next) => {
    // console.log("logoutUser called")




    const options = {
        expires: new Date(Date.now()
        ),
        httpOnly: true
    }

    res.cookie('token', null, options)

    // const token = user.getJWTToken()
    res.status(201).json({
        success: true,
        message: "lougout sessesfully"

    })
}
)



//forget password
exports.forgatepasswort = cachasycError(async (req, res, next) => {

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHander('user not found', 404))
    }

    // get Resetpassword  Token return by getResetPasswordToken
    // const isPasswordMatch = await user.comarepassword(password)

    const resetToken = await user.getResetPasswordToken()
    // save data adeed in getResetPasswordToken
    await user.save({ validateBeforeSave: false })

    const resetpasswordUrl = `${req.protocol}://api/v1/password/reset/${resetToken
        }`;
    const message = `your password reset token is ${resetpasswordUrl}\n\n if yo have not requested this email then ignor it `
    try {

        await sendEmail({
            email: user.email,
            subject: `ecomarce passwor recovary`,
            message
        })

        res.status(200).json({
            success: true,
            message: `email send to ${user.email} succefully`
        });
    } catch (error) {
        user.resetpasswordstoken = undefined
        user.resetpasswordexpire = undefined
        await user.save({ validateBeforeSave: false })

        next(new ErrorHander(error.message, 500))
    }




})

//set new pass word
exports.resetepasswort = cachasycError(async (req, res, next) => {
    const resetToken = req.params.token
    console.log(resetToken)
    const resetpasswordstoken = crypto.createHash("sha256").
        update(resetToken)
        .digest("hex")
    let user = await User.findOne({ resetpasswordstoken: resetpasswordstoken });


    if (!user) {
        return next(new ErrorHander('token is expore either invalid token', 404))
    }
    if (req.body.password !== req.body.confirampassword) {
        return next(new ErrorHander('password and confirampassword are note same', 404))
    }

    user.password = req.body.password

    user.resetpasswordstoken = undefined
    user.resetpasswordexpire = undefined
    await user.save({ validateBeforeSave: false })

    sendToken(user, 200, res, req)


})


//GET user DETAILS


exports.getUserDetails = cachasycError(async (req, res, next) => {
    //req.body.id add in auth 

    let user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    });
})



//change user password


exports.updatePassword = cachasycError(async (req, res, next) => {
    //req.body.id add in auth 

    let user = await User.findById(req.user.id).select("+password");

    const isPasswordMatch = await user.comarepassword(req.body.oldPassword)



    if (!isPasswordMatch) {
        return next(new ErrorHander("invalid old  password", 400))
    };

    if (req.body.password !== req.body.confirampassword) {
        return next(new ErrorHander('password and confirampassword are note same', 404))
    }
    user.password = req.body.password
    await user.save()

    sendToken(user, 200, res)
})

//update profie

exports.updateProfile = cachasycError(async (req, res, next) => {
    //req.body.id add in auth 
    newUserData = {
        name: req.body.name,
        email: req.body.email

    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
    });

    // use cloude narry latter

    res.status(200).json({
        success: true,
        user
    });
})


//get all user (admin)
exports.getAllUser = cachasycError(async (req, res, next) => {
    const resultperpage = 5;
    const users = await User.find()
    res.status(200).json({

        success: true,
        users

    });
})

//get all user details(admin)

exports.getSingalUser = cachasycError(async (req, res, next) => {
    const user = await User.findById(req.params.id)


    if (!user) {
        return next(new ErrorHander(`user not found ${req.params.id}`, 404))
    };
    res.status(200).json({

        success: true,
        user

    });
})

//update user role(admin)

exports.updateUserRole = cachasycError(async (req, res, next) => {
    //req.body.id add in auth 
    newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role

    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        user
    });
})



//delete user(admin)

exports.deleteUser = cachasycError(async (req, res, next) => {
    //req.body.id add in auth 
    const user = await User.findById(req.params.id)
    if (!user) {

        return next(new ErrorHander(`user not foundby this id ${req.params.id}`, 400))
    }
    //we will remove cloudinary latter
    const users = await User.findByIdAndRemove(req.params.id)

    // await user.remove();
    res.status(200).json({
        success: true,
        message:"user delete",
        users
    });
})



