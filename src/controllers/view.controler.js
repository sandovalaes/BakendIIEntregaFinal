export const renderindex = (req, res) => {
    res.render('index',{
        buttons: [
            { name: 'Inicia Sesión', link: '/login' },
        ]
    });
}

export const renderlogin = (req, res) => {
    res.render('login');
}

export const renderregister = (req, res) => {
    res.render('register');
}

export const renderrecuperar =  (req, res) => {
    res.render('recuperar');
}

export const rendercambiarclave =  (req, res) => {
    const email = req.params.email;
    res.render('cambiarclave',{result :"success", payload: email });
}

export const renderlogout = (req, res) => {
    res.clearCookie('EcommerceCookieToken');
    res.render('login');
}

export const renderaddproduct = (req, res) => {
    let miscategorias = [];
        miscategorias.push({category : "Todos"});
        miscategorias.push({category : "Frescos"});
        miscategorias.push({category : "Bebidas"});
        miscategorias.push({category : "Limpieza"});
        miscategorias.push({category : "Galletitas y Cereales"});
        miscategorias.push({category : "Aceites y Aderezos"});
        miscategorias.push({category : "Infusiones y Endulzantes"});
    res.render('addproduct',{miscategorias});
}

export const renderdeleteproduct = (req, res) => {
    res.render('deleteproduct');
}