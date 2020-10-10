
function modificarSubtotal (indice, precio){
    let cantidad = parseInt(document.getElementById(`cantidad-${indice}`).value);
    subTotal = cantidad*precio;
    document.getElementById(`subTotal-${indice}`).innerHTML= subTotal;
    calcTotal();
}



function calcTotal(){
    let subtotales=document.getElementsByClassName ("subtotales");
    let suma = 0;
    console.log (subtotales); 
    for(let i=0; i<subtotales.length; i++){
        suma +=parseInt(subtotales[i].innerHTML);
    }
    document.getElementById("total").innerHTML=suma;
}


function showAllProducts(array){
    let contenido = "";
    for(let i=0; i<array.length; i++){
        let product = array[i];
        contenido += `
        <tr class="text-center">
            <td>
                <img class="img-fluid" src="${product.src}" alt="${product.name}">
            </td>
            <td>
                ${product.name}
            </td>
            <td>
                ${product.currency} ${product.unitCost} 
            </td>
            <td>
                <input id="cantidad-${i}" class="quantity cant" min="1" max="999" name="quantity" onchange="modificarSubtotal(${i}, ${product.unitCost})" value="${product.count}" type="number">
            </td>
            <td id="subTotal-${i}" class="subtotales">
                ${(product.unitCost*product.count).toFixed(2)} 
            </td>
        </tr>       
        `;
        
    }
    $('#tabla').append(contenido);
    calcTotal();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
          //  showProductCart(resultObj.data.articles[0]); 
          showAllProducts(resultObj.data.articles);
        }
    });
});

/*function calcSubtotal (costo,i){
    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    subTotal = cantidad*costo;
    document.getElementById(`productSubtotal${i}`).innerHTML= subTotal;
    calcSubtotal(); 
}*/
