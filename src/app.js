import path from 'path';
import express from "express";
import exphbs from 'express-handlebars';
import mongoose from "mongoose";
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { Server } from "socket.io";
import { fileURLToPath } from 'url';
import initiallizerPassport from "./config/passport.config.js"

// Importar las rutas
import {sessionsRouter} from "./routes/sessions.router.js";
import {productsRouter} from "./routes/products.router.js";
import {cartsRouter} from "./routes/carts.router.js";
import {viewsRouter} from "./routes/views.router.js";

// Importar la clase ProductManager y CartManager
import { productsManager } from "./controllers/productManager.js";
import { cartsManager } from "./controllers/cartManager.js";

// Crear instancias de ProductManager y CartManager
const productManager = new productsManager('./src/data/productos.json');
const cartManager = new cartsManager('./src/data/carts.json');

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de handlebars
const app = express();
const hbs = exphbs.create({
    helpers: {
        multiply: (a, b) => a * b  // Helper para multiplicar
    }
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);

//Passport
initiallizerPassport();
app.use(passport.initialize());

// Configuración del puerto
const PORT = 8081;

// Iniciar el servidor
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
});

//app.listen(PORT, ()=>{
//    console.log(`Servidor corriendo sobre el puerto ${PORT}`)
//})

mongoose.connect('mongodb+srv://sandovalaes:Pepito25**@cluster0.0uaahtr.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Database connected!')) .catch(err => console.log(err));

// Configuración de socket.io
const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("Un cliente se conectó");

    // Envía los productos al conectar
    const products = await productManager.getProducts();
    socket.emit("productos", products);

    socket.on("agregarProducto", async (obj) => {
        await productManager.addProduct(obj);
        io.emit("productos", await productManager.getProducts());
    });

    socket.on("eliminarProducto", async (id) => {
        await productManager.deleteProduct(id);
        console.log("producto eliminado");
        io.emit("productos", await productManager.getProducts());
    });
});

export { productManager, cartManager };