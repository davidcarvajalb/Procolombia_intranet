(function ($) {
  window.globalTurno = "user";
  window.globalControlMachine = "q";
  window.globalSecond = 0;
  window.globalGameFlag = 'start';
  window.globalContadorPreguntas = 0;
  window.globalContadorAdivina = 0;
  window.globalUserControl = 'no-registrado';
  $(document).ready(function (){
  //Ready content
  //Quitamos la clase que hace que se pueda modificar el tamaño de un area de texto
  $('.p-friend .field-name-field-sobre-ti-profile .resizable-textarea').removeClass('resizable-textarea');
  /*ponemos que no se cierre el colorbox si no con el click*/
  $('#cboxOverlay').unbind('click');
  if (globalUserControl != 'registrado') {
    $('.p-friend #quicktabs-quicktab_amigo_secreto .item-list ul.quicktabs-tabs li:eq(2) a').unbind("click");
    $('.p-friend #quicktabs-quicktab_amigo_secreto .item-list ul.quicktabs-tabs li:eq(2) a').click(function(){
      return false;
    });
  }
  /*Des habilitamos los campos de nombre y apellido en la sección de perfil*/
  $('#field-user-firstname-add-more-wrapper input').attr('disabled', true);
  $('#field-user-lastname-add-more-wrapper input').attr('disabled', true);
  $('.p-friend #quicktabs-quicktab_amigo_secreto .item-list ul.quicktabs-tabs li a').click(function(event) {
    var element_index = $(this).parent().index();
    if (element_index == 0) {
      location.hash = 'mecanica';
    }else if (element_index == 1) {
      location.hash = 'perfil';
    }else if (element_index == 2) {
      location.hash = 'nuevapartida';
    };
  });
  var num_participantes_control = $('.view-grilla-general-amigo-secreto .views-row').length;
  if (location.hash == '' || location.hash == '#mecanica') {
    $('.p-friend #quicktabs-quicktab_amigo_secreto .item-list ul.quicktabs-tabs li:eq(0) a').click();
  }else if (location.hash == '#perfil') {
    $('.p-friend #quicktabs-quicktab_amigo_secreto .item-list ul.quicktabs-tabs li:eq(1) a').click();
  }else if (location.hash == '#nuevapartida') {
    if (globalUserControl == 'registrado' && num_participantes_control >= 1) {
      $('.p-friend #quicktabs-quicktab_amigo_secreto .item-list ul.quicktabs-tabs li:eq(2) a').click();
    }
  };
  if (globalUserControl == 'registrado' && num_participantes_control >= 1) {
    $('.p-friend #quicktabs-quicktab_amigo_secreto .item-list ul.quicktabs-tabs li:eq(2) a').click();
  }
  $('.p-friend .ingresar_tabs').click(function(event) {
    $('.p-friend #quicktabs-quicktab_amigo_secreto .item-list ul.quicktabs-tabs li:eq(1) a').click();
  });
  });
  Drupal.behaviors.amigo_secreto = {attach: function (context, settings) {
    /*Llamado a a funcion que inicilaliza la limpieza de espacios en blanco*/
    fix_whiteSpaces();
    /*Fin Llamado a a funcion que inicilaliza la limpieza de espacios en blanco*/
    /*--------*/
    $('.p-friend #user-profile-form .field-type-list-text').each(function(index, el) {
      if ($('.form-item .form-type-radio', this).length > 2) {
        $('.form-item .form-type-radio:eq(0)', this).addClass('p-noshow-radio');
      };
    });
    /*--------*/
    /*Funcion para dejar solo el primer nombre*/
    $('.view-id-grilla_general_amigo_secreto .views-row .views-field-field-user-firstname').each(function(index, el) {
      var nombre_apellido = $('span.field-content', this).text().split(' ')[0];
      var parent = $(this).parent();
      var nombre_apellido = nombre_apellido + ' ' + $('.views-field-field-user-lastname span.field-content', parent).text().split(' ')[0];
      $('span.field-content', this).text(nombre_apellido);
    });
    /*Fin de Funcion para dejar solo el primer nombre*/
    /*--------*/
    /*Funcion para dejar solo el primer apellido*/
    /*$('.view-id-grilla_general_amigo_secreto .views-row .views-field-field-user-lastname').each(function(index, el) {
      $('span.field-content', this).text($('span.field-content', this).text().split(' ')[0]);
    });*/
    /*Fin de Funcion para dejar solo el primer apellido*/
    /*--------*/
    /*Funcion activar o desactivar el over sobre una foto*/
    /*Comentado por nueva funcionalidad*/
    //activarOverlayGrilla();
    /*Fin de Funcion activar o desactivar el over sobre una foto*/
    /*--------*/
    var json_preguntas = $.parseJSON(settings.amigo_secreto_questions);
     /* Llamado a la funcion para crear las preguntas */
    create_questions(json_preguntas);
    /*---------*/
    /*Validación de usuario registrado*/
    var registered_user_control = '';
    registered_user_control = settings.amigo_secreto_registered_user;
    if (registered_user_control == 'registrado') {
      globalUserControl = registered_user_control;
    }
    /*
     * Llamado a funcion que inicia el juego
     * al momento de hacer click en el boton de empezar
     */
     //disableUserButtons(true);
     $('#amigo-secreto-form #edit-empezar').click(function(event) {
      var num_participantes = $('.view-grilla-general-amigo-secreto .views-row').length;
      if (num_participantes > 3) {
        start_game();
      }else{
        $('.system_answer span').empty().text('No se han registrado suficientes participantes para jugar');
      }
       return false;
     });
     /*FUNCIONES CUSTOM*/
    /* Función que crea las preguntas */
    function create_questions(json_preguntas){
      $li = "<li class='field_eres_hombre_profile'>" + json_preguntas.field_eres_hombre_profile + "</li>"+
            "<li class='field_pelo_oscuro'>" + json_preguntas.field_pelo_oscuro + "</li>"+
            "<li class='field_piel_clara_profile'>" + json_preguntas.field_piel_clara_profile + "</li>"+
            "<li class='field_gafas_profile'>" + json_preguntas.field_gafas_profile + "</li>"+
            "<li class='field_pelo_largo_profile'>" + json_preguntas.field_pelo_largo_profile + "</li>"+
            "<li class='field_barba_profile'>" + json_preguntas.field_barba_profile + "</li>"+
            "<li class='field_ojos_claros_profile'>" + json_preguntas.field_ojos_claros_profile + "</li>"+
            "<li class='field_mayor_treinta_profile'>" + json_preguntas.field_mayor_treinta_profile + "</li>";
      $('.user_questions ul').append($li);
    }
    /*Comentado por nueva funcionalidad*/
    /* Funcion que crear las soluciones */
    /*function create_solves(){
      $('.view-id-grilla_general_amigo_secreto .views-row').each(function(){
        var name = $('.views-field-field-user-firstname span', this).text();
        var id = $('.views-field-uid .p-user-friend-id', this).text();
        $element = "<li><a href=" + id + ">" + name + "</a></li>";
        $('.user_resolve ul').append($element);
      });
    }*/
    /* Funcion que cuenta 30 segundos */
    var second = 0;
    /*function counter() {
      if (globalGameFlag == 'start'){
        if(globalSecond == 31) {
          globalSecond = 0;
          cambioTurno();
        } else {
          $('.user_timer').empty().append('<span>Tiempo: </span>'+globalSecond++);
        }
      }
    }*/
     /*Funcion para comenzar a Jugar
    * Asigna Jugadores
    */
    function start_game(){
      cargarParticipantes();
      /* Llamado a la funcion para crear las soluciones */
      /*Comentado por nueva funcionalidad*/
      //disableUserButtons(false);
      if (globalGameFlag == 'start') {
        doQuestions();
      }else{
        globalGameFlag = 'start';
      }
      /*comentado camilo ultimo
      $('.system_answer span').empty().text('HAZ CLIC SOBRE LA FOTO DE QUIEN CREES ES TU AMIGO SECRETO.');
      $('.user_answer').removeClass('p-active');
      $('.machine_answer').removeClass('p-active');
      /*Comentado por nueva funcionalidad*/
      //$('.system_answer').text('ES TU TURNO');
      /*comentado camilo ultimo
      $('.machine_image').removeClass('p-fake-image');
      $('.machine_image').empty().append('<span>Tu Amigo</span>');
        var num_participantes = $('.view-grilla-general-amigo-secreto .views-row').length;
        /*Comentado por nueva funcionalidad*/
        //var num_random_user = Math.floor(Math.random() * num_participantes);
        //$('.view-grilla-general-amigo-secreto .views-row:eq('+ num_random_user +') img').clone().appendTo('.user_image');
        //$('.view-grilla-general-amigo-secreto .views-row:eq('+ num_random_user +') .p-user-friend-id').clone().appendTo('.user_image');
        //var user_gamer_id = $('.view-grilla-general-amigo-secreto .views-row:eq('+ num_random_user +') .p-user-friend-id').text();
        /*Comentado por nueva funcionalidad*/
        //do{
          /*comentado camilo ultimo
        var num_random_machine = Math.floor(Math.random() * num_participantes);
        //}
        //while (num_random_user == num_random_machine);
        window.setTimeout(function(){
          $('.view-grilla-general-amigo-secreto .views-row:eq('+ num_random_machine +') img').clone().appendTo('.machine_image');
          $('.view-grilla-general-amigo-secreto .views-row:eq('+ num_random_machine +') .p-user-friend-id').clone().appendTo('.machine_image');
          var machine_gamer_id = $('.view-grilla-general-amigo-secreto .views-row:eq('+ num_random_machine +') .p-user-friend-id').text();
          $('#amigo-secreto-form #edit-empezar').addClass('p-no-show');
          /*Registro de usuarios asignados*/
          /*comentado camilo ultimo
          $('.machine_answer').load('/amigo-secreto-register-gamers?machine_gamer_id='+machine_gamer_id,function() {
            /*Comentado por nueva funcionalidad*/
            //$('.user_timer').toggleClass('p-active-time');
            /*if (globalSecond != 0) {
              globalSecond = 0;
            }else{
              startCounter();
            }*/
            //globalTurno = 'user';
            /*comentado camilo ultimo
            if (status != "error") {
              _amigo_secreto_create_machine_answer();
            };
          });
        },800);*/

    }
    /*
     * Función que maneja las preguntas del usuario
     */
    function doQuestions(){
      /*Comentado por nueva funcionalidad*/
      /*$('#edit-pregunta').click(function(event) {
        $('.user_questions').addClass('p-active');
        $('.user_resolve').removeClass('p-active');
        return false;
      });*/
      /*Comentado por nueva funcionalidad*/
      /*$('#edit-resolver').click(function(event) {
        $('.user_resolve').addClass('p-active');
        $('.user_questions').removeClass('p-active');
        $('.user_answer').removeClass('p-active');
        $('.machine_answer').removeClass('p-active');
        $('.system_answer').text('');
        return false;
      });*/
      if( $.browser.msie ) {
        jQuery(document).delegate('.user_questions li:not(.p-user-clic)', 'click', function(event) {
          /*Comentado por nueva funcionalidad*/
          //disableUserButtons(true);
          globalContadorPreguntas = globalContadorPreguntas+1;
          //console.log(globalContadorPreguntas);
          var question_id = $(this).attr('class');
          var question = $(this).text();
          question_id = question_id.split(' ')[0];
          $(this).addClass('question-inactive');
          $('.user_questions').removeClass('p-active');
          $('.p-grilla-title').empty().text('TU AMIGO SECRETO ESTÁ RESPONDIENDO');
          $('.user_answer').addClass('p-active');
          $('.user_answer').empty().append('<span>' + question + '</span>');
          window.setTimeout(function(){
            $('.machine_answer').load('/amigo-secreto/do-question?question_id='+question_id+'&user=user',function() {
              /*Mensajes*/
              $('.machine_answer').toggleClass('p-active');
              /*Comentado por nueva funcionalidad*/
              /*window.setTimeout(function(){
                cambioTurno();
              },20000);*/
              if ( status != "error" ){
                $.ajax({
                  url: '/amigo-secreto/discard-users',
                  //type: 'default GET (Other values: POST)',
                  dataType: 'json',
                  data: {question_id: question_id},
                  success: function(data){
                    $.each(data, function(index, val) {
                       $('#block-amigo-secreto-amigo-secreto-game .content .p-view-gamers .views-row').each(function(){
                        if (val == $('.views-field-uid .p-user-friend-id', this).text()) {
                          $(this).addClass('p-descartado');
                        };
                      });
                    });
                  }
                });
              }
            });
          }, 3000);
          window.setTimeout(function(){
            $('.machine_answer').removeClass('p-active');
            $('.user_answer').removeClass('p-active');
            $('.system_next_question').addClass('p-active');
            if( globalContadorPreguntas >= 3 ) {
              //console.log('entro 3 intento')
              $('.system_adivina').addClass('p-active');
              $('.system_next_question').css('left', '312px');
              $('.p-grilla-title').empty().text('¿YA CREES SABER QUIÉN ES TU AMIGO SECRETO? HAZ CLIC EN ADIVINAR O EN SIGUIENTE PREGUNTA');
            } else {
              $('.p-grilla-title').empty().text('¿YA CREES SABER QUIÉN ES TU AMIGO SECRETO? DA CLIC EN SIGUIENTE PREGUNTA Y ACUMULA MÁS PISTAS');
            }
            if( globalContadorPreguntas == 5 ) {
              $('.system_next_question').removeClass('p-active');
              $('.system_adivina').addClass('p-active');
              $('.system_adivina').css('left', '232px');
              $('.p-grilla-title').empty().text('YA AGOTASTE TUS 5 OPORTUNIDADES DEBES ARRIESGARTE Y ADIVINAR QUIÉN ES TU AMIGO SECRETO HACIENDO CLIC EN ADIVINAR');
            }
          }, 8000);
          $(this).unbind("click");
          $(this).addClass('p-user-clic');
            //$('.machine_answer').text('Turno del Usuario');
        });
        $('.system_next_question').click(function(event) {
          /* Act on the event */
          $(this).removeClass('p-active');
          $('.p-grilla-title').empty().text('DA CLIC SOBRE LA PREGUNTA QUE QUIERES HACERLE A TU AMIGO SECRETO, ASÍ EMPEZARÁS A DESCARTAR OPCIONES');
          $('.user_questions').addClass('p-active');
          if( globalContadorPreguntas >= 3 ) {
            $('.system_adivina').removeClass('p-active');
          }
        });
        $('.system_adivina').click(function(event) {
          /* Act on the event */
          $(this).removeClass('p-active');
          $('.system_next_question').removeClass('p-active');
          $('.p-grilla-title').empty().text('¿YA SABES QUIÉN ES TU AMIGO SECRETO?');
          $('.system_answer').addClass('p-active');
          $('#block-amigo-secreto-amigo-secreto-game .content .p-view-gamers').addClass('p-views-clickeable');
          $('#block-amigo-secreto-amigo-secreto-game .content .p-view-gamers.p-views-clickeable .views-row:not(.p-descartado)').click(function(event) {
            /* Act on the event */
            var user_adivinar_id = $('.views-field-uid .p-user-friend-id', this).text();
            if (user_adivinar_id == $('.machine_image .p-user-friend-id').text()){
              $(this).addClass('p-adivino');
              $('.system_answer.p-active span').text('¡FELICITACIONES! HAS ADIVINADO.');
              $('#p-machine-solution .p-header-machine-solution .p-status-ans').text('¡FELICITACIONES! ADIVINASTE SOY ')
              $('.colorbox-a-wrapper a.colorbox-inline').click();
              $('#block-amigo-secreto-amigo-secreto-game .content .p-view-gamers').removeClass('p-views-clickeable');
            }else{
              $(this).addClass('p-no-adivino');
              if (globalContadorPreguntas == 5 || globalContadorAdivina == 3) {
                $('.system_answer.p-active span').text('¡LO SENTIMOS! NO HAS ADIVINADO.');
                $('#p-machine-solution .p-header-machine-solution .p-status-ans').text('NO ADIVINASTE! SOY ')
                $('.colorbox-a-wrapper a.colorbox-inline').click();
                $('#block-amigo-secreto-amigo-secreto-game .content .p-view-gamers').removeClass('p-views-clickeable');
              }else{
                //var intentos_rest = 5 - globalContadorPreguntas;
                var intentos_rest = 2 - globalContadorAdivina;
                if (globalContadorAdivina==2) {
                  intentos_rest = 1;
                };
                $('.system_answer.p-active span').text('NO HAS ADIVINADO. TE QUEDAN ' + intentos_rest + ' INTENTOS');
                $('#block-amigo-secreto-amigo-secreto-game .content .p-view-gamers').removeClass('p-views-clickeable');
                window.setTimeout(function(){
                  $('.system_next_question').addClass('p-active');
                  $('.system_adivina').addClass('p-active');
                  //$('.system_answer.p-active span').text('');
                  $('.system_answer.p-active').removeClass('p-active');
                }, 3000);
                globalContadorAdivina = globalContadorAdivina + 1;
              }
            }
          });
        });
      } else {
        $('.user_questions li:not(.p-user-clic)').click(function(event) {
          /*Comentado por nueva funcionalidad*/
          //disableUserButtons(true);
          globalContadorPreguntas = globalContadorPreguntas+1;
          //console.log(globalContadorPreguntas);
          var question_id = $(this).attr('class');
          var question = $(this).text();
          question_id = question_id.split(' ')[0];
          $(this).addClass('question-inactive');
          $('.user_questions').removeClass('p-active');
          $('.p-grilla-title').empty().text('TU AMIGO SECRETO ESTÁ RESPONDIENDO');
          $('.user_answer').addClass('p-active');
          $('.user_answer').empty().append('<span>' + question + '</span>');
          window.setTimeout(function(){
            $('.machine_answer').load('/amigo-secreto/do-question?question_id='+question_id+'&user=user',function() {
              /*Mensajes*/
              $('.machine_answer').toggleClass('p-active');
              /*Comentado por nueva funcionalidad*/
              /*window.setTimeout(function(){
                cambioTurno();
              },20000);*/
              if ( status != "error" ){
                $.ajax({
                  url: '/amigo-secreto/discard-users',
                  //type: 'default GET (Other values: POST)',
                  dataType: 'json',
                  data: {question_id: question_id},
                  success: function(data){
                    $.each(data, function(index, val) {
                       $('#block-amigo-secreto-amigo-secreto-game .content .p-view-gamers .views-row').each(function(){
                        if (val == $('.views-field-uid .p-user-friend-id', this).text()) {
                          $(this).addClass('p-descartado');
                        };
                      });
                    });
                  }
                });
              }
            });
          }, 3000);
          window.setTimeout(function(){
            $('.machine_answer').removeClass('p-active');
            $('.user_answer').removeClass('p-active');
            $('.system_next_question').addClass('p-active');
            if( globalContadorPreguntas >= 3 ) {
              //console.log('entro 3 intento')
              $('.system_adivina').addClass('p-active');
              $('.system_next_question').css('left', '312px');
              $('.p-grilla-title').empty().text('¿YA CREES SABER QUIÉN ES TU AMIGO SECRETO? HAZ CLIC EN ADIVINAR O EN SIGUIENTE PREGUNTA');
            } else {
              $('.p-grilla-title').empty().text('¿YA CREES SABER QUIÉN ES TU AMIGO SECRETO? DA CLIC EN SIGUIENTE PREGUNTA Y ACUMULA MÁS PISTAS');
            }
            if( globalContadorPreguntas == 5 ) {
              $('.system_next_question').removeClass('p-active');
              $('.system_adivina').addClass('p-active');
              $('.system_adivina').css('left', '232px');
              $('.p-grilla-title').empty().text('YA AGOTASTE TUS 5 OPORTUNIDADES DEBES ARRIESGARTE Y ADIVINAR QUIÉN ES TU AMIGO SECRETO HACIENDO CLIC EN ADIVINAR');
            }
          }, 8000);
          $(this).unbind("click");
          $(this).addClass('p-user-clic');
            //$('.machine_answer').text('Turno del Usuario');
        });
        $('.system_next_question').click(function(event) {
          /* Act on the event */
          $(this).removeClass('p-active');
          $('.p-grilla-title').empty().text('DA CLIC SOBRE LA PREGUNTA QUE QUIERES HACERLE A TU AMIGO SECRETO, ASÍ EMPEZARÁS A DESCARTAR OPCIONES');
          $('.user_questions').addClass('p-active');
          if( globalContadorPreguntas >= 3 ) {
            $('.system_adivina').removeClass('p-active');
          }
        });
        $('.system_adivina').click(function(event) {
          /* Act on the event */
          $(this).removeClass('p-active');
          $('.system_next_question').removeClass('p-active');
          $('.p-grilla-title').empty().text('¿YA SABES QUIÉN ES TU AMIGO SECRETO?');
          $('.system_answer').addClass('p-active');
          $('#block-amigo-secreto-amigo-secreto-game .content .p-view-gamers').addClass('p-views-clickeable');
          $('#block-amigo-secreto-amigo-secreto-game .content .p-view-gamers.p-views-clickeable .views-row:not(.p-descartado)').click(function(event) {
            /* Act on the event */
            var user_adivinar_id = $('.views-field-uid .p-user-friend-id', this).text();
            if (user_adivinar_id == $('.machine_image .p-user-friend-id').text()){
              $(this).addClass('p-adivino');
              $('.system_answer.p-active span').text('¡FELICITACIONES! HAS ADIVINADO.');
              $('#p-machine-solution .p-header-machine-solution .p-status-ans').text('¡FELICITACIONES! ADIVINASTE SOY ')
              $('.colorbox-a-wrapper a.colorbox-inline').click();
              $('#block-amigo-secreto-amigo-secreto-game .content .p-view-gamers').removeClass('p-views-clickeable');
            }else{
              $(this).addClass('p-no-adivino');
              if (globalContadorPreguntas == 5 || globalContadorAdivina == 3) {
                $('.system_answer.p-active span').text('¡LO SENTIMOS! NO HAS ADIVINADO.');
                $('#p-machine-solution .p-header-machine-solution .p-status-ans').text('NO ADIVINASTE! SOY ')
                $('.colorbox-a-wrapper a.colorbox-inline').click();
                $('#block-amigo-secreto-amigo-secreto-game .content .p-view-gamers').removeClass('p-views-clickeable');
              }else{
                //var intentos_rest = 5 - globalContadorPreguntas;
                var intentos_rest = 2 - globalContadorAdivina;
                if (globalContadorAdivina==2) {
                  intentos_rest = 1;
                };
                $('.system_answer.p-active span').text('NO HAS ADIVINADO. TE QUEDAN ' + intentos_rest + ' INTENTOS');
                $('#block-amigo-secreto-amigo-secreto-game .content .p-view-gamers').removeClass('p-views-clickeable');
                window.setTimeout(function(){
                  $('.system_next_question').addClass('p-active');
                  $('.system_adivina').addClass('p-active');
                  //$('.system_answer.p-active span').text('');
                  $('.system_answer.p-active').removeClass('p-active');
                }, 3000);
                globalContadorAdivina = globalContadorAdivina + 1;
              }
            }
          });
        });
      }
    }
    /*Comentado por nueva funcionalidad*/
    /*
    * Función que da respuesta si se soluciona
    */
    /*function doSolve(){
      $('.user_resolve li a').click(function(event) {
        var user_id = $(this).attr('href');
        $('.system_answer').load('/amigo-secreto/solve-game?user_id='+user_id+'&quien_adivina=user',function() {
          disableUserButtons(true);
          $('.user_answer').removeClass('p-active');
          $('.user_answer').text('');
          $('.machine_answer').removeClass('p-active');
          $('.machine_answer').text();
          $('.system_answer').text();
          $('.user_resolve').removeClass('p-active');
          $('.user_questions').removeClass('p-active');
          globalGameFlag = 'stop';
          $('.machine_image').toggleClass('p-fake-image');
          $('.user_timer').toggleClass('p-active-time');
          $('#amigo-secreto-form #edit-empezar').toggleClass('p-no-show');
        });
        return false;
      });
    }*/
    /*
    * Función que carga nuevos usuarios en la grilla para iniciar el juego
    */
    function cargarParticipantes(){
      $('#block-amigo-secreto-amigo-secreto-game .content .p-view-gamers').load('/amigo-secreto/carga-participante',function(  response, status, xhr) {
        /*Comentado por nueva funcionalidad*/
        //create_solves();
        //doSolve();
        /*if( !$.browser.msie && !$.browser.version == 8) {
          activarOverlayGrilla();
        }*/
        if ( status != "error" ) {
          $('.p-grilla-title').empty().text('DA CLIC SOBRE LA PREGUNTA QUE QUIERES HACERLE A TU AMIGO SECRETO, ASÍ EMPEZARÁS A DESCARTAR OPCIONES');
          $('.p-grilla-title').toggleClass('long-text');;
          /*Mostramos las preguntas*/
          $('.user_questions').addClass('p-active');
          registrar_usuarios_opciones();
          registrar_rival_last();
        }
        fix_whiteSpaces();
        return true;
      });
      $('.user_questions li').removeClass('p-user-clic');
      //$('.user_questions li').removeClass('p-machine-clic');
      //disableUserButtons(false);
    }
    /*
    *Funcion para registrar el rival
    */
    function registrar_rival_last(){
      $('.system_answer span').empty().text('HAZ CLIC SOBRE LA FOTO DE QUIEN CREES ES TU AMIGO SECRETO.');
      $('.user_answer').removeClass('p-active');
      $('.machine_answer').removeClass('p-active');
      /*Comentado por nueva funcionalidad*/
      //$('.system_answer').text('ES TU TURNO');
      $('.machine_image').removeClass('p-fake-image');
      $('.machine_image').empty().append('<span>Tu Amigo</span>');
        var num_participantes = $('.view-grilla-general-amigo-secreto .views-row').length;
        /*Comentado por nueva funcionalidad*/
        //var num_random_user = Math.floor(Math.random() * num_participantes);
        //$('.view-grilla-general-amigo-secreto .views-row:eq('+ num_random_user +') img').clone().appendTo('.user_image');
        //$('.view-grilla-general-amigo-secreto .views-row:eq('+ num_random_user +') .p-user-friend-id').clone().appendTo('.user_image');
        //var user_gamer_id = $('.view-grilla-general-amigo-secreto .views-row:eq('+ num_random_user +') .p-user-friend-id').text();
        /*Comentado por nueva funcionalidad*/
        //do{
        var num_random_machine = Math.floor(Math.random() * num_participantes);
        //}
        //while (num_random_user == num_random_machine);
        $('.view-grilla-general-amigo-secreto .views-row:eq('+ num_random_machine +') img').clone().appendTo('.machine_image');
        $('.view-grilla-general-amigo-secreto .views-row:eq('+ num_random_machine +') .p-user-friend-id').clone().appendTo('.machine_image');
        var machine_gamer_id = $('.view-grilla-general-amigo-secreto .views-row:eq('+ num_random_machine +') .p-user-friend-id').text();
        $('#amigo-secreto-form #edit-empezar').addClass('p-no-show');
        /*Registro de usuarios asignados*/
        $('.machine_answer').load('/amigo-secreto-register-gamers?machine_gamer_id='+machine_gamer_id,function() {
          /*Comentado por nueva funcionalidad*/
          //$('.user_timer').toggleClass('p-active-time');
          /*if (globalSecond != 0) {
            globalSecond = 0;
          }else{
            startCounter();
          }*/
          //globalTurno = 'user';
          if (status != "error") {
            _amigo_secreto_create_machine_answer();
          };
        });
    }
    /*
    * Funcion para guardar los usuarios de la partida
    */
    function registrar_usuarios_opciones(){
      var user_options = [];
      $('#block-amigo-secreto-amigo-secreto-game .content .p-view-gamers .views-row').each(function(){
        user_options.push($('.views-field-uid .p-user-friend-id', this).text());
      });
      $.ajax({
        url: '/amigo-secreto/register-game-options',
        type: 'POST',
        //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
        data: {game_options: user_options},
      });
    }
    /*
    * Funcion para cargar los datos de solucion al usuario
    */
    function _amigo_secreto_create_machine_answer(){
      $('.system_p_solution').load('/amigo-secreto/create-p-solution',function() {
        /* Act on the event */
      });
    }
    /*Comentado por nueva funcionalidad*/
    /*Funcion para activar el overlay de las imagenes*/
    /*function activarOverlayGrilla(){
      if( $.browser.msie && $.browser.version == 8 ) {
        jQuery(document).delegate('.p-friend .view-id-grilla_general_amigo_secreto .views-row', 'click', function(event){
          var parent = jQuery(this).parent();
          jQuery(this).toggleClass('p-overlay-active');
        });
      } else {
        $(document).delegate('.p-friend .view-id-grilla_general_amigo_secreto .views-row', 'click',function(event) {
          var parent = $(this).parent();
          $(this).toggleClass('p-overlay-active');
        });
      }
    }*/
    /*Comentado por nueva funcionalidad*/
    /*Función que inicializa el temporizador*/
    /*function startCounter(){
      if (globalGameFlag == 'start') {
        globalSecond = 0;
        var interval = setInterval( function() {
          counter();
        }, 1000 );
      }
    }*/
    /*Comentado por nueva funcionalidad*/
    /*Función para cambiar de turno*/
    /*function cambioTurno(){
      globalSecond = 0;
      if (globalTurno == 'user') {
        disableUserButtons(true);
        globalTurno = 'machine';
        $('.user_answer').toggleClass('p-active');
        $('.machine_answer').removeClass('p-active');
        $('.user_resolve').removeClass('p-active');
        $('.user_questions').removeClass('p-active');
        $('.system_answer').text('ES EL TURNO DE TU RIVAL');
        turnoMaquina();
      }else{
        globalTurno = 'user';
        disableUserButtons(false);
        $('.system_answer').text('ES TU TURNO');
      }
    }*/
    /*Comentado por nueva funcionalidad*/
    /*
    * Función para realizar las jugadas de la maquina
    */
    /*function turnoMaquina(){
      if (globalControlMachine == 'q') {
        var num_questions = $('.user_questions li:not(.p-machine-clic)').length;
        if (num_questions == 0) {
          $('.system_answer').load('/amigo-secreto/not-solve-game',function() {
            disableUserButtons(true);
            $('.user_answer').removeClass('p-active');
            $('.user_answer').text('');
            $('.machine_answer').removeClass('p-active');
            $('.machine_answer').text('');
            $('.user_resolve').removeClass('p-active');
            $('.user_questions').removeClass('p-active');
            globalGameFlag = 'stop';
            $('.machine_image').toggleClass('p-fake-image');
            $('.user_timer').toggleClass('p-active-time');
            $('#amigo-secreto-form #edit-empezar').toggleClass('p-no-show');
          });
          return false;
        }else{
          var num_choosen_question = Math.floor(Math.random() * num_questions);
          var question_text = $('.user_questions li:eq('+num_choosen_question+'):not(.p-machine-clic)').text();
          var question_id = $('.user_questions li:eq('+num_choosen_question+'):not(.p-machine-clic)').attr('class');
          //var question_id = $('.user_questions li:eq(0):not(.p-machine-clic)').attr('class');
          question_id = question_id.split(' ')[0];
          $('.system_answer').text(question_text);
          $('.user_answer').load('/amigo-secreto/do-question?question_id='+question_id+'&user=machine',function() {
            window.setTimeout(function(){
              cambioTurno();
            },20000);
          });
          $('.user_questions li:eq('+num_choosen_question+'):not(.p-machine-clic)').addClass('p-machine-clic');
          //$('.user_questions li:eq(0):not(.p-machine-clic)').addClass('p-machine-clic');
        }
      };
    }*/
    /*Comentado por nueva funcionalidad*/
    /*Función que deshabilita los botones de Usuario*/
    /*function disableUserButtons(opt){
      $('#edit-pregunta, #edit-resolver').attr('disabled', opt);
    }*/
  }}
  /*Funcion para hacer llamado de limpiador de espacios*/
  function fix_whiteSpaces(){
    $('.view-id-grilla_general_amigo_secreto .view-content').cleanWhitespace();
    $('.user_questions ul').cleanWhitespace();
  }
  /*Función white space*/
  function detach(node){$(node).parent()[0].removeChild(node);return $(node)}function rm_white_spaces_ie(node){var ns=node.contents().filter(function(){return(node.nodeType!=3||/\S/.test(node.nodeValue))});var fns=[];for(var i=0;i<ns.length;i++){var cns=$(ns[i]).contents();for(var j=0;j<cns.length;j++)detach(cns[j]);var s=$.trim(ns[i].outerHTML);$(ns[i]).remove();var n=$(s);for(var j=0;j<cns.length;j++)if(cns[j]!=null){$(cns[j]).appendTo(n)}fns.push(n)}node.empty();for(var i=0;i<fns.length;i++){try{fns[i].appendTo(node)}catch(e){}}}jQuery.fn.cleanWhitespace=function(){if($.browser.msie&&parseInt($.browser.version,10)<=8){$(this).each(function(){rm_white_spaces_ie($(this))})}else{textNodes=this.contents().filter(function(){return(this.nodeType==3&&!/\S/.test(this.nodeValue))}).remove()}}
})(jQuery);


