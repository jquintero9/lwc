/* Está función verifica si cuando se carga el docmuento,
 los inputs están llenos, para ubuicar su respectivo label
 en su posición.*/
$(document).ready(function() {
    //Se instancian una lista con todos los inputs del formulario.
    var $inputs = $('.input');

    //Se recooren todos los input para saber si tienen contenido.
    $.each($inputs, function(i) {
        if($(this).val() != "") {
            $(this).siblings('.label-input').addClass('active');
            console.log(i);
        }
    });

    //Esta función realiza la animación sobre los labels.
    $(function() {
        $inputs.on({focus: function() {
            $(this).siblings('.label-input').addClass('active');
        },
        blur: function() {
            if($(this).val() == "")
                $(this).siblings('.label-input').removeClass('active');
        }
        });
    });
});



