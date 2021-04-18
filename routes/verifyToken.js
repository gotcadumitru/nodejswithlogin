const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const checkToken =async (req,res,next)=>{
    const token = req.header('auth-token');
    if(token===null) return res.status(400).send({
        succes: false,
        error: 'Acces Denied',
    })
    
    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        if(verified){
            const findUser = await User.findById(verified._id);
            if(findUser){
                req.user = findUser;
            }else{

                return res.status(404).send({
                    succes: false,
                    error: "No user with this id",
                })
            }
        }
        next();
    }catch(err){
        res.status(400).send({
            succes: false,
            error: "acesata eroare",
        })
    }
}
module.exports = checkToken;