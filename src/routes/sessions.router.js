import { Router } from 'express';
import {login, register, recuperar, confirmarcambioclave, current} from "../controllers/user.controller.js"
import passport from "passport";

const sessionsRouter = Router();

sessionsRouter.post('/login', login); 
sessionsRouter.post('/register', register);
sessionsRouter.post('/recuperar', recuperar);
sessionsRouter.post('/confirmarcambioclave', confirmarcambioclave);
sessionsRouter.get('/current',  passport.authenticate("jwt",{session: false}), current);

export {sessionsRouter};