import passport from "passport";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtrator = req=>{
    let token = null;
    console.log(req);
    console.log("la cookie es: ")
    console.log(req.cookies['EcommerceCookieToken']);
    if (req && req.cookies){
        console.log("adentro del if");
        token = req.cookies['EcommerceCookieToken']
    }

    console.log("Muestro token");
    console.log(token);
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
