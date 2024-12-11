import { verifyToken } from '../helpers/jwt/verifyToken.js';

 const checkToken = async (req, res, next)=> {
     const token = req.headers.authorization?.split(' ')?.pop();
     const tokenData = await verifyToken(token);
     console.log(tokenData)
    if(tokenData?.id){
        next();
    }else {
        res.status(409)
        res.send({
            error: "Token invalido"
        })
    }

}

export default checkToken;