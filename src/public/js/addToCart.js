async function addToCart(cid,pid) {
    const cidv1 = '67e86f2102e7bb4548da390f';
    const url = `http://localhost:8081/carts/${cid}/products/${pid}`;
    console.log(cid);
    console.log(pid);

    try {

        console.log("agregando al carrito")
        const response = await fetch(url, {
            method: 'POST',
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Producto agregado al carrito:', data);
            alert('Producto agregado al carrito con éxito');
        } else {
            console.log(response);
            console.log(response.status);
            if (response.status === 403){
                throw new Error('No autorizado.');
            }else{
                throw new Error('Error al agregar el producto al carrito');
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert(error);
    }
}