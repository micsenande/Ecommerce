var product = {};
var productComments = [];

// ESTA FUNCION RECIBE UN OBJETO PRODUCTO, Y LOS MUESTRA EN PANTALLA
function mostrarProductoConSusImagenes(producto) {

    let imagenesDelProducto = "";

    imagenesDelProducto = `
    <img class="img" src= "${producto.images[0]}" width="300px" height = "200px">
    <img class="img" src= "${producto.images[1]}" width="300px" height = "200px">
    <img class="img" src= "${producto.images[2]}" width="300px" height = "200px">
    <img class="img" src= "${producto.images[3]}" width="300px" height = "200px">
    <img class="img" src= "${producto.images[4]}" width="300px" height = "200px">
    `;

    document.getElementById("categoryName").innerHTML = producto.name;
    document.getElementById("categoryDescription").innerHTML = producto.description;
    document.getElementById("productCount").innerHTML = producto.cost;
    document.getElementById("soldCount").innerHTML = producto.soldCount;
    document.getElementById ("category").innerHTML = producto.category;

    document.getElementById("productImagesGallery").innerHTML = imagenesDelProducto;
}

// ESTA FUNCION RECIBE UNA ARRAY DE COMENTARIOS, Y MUESTRA EN PANTALLA LOS COMENTARIOS
function mostrarComentariosDelProducto(comentarios) {

    let comentariosParaMostrar = "<hr>";

    comentarios.forEach(function (itemComentario) {
        
        let puntosDelComentario = "";

        comentariosParaMostrar += `
            <strong>${itemComentario.user} </strong> dice: <br>
            <p>${itemComentario.description}</p>
        `;

        for (let i = 1; i <= itemComentario.score; i++) {
            puntosDelComentario += `<span class= "fa fa-star checked"></span>`;
        }
        for (let i = itemComentario.score + 1; i <= 5; i++) {
            puntosDelComentario += `<span class= "fa fa-star"></span>`;
        }

        comentariosParaMostrar += `<sub>${itemComentario.dateTime}</sub><br>`;
        comentariosParaMostrar += `<div style= "text-align: right;">${puntosDelComentario}</div><br><hr>`;

    });

    document.getElementById("comentarios").innerHTML = comentariosParaMostrar;
}


document.addEventListener("DOMContentLoaded", function () {
    
    // EXTRAEMOS LA INFORMACION DEL PRODUCTO
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
        }
    });

    // EXTRAEMOS LOS COMENTARIOS DEL PRODUCTO
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productComments = resultObj.data;
        }

        // MOSTRAMOS EL PRODUCTO
        mostrarProductoConSusImagenes(product);
        // MOSTRAMOS LOS COMENTARIOS DEL PRODUCTO
        mostrarComentariosDelProducto(productComments)

    });

});

// CUANDO EL USUARIO AGREGUE UN NUEVO COMENTARIO
document.getElementById("enviarComentario").addEventListener("click", function () {

    // EXTRAEMOS EL COMENTARIO
    let elementoTextArea = document.getElementById("productDescription");
    let comentrario = elementoTextArea.value;
    let estrellas = parseInt(document.getElementById("estrellas").value);

    comentarioParaAgregar = {};

    // EXTRAEMOS EL NOMBRE DE USUARIO
    let email = ""; 
    let userLogged = localStorage.getItem("user-logged");
    if (userLogged) {
        userLogged = JSON.parse(userLogged);
        email = userLogged.email;
    } else {
        email = "Anonimo";
    }

    // EXTRAEMOS LA FECHA Y HORA
    let dateTime = new Date();
    let fechaHora = `
    ${dateTime.getFullYear()}-
    ${dateTime.getMonth() + 1}-
    ${dateTime.getDate()} ${dateTime.getHours()}:
    ${dateTime.getMinutes()}:
    ${dateTime.getSeconds()}
    `;

    // CREAMOS EL COMENTARIO
    comentarioParaAgregar = {
        score: estrellas,
        description: comentrario,
        user: email,
        dateTime: fechaHora,
    };

    // AGREGAMOS EL COMENTARIO A LOS OTROS COMENTARIOS
    productComments.push(comentarioParaAgregar);

    // MOSTRAMOS NUEVAMENTE LOS COMENTARIOS
    mostrarComentariosDelProducto(productComments);

});



