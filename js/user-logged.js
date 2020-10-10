document.addEventListener("DOMContentLoaded", function (e) {

    // EXTRAEMOS LA INFORMACION DEL STORAGE
    let userLogged = localStorage.getItem('user-logged');
    // EXTRAEMOS LOS ELEMENTOS DONDE VAMOS A MOSTRAR LA INFORMACION
    let pUserIdentifier = document.getElementById("user-identifier");

    if (userLogged) { // SI EXISTE LA INFO EN EL STORAGE
        userLogged = JSON.parse(userLogged);
        pUserIdentifier.innerHTML = userLogged.email;
    }

    // CUANDO PRESIONAMOS EL BOTON SALIR 
    document.getElementById("sign-of").addEventListener("click", function (e) {
        // REMOVEMOS LA INFORMACION DEL STORAGE
        localStorage.removeItem('user-logged');
        // REDIRECCIONAMOS AL LOGIN
        window.location = "index.html";
    });
    
});


  

