import jwt from 'jsonwebtoken';
import {config} from 'dotenv';

export const genereteAccessToken = (user)=>{
    const PAYLOAD = { 
        id: user.id,
        administrador: user.administrador

    };
    const SECRET = process.env.SECRET;
    return jwt.sign(
        PAYLOAD,
        SECRET, 
        {
            expiresIn: "60m"
        }
    );
}


