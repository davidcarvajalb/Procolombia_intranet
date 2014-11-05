<?php
if (file_exists($file)) :
	require_once $file;
else :
	require_once DRUPAL_ROOT . '/' . drupal_get_path('module', 'cumpleanos_ruleta') . '/theme/roulette/includes/default.tpl.php';
endif;
?>
