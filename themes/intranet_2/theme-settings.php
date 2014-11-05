<?php
/**
 * Implements hook_form_FORM_ID_alter().
 *
 * @param $form
 *   The form.
 * @param $form_state
 *   The form state.
 */
function intranet_2_form_system_theme_settings_alter(&$form, &$form_state) {
  $form['zurb_foundation']['general']['theme_settings']['zurb_foundation_search_form'] = array(
    '#type' => 'checkbox',
    '#title' => t('Formulario de busqueda'),
    '#default_value' => theme_get_setting('zurb_foundation_search_form'),
  );
}
