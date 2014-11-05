<?php
/**
 * @file
 * expertos.ds.inc
 */

/**
 * Implements hook_ds_field_settings_info().
 */
function expertos_ds_field_settings_info() {
  $export = array();

  $ds_fieldsetting = new stdClass();
  $ds_fieldsetting->api_version = 1;
  $ds_fieldsetting->id = 'node|experto|default';
  $ds_fieldsetting->entity_type = 'node';
  $ds_fieldsetting->bundle = 'experto';
  $ds_fieldsetting->view_mode = 'default';
  $ds_fieldsetting->settings = array(
    'tipo_de_contenido' => array(
      'weight' => '0',
      'label' => 'hidden',
      'format' => 'default',
      'formatter_settings' => array(
        'show_title' => 0,
        'title_wrapper' => '',
        'ctools' => 'a:3:{s:4:"conf";a:4:{s:8:"sanitize";i:1;s:7:"context";s:25:"argument_entity_id:node_1";s:14:"override_title";i:0;s:19:"override_title_text";s:0:"";}s:4:"type";s:5:"token";s:7:"subtype";s:17:"node:content-type";}',
        'load_terms' => 0,
      ),
    ),
    'title' => array(
      'weight' => '1',
      'label' => 'hidden',
      'format' => 'default',
    ),
  );
  $export['node|experto|default'] = $ds_fieldsetting;

  $ds_fieldsetting = new stdClass();
  $ds_fieldsetting->api_version = 1;
  $ds_fieldsetting->id = 'node|experto|listado';
  $ds_fieldsetting->entity_type = 'node';
  $ds_fieldsetting->bundle = 'experto';
  $ds_fieldsetting->view_mode = 'listado';
  $ds_fieldsetting->settings = array(
    'title' => array(
      'weight' => '0',
      'label' => 'hidden',
      'format' => 'default',
      'formatter_settings' => array(
        'link' => '1',
        'wrapper' => 'h2',
        'class' => '',
      ),
    ),
    'node_link' => array(
      'weight' => '8',
      'label' => 'hidden',
      'format' => 'default',
    ),
  );
  $export['node|experto|listado'] = $ds_fieldsetting;

  return $export;
}

/**
 * Implements hook_ds_layout_settings_info().
 */
function expertos_ds_layout_settings_info() {
  $export = array();

  $ds_layout = new stdClass();
  $ds_layout->api_version = 1;
  $ds_layout->id = 'node|experto|default';
  $ds_layout->entity_type = 'node';
  $ds_layout->bundle = 'experto';
  $ds_layout->view_mode = 'default';
  $ds_layout->layout = 'ds_2col_stacked';
  $ds_layout->settings = array(
    'hide_empty_regions' => 1,
    'hide_sidebars' => 0,
    'regions' => array(
      'header' => array(
        0 => 'tipo_de_contenido',
      ),
      'right' => array(
        0 => 'title',
        1 => 'field_expert_ranking',
        2 => 'field_expert_name',
        3 => 'field_expert_last_name',
        4 => 'field_expert_gender',
        5 => 'field_expert_charge',
        6 => 'field_expert_entity',
        7 => 'field_expert_sector',
        8 => 'field_expert_specialty',
        9 => 'field_expert_experience',
        10 => 'field_expert_services',
        11 => 'field_country',
        12 => 'field_expert_phone',
        13 => 'field_expert_cellphone',
        14 => 'field_expert_email',
        15 => 'field_expert_skype',
        16 => 'field_expert_linkedin',
        17 => 'field_expert_web',
        18 => 'field_expert_contacto',
        19 => 'field_expert_user_vote_list',
      ),
    ),
    'fields' => array(
      'tipo_de_contenido' => 'header',
      'title' => 'right',
      'field_expert_ranking' => 'right',
      'field_expert_name' => 'right',
      'field_expert_last_name' => 'right',
      'field_expert_gender' => 'right',
      'field_expert_charge' => 'right',
      'field_expert_entity' => 'right',
      'field_expert_sector' => 'right',
      'field_expert_specialty' => 'right',
      'field_expert_experience' => 'right',
      'field_expert_services' => 'right',
      'field_country' => 'right',
      'field_expert_phone' => 'right',
      'field_expert_cellphone' => 'right',
      'field_expert_email' => 'right',
      'field_expert_skype' => 'right',
      'field_expert_linkedin' => 'right',
      'field_expert_web' => 'right',
      'field_expert_contacto' => 'right',
      'field_expert_user_vote_list' => 'right',
    ),
    'classes' => array(),
  );
  $export['node|experto|default'] = $ds_layout;

  $ds_layout = new stdClass();
  $ds_layout->api_version = 1;
  $ds_layout->id = 'node|experto|listado';
  $ds_layout->entity_type = 'node';
  $ds_layout->bundle = 'experto';
  $ds_layout->view_mode = 'listado';
  $ds_layout->layout = 'ds_1col';
  $ds_layout->settings = array(
    'hide_empty_regions' => 1,
    'hide_sidebars' => 0,
    'regions' => array(
      'ds_content' => array(
        0 => 'title',
        1 => 'field_expert_ranking',
        2 => 'field_expert_experience',
        3 => 'field_expert_sector',
        4 => 'field_expert_services',
        5 => 'field_expert_specialty',
        6 => 'field_country',
        7 => 'node_link',
      ),
    ),
    'fields' => array(
      'title' => 'ds_content',
      'field_expert_ranking' => 'ds_content',
      'field_expert_experience' => 'ds_content',
      'field_expert_sector' => 'ds_content',
      'field_expert_services' => 'ds_content',
      'field_expert_specialty' => 'ds_content',
      'field_country' => 'ds_content',
      'node_link' => 'ds_content',
    ),
    'classes' => array(),
  );
  $export['node|experto|listado'] = $ds_layout;

  return $export;
}
