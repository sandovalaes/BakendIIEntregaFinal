import passport from "passport";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtrator = req=>{
    let token = null;
    console.log(req.cookies['EcommerceCookieToken']);
    if (req && req.cookies){
        token = req.cookies['EcommerceCookieToken']
    }
    return token;
}

const initializerPassport = ()=>{
    passport.use(   "jwt", 
                    new JWTStrategy(
                                    {
                                        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtrator]),
                                        secretOrKey:"MyEcommerceKeyPrivateJWT"
                                    }
                                    ,
                    async (jwt_payload, done)=>{
                        try{
                            return done(null, jwt_payload);
                        }catch (error){
                            done(error);
                        }
                    }
                )
                )
}

export default initializerPassport;
