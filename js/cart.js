var productos = [];

function borrarProducto(indice) {
  if (productos.length > 0) {
    productos.splice(indice, 1);
    console.log(productos);
    showAllProducts(productos);
    calcTotal();
    alert("No tiene productos en el carrito");
  };
};


document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productos = resultObj.data.articles;
      showAllProducts(productos);
    }
  });
});


function calcTotal() {
  let subtotales = document.getElementsByClassName("subtotales");
  let suma = 0;
  for (let i = 0; i < subtotales.length; i++) {
    suma += parseInt(subtotales[i].innerHTML);
  }
  document.getElementById("totalProducts").innerHTML = suma;
  calcEnvio();
  envio();
}


function modificarSubtotal(indice, precio) {
  let cantidad = parseInt(document.getElementById(`cantidad-${indice}`).value);
  subTotal = cantidad * precio;
  document.getElementById(`subTotal-${indice}`).innerHTML = subTotal;
  calcTotal();
}


function calcEnvio() {
  let total = parseInt(document.getElementById("totalProducts").innerHTML);
  let envio = 0;

  envio = $("input[name='envio']:checked").val();

  /*
  let elementos = document.getElementsByName("envio");
  for (let i = 0; i < elementos.length; i++) {
    if (elementos[i].checked) {
      envio = parseInt(elementos[i].value);
    }
  }
  */

  let porcentaje = (envio / 100);
  let totalEnvio = porcentaje * total;
  let totalConEnvio = total + porcentaje * total;

  document.getElementById("total").innerHTML = totalConEnvio
  document.getElementById("costoenvio").innerHTML = Math.round(totalEnvio);

}



function showAllProducts(array) {
  $('#tabla').empty();
  let contenido = "";
  for (let i = 0; i < array.length; i++) {
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
                  ${(product.unitCost * product.count).toFixed(2)} 
              </td>
              <td>
              <button onclick="borrarProducto(${i})">Borrar</button>
              </td>
          </tr>       
          `;

  }
  $('#tabla').append(contenido);
  calcTotal();
}

function envio(){
  $("input[name='envio']").on('change', function (e) {
    let valorEnvio = $("input[name='envio']:checked").val();

    $('#textoEnvio').empty();
    $('#textoEnvio').append("El costo por el envío será de " + valorEnvio + "%.");
    calcEnvio()
  });
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      //  showProductCart(resultObj.data.articles[0]); 
      showAllProducts(resultObj.data.articles);
    }
  });

  let elementos = document.getElementsByName("envio");
  for (let i = 0; i < elementos.length; i++) {
    elementos[i].addEventListener("change", function () {
      calcTotal();
    });
  }

  envio();





});

$(function () {
  $('form.require-validation').bind('submit', function (e) {
    var $form = $(e.target).closest('form'),
      inputSelector = ['input[type=email]', 'input[type=password]',
        'input[type=text]', 'input[type=file]',
        'textarea'].join(', '),
      $inputs = $form.find('.required').find(inputSelector),
      $errorMessage = $form.find('div.error'),
      valid = true;

    $errorMessage.addClass('hide');
    $('.has-error').removeClass('has-error');
    $inputs.each(function (i, el) {
      var $input = $(el);
      if ($input.val() === '') {
        $input.parent().addClass('has-error');
        $errorMessage.removeClass('hide');
        e.preventDefault(); // cancel on first error
      }
    });
  });
});

$(function () {
  var $form = $("#payment-form");

  $form.on('submit', function (e) {
    if (!$form.data('cc-on-file')) {
      e.preventDefault();
      Stripe.setPublishableKey($form.data('stripe-publishable-key'));
      Stripe.createToken({
        number: $('.card-number').val(),
        cvc: $('.card-cvc').val(),
        exp_month: $('.card-expiry-month').val(),
        exp_year: $('.card-expiry-year').val()
      }, stripeResponseHandler);
    }
  });

  function stripeResponseHandler(status, response) {
    if (response.error) {
      $('.error')
        .removeClass('hide')
        .find('.alert')
        .text(response.error.message);
    } else {
      // token contains id, last4, and card type
      var token = response['id'];
      // insert the token into the form so it gets submitted to the server
      $form.find('input[type=text]').empty();
      $form.append("<input type='hidden' name='reservation[stripe_token]' value='" + token + "'/>");
      $form.get(0).submit();
    }
  }
})

/*function calcSubtotal (costo,i){
    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    subTotal = cantidad*costo;
    document.getElementById(`productSubtotal${i}`).innerHTML= subTotal;
    calcSubtotal();
}*/
