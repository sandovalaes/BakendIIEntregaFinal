import {Router} from "express";

const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
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

export {viewsRouter}; 