(function ($, Drupal) {
  Drupal.behaviors.intranet_links = {
    attach: function(context, settings) {
     $('#zf-reveal-1').bind('opened', function() {
        accesos_directos_row_clases();
        $('#edit-herramientas input[type=checkbox]').on('change', function (e) {
          $(this).parent().parent().toggleClass('active');
          if ($('input[type=checkbox]:checked').length >= 7) {
            $(this).prop('checked', false);
            alert("Solo puedes seleccinar como maximo 6 accesos directos");
            $(this).parent().parent().removeClass('active');
          }
        });
      });
    }
  };
  jQuery.fn.your_custom_js = function () {
    $('#zf-reveal-1').foundation('reveal', 'close');
    location.reload();
  };

  function accesos_directos_row_clases(){
    //Funcion para agregar las clases de los bordes para saber que elemento es el primero y el utlimo de cada fila
    var nombre_de_la_clase = 'initial-row';
    var ancho_del_contenedor = $('#intranet-shortcuts-wizard-form .fieldset-wrapper').width();
    var cantidad_elementos = $('#intranet-shortcuts-wizard-form .fieldset-wrapper .shortcut-element').length;
    var ancho_del_elemento = $('#intranet-shortcuts-wizard-form .fieldset-wrapper .shortcut-element').width();
    var cantidad_columnas = parseInt(ancho_del_contenedor/ancho_del_elemento);
    var cantidad_filas = parseInt(cantidad_elementos/cantidad_columnas);
    $('#intranet-shortcuts-wizard-form .fieldset-wrapper .shortcut-element:first').addClass('first');
    $('#intranet-shortcuts-wizard-form .fieldset-wrapper .shortcut-element:last').addClass('last');
    var elemento_final_esquina = ($('#intranet-shortcuts-wizard-form .fieldset-wrapper .shortcut-element:last').index() + 1) % cantidad_columnas;
    console.log(elemento_final_esquina);
    if (elemento_final_esquina > 0) {
      $('#intranet-shortcuts-wizard-form .fieldset-wrapper .shortcut-element:last').addClass('final-row');
    };
    var elemento_a_agregar_clase = 0;
    for (var i = 0; i < cantidad_filas; i++) {
      elemento_a_agregar_clase = elemento_a_agregar_clase + cantidad_columnas;
      $('#intranet-shortcuts-wizard-form .fieldset-wrapper .shortcut-element:eq(' + elemento_a_agregar_clase + ')').addClass(nombre_de_la_clase);
    };
  }
})(jQuery, Drupal);
