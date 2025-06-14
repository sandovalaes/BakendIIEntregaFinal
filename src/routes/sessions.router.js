import { Router } from 'express';
import {login, register, recuperar, confirmarcambioclave, current} from "../controllers/user.controller.js"
import passport from "passport";
import {handlePolicies} from "../config/authorizer.js";

const sessionsRouter = Router();

sessionsRouter.post('/login', handlePolicies(["PUBLIC"]), login); 
sessionsRouter.post('/register', handlePolicies(["PUBLIC"]), register);
sessionsRouter.post('/recuperar', handlePolicies(["PUBLIC"]), recuperar);
sessionsRouter.post('/confirmarcambioclave', handlePolicies(["PUBLIC"]), confirmarcambioclave);
sessionsRouter.get('/current',  passport.authenticate("jwt",{session: false}), handlePolicies(["USUARIO"]), current);

export {sessionsRouter};