<?php

/**
 * @file
 * Functions repository to facilitate the use of Success Factors API
 *
 * Autor information: David Carvajal
 * email: davidgcarvajal@gmail.com
 */

/**
 * Sync the user with Success Factors
 * @param $account
 *   Current user data
 */
function sf_sync($account) {
  $soap_client = sf_engine();
  if (!$soap_client) { //exit when detect errors with the service
    return FALSE;
  }
  $credentials = get_sfcredentials();
  $servicio = $soap_client->call('login', array('credential' => $credentials));
  $sf_session_status = sf_validsession($soap_client);
  if ($sf_session_status) {
    update_drupal_user($soap_client, $account);
  }
  else{
    watchdog('success_factors', 'The active sesion with the service is unavailable', array(), WATCHDOG_ALERT);
  }
}

function sf_connect() {
  $soap_client = sf_engine();
  if (!$soap_client) { //exit when detect errors with the service
    return FALSE;
  }
  $credentials = get_sfcredentials();
  $servicio = $soap_client->call('login', array('credential' => $credentials));
  $sf_session_status = sf_validsession($soap_client);
  if ($sf_session_status) {
    return $soap_client;
  }
  else{
    watchdog('success_factors', 'The active sesion with the service is unavailable', array(), WATCHDOG_ALERT);
  }
}
/**
 * Method for sign-in and query with the Success Factors API
 * @param $soap_client
 *   Current user data
 * @param $sfql
 *   string to query the
 */
function sf_query($soap_client, $sfql) {
  $servicio = $soap_client->call('query', array('queryString' => $sfql));
  if (isset($servicio['result']['sfobject'])) {
    $query_result = $servicio['result']['sfobject'];
    return $query_result;
  }
  return FALSE;
}

/**
 * Method to verify the status of the SFAPI session
 */

function sf_validsession($soap_client) {
  if (!$soap_client) { //exit when detect errors with the service
    return FALSE;
  }
  $servicio = $soap_client->call('isValidSession');
  $service_result = $servicio['result'];
  if ($service_result) {
    return TRUE;
  }
}

/**
 * Login credentials to login to the Success Factors API
 */

function get_sfcredentials() {
  $credentials = array(
    'companyId' => 'Proexport',
    'username'  => 'Admin1',
    'password'  => '8oU4dI'
  );
  return $credentials;
}

/**
 * Load the nusoap library and connect with the success factors web service
 */

function sf_engine() {
  require_once DRUPAL_ROOT . '/' . 'sites/all/libraries/nusoap/nusoap.php';
  $wsdl_path = 'https://api4.successfactors.com/sfapi/v1/soap?wsdl';
  $soap_client = new nusoap_client($wsdl_path, 'wsdl');
  $error = $soap_client->getError();
  if (!$error) {
    return $soap_client;
  }
  else{
    watchdog('success_factors', 'The integration service is unavailable', array(), WATCHDOG_ERROR);
    return FALSE;
  }
}

/**
 * Parse image in binary to a real image
 * @param $bytes
 *   Represent the parsed in base 64 binary image
 * @param $filename
 *   Represent the name of the image file
 */

function binary_to_image($bytes = '', $filename = '') {
  $basepath = 'sites/default/files/temp/user_images/';
  $nombre = $basepath . $filename . '.jpeg';
  if (file_put_contents($nombre, base64_decode($bytes))) {
    $image_info = getimagesize($nombre);
    $imag = imagecreatefromjpeg($nombre);
    $wx = imagesx($imag);
    $hy = imagesy($imag);
    $basex = 180;
    $ratio = $basex / $wx;
    $height = 208;
    $new_image = imagecreatetruecolor($basex, $height);
    imagecopyresampled($new_image, $imag, 0, 0, 0, 0, $basex, $height, $wx, $hy);
    $imag = $new_image;
    imagejpeg($imag, $nombre, 75);
    return $nombre;
  }
  else{
    return "0";
  }
}

/**
 * Update the drupal user with the Success Factor information
 * @param $soap_client
 *   Represent the instanced soap object previusly logged in
 * @param $account
 *   Current user data
 */
function update_drupal_user($soap_client, $account) {
  global $base_url;
  $uid = $account->uid;
  $username = $account->name;
  $sfql = "SELECT id,lastModified,firstname,lastName FROM user WHERE status = 'active' AND username = '$username'";
  $result = sf_query($soap_client, $sfql);
  if (!$result) {
    //
    watchdog('success_factors', 'El Usuario %nombre no existe en susccess factors', array('%nombre' => $username), WATCHDOG_NOTICE, $link = NULL);
    return FALSE;
  }
  $sf_id = $result['id'];
  $last_modified = strtotime($result['lastModified']);
  $should_i_insert = insert_sync_reference('success_factors_reference', $uid, $sf_id, $last_modified);
  if ($should_i_insert) {
    $first_name = utf8_encode($result['firstName']);
    $last_name = utf8_encode($result['lastName']);
    watchdog('success_factors', 'Usuario actualizado %nombre', array('%nombre' => $first_name . $last_name), WATCHDOG_NOTICE, $link = NULL);
    $edit = array(
      'field_user_firstname' => array('und' => array(0 => array('value' => $first_name), ), ),
      'field_user_lastname' => array('und' => array(0 => array('value' => $last_name), ), ),
    );
    /* Image process */

    $sfql_image = "SELECT data FROM UserPhoto WHERE userId = '$sf_id' AND photoType = 'liveProfile'";
    $result_image_query = sf_query($soap_client, $sfql_image);
    if (isset($result_image_query['data'])) {
      $image_data = $result_image_query['data'];
      $image_path = binary_to_image($image_data, $uid);
      $image = file_get_contents($image_path);
      $file = file_save_data($image, 'public://user_images/' . $uid . '.jpeg', FILE_EXISTS_REPLACE);
      $edit['picture'] = $file;
    }

    /* Birthday process */

    $sfql_birthday = "SELECT userId,startDate FROM Background_memberships WHERE userId = '$sf_id'";
    $result_birthday_query = sf_query($soap_client, $sfql_birthday);
    if (isset($result_birthday_query['startDate'])) {
      $birthdate_exploded = explode("-", $result_birthday_query['startDate']);
      $birth_year = $birthdate_exploded[0];
      $birth_month = $birthdate_exploded[1];
      $birth_day = $birthdate_exploded[2];
      $birthdate_formated = $birth_year . '-' . $birth_month . '-' . $birth_day;
      $edit['field_user_birthday'] = array('und' => array(0 => array('value' => $birth_day), ), );
      $edit['field_user_birthmonth'] = array('und' => array(0 => array('value' => $birth_month), ), );
      $edit['field_user_birthdate'] = array('und' => array(0 => array('value' => $birthdate_formated), ), );
    }
    /* End of the birthday process */

    user_save($account, $edit);
  }
}

/**
 * insert into sync informacition to keep a log of the process
 */
function insert_sync_reference($table, $uid, $sf_uid, $last_sync = 0) {
  $sync_status = validate_sync_reference($uid, $last_sync);
  switch ($sync_status) {
    case 'insert':
      $nid = db_insert($table)
        ->fields(array(
          'uid' => $uid,
          'sf_uid' => $sf_uid,
          'last_sync' => REQUEST_TIME,
        ))
      ->execute();
      return TRUE;
      break;
    case 'update':
      db_update($table)
        ->fields(array('last_sync' => REQUEST_TIME, ))
        ->condition('uid', $uid)
        ->execute();
      return TRUE;
      break;
    default:
      return FALSE;
      break;
  }
}

/**
 * validate if the user is already sync with the service
 */
function validate_sync_reference($uid, $last_sync = 0) {
  $result = db_select('success_factors_reference', 's')->fields('s')
  ->condition('uid', $uid, '=')
  ->execute()
  ->fetchAssoc();
  if (!$result) {
    return 'insert';
  }
  $last_modified_drupal_user = $result['last_sync'];
  if ($last_modified_drupal_user <= $last_sync) {
    return 'update';
  }
  return FALSE;
}
