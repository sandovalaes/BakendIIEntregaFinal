import { Router } from 'express';
import userModel from '../models/user.model.js';
import cartModel from '../models/cart.model.js';
import { isValidPassword } from '../public/Utils/utils.js';
import  generateToken  from '../public/Utils/utils.js';
import { createHash } from '../public/Utils/utils.js';

const sessionsRouter = Router();

sessionsRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        const user = await userModel.findOne({ email });
        console.log(user)
        if (!user) return res.status(404).send('Usuario no encontrado');

        if (!isValidPassword(user,password)) return res.status(404).send('Clave erronea.');
        
        let token = generateToken(user);

        res.cookie("EcommerceCookieToken",token,{maxAge:60*60*1000});//.send({message: "Login!"});
        res.redirect('/api/products');

    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
});

sessionsRouter.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password, role } = req.body;
    try {
        console.log("Entre al login");
        console.log(req.body);
        console.log(first_name);
        console.log(last_name);
        console.log(email);
        console.log(age);
        console.log(password);
        console.log(role);
        const newCart = new cartModel({});
        console.log(newCart._id);
        let valor = await newCart.save();
        let idcarrito = newCart._id; 
        const newUser = new userModel({ first_name, last_name, email, age, password: createHash(password), cart: idcarrito, role });
        console.log(newUser);
        await newUser.save();
        console.log("Me voy al login");
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }
});

export {sessionsRouter};