(function ($) {
  $(document).ready(function () {
    var path = window.location.pathname;
    var after_sso = getUrlVars()["after_sso"];
    if (!after_sso) {
      after_sso = '/';
    };
    $.ajax({
      type: 'GET',
      url: 'http://preintranet.proexport.com.co/sites/all/modules/custom/sso/cross_domain.php',
      success: function(data, textStatus, XMLHttpRequest) {
        var ajax_data = {state:"ok_sso_checked"}; //Array
        $.ajax({
          url : "/login_sso/create_cookie",
          type: "POST",
          data : ajax_data,
          success: function(data, textStatus, jqXHR)
          {
            if (after_sso != path) {
              //El usuario se encuentra en el dominio
              window.location.href = after_sso;
            };
          }
        });
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        new_path = '/user/login' ;
        if (new_path != path) {
          //El usuario no se encuentra en el dominio
          window.location.href = new_path + "?destination=" + after_sso;
        };
      }
    });
  })
})(jQuery);

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}
