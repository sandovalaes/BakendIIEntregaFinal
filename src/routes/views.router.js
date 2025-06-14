import {Router} from "express";
import passport from "passport";
import {handlePolicies} from "../config/authorizer.js";
import {renderindex, renderlogin, renderregister, renderrecuperar, rendercambiarclave, renderlogout, renderaddproduct, renderdeleteproduct} from "../controllers/view.controler.js"

const viewsRouter = Router();

viewsRouter.get('/', handlePolicies(["PUBLIC"]), renderindex);
viewsRouter.get('/login', handlePolicies(["PUBLIC"]), renderlogin);
viewsRouter.get('/register', handlePolicies(["PUBLIC"]), renderregister);
viewsRouter.get('/recuperar', handlePolicies(["PUBLIC"]), renderrecuperar);
viewsRouter.get('/cambiarclave/:email', rendercambiarclave);
viewsRouter.get('/logout', handlePolicies(["PUBLIC"]), renderlogout);
viewsRouter.get('/addproduct', passport.authenticate("jwt",{session: false}), handlePolicies(["ADMIN"]), renderaddproduct);
viewsRouter.get('/deleteproduct', passport.authenticate("jwt",{session: false}), handlePolicies(["ADMIN"]), renderdeleteproduct);

export {viewsRouter}; 