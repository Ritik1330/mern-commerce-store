module.exports = cachasycError=>(req,res,next)=>{
    console.log("cach err call")
    Promise.resolve(cachasycError(req,res,next)).catch(next)
}   