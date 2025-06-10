document.addEventListener('DOMContentLoaded', () => {
    const cartId = document.getElementById('cartId').value;
    document.querySelectorAll('.nueva-cantidad').forEach(button => {
        button.addEventListener('click', function() {
            const productId = button.getAttribute('data-product-id');
            //const cartId = '67e86f2102e7bb4548da390f' // Obtener el ID del carrito
            const cantidad = document.getElementById("input-cantidad-" + productId).value;
            console.log(cantidad);
            console.log('Product ID:', productId);
            console.log('Cart ID:', cartId);
            actualizarProductoDelCarrito(cartId, productId, cantidad);
        });
    });
});

function actualizarProductoDelCarrito(cartId, productId, cantidad) {
    console.log("antes de actualizar");
    console.log(cantidad);
    const url = `http://localhost:8081/carts/${cartId}/products/${productId}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ quantity : cantidad })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === "success") {
            alert('Producto Actualizado');
            location.reload(); // Recarga la página para actualizar el carrito
        } else {
            alert('No se pudo actualizar la cantidad del producto.');
        }
    })
    .catch(error => console.error('Error:', error));
}