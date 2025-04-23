import {Router} from "express";

const viewsRouter = Router();

viewsRouter.get('/index', (req, res) => {
    res.render('index',{
        buttons: [
            { name: 'Products', link: '/api/products' },
            { name: 'RTP (RealTimeProducts)', link: '/realtimeproducts' }
        ]
    });
});

viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts');
});

viewsRouter.get('/login', (req, res) => {
    res.render('login');
});

viewsRouter.get('/', (req, res) => {
    res.render('login');
});

viewsRouter.get('/register', (req, res) => {
    res.render('register');
});

viewsRouter.get('/logout', (req, res) => {
    res.clearCookie('EcommerceCookieToken');
    res.render('login');
});


export {viewsRouter}; 