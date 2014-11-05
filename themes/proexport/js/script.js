CONTEXT = "body";
(function ($) {
  jQuery.fn.overlapped = function () {
    var $ = jQuery;
    var label = $(this);
    var ninput = this.attr('for');
    var input = $('#' + ninput);
    input.focus(function () {
        label.hide();
    });
    input.blur(function () {
        if (input.val() == "") label.show();
    });
    if (input.val() != "") label.hide();
    return this;
  };
  $(document).ready(function () {
    $("#primary-menu #block-superfish-1 > .content > Ul > LI UL").css('visibility','visible')
    var top = $(".view-filters").height()+$(".view-vista-general-paginas- .view-header").height() + 65 * $(".view-vista-general-paginas-").length;
    var topa = $(".page-node .group-header").height() + 48 * $(".not-front .group-header").length;
    var topvac = $("#vacantes-form .t-vacantehead").height() + 60 * $("#vacantes-form .t-vacantehead").length;
    $("#right .block:eq(0)").css("margin-top",top+topa+topvac);
    $(".pager li").each(function(){
      if(! $("a",this).hasClass("active")){
        $(this).addClass("t-pagerselected");
      }
    })
    galeria(".view-galer-a-pagina-de-inicio .view-content",".views-row",{tauto: 8000,btnizq:".t-izq",btnder:".t-der"})
    $("#superfish-1 li a.active").parent().addClass("activeli");
    if ($('.view-display-id-expertos').length == 0) {
      $(".view-vista-general-paginas- label", CONTEXT).overlapped();
    };
    $(".view-vista-general-paginas- #edit-submit-vista-general-paginas-").attr("value","");
    if($("body").hasClass("front")){
      var primero = $("#left > .region > .block:eq(0)").height();
      var primeroa = $("#right > .region > .block:eq(0)").height();
      if (primero > primeroa) {
        $("#right > .region > .block:eq(0)").css("height",primero);
      } else {
        $("#left > .region > .block:eq(0)").css("height",primeroa);
      }
    }
    $('.quicktabs-tabs').cleanWhitespace();
    $('#cright .block > .content').cleanWhitespace();
    if($('#block-block-9').length){
        skype_height = $('#block-block-9').height();
        screen_height = screen.height;
        new_height = (screen_height/2) - (skype_height/2);
        $('#block-block-9').css('top',new_height);
    }
    if($('#quicktabs-intraexport .quicktabs-tabs > li').length){
        var used_width = 0;
        var last_li = $('#quicktabs-intraexport > .item-list > .quicktabs-tabs > li:last');
        tab_width = $('#quicktabs-intraexport .quicktabs-tabs').outerWidth(true);
        $('#quicktabs-intraexport > .item-list > .quicktabs-tabs > li').each(function(){
            used_width = used_width + $(this).outerWidth(true);
        })
        var unused_width = tab_width - used_width;
        var last_li_new_width = last_li.outerWidth(true) + unused_width - 2;
        last_li.css('width',last_li_new_width);
        $('> a',last_li).css('width',last_li_new_width);
    }
    $('.field-name-field-link .colorbox-inline').each(function(){
        var broken_link = $(this);
        var colorbox_broken_link = broken_link.attr('href');
        var new_colorbox_link = colorbox_broken_link + '?width=800&height=600&iframe=true';
        broken_link.attr('href', new_colorbox_link)
    });
    $('.field-name-field-document-file a').each(function(){
        $(this).attr('TARGET','_blank');
    });
    jQuery('.messages').each(function(){
       var cantidad = jQuery('> *',this).length;
       if( cantidad == 0) {
        $(this).parent().css('display','none');
       }
    });
    /*$('div.tweets-pulled-listing').jScrollPane();*/       
  })
    function detach(node){
        $(node).parent()[0].removeChild(node);
        return $(node);
    }

    function rm_white_spaces_ie(node){
        var ns = node.contents().filter(function() {
            return (node.nodeType != 3 || /\S/.test(node.nodeValue));
        });
        var fns = [];
        for(var i=0; i< ns.length; i++){
            var cns = $(ns[i]).contents();
            for(var j=0; j< cns.length; j++)
                detach(cns[j]);
            var s = $.trim(ns[i].outerHTML);
            $(ns[i]).remove();
            var n = $(s);
            for(var j=0; j< cns.length; j++) if(cns[j]!=null){
                $(cns[j]).appendTo(n);
            }
            fns.push(n);
        }
        node.empty();
        for(var i=0; i< fns.length; i++){
            try{
                fns[i].appendTo(node);
            }catch(e){}
        }
    }

    jQuery.fn.cleanWhitespace = function() {
        if($.browser.msie && parseInt($.browser.version, 10) <= 8 ){
            $(this).each(function(){
                rm_white_spaces_ie($(this));
            });
        }else{
            textNodes = this.contents().filter(
                function() {
                    return (this.nodeType == 3 && !/\S/.test(this.nodeValue));
                })
            .remove();
        }
    } //Funcion cleanwhitespace
})(jQuery);
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function galeria_int(contexto, cosamovil, menu, indice, btnizq, btnder, elem, tanim, tauto, numerado) {
    var $ = jQuery;
    var t_gal_ocupado = false;
    var t_contexto = (contexto != null && contexto != undefined) ? $(contexto) : undefined;
    var t_galeria = $(cosamovil, t_contexto);
    var t_gal_contador = 0;
    var t_gal_max = $(elem, t_galeria).length;
    var primero = $(elem, t_galeria).slice(0, 1);
    primero.clone().appendTo(primero.parent());
    if (menu != undefined && menu != null) {
        var t_menu = $(menu, t_contexto);
        for (var i = 0; i < t_gal_max; i++) {
            var conte = '';
            var clases = indice + " " + indice + "-" + (i + 1);
            if (numerado) conte = i + 1;
            t_menu.append('<div class="' + clases + '">' + conte + '</div>');
        }
        $('.' + indice, t_menu).click(function () {
            if (t_gal_ocupado) return false;
            t_gal_contador = $('.' + indice, t_menu).index(this);
            t_galh_update(t_gal_contador);
            return false;
        });
    }
    t_galeria.scrollLeft(0);

    function t_galh_update() {
        var original = t_gal_contador;
        if (original == -1) t_galeria.scrollLeft(t_galeria.width() * t_gal_max);
        t_gal_contador = (t_gal_max + t_gal_contador) % t_gal_max;
        t_gal_ocupado = true;
        var txt_desc = $($(elem + " .views-field-field-text-gallery .field-content", t_galeria)[t_gal_contador]).html();
    var txt_url = $($(elem + " .views-field-field-text-gallery .field-content a", t_galeria)[t_gal_contador]).attr("href")
        $(".t-textfoot").html(txt_desc);
         $(".t-masinfo").attr("href",txt_url);
        t_galeria.stop(true, true).animate({
            scrollLeft: (t_galeria.width() * (original == t_gal_max ? t_gal_max : t_gal_contador))
        }, tanim, function () {
            t_gal_ocupado = false;
            if (original == t_gal_max) t_galeria.scrollLeft(t_galeria.width() * 0);
        });
        $('.' + indice, t_menu).removeClass(indice + '_act');
        $('.' + indice, t_menu).slice(t_gal_contador, t_gal_contador + 1).addClass(indice + '_act');
        if (t_contexto != undefined) {
            t_contexto.removeClass('t-gal-last').removeClass('t-gal-first');
            if (t_gal_contador == 0) t_contexto.addClass('t-gal-first');
            if (t_gal_contador == t_gal_max - 1) t_contexto.addClass('t-gal-last');
        }
    }

    function t_galh_cambio(delta) {
        if (t_gal_ocupado) return false;
        t_gal_contador = t_gal_contador + delta;
        t_galh_update();
        return false;
    }
    if (btnder != null) $(btnder, t_contexto).click(function () {
        t_galh_cambio(+1);
    });
    if (btnizq != null) $(btnizq, t_contexto).click(function () {
        t_galh_cambio(-1);
    });
    if (tauto != null && tauto != undefined) {
        function autonexthome() {
            t_galh_cambio(+1);
            window.setTimeout(autonexthome, tauto);
        }
        window.setTimeout(autonexthome, 8000);
    }
    t_galh_update();


    window.setInterval(function(){
        if($('#t-returnajax').length && $('#t-returnajax').css('display') == 'block'){
            $('#t-returnajax').css('overflow', 'auto');
            $('BODY').css('overflow', 'hidden').scrollTop(0);
            $('.view-art-culos .view-content').css('height', $('.view-art-culos .t-selected').height() + 'px');
        }else{
            $('BODY').css('overflow', 'auto');
        }
    }, 300);

}

function galeria(cosamovil, elem, opciones) {
    var btnizq = ('btnizq' in opciones) ? opciones.btnizq : null;
    var btnder = ('btnder' in opciones) ? opciones.btnder : null;
    var tanim = ('tanim' in opciones) ? opciones.tanim : 1000;
    var tauto = ('tauto' in opciones) ? opciones.tauto : null;
    var menu = ('menu' in opciones) ? opciones.menu : 't_gal_menu';
    var indice = ('indice' in opciones) ? opciones.indice : 't_gal_ind';
    var context = ('context' in opciones) ? opciones.context : null;
    var numerado = ('numerado' in opciones) ? opciones.numerado : false;
    galeria_int(context, cosamovil, menu, indice, btnizq, btnder, elem, tanim, tauto, numerado);
}
