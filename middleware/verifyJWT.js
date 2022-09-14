const jwt = require('jsonwebtoken');

const verifyJWT = (req,res,next) => {
    const authHeader=req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token=authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err,decoded)=>{
            if(err) {
                console.log(err);
                return res.sendStatus(403)
            }
            req.userId=decoded.id;
            next();
        }
    )
}

module.exports = verifyJWT