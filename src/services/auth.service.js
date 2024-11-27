import jwt from 'jsonwebtoken';
import {config} from 'dotenv';

export const genereteAccessToken = (username)=>{
    const user = { username: username};
    const SECRET = process.env.SECRET;
    return jwt.sign(user, SECRET, {expiresIn: "60m"});
}

export const deleteTokenCookie = (req, res) => {
    res.cookies("jwt", "", {maxAge: 1});
    res.redirect("/");
}
