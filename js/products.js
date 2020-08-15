//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productsArray = [];

function showProducts(array) { 

    let contenido = "";
    for (let i = 0; i < array.length; i++) {
        let products = array[i];

        contenido += 'Nombre: ' + products.name + '<br>';
        contenido += 'Descripción: ' + products.description + '<br>';
        contenido += 'Precio: ' + products.cost + '<br>';
        contenido += '<br><hr><br>'
        


        document.getElementById("listado").innerHTML = contenido;
    }
} 


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
           productsArray = resultObj.data;

            showProducts(productsArray);
        }
    });


});


document.addEventListener("DOMContentLoaded", function (e) {

});