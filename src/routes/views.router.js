import {Router} from "express";
import passport from "passport";
import {handlePolicies} from "../config/authorizer.js";
import {renderindex, renderlogin, renderregister, renderrecuperar, rendercambiarclave, renderlogout} from "../controllers/view.controler.js"

const viewsRouter = Router();

viewsRouter.get('/', handlePolicies(["PUBLIC"]), renderindex);
viewsRouter.get('/login', handlePolicies(["PUBLIC"]), renderlogin);
viewsRouter.get('/register', handlePolicies(["PUBLIC"]), renderregister);
viewsRouter.get('/recuperar', handlePolicies(["PUBLIC"]), renderrecuperar);
viewsRouter.get('/cambiarclave/:email', rendercambiarclave);
viewsRouter.get('/logout', handlePolicies(["PUBLIC"]), renderlogout);

export {viewsRouter}; 