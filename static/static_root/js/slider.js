//Módulo Slider, se define en una función auto-ejecutable.
$(function() {
    //Definición del ModuloSlider.
    var ModuloSlider = (function() {
        //Se crea un objeto con todos los atributos del slider.
        var objetoSlider = {
            slider: $('#slider'),
            slides: $('#slider li'),
            controles: $('#controlador-slider li'),
            controlador: $('#controlador-slider'),
            currentSlide: 0,
            nextSlide: 1,
            hiloEjecucion: null
        };
        objetoSlider.cantidadSlides = objetoSlider.slides.length;

        //Se define la función inicializadora.
        objetoSlider.init = function() {
            //Se ejecuta el slider.
            iniciarEjecucion();

            //Se asigna los eventos a los controles del slider.
            $.each(this.controles, function(index) {
                /*Se asigna el evento click a cada control. Cuando se ejecuta el evento
                se guarda el indice del control y se llama a una función que cambiará el slide a dicho indice.*/
                $(this).on('click', function(e) {
                    if(objetoSlider.currentSlide !== index)
                        cambiarSlide(index);
                });
            });
        };

        /* Inicializa el hilo de ejecución, donde se ejecuta la función ejecutarSlider cada 3 segundos. */
        function iniciarEjecucion() {
            objetoSlider.hiloEjecucion = setInterval(ejecutarSlider, 8000);
        }

        /* Actualiza la posición de cada uno de los slides  automaticamente.*/
        function ejecutarSlider() {
            //Se verifica que el siguiente slides no sea mayor a la cantidad de slides.
            if(objetoSlider.nextSlide > objetoSlider.cantidadSlides - 1) {
                objetoSlider.nextSlide = 0;
            }

            //Se ejecuta la animación de los slides.
            animacion(objetoSlider.currentSlide, objetoSlider.nextSlide);

            //Se actualizan los indices
            objetoSlider.currentSlide = objetoSlider.nextSlide;
            objetoSlider.nextSlide += 1;
        }

        /* Se encarga de ocultar el slide actual y de mostrar el slide siguiente.
         También activa el control del slider*/
        function animacion(current, next) {
            objetoSlider.controles.eq(current).removeClass('active');
            objetoSlider.controles.eq(next).addClass('active');
            objetoSlider.slides.eq(current).fadeOut('slow');
            objetoSlider.slides.eq(next).fadeIn('slow');
        }

        /* Muestra el slide que halla seleccionado el usuario. */
        function cambiarSlide(index) {
            //Se limpia el hilo de ejecución actual, para comenzar uno nuevo a partir del slides seleccionado.
            clearInterval(objetoSlider.hiloEjecucion);
            //Se verifica que el indice seleccionado sea un válido dentro de la lista de slides.
            if(index > objetoSlider.cantidadSlides - 1)
                index = 0;

            //Se ejecuta la animación.
            animacion(objetoSlider.currentSlide, index);

            //Se actualiza la nueva posición a partir del slide seleccionado.
            objetoSlider.currentSlide = index;
            objetoSlider.nextSlide = index + 1;

            //Se inicia un nuevo hilo de ejecución.
            iniciarEjecucion();
        }

        return objetoSlider;
    })();

    ModuloSlider.init();
});

/* Esta función asigna verifica los eventos que ocurren por parte del scroll, para determinar si debe cambiar
 el color del header */
$(function() {
    //Se instancian los elementos header y los botones de navegación.
    var header = $('#header');
    var botonesNavegacion = $('#contenedor-header a');
    //Se asigna el evento scroll a la ventana.
    $(window).scroll(function(e) {
        var top = header.offset().top;
        /*Si la posición del scroll supera los 100px entonces
        se cambia el color de todos los elementos que componen el header.*/
        if(top > 100) {
            header.removeClass('header-transparente');
            header.addClass('header-visible');
            botonesNavegacion.removeClass('normal').addClass('scroll');

            //header.css({backgroundColor: '#FFF'});
        }
        /* Si la posición del scroll no supera los 100px entonces
         el fondo del header será transparente.*/
        else if(top < 100) {
            header.removeClass('header-visible');
            header.addClass('header-transparente');
            botonesNavegacion.removeClass('scroll').addClass('normal');
        }
    });
});

/* Esta función se encarga de desplazar al usuario a la posición seleccionada,
 esto se hace mediante una animación de scroll.*/
 $(function() {
    var botones = $('a[href^="#"');
    //var botones = $('a[href="#section-test"');
    botones.on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr("href");
        var offset = $(target).offset().top;
        offset -= 50;
        $('body, html').animate({scrollTop: offset}, 1000);
    });
 });


/* Con esta función se asigna un evento de click al botón menú,
para que menú de navegación aparesca. */
$(function() {
    //Se instancia el elemento sobre el cual se va hacer click.
    var boton = $('#boton-menu span');
    //Se instancia el menú a mostrar.
    var menu = $('#menu-header');
    var activo = false;
    //Se asigna el evento.
    boton.on('click', function(e) {
        if(!activo) {
            menu.slideDown('slow');
            activo = true;
        }
        else {
            menu.slideUp('slow');
            activo = false;
        }
            
    });
});


