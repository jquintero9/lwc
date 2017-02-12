var botonIniciarSesion = document.querySelector("#boton-iniciar-sesion");
var botonRegistrarse = document.querySelector("#boton-registrarse");
var modal = document.querySelector(".modal");
var tituloModalContent = document.querySelector("#titulo-modal-content");
var botonCerrarLogin = document.querySelector("#boton-cerrar-login");
var formIniciarSesion = document.querySelector("#form-iniciar-sesion");
var formRegistrarse = document.querySelector("#form-registrarse");
var modalContent = document.querySelector(".content-modal");

function iniciarSesion() {
    tituloModalContent.innerHTML = "Inicia Sesión";
    modalContent.style.margin = "200px auto";
    formIniciarSesion.style.display = "block";
    modal.style.display = "block";
}

function registrarse() {
    tituloModalContent.innerHTML = "Registrate";
    modalContent.style.margin = "8px auto";
    formRegistrarse.style.display = "block";
    modal.style.display = "block";
}

function cerrarModal() {
    tituloModalContent.innerHTML = "";
    formIniciarSesion.style.display = "none";
    formRegistrarse.style.display = "none";
    modal.style.display = "none";
}

function cargarDocumento() {
    botonIniciarSesion.addEventListener("click", iniciarSesion);
    botonRegistrarse.addEventListener("click", registrarse);
    botonCerrarLogin.addEventListener("click", cerrarModal);
    window.addEventListener("click", function(event) {
       if (event.target == modal) {
           cerrarModal();
       }
    });
}

window.addEventListener("load", cargarDocumento);