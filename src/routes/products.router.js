import Router from "express";
import productModel from '../models/product.model.js';

const productsRouter = Router();

productsRouter.get("/views",async (req,res)=>{
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

        let miscategorias = [];
        miscategorias.push({category : "Todos", selected : query == "Todos"? true : false});
        miscategorias.push({category : "Frescos", selected : query == "Frescos"? true : false});
        miscategorias.push({category : "Bebidas", selected : query == "Bebidas"? true : false});
        miscategorias.push({category : "Limpieza", selected : query == "Limpieza"? true : false});
        miscategorias.push({category : "Galletitas y Cereales",  selected : query == "Galletitas y Cereales"? true : false});
        miscategorias.push({category : "Aceites y Aderezos", selected : query == "Aceites y Aderezos"? true : false});
        miscategorias.push({category : "Infusiones y Endulzantes", selected : query == "Infusiones y Endulzantes"? true : false});

        let result = await productModel.paginate( filter, options);

        const { totalPages, prevPage, nextPage, page: currentPage, hasPrevPage, hasNextPage } = result;
        const prevLink = hasPrevPage ? `${req.baseUrl}/products/?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null;
        const nextLink = hasNextPage ? `${req.baseUrl}/products/?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null;

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
            ascendenteon: sort === 'asc' ? true : false,
            descendenteon: sort === 'desc' ? true : false,
            filtroCategoria: query,
            miscategorias
        })
    }catch(error){
        console.error(error)
        return res.status(500).json({message:'Error al recuperar los productos.'})
    }
})

productsRouter.get('/:pid', async (req, res)=>{
    try{
        let pid = req.params.pid;
        const product = await productModel.findOne({_id : pid})

        if (!product) return res.status(404).json({message: "Producto no encontrado!"})
        
        res.render('viewproduct',{result :"success", payload: product })
    }catch{
        return res.status(500).json({message :'Error al intentar obtener el producto.'})
    }
})

export {productsRouter};