<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Proexport cumplea&ntilde;os</title>
<meta name="description" content="" />
<meta name="keywords" content="" />
</head>
<body>
   <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFF" style="margin:0 auto">
      <tr>
        <td colspan="4" bgcolor="#FFFFFF" colspan="3">
        <p style="color:#323232; font-size:13px; font-family:Tahoma, Geneva, sans-serif; margin:0 60px 25px 60px; line-height:15px; text-align:center;"></p>
        </td>
      </tr>
      <tr>
         <td height="110" bgcolor="#13A89E" colspan="3">
         </td>
      </tr>
      <tr>
        <td bgcolor="#13A89E" colspan="3">
           <p style="color:#fff; font-size:18px; font-family: Arial, Helvetica, sans-serif ; text-align:center; line-height:25px; text-align:center;"><?php print $firstname . ' ' . $lastname; ?><br/>ha recibido como regalo de cumpleaños<br/><strong style="font-size:30px;">¡ <?php print strtolower( $user_prize["name"]); ?> !</strong><br/><br/>
           	<?php if($user_prize["has_coupon"]) { ?>
           	<br/>En el siguiente link descargue el bono para entregar<br/> al beneficiado.</p>
           	<?php } ?>
        </td>
      </tr>
      <tr>
         <td height="75" bgcolor="#13A89E" colspan="3">
         </td>
      </tr>
      <?php if($user_prize["has_coupon"]) { ?>
      <tr>
      	<td bgcolor="#13A89E" width="227" height="50">
        </td>
        <td bgcolor="#FCB040" style="text-align:center;">
           <a href="<?php echo $coupon_url; ?>" style="color:#fff; font-size:25px; font-weight:bold; text-decoration:underline; font-family: Arial, Helvetica, sans-serif; text-align:center; display:block; text-decoration:none; cursor:pointer">Clic aqu&iacute;</a>
        </td>
        <td bgcolor="#13A89E" width="227" height="50">
        </td>
      </tr>
      <tr>
         <td height="75" bgcolor="#13A89E" colspan="3">
         </td>
      </tr>
      <?php } ?>
      <tr>
        <td bgcolor="#13A89E" align="center" style="text-align:center" colspan="3">
           <?php
           require_once (drupal_get_path('module', 'cumpleanos_ruleta') . '/theme/mails/logo.php');
		   ?>
        </td>
      </tr>
      <tr>
         <td height="75" bgcolor="#13A89E" colspan="3">
         </td>
      </tr>
      <tr>
         <td height="20" bgcolor="#fff" colspan="3">
         </td>
      </tr>
    </table>
</body>
</html>
