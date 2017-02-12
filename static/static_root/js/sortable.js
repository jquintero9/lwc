
    
    function getInput(label, type, name, placeholder) {
        //Se definen los id's
        var idInput = "id_" + name;
        var idLabel = "label_" + name;
        
        //Se crea el elemento label.
        var $label = $('<label></label>', {for: idLabel, id: idLabel}).html('<b>' + label + '</b>');
        $label.hide();
        var $contenedorLabel = $('<div></div>').append($label);
        
        //Se crea el contenedor input.
        var $input = $('<input />', {id: idInput, type: type, name: name, class: 'input', placeholder: placeholder});
        //Se agregan eventos al input.
        $input.on(
            {focus: function(e) {
                $label.fadeIn();
            },
            blur: function(e) {
                //console.log(e.target);
                var content = e.target.value;
                //console.log(content);
                if(content == "")
                    $label.fadeOut();
            }}
        );
        
        //Se agrega el input al contenedor input.
        var $contenedorInput = $('<div></div>', {class: 'contenedor_input'});
        $contenedorInput.append($contenedorLabel, $input);
        
        return $contenedorInput;
    }
    
    function agregarPregunta() {
        var $contenedor = $('<div></div>', {class: 'contenedor_pregunta'});
        $contenedor.hide().fadeIn();
        $contenedorPreguntas.append($contenedor);
        var indice = $contenedor.index() + 1;
        var labels = ['Pregunta: ', 'Respuesta EC: ', 'Respuesta OR: ', 'Respuesta CA: ', 'Respuesta EA: '];
        var names = ['pregunta' + indice, 'respuesta_ec' + indice, 'respuesta_or' + indice, 'respuesta_ca' + indice, 'respuesta_ea' + indice];
        var placeholder = ['Pregunta', 'Respuesta EC', 'Respuesta OR', 'Respuesta CA', 'Respuesta EA']; 
        var $numero = $('<div></div>', {class: 'numero'});
        $numero.html("<span>" + indice + "</span>");
        $contenedor.append($numero);
        var i = 0;
        for(i; i < labels.length; i++) {
            $contenedor.append(getInput(labels[i], 'text', names[i], placeholder[i]));
        }
        
        $('#numero-preguntas').attr('value', indice);
        
    }
    
    $('#boton-agregar').on('click', agregarPregunta);
    var $contenedorPreguntas = $('#preguntas');
    $contenedorPreguntas.sortable(
        {
            update: function(event, ui) {
                //console.log(ui.item[0]);
                //console.log('ui index: ' + ui.item.index());
                
                $preguntas = $('.contenedor_pregunta');
                $.each($preguntas, function(i) {
                    //Se modifica el índice de cada pregunta según la posición en que halla quedado.
                    var indice = $(this).index() + 1;
                    //console.log(this.children);
                    this.children[0].innerHTML = '<span>'  + indice + '</span>';
                    
                });
                
                //Se obtienen todos los elementos de la clase input.
                $inputs = $('.input');
                //Se modifica el atributo name de cada input.
                $.each($inputs, function(i) {
                    //Se obtiene el contenedor pregunta para saber cual es su indice.
                    var $parent = $(this).parent().parent();
                    var indice = $parent.index() + 1;
                    
                    //Se obtiene el valor actual del atributo name.
                    var nameActual = $(this).attr('name');
                    //Se obtiene una copia del valor, pero sin el último caracter y se le concatena el indice actual del contenedor pregunta.
                    var nameNuevo = nameActual.substring(0, nameActual.length - 1) + indice;
                    //Se modifica el valor del atributo name, con el nuevo valor.
                    $(this).attr('name', nameNuevo);
                });
            },
            items: '.contenedor_pregunta',
            //placeholder: 'sortable-placeholder', 
            opacity: 0.5,
            //helper: 'clone',
            //cursorAt: { top: 10 },
            //containment: "parent",
        }
    ).disableSelection();

    //$contenedorPreguntas.on('stop', function(event, ui) {});
    
    
    
    //$contenedorPreguntas.sortable().disableSelection();
    



