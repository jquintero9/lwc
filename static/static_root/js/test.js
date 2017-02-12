//Elementos html
var formAgregarPregunta = document.querySelector("#form-agregar-pregunta");
var contenedorTest = document.querySelector("#contenedor-test");
var numeroPreguntas = document.querySelector("#numero-preguntas");
var form = document.querySelector("#form");
var respuesta = document.querySelector("#respuesta");
var numeroPregunta = 1;
var text = null;

var ajax = null;
var OK = 200;
var ON_READY_STATE_COMPLETE = 4;

var contenedoresDraggable = document.querySelectorAll(".contenedor_dragabble");
var contenedoresDrop = document.querySelectorAll(".contenedor_drop");

function getAjax() {
    if(window.XMLHttpRequest) {
        return new XMLHttpRequest();
	}
	else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
    }
}


function respuestaServidor() {
    if(ajax.readyState == ON_READY_STATE_COMPLETE){
        if(ajax.status == OK) {
            jsonResponse = JSON.parse(ajax.responseText);
            if (jsonResponse['peticion'] == "agregar_pregunta") {
                var drop = document.createElement("div");
                var drag = document.createElement("div");
                var draggable = document.createElement("div");
                drag.setAttribute("class", "contenedor_pregunta");
                draggable.setAttribute("class", "contenedor_draggable");
                draggable.innerHTML = "<h3>Mover</h3>";
                draggable.setAttribute("draggable", true);
                drop.setAttribute("class", "contenedor_drop");
                draggable.addEventListener("drag", startDrag);
                drop.addEventListener("drop", drop);
                drop.addEventListener("dropover", cancelarAcciones);
                drag.innerHTML = jsonResponse["pregunta"];
                drop.appendChild(draggable);
                drop.appendChild(drag);
                contenedorTest.appendChild(drop);
            } else if(jsonResponse["peticion"] == "crear_test") {

            }
        }
    }
}


function agregarPregunta(event) {
    event.preventDefault();
    var csrf = formAgregarPregunta["csrfmiddlewaretoken"].value;
    var datos = {"numero_pregunta": numeroPregunta};
    var json = JSON.stringify(datos);
    console.log(json);

    ajax = getAjax();
    ajax.onreadystatechange = respuestaServidor;
    ajax.open("POST", "pregunta/generar", true);
    ajax.setRequestHeader("X-CSRFToken", csrf);
    ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    ajax.send(json)

    inputNumeroPreguntas = "<input type='hidden' name='numero_preguntas' value=" + numeroPregunta + " />";
    numeroPreguntas.innerHTML = inputNumeroPreguntas;
    numeroPregunta++;
    /*
    var div = document.createElement("div");
    var ec = "respuesta_ec" + numeroPregunta;
    var or = "respuesta_or" + numeroPregunta;
    var ca = "respuesta_ca" + numeroPregunta;
    var ea = "respuesta_ea" + numeroPregunta;
    var p = "pregunta" + numeroPregunta;

    pregunta = "<div>#" + numeroPregunta + "</div>";
    pregunta += "Pregunta: <input type='text' name=" + p + " /><br />";
    pregunta += "respuesta ec: <input id='id_respuesta_ac'" + numeroPregunta + "type='text' name=" + ec + " /><br />";
    pregunta += "respuesta or: <input id='id_respuesta_or'" + numeroPregunta + "type='text' name=" + or + " /><br />";
    pregunta += "respuesta ca: <input id='id_respuesta_ca'" + numeroPregunta + "type='text' name=" + ca + " /><br />";
    pregunta += "respuesta ea: <input id='id_respuesta_ea'" + numeroPregunta + "type='text' name=" + ea + " /><br />";
    div.innerHTML = pregunta;
    contenedorTest.appendChild(div);

    numeroPregunta += 1;
    */
}

function enviarTest(event) {
    event.preventDefault();
}

function startDrag(event) {
    console.log("id_drag: " + event.target.id);
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}

function cancelarAcciones(event) {
    event.preventDefault();
}

function init(event) {

    formAgregarPregunta.addEventListener("submit", agregarPregunta)
    //form.addEventListener("submit", enviarTest);

}


window.addEventListener("load", init);