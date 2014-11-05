(function ($) {
  $(document).ready(function (){
  //Ready content  	
  });
  Drupal.behaviors.amigo_secreto = {attach: function (context, settings) {
    var json_preguntas = $.parseJSON(settings.amigo_secreto_questions); //
    console.log(json_preguntas);
     /*
     * Llamado a funcion que inicia el juego
     * al momento de hacer click en el boton de empezar
     */
     $('#amigo-secreto-form #edit-empezar').click(function(event) {
       start_game();
       return false;
     });
  }}
  /*Funcion para hacer llamado de limpiador de espacios*/
  function fix_whiteSpaces(){
    $('.view-id-grilla_general_amigo_secreto .view-content').cleanWhitespace();
  }
   /*Funcion para comenzar a Jugar
  * Asigna Jugadores
  */
  function start_game(){
    var num_participantes = $('.view-grilla-general-amigo-secreto .views-row').length;
    var num_random = Math.floor(Math.random() * num_participantes);
    $('.view-grilla-general-amigo-secreto .views-row:eq('+ num_random +') img').clone().appendTo('.user_image');
  }
  /*Función white space*/
  function detach(node){$(node).parent()[0].removeChild(node);return $(node)}function rm_white_spaces_ie(node){var ns=node.contents().filter(function(){return(node.nodeType!=3||/\S/.test(node.nodeValue))});var fns=[];for(var i=0;i<ns.length;i++){var cns=$(ns[i]).contents();for(var j=0;j<cns.length;j++)detach(cns[j]);var s=$.trim(ns[i].outerHTML);$(ns[i]).remove();var n=$(s);for(var j=0;j<cns.length;j++)if(cns[j]!=null){$(cns[j]).appendTo(n)}fns.push(n)}node.empty();for(var i=0;i<fns.length;i++){try{fns[i].appendTo(node)}catch(e){}}}jQuery.fn.cleanWhitespace=function(){if($.browser.msie&&parseInt($.browser.version,10)<=8){$(this).each(function(){rm_white_spaces_ie($(this))})}else{textNodes=this.contents().filter(function(){return(this.nodeType==3&&!/\S/.test(this.nodeValue))}).remove()}}
})(jQuery);


