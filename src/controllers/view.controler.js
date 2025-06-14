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