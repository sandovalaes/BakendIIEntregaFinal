import {Router} from "express";
import {productManager} from "../app.js";
import productModel from '../models/product.model.js'

const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
    res.render('index',{
        buttons: [
            { name: 'Products', link: '/products' },
            { name: 'RTP (RealTimeProducts)', link: '/realtimeproducts' }
        ]
    });
});

viewsRouter.get("/products",async (req,res)=>{
    try{
        console.log("Consultanto productos")
        let { limit, page, sort, query } = req.query;
        limit = parseInt(limit) || 10;
        page = parseInt(page) || 1;
        sort = sort || '';
        query = query || '';

        let filter = {};

        if (query) {
            const categoryRegex = query
            filter = { category: categoryRegex };
        }

        let options = {
            page: page,
            limit: limit,
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
            lean: true
        };

        console.log(options)
        console.log(filter)

        let result = await productModel.paginate( filter, options);

        const { totalPages, prevPage, nextPage, page: currentPage, hasPrevPage, hasNextPage } = result;
        const prevLink = hasPrevPage ? `${req.baseUrl}/products/?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null;
        const nextLink = hasNextPage ? `${req.baseUrl}/products/?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null;
        console.log(`${req.baseUrl}`);
        console.log(nextLink);
        console.log(hasNextPage);
        
        res.render('home',{
            result :"success", 
            payload: result.docs,  
            totalPages: totalPages, 
            prevPage: prevPage, 
            nextPage: nextPage, 
            page: currentPage,
            hasPrevPage: hasPrevPage,
            hasNextPage: hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink,
            sort: sort,
            filtro: query
        })
    }catch(error){
        console.error(error)
        return res.status(500).json({message:'Error al recuperar los productos.'})
    }
})

viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts');
});

export {viewsRouter}; 