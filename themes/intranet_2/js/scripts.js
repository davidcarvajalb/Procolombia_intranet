(function ($, Drupal) {
  Drupal.behaviors.intranet_2= {
    attach: function(context, settings) {
      $('.nid-7436 *').click(function(){
        var href = '/blog';
        window.location.href = href;
        return false;
      });      
      cross_browsing();
      clean_whitespaces();
      actualidad_wall();
      theme_breadcrum();
      noticias(); 
      interna();
      comentarios_interna();
      birthday_links();
      resize();
      block_link();
      user_on_header();
      formulario_buzon();
      accesos_directos();
      herramientas();
      date_home();
      trivia();
      lo_mas_popular();
      buscador_theme();      
      preload();
    }
  };
  Drupal.behaviors.clickableRowsOnViews = {
    attach: function() {
      jQuery('.clickable-row.views-row').each(function() {
        if (jQuery(this).find('a').length) {
          jQuery(this).click(function() {
            window.location = jQuery(this).find('a').attr('href');
            return false;
          });
        }
      });
    }
  }
  function trivia(){
    $('.page-node-quiz-results .main > div').each(function(){
      var cantidad_hijos = $('>*',this).size();
      if (cantidad_hijos == 0) {
        $(this).addClass('empty');
      };
    })
    $($('.should').parent().parent()).addClass('should-question');
    $($('.correct').parent().parent()).addClass('correct-question');
    if($('.dd .should').size()){
      $('body').addClass('question-wrong');
      trivia_div();
    }
    if ($('.dd .correct').size()) {
      $('body').addClass('question-good');
      trivia_div();
    };
  }
  function trivia_div(){
      var quiz_form = $('#quiz-report-form');
      var height_papa = quiz_form.outerHeight();
      quiz_form.prepend('<div class="question-result"></div>');
      $('.question-result').css('height',height_papa);
      $('.question-result').show(1000);
  }
  function interna(){
    if($('.encabezado-right').size() > 0){
      var height_item = $('.encabezado-right .pane-content > *').size();
      if (height_item == 0) {
        $('.encabezado-left').css('width', '100%');
      };
    }
  }
  function herramientas(){
    $('.listado-enlaces .field-colection-links').on({
      click: function() {
        var href = $('.field-name-field-link  a',this).attr('href');
        window.location.href = href;
        return false;
      },
      mouseenter: function() {
        $(this).toggleClass('hover');
      },
      mouseleave: function() {
        $(this).toggleClass('hover');
      }
    });
    var columnas = 4;
    var cantidad = $('.listado-enlaces-pane .pane-content > *').length;
    var filas = parseInt(cantidad/columnas);
    var index = columnas -1;
    for (var i = 1; i <= filas; i++) {
      $('.listado-enlaces-pane .pane-content .field-colection-links:eq('+index+')').addClass('last-column');
      index = index + columnas;
    };
  }
  function user_on_header(){
    var height_user = $('.header_user_name_group .field-content').height();
    if (height_user > 20) {
      console.log('si');
      $('.header-user-control').addClass('long-name');
    };
  }
  function birthday_links(){
    $('.birthday_content').on({
      click: function(){
        var papa = $(this).parent();
        window.location = $('.felicitar a', papa).attr("href");
        return false;        
      },
      mouseenter: function() {
        $(this).toggleClass('hover');
      },
      mouseleave: function() {
        $(this).toggleClass('hover');
      }
    });
    $('.birthday-block-widget .slides li').click(function(){
      var href = $('.felicitar a', this).attr('href');
      window.location.href = href;
      return false;
    });
  }
  function theme_breadcrum(){
    $('.easy-breadcrumb .easy-breadcrumb_segment:first').addClass('first');
    $('.easy-breadcrumb .easy-breadcrumb_segment:nth-child(3)').addClass('second');
    $('.easy-breadcrumb .easy-breadcrumb_segment:nth-child(5)').addClass('tirth');
    $('.easy-breadcrumb .easy-breadcrumb_segment:nth-child(7)').addClass('fourth');
    $('.easy-breadcrumb .easy-breadcrumb_segment:last').addClass('last');
    $('.easy-breadcrumb_segment-separator:first').addClass('first');
    $('.easy-breadcrumb_segment-separator:nth-child(4)').addClass('second');
    $('.easy-breadcrumb_segment-separator:nth-child(6)').addClass('tirth');
    $('.easy-breadcrumb_segment-separator:nth-child(8)').addClass('fourth');
  }
  function block_link(){
    block_link_click('.birthday-block-widget .slides > li','.felicitar a');
  }
  function buscador_theme(){
    $('.page-search .group-left, .views-page .group-left').each(function(){
      var cantidad_hijos = $('> *', this).length;
      if (cantidad_hijos == 0) {
        $(this).addClass('empty');
      };
    })
  }
  function lo_mas_popular(){
    $('.view-popular .views-row').on({
      mouseenter: function() {
        $(this).toggleClass('active');
      },
      mouseleave: function() {
        $(this).toggleClass('active');
      }
    });
  }
  function resize(){
    //equalHeight($('.listado-enlaces-pane .field-colection-links'));
  }
  function cross_browsing(){
    $(".tb-megamenu .nav > li:last-child").addClass('last');
    $('.panel-auxiliar .pane-block:last-child').addClass('last');
    $('.indented .comment:first').addClass('first');
    $('.tb-megamenu-row .tb-megamenu-column:last-child').addClass('last');
    $('.page-search .view-mode-listado:first').addClass('first');
  }
  function clean_whitespaces(){
    $('.titulo_vacantes').cleanWhitespace();
    $('.quicktabs-tabs').cleanWhitespace();
    $('.fechayhora').cleanWhitespace();
    $('.listado-enlaces-pane .pane-content').cleanWhitespace();
    $('.listado-correctas').cleanWhitespace();
    $('.panels-flexible-region-inside').cleanWhitespace();
  }
  function actualidad_wall(){
    if ($('.d-hide').size() > 0) {
      $('.d-hide .field-name-body, .d-hide .actualidad_icon_date').on({
        click: function() {
          var papa = $(this).parent();
          var href = $('.views-field-title-1 a',papa).attr('href');
          window.location.href = href;
          return false;
        },
        mouseenter: function() {
          $(this).toggleClass('hover');
        },
        mouseleave: function() {
          $(this).toggleClass('hover');
        }
      });
    };
    $('.primaria .views-row').bind({
      mouseenter: function() {
        $('.imagen-actualidad .views-field-title', this).hide();
        $('.imagen-actualidad .etiqueta', this).hide();
        $('.d-hide' , this).stop(true, false).animate({'top': '0px'},500);
        //$('.imagen-actualidad' , this).slideUp();
      },
      mouseleave: function() {
        var row = $(this);
        $('.d-hide' , this).stop(true, false).animate({'top': '278px'}, 500);
        $('.imagen-actualidad .views-field-title', row).show();
        $('.imagen-actualidad .etiqueta', row).show();
        /*
        $('.imagen-actualidad' , this).slideDown("slow","swing", function() {
          $('.imagen-actualidad .views-field-title', row).show();
        });
        */
      }
    });
  }
  function comentarios_interna(){
    var coments = $('.interna .pane-node-comments');
    if (coments.length < 1) {
      $('body').addClass('with-comments');
    }
    var comentarios = $('.comment-by-viewer').length;
    if (comentarios > 0) {
      $( document ).ajaxComplete(function( event,request, settings ) {
        location.reload();
      });
    };
  }
  function noticias(){
    var bandera = 2;
    var contador = 1;
    $('.form-item-created-max label').text('Fecha hasta');
    $('.tres-columnas > .view-content > .views-row').each(function(){
      if (contador == bandera) {
        $(this).addClass('central');
        bandera = bandera + 3;
      };
      contador++;
    });
  }
  function block_link_click(selector, link_class){
    $(selector).click(function(event){
      if (!$(this).has(event.target).length) {
        var href = $(link_class, this).attr('href');
        window.location.href = href;
      }
    })
  };
  function date_home(){
    var d = new Date();
    var strHour = $.format.date(d, "h:mm a.");
    var strDate = $.format.date(d, "ddd d") + ' de ' + $.format.date(d, "MMMM");
    $('.hour_info').text(strHour);
    $('.date_info').text(strDate);
  }
  function accesos_directos(){
    $('#edit-herramientas .form-item').click(function(){
      $(this).addClass('active');
    })
  }
  function preload(){
    $('.bubblingG').hide();
    $('.main').show();
    $('.main').css('visibility', 'visible');
  }
  function equalHeight(group) {
    var tallest = 0;
    group.each(function() {
      var thisHeight = $(this).outerHeight(true);
      if(thisHeight > tallest) {
        tallest = thisHeight;
      }
    });
    //group.height(tallest);
  }
  function formulario_buzon(){
    $('.formulario-buzon form').submit(function(){
      var val_textarea = $('textarea', this).val();
      var val_email = $('.email',this).val();
      if (val_textarea == 0) {
        alert('El campo comentario es obligatorio');
        return false;
      };
      if (!validateEmail(val_email)) {
        alert('El campo comentario es obligatorio');
        return false;
      };
    })
    $('.field-name-body').click(function( event ) {
      if ($('body').hasClass('logged-in')) {
        var main_element = $(this).parent();
        if (!main_element.hasClass('active')) {
          main_element.addClass('active');
          var buzon_height = main_element.height();
          var new_bottom = buzon_height - $('.formulario-buzon ').height();
          main_element.animate(
            {
              bottom: + new_bottom
            },
            1500, function() {
          });
        }
        else{
          var buzon_height = main_element.height();
          var buzon_initial_height = $('.formulario-buzon ').height();
          var new_bottom = buzon_height - buzon_initial_height;
          main_element.animate(
            {
              bottom: 43
            },
            1500, function() {
              main_element.removeClass('active')
          });
        }
      }
      else {
        window.location.href = '/user/login';
      }
      //main_element.css('bottom', new_bottom);
    });
  }
  function validateEmail($email) {
    if ($email.length == 0) {
      return false;
    };
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if( !emailReg.test( $email ) ) {
      return false;
    } else {
      return true;
    }
  }
  function detach(node){$(node).parent()[0].removeChild(node);return $(node)}function rm_white_spaces_ie(node){var ns=node.contents().filter(function(){return(node.nodeType!=3||/\S/.test(node.nodeValue))});var fns=[];for(var i=0;i<ns.length;i++){var cns=$(ns[i]).contents();for(var j=0;j<cns.length;j++)detach(cns[j]);var s=$.trim(ns[i].outerHTML);$(ns[i]).remove();var n=$(s);for(var j=0;j<cns.length;j++)if(cns[j]!=null){$(cns[j]).appendTo(n)}fns.push(n)}node.empty();for(var i=0;i<fns.length;i++){try{fns[i].appendTo(node)}catch(e){}}}jQuery.fn.cleanWhitespace=function(){if($.browser.msie&&parseInt($.browser.version,10)<=8){$(this).each(function(){rm_white_spaces_ie($(this))})}else{textNodes=this.contents().filter(function(){return(this.nodeType==3&&!/\S/.test(this.nodeValue))}).remove()}}
})(jQuery, Drupal);
