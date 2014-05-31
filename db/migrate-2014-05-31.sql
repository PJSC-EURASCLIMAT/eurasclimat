SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE `engineering_system_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE `professions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `kch` int(10) DEFAULT NULL,
  `etks` int(10) DEFAULT NULL,
  `okz` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE `services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `chapter_id` int(10) unsigned DEFAULT NULL,
  `profession_id` int(10) unsigned DEFAULT NULL,
  `eng_sys_type_id` int(10) unsigned DEFAULT NULL,
  `norm_hours` int(10) unsigned DEFAULT NULL,
  `min_rank` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profession_id` (`profession_id`),
  KEY `chapter_id` (`chapter_id`),
  KEY `eng_sys_type_id` (`eng_sys_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE `services_chapters` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`chapter_id`) REFERENCES `services_chapters` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `services_ibfk_3` FOREIGN KEY (`profession_id`) REFERENCES `professions` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `services_ibfk_4` FOREIGN KEY (`eng_sys_type_id`) REFERENCES `engineering_system_types` (`id`) ON DELETE SET NULL;

ALTER TABLE `services_chapters`
  ADD CONSTRAINT `services_chapters_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `services_chapters` (`id`) ON DELETE CASCADE;

DROP TABLE 
    `catalog_dustextraction`, 
    `catalog_dustextraction_filtrations`, 
    `catalog_dustextraction_groups`, 
    `catalog_dustextraction_motors`, 
    `catalog_dustextraction_services`;

DROP TABLE 
    `catalog_watersupply`, 
    `catalog_watersupply_connection_types`, 
    `catalog_watersupply_control_types`, 
    `catalog_watersupply_groups`, 
    `catalog_watersupply_implementation_types`, 
    `catalog_watersupply_materials`, 
    `catalog_watersupply_power_sources`, 
    `catalog_watersupply_product_types`, 
    `catalog_watersupply_protection_types`, 
    `catalog_watersupply_services`;

DROP TABLE 
    `catalog_heating`, 
    `catalog_heating_connection_types`, 
    `catalog_heating_control_types`, 
    `catalog_heating_groups`, 
    `catalog_heating_implementation_types`, 
    `catalog_heating_materials`, 
    `catalog_heating_power_sources`, 
    `catalog_heating_product_types`, 
    `catalog_heating_protection_types`, 
    `catalog_heating_services`;

DROP TABLE 
    `catalog_electricity`, 
    `catalog_electricity_connection_types`, 
    `catalog_electricity_control_types`, 
    `catalog_electricity_groups`, 
    `catalog_electricity_implementation_types`, 
    `catalog_electricity_isolation_types`, 
    `catalog_electricity_materials`, 
    `catalog_electricity_power_sources`, 
    `catalog_electricity_product_types`, 
    `catalog_electricity_protection_types`, 
    `catalog_electricity_services`;

DROP TABLE 
    `catalog_automation`, 
    `catalog_automation_connection_types`, 
    `catalog_automation_control_types`, 
    `catalog_automation_groups`, 
    `catalog_automation_implementation_types`, 
    `catalog_automation_isolation_types`, 
    `catalog_automation_materials`, 
    `catalog_automation_power_sources`, 
    `catalog_automation_product_types`, 
    `catalog_automation_protection_types`, 
    `catalog_automation_services`;

SET FOREIGN_KEY_CHECKS=1;