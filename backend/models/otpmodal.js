const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const otpschema = new mongoose.Schema({

  email: {
    type: String,
    required: [true, "please enter your email"],
  
    validate: [validator.isEmail, "pleale enter valid email"],
  },


//   resetpasswordstoken: String,
//   resetpasswordexpire: Date,
  otp: Number,
  expireIn: Date,


});

// before the save user details
// userschema.pre("save", async function (next) {

//   // chack of bassword encripted or not
//   if (!this.isModified('password')) {
//     next()
//   }
//   this.password = await bcrypt.hash(this.password, 10)
  

// })

//jwt token for direct login
// userschema.methods.getJWTToken = function () {
//   console.log(`jt${this._id}`)
//   return jwt.sign({
//     id:
//       this._id
//   }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

// }

// comarepassword
// userschema.methods.comarepassword = async function (enterdpassword) {
//   // console.log(enterdpassword)
//   // console.log(this.password)
//   return await bcrypt.compare(enterdpassword, this.password)

// }

// geting password reset token
// userschema.methods.getResetPasswordToken = function () {

//   // genreting token
//   const resetToken = crypto.randomBytes(20).toString("hex")
//   console.log( resetToken )
//   // adding resetpasswordtoken to userschkima
//   this.resetpasswordstoken = crypto.createHash("sha256").
//     update(resetToken)
//     .digest("hex")
//     console.log( this.resetpasswordstoken )
// // adding resetpasswordexpire to userschkima
// this.resetpasswordexpire = Date.now()+15*60*1000
//     return resetToken

// }

module.exports = mongoose.model("Otp", otpschema);
