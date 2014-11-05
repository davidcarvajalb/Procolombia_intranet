<?php
/*function proexport_preprocess_html(&$variables) {
  //  Add conditional stylesheets for IE
  drupal_add_css(path_to_theme() . '/css/ie.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'lte IE 8', '!IE' => FALSE), 'preprocess' => FALSE));
  drupal_add_css(path_to_theme() . '/css/ie6.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'IE 6', '!IE' => FALSE), 'preprocess' => FALSE));
  alert_internet_explorer_7();
}

function alert_internet_explorer_7()
{
  $browser = $_SERVER['HTTP_USER_AGENT'];
  //running internet alert_internet_explorer_7
  if($msie = strpos($browser, "MSIE"))
  {
    //version number
    $ver = substr($browser, $msie + 5, 3);
    if($ver <= 7.0){
      drupal_set_message('Lo sentimos, tu navegador esta desactualizado no soporta algunas funcionalidades de la intranet. Es factible que algunos elementos no se visualicen correctamente, te recomendamos actualizar la versión de tu navegador', 'warning');
    }
  }
}

*/
