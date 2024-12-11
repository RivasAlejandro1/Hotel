import jwt from 'jsonwebtoken';
import {config} from 'dotenv';

export const verifyToken = async (token)=> {
    try{
        console.log( jwt.verify(token, process.env.SECRET))
        return jwt.verify(token, process.env.SECRET);
    }catch(e){
        return null
    }
}