<?php
/**
 * @file
 * expertos.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function expertos_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "ds" && $api == "ds") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function expertos_views_api() {
  return array("version" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function expertos_node_info() {
  $items = array(
    'experto' => array(
      'name' => t('Experto'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
