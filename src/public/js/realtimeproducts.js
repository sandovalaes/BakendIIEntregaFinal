const socketClient = io();

socketClient.on("productos", (obj) => {
    updateProductList(obj);
});

function updateProductList(productList) {
    const productsDiv = document.getElementById("contenedorProductos");

    let productosHTML = "";

    productList.forEach((product) => {
        productosHTML += `  <div class="col mb-4">
            <div class="card h-100 bg-light">
                <div class="card-body">
                    <h5 class="card-title text-black">${product.title}</h5>
                    <ul class="list-unstyled">
                        <li>
                            <img src=${product.thumbnail} alt=${product.title} class="img-fluid mt-2">
                        </li>
                        <li><i class="bi bi-info-circle"></i> ID: ${product.id}</li>
                        <li><i class="bi bi-file-text"></i> Description: ${product.description}</li>
                        <li><i class="bi bi-currency-dollar"></i> Price: $${product.price}</li>
                        <!--<li><i class="bi bi-grid"></i> Category: ${product.category}</li> -->
                        <!--<li><i class="bi bi-check-circle"></i> Status: ${product.status}</li>-->
                        <li><i class="bi bi-box"></i> Stock: ${product.stock}</li>
                    </ul>
                    <button class="btn btn-primary mb-4" onclick = "addToCart('${product.id}')" >Agregar al carrito</button>
                </div>
            </div>
        </div>`;
    });

    productsDiv.innerHTML = productosHTML;
}

let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let title = form.elements.title.value;
    let description = form.elements.description.value;
    let price = form.elements.price.value;
    let status = form.elements.status.checked;
    let code = form.elements.code.value;
    let stock = form.elements.stock.value;
    let thumbnail = form.elements.thumbnail.value;
    let category = " "; /*form.elements.category.value;*/

    socketClient.emit("agregarProducto", {
        title,
        description,
        price,
        status,
        code,
        stock,
        category,
        thumbnail
    });

    form.reset();
});

const botonEliminar = document.getElementById("deletebtn");

botonEliminar.addEventListener("click",  function() {
    console.log("Eliminado");
    const deleteidinput = document.getElementById("id-prod");
    const deleteid = parseInt(deleteidinput.value);
    
    socketClient.emit("eliminarProducto", deleteid);
    deleteidinput.value = "";
});

