import jwt from 'jsonwebtoken';
import {config} from 'dotenv';

export const genereteAccessToken = (username)=>{
    const user = { username: username};
    const SECRET = process.env.SECRET;
    return jwt.sign(user, SECRET, {expiresIn: "60m"});
}