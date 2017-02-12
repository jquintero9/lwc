//Elementos HTML
var formTipoPregunta = document.querySelector("#form-tipo-pregunta");
var formPregunta = document.querySelector("#form-pregunta");
var contenedorRespuesta = document.querySelector("#contenedor-respuesta");

//Variables para realizar la petición AJAX
var OK = 200;
var ON_READY_STATE_COMPLETE = 4;
var xhr = null;

function getXHR() {
    if(window.XMLHttpRequest) {
        return new XMLHttpRequest();
	}
	else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
}

function respuestaTipoPregunta() {
    if(xhr.readyState == ON_READY_STATE_COMPLETE) {
        if(xhr.status == OK) {
            var respuestaJSON = JSON.parse(xhr.responseText);
            var respuesta = respuestaJSON["respuesta"];
            contenedorRespuesta.innerHTML = respuesta
        }
    }
}

function enviarPeticion(datos, csrfToken) {
    xhr = getXHR()
    xhr.onreadystatechange = respuestaTipoPregunta;
    xhr.open("POST", "", true);
    xhr.setRequestHeader("X-CSRFToken", csrfToken);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send(datos);
}

function enviarTipoPregunta(event) {
    event.preventDefault();
    var form = event.target;
    console.log(form)
    datos = {}
    datos[form['tipo_pregunta'].name] = form['tipo_pregunta'].value
    var json = JSON.stringify(datos)
    console.log(json)
    console.log(form['csrfmiddlewaretoken'])
    enviarPeticion(json, form['csrfmiddlewaretoken'].value)
}

function cargarDocumento(evento) {
    formTipoPregunta.addEventListener("submit", enviarTipoPregunta)
}

window.addEventListener("load", cargarDocumento)