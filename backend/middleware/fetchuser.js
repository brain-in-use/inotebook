const jwt = require('jsonwebtoken');
const JWT_SECRET="appleisgood$"
const fetchuser = async (req,res,next)=>{
    //Get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authintucate using a valid token"});
    }
    try{
        const data = jwt.verify(token,JWT_SECRET);
        req.user= data.user;
        next();
    }catch{
        res.status(401).send({error:"Please authintucate using a valid token"});
    }
    
}

module.exports = fetchuser;