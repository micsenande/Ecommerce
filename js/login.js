document.addEventListener("DOMContentLoaded", function(e){
     document.getElementById("buttonIngresoLogin").addEventListener("click", function (e) {

    let inputEmail = document.getElementById("inputEmailLogin");
    let inputPassword = document.getElementById("inputPasswordLogin");
        
    let camposCompletos = true;
    if (inputEmail.value === '' || inputPassword.value === ''){
        camposCompletos = false;
        alert("Debes ingresar tus datos para continuar.");
    }

        if (camposCompletos) { 
        localStorage.setItem('user-logged', JSON.stringify({ email: inputEmail.value }));
        window.location = 'home.html';
    }

  });

});


