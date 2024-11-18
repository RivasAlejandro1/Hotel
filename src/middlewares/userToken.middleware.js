import jwt from 'jsonwebtoken';

export default function userTokenMiddleware(req, res, next){
    const accessToken = req.headers['authorization'];
    if(!accessToken) res.send('Access denied');
    jwt.verify(accessToken, process.env.SECRET, (err, user) => {
        if(err){
            res.status(400).send('Access denied token expired or incorrect');
        }else{
            next();
        }
    });
}