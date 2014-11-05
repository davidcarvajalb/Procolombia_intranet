<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
		<title>Feliz Cumplea&ntilde;os</title>
		<style type="text/css" media="all">
			@import url("<?php echo $base_path . drupal_get_path('module', 'cumpleanos_ruleta') . "/theme/roulette/css/style.css"?>");
		</style>
	</head>
	<body>
	   <div class="contenedor">
	     <div class="juego">
	        <div class="ruleta" style="margin-left:28px;">
	             <div class="indicador"></div>
	           <div class="content-ruleta">
	             <div class="content-svg">
                  <img src="<?php print $theme_path; ?>roulette/img/ruleta.png" />
	             </div><!--content-svg-->
	           </div><!--content-ruleta-->
	           <div class="titulo">
	              Feliz cumplea&ntilde;os te desea PROEXPORT COLOMBIA
	           </div><!--titulo-->
	        </div><!--ruleta-->
	     </div><!--juego-->
	     <div class="mensaje-bienvenida">
	        <p>¡Feliz Cumplea&ntilde;os!<br/><?php print $firstname; ?><br/> Hoy la suerte est&aacute; contigo.</p>
	        <p>Gira la ruleta y gana un regalo.</p>
	        <a href="/institucional/cumpleanos/<?php print $uid?>/prize" class="btn-naranja" id="girarRuleta">Empezar</a>
	     </div><!--mensaje-bienvenida-->
	   </div><!--contenedor-->
    </body>
</html>
