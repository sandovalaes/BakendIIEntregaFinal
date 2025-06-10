import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createHash =  password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
export const isEqualPassword = (user, password) => bcrypt.compareSync(password, user.password);  

const PRIVATE_KEY = "MyEcommerceKeyPrivateJWT";

const generateToken = (user)=>{
    const token = jwt.sign({user},PRIVATE_KEY,{expiresIn : "24h"});
    return token;
}

export default generateToken;

