import User from "../dao/classes/user.dao.js";
import Cart from "../dao/classes/cart.dao.js";
import UsuarioDto from "../dto/usuario.dto.js";
import { isValidPassword } from '../public/Utils/utils.js';
import { isEqualPassword } from '../public/Utils/utils.js';
import { createHash } from '../public/Utils/utils.js';
import  generateToken  from '../public/Utils/utils.js';
import nodemailer from 'nodemailer';

const serviceUser = new User();
const serviceCart = new Cart();
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'sandoval.aes@gmail.com',
        pass: 'babv gsjd lzhz qtsi'
    }
});

export const login = async(req, res)=>{
    const { email, password } = req.body;
    try {
        const user = await serviceUser.getUser(email);
        if (!user) return res.status(404).send('Usuario no encontrado');
        if (!isValidPassword(user,password)) return res.status(404).send('Clave erronea.');
        let token = generateToken(user);
        res.cookie("EcommerceCookieToken",token,{maxAge:60*60*1000});
        res.cookie("EcommerceCart",user.cart,{maxAge:60*60*1000});
        res.redirect('/products');
    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
}

export const register = async (req, res) => {
    const { first_name, last_name, email, age, password, role } = req.body;
    try {
        const newCart = await serviceCart.createCart({});
        await serviceCart.saveCart(newCart);
        const newUser = { first_name, last_name, email, age, password: createHash(password), cart: newCart._id, role };
        const createdUser = await serviceUser.createUser(newUser);
        await serviceUser.saveUser(createdUser);
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }
}

export const recuperar = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await serviceUser.getUser(email);
        if (!user) return res.status(404).send('Usuario no encontrado');
        let result = await transport.sendMail({
            from: 'Ecommerce Mayorista <sandoval.aes@gmail.com>',
            to: email,
            subject: 'Recuperacion de Cuenta',
            html: `<div>
                http://localhost:8081/cambiarclave/${email}
            </div>`,
            attachments: []
        })
        res.render('login');
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }
}

export const confirmarcambioclave = async(req, res)=>{
    const { email, password } = req.body;
    try {
        const user = await serviceUser.getUser(email);
        if (!user) return res.status(404).send('Usuario no encontrado');
        if (isEqualPassword(user,password)) return res.status(404).send('Clave a setear es igual a la clave actual.');
        user.password = createHash(password);
        await serviceUser.updateUser(user._id, user);
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
}

export const current =  async (req, res) => {
    const user = req.user.user;
    const usuariodto = new UsuarioDto(user.first_name, user.last_name, user.email, user.age, user.role);
    console.log(usuariodto);
    res.render('current', {result :"success", payload: usuariodto}  )
}