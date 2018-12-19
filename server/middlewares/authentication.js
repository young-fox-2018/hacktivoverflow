const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports ={
    isLoggedIn : function(req,res,next){
        if(req.headers.token === undefined){
            res.status(400).json({message: `verification Failed`})
        } else {
            try {
                let decodedMail = jwt.verify(req.headers.token, process.env.jwtSecret)

                User.findOne({email: decodedMail},
                    {password: 0},
                    function(err,user_data){
                        if(err) res.status(400).json({err: err.message})
                        else{
                            if(!user_data) res.status(400).json({err: `verification Failed`})
                            else{
                                req.currentUser = user_data
                                
                                next()
                            }
                        }
                })
            } catch (err) {
                res.status(400).json({message: `Token is malformed`})
            }
        }
    }
}