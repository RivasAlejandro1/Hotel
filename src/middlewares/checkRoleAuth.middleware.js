import { verifyToken } from '../helpers/jwt/verifyToken.js';
import userEntity from '../entities/user.entity.js';
import { AppDataSource } from '../config/AppDataSource.js';

const userReposository = AppDataSource.getRepository(userEntity);

export const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ').pop();
        const tokenData = await verifyToken(token);
        const userData = await userReposository.findOneBy({id: tokenData.id});
        if(userData.administrador){
        //if([].concat(roles).includes(userData.role)){
            next();
        }
        else {
            res.status(409)
            res.send({
                error: "No esta autorizado para este servicio"
            })
        }
    }catch(e){
        console.log(e)
        res.status(409)
        res.send({ error: "No esta autorizado para este servicio"})
    }

}