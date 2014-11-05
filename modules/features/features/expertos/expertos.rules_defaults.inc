<?php
/**
 * @file
 * expertos.rules_defaults.inc
 */

/**
 * Implements hook_default_rules_configuration().
 */
function expertos_default_rules_configuration() {
  $items = array();
  $items['rules_nuevo_experto'] = entity_import('rules_config', '{ "rules_nuevo_experto" : {
      "LABEL" : "Nuevo experto",
      "PLUGIN" : "reaction rule",
      "TAGS" : [ "expertos" ],
      "REQUIRES" : [ "rules" ],
      "ON" : [ "node_insert" ],
      "IF" : [
        { "node_is_of_type" : { "node" : [ "node" ], "type" : { "value" : { "experto" : "experto" } } } }
      ],
      "DO" : [
        { "drupal_message" : { "message" : "Se ha agregado un nuevo experto, pero es necesario que un administrador lo valide para su publicaci\\u00f3n" } },
        { "redirect" : { "url" : "\\u003Cfront\\u003E" } }
      ]
    }
  }');
  return $items;
}
