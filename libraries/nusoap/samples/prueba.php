<?php
/*
 *  $Id: wsdlclient1.php,v 1.3 2007/11/06 14:48:48 snichol Exp $
 *
 *  WSDL client sample.
 *
 *  Service: WSDL
 *  Payload: document/literal
 *  Transport: http
 *  Authentication: none
 */
  require_once('../lib/nusoap.php');

  //$wsdl_path = 'https://api4.successfactors.com/sfapi/v1/soap?wsdl';
  $wsdl_path = 'https://api4.successfactors.com:443/sfapi/v1/soap?wsd';
  $args = array(
    'companyId' => 'Proexporttest',
    'username'  => 'adminpe',
    'password'  => '7440550',
  );
  $soap_client = new nusoap_client($wsdl_path);
  $error = $soap_client->getError();
  if (!$error) {
      $servicio = $soap_client->call('login', $args);
      print_r($servicio);
  } else {
      //print('falla');
  }
?>
