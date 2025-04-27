document.addEventListener('DOMContentLoaded', () => {
    const cartId = document.getElementById('cartId').value // Obtener el ID del carrito
    document.querySelectorAll('.eliminar-producto').forEach(button => {
        button.addEventListener('click', function() {
            const productId = button.getAttribute('data-product-id');
            console.log('Product ID:', productId);
            console.log('Cart ID:', cartId);
            eliminarProductoDelCarrito(cartId, productId);
        });
    });

    document.querySelectorAll('.vaciar-carrito').forEach(button => {
        button.addEventListener('click', function() {
            console.log('Cart ID:', cartId);
            vaciarCarrito(cartId);
        });
    });
});

function eliminarProductoDelCarrito(cartId, productId) {
    fetch(`/carts/${cartId}/products/${productId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === "success") {
            alert('Producto Eliminado');
            location.reload(); // Recarga la página para actualizar el carrito
        } else {
            alert('No se pudo eliminar el producto del carrito');
        }
    })
    .catch(error => console.error('Error:', error));
}

function vaciarCarrito(cartId) {
    fetch(`/carts/${cartId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === "success") {
            alert('Carrito Vacio.');
            location.reload(); // Recarga la página para actualizar el carrito
        } else {
            alert('No se pudo vaciar el carrito');
        }
    })
    .catch(error => console.error('Error:', error));
}