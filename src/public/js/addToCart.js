async function addToCart(pid) {
    const cid = '67e86f2102e7bb4548da390f';
    const url = `http://localhost:8081/api/carts/${cid}/products/${pid}`;
    console.log(pid);

    try {

        console.log("agregando")
        const response = await fetch(url, {
            method: 'POST',
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Producto agregado al carrito:', data);
            alert('Producto agregado al carrito con éxito');
        } else {
            throw new Error('Error al agregar el producto al carrito');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al agregar el producto al carrito');
    }
}