<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see template_process()
 */?>

<style>
body{
	padding-top:0 !important;	
}


</style>

<script>

jQuery( document ).ready(function() {
	
	/*jQuery(".halloween-hijo").click(function () {
    	 jQuery("#edit-submitted-foto-upload").focus().trigger('click');
		 if (jQuery.browser.msie){
			jQuery("#edit-submitted-foto-upload").trigger('change');
			  
		 }

	});*/
	
	
	
	jQuery("#edit-submitted-foto-upload").live("change", function () {
       var filename = jQuery('#edit-submitted-foto-upload').val().split('\\').pop();
       jQuery(".halloween-foto-name").html(filename);
     });
	
	jQuery('#paging_container1').pajinate({
					items_per_page : 16,
                    wrap_around: true,
                    show_first_last: false,
					nav_label_prev : 'Anterior',
					nav_label_next : 'Siguiente'
				});
	
	jQuery(".halloween-box").click(function () {
		 jQuery.fancybox(
			'<table class="halloween-box-titulo" align="center" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="halloween-titulo1"></div></td><td>'+ jQuery(this).attr('name') +'</td><td><div class="halloween-titulo2"></div></td></tr></table><div align="center"><img width="500" src="'+ jQuery(this).attr('src') +'"/></div><div class="halloween-info">'+ jQuery(this).attr('lang') +'<br>'+jQuery(this).attr('title') +'<br><span>'+ jQuery(this).attr('alt') +'</span></div>',
			{
					'autoDimensions'	: false,
				'width'         		: 845,
				'height'        		: 'auto',
				'transitionIn'		: 'none',
				'transitionOut'		: 'none',
				'overlayColor' : '#000',
				'overlayOpacity': 0.9,
				'padding':0
			}
		);
		 
	});
	
	jQuery("#halloween-subir").click(function () {
		jQuery('#webform-client-form-6074').show();	
		jQuery(this).hide();	
	});
	
	jQuery('#halloween-subir2').hide();
	

	<?php 
	$args = arg();
	
	if(($_REQUEST['submitted']) ): ?>
		jQuery('#webform-client-form-6074').show();	
		window.location.hash = '#ancla';
		jQuery("#iralancla").trigger('click');
	<?php endif; ?>
	
	<?php if(($args[count($args)-1] ) == 'done'): ?>
		jQuery('#webform-client-form-6074').show();	
		window.location.hash = '#ancla';
		jQuery('#halloween-subir').hide();
		jQuery('#halloween-subir2').show();
	
	<?php endif; ?>
	
	<?php if(($args[count($args)-1] ) == 'open'): ?>
		jQuery('#webform-client-form-6074').show();	
		window.location.hash = '#ancla';
		jQuery('#halloween-subir').hide();
		jQuery('#halloween-subir2').hide();
	
	<?php endif; ?>
	
	<?php 
	
		global $user;
			$mi_user = user_load($user->uid);

			
		
	
	?>
	
	
	jQuery('#edit-submitted-nombre').val('<?php echo $mi_user->field_user_firstname['und'][0]['value'];?>'+ ' ' + '<?php echo $mi_user->field_user_lastname['und'][0]['value'];?>')
	
});


	
</script>



<div class="halloween">
	<div class="halloween-main">
    	<table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="halloween-linea"></td>
            <td>
            
            <div class="halloween-content">
        	<div class="halloween-top">
            	<div class="halloween-logo"></div>
            </div>
            <div class="halloween-intro">
            	y en TALENTO HUMANO queremos que como habitante del Mundo PROEXPORT 
compartas con tus compañeros fotos de tus mejores disfraces y los de tus hijos. 
<br /><br />
Entregaremos <span>premios</span> a  las fotos con los disfraces más creativos y al hijo o hija
 con el mejor disfraz.
            </div>	
            
            <?php 
			
			$query = db_query('SELECT * FROM webform_views_halloween_6074');

  			$submissions = $query->fetchAll();

			?>
            
           
            
            
         
            <div id="paging_container1" class="container halloween-galeria">
				<ul class="content halloween-items">
                	 <?php foreach($submissions as $row): ?>

                    	<li>
							<?php 
                                $ifid = strip_tags($row->foto);
                                $imgpath = file_load($ifid)->uri;
                                $url = file_create_url($imgpath);
                                list($width, $height, $type, $attr) = getimagesize($url);
                            ?>
                        
							<?php if($row->nombre_de_tu_hijo !=''): ?>
                                <img class="halloween-box <?php if($width >= $height): echo 'halloween-ancho'; else: echo 'halloween-alto'; endif;?>" lang="Hijo de <?php echo $row->nombre;?>" alt="<?php echo $row->ano_de_la_foto;?>" name="<?php echo $row->nombre_de_tu_hijo;?>" title="<?php echo $row->area_de_trabajo;?>"  src="<?php print file_create_url($imgpath); ?>" />
                            <?php else: ?>
                                <img class="halloween-box <?php if($width >= $height): echo 'halloween-ancho'; else: echo 'halloween-alto'; endif;?>" alt="<?php echo $row->ano_de_la_foto;?>" name="<?php echo $row->nombre;?>" title="<?php echo $row->area_de_trabajo;?>" src="<?php print file_create_url($imgpath); ?>" />
                            <?php endif; ?>
                    </li> 
                   
            <?php endforeach; ?>
            
				</ul>
                <div class="page_navigation"></div>	
			</div>	
            
            <?php if ($show_messages && $messages): echo '<div class="mensajes">'; print $messages; echo '</div>'; endif; ?>
            <a name="ancla" id="ancla"></a>
			<a id="iralancla" href="#ancla"></a>
            <div class="halloween-formulario">
            	<div id="halloween-subir"></div>
                <a href="/node/6074/open" id="halloween-subir2"></a>
            	<?php print render($page['sb_left']); ?>
            </div>
        </div>
        
        <div class="halloween-bottom">
        	<div class="halloween-footer"></div>
        </div>
            
            </td>
            <td class="halloween-linea"></td>
          </tr>
        </table>

    	
        
        
    	<div class="clr"></div>
    </div>
    
</div>





