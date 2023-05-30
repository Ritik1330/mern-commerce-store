const ErrorHander = require("../utils/errorhander")

module.exports=(err,req,res,next)=>{
    err.statuCode = err.statuCode || 500;
    err.message =err.message || "internal server error castom from midelware"


    if (err.name==="CastError") {
        const mess=`resourse not found. invalid ${err.path}`
       err = new ErrorHander(mess,400)

        
    }
//monguse  duplicate key error
// console.log(err.code)
    if (err.code===11000) {
        const mess=`Duplicate ${Object.keys(err.keyValue)}`
       err = new ErrorHander(mess,400)

        
    }
//wrong jwt err
// console.log(err.code)
    if (err.code==="JsonWebTokenError") {
        const mess=`Json Web Token Error try agin`
       err = new ErrorHander(mess,400)

        
    }
//jwt expire err
// console.log(err.code)
    if (err.code==="TokenExpiredError") {
        const mess=`Token Expired Error try agin`
       err = new ErrorHander(mess,400)

        
    }

    

    res.status(err.statuCode).json({
        successs:false,
        message:err.message,
        Error:err.stack,
    })
};
