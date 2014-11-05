<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta content="text/html; charset=iso-8859-1" http-equiv="Content-Type" />
		<title>Feliz Cumplea&ntilde;os</title>
		<style type="text/css" media="all">
			@import url("<?php echo $base_path . drupal_get_path('module', 'cumpleanos_ruleta') . "/theme/roulette/css/style.css"?>");
		</style>
		<script language="JavaScript" src="<?php echo $base_path?>misc/jquery.js?v=1.4.4"></script>
		<script type="text/javascript" src="<?php print $theme_path; ?>roulette/js/birthday_roulette.js?>"></script>
		<script type="text/javascript" src="<?php print $theme_path; ?>roulette/js/jQueryRotate.js?>"></script>
		<script language="JavaScript">
		jQuery(function() {
			jQuery('#reclaim').click(function (evt) {
				jQuery(this).html('Procesando&nbsp;&nbsp;&nbsp;');
				setTimeout(animateText, '1000');
			});
		})
		function animateText() {

			if(jQuery('#reclaim').html() == 'Procesando&nbsp;&nbsp;&nbsp;')
			{

				jQuery('#reclaim').html('Procesando.&nbsp;&nbsp;');
			}
			else if(jQuery('#reclaim').html() == 'Procesando.&nbsp;&nbsp;')
			{
				jQuery('#reclaim').html('Procesando..&nbsp;');
			}
			else if(jQuery('#reclaim').html() == 'Procesando..&nbsp;')
			{
				jQuery('#reclaim').html('Procesando...');
			}
			else
				jQuery('#reclaim').html('Procesando&nbsp;&nbsp;&nbsp;');
			setTimeout(animateText, '1000');
		}
		</script>
	</head>
	<body>
	   <div class="contenedor">
	     <div class="participante">
	        <span><?php print $firstname; ?></span>
	     </div><!--participante-->
	     <div class="juego">
	        <div class="ruleta" style="margin-left:70px;">
	           <div class="indicador"></div>
	           <div class="content-ruleta">
	             <div class="content-svg">
	             	<!--[if lt IE 9]>
	             		<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="232" height="232" id="movie_name" align="middle" wmode="transparent">
						    <param name="movie" value="<?php print $theme_path; ?>roulette/swf/ruleta.swf"/>
						    <param name="wmode" value="transparent">
						        <a href="http://www.adobe.com/go/getflash">
						            <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player"/>
						        </a>
						</object>
	             	<![endif]-->
	             	<object id="ruleta" width="232" height="231" type="image/svg+xml" data="<?php print $theme_path; ?>roulette/img/ruleta.svg" style="background:none">
	                 	<param name="wmode" value="transparent">


                  </object>
	             </div><!--content-svg-->
	           </div><!--content-ruleta-->
	           <div class="titulo">
	              Feliz cumplea&ntilde;os te desea PROEXPORT COLOMBIA
	           </div><!--titulo-->
	        </div><!--ruleta-->
	     </div><!--juego-->
	     <div class="info-premio" <?php if(intval($display_alert) != 1) : ?>style="display:none"<?php endif; ?>>
	        <div class="indicador2"></div>
	        <img src="<?php print $theme_path; ?>roulette/img/premio<?php echo $user_prize["number"]?>.png" width="167" height="118" alt="premio<?php echo $user_prize?>" />
	        <p style="margin-top:40px;">&#161;Feliz Cumplea&ntilde;os<br/><?php print $firstname; ?>.<br/> acabas de ganar <?php echo strtolower($user_prize["name"])?>&#33;</p>
	        <a href="/institucional/cumpleanos/<?php print $uid?>/prize/reclaim" class="btn-naranja" id="reclaim" title="">Reclama tu bono</a>
	     </div><!--info-premio-->
	     <?php if(intval($display_alert) == 1) : ?>
		     <div class="alerta">
		       <h2>&#161;FELICIDADES&#33;</h2>
		       <p>La suerte te ha concedido un gran regalo y ahora hemos enviado un mensaje confirmando a talento humano y a tu correo electr&oacute;nico.</p>
		       <a href="http://intranet.proexport.com.co" class="btn-naranja" title="">cerrar</a>
		     </div><!--alerta-->
	     <?php endif; ?>
	   </div><!--contenedor-->
    </body>
</html>
