SET FOREIGN_KEY_CHECKS=0;

DROP TABLE 
    `catalog_airing_connection_types`, 
    `catalog_airing_control_types`, 
    `catalog_airing_groups`, 
    `catalog_airing_implementation_types`, 
    `catalog_airing_isolation_clases`, 
    `catalog_airing_materials`, 
    `catalog_airing_power_sources`, 
    `catalog_airing_product_types`, 
    `catalog_airing_protection_types`, 
    `catalog_conditioners_groups`, 
    `catalog_conditioners_implementation_types`, 
    `catalog_conditioners_power_sources`, 
    `catalog_conditioners_product_types`;

DROP TABLE IF EXISTS `catalog_airing`;
CREATE TABLE IF NOT EXISTS `catalog_airing` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
  `group_id` int(10) unsigned DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `marking` text,
  `name` text,
  `product_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `control_type_id` int(10) unsigned DEFAULT NULL,
  `connection_type_id` int(10) unsigned DEFAULT NULL,
  `protection_type_id` int(10) unsigned DEFAULT NULL,
  `material_id` int(10) unsigned DEFAULT NULL,
  `power_source_id` int(10) unsigned DEFAULT NULL,
  `isolation_class_id` int(10) unsigned DEFAULT NULL,
  `country` text,
  `temp` text,
  `power_supply` text,
  `heating_power_consumption` text,
  `amperage` text,
  `sensor_inputs` text,
  `pressure` text,
  `noise_level_min` text,
  `filters_performance` text,
  `performance` text,
  `pollution_size` text,
  `eer` text,
  `weight` text,
  `dimensions` text,
  `cable_length` text,
  `pipe_diameter` text,
  `delivery_height` text,
  `immersion_depth` text,
  `warranty` text,
  `url` text,
  `price` text,
  `dealer_price` text,
  `currency_id` int(10) unsigned DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `mark_id` (`mark_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `implementation_type_id` (`implementation_type_id`),
  KEY `control_type_id` (`control_type_id`),
  KEY `connection_type_id` (`connection_type_id`),
  KEY `protection_type_id` (`protection_type_id`),
  KEY `material_id` (`material_id`),
  KEY `power_source_id` (`power_source_id`),
  KEY `isolation_class_id` (`isolation_class_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

DROP TABLE IF EXISTS `catalog_electricity_battery`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_battery` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `name` text,
  `marking` text,
  `product_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `type_id` int(10) unsigned DEFAULT NULL,
  `size_type_id` int(10) unsigned DEFAULT NULL,
  `voltage` text,
  `capacity` text,
  `country` text,
  `measure` text,
  `price` text,
  `dealer_price` text,
  `currency_id` int(10) unsigned DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `mark_id` (`mark_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `implementation_type_id` (`implementation_type_id`),
  KEY `type_id` (`type_id`),
  KEY `size_type_id` (`size_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_electricity_isolation`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_isolation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `name` text,
  `marking` text,
  `product_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `colour` text,
  `width` text,
  `length` text,
  `pipe_diameter_id` int(10) unsigned DEFAULT NULL,
  `cambric_diameter` text,
  `combustibility_id` int(10) unsigned DEFAULT NULL,
  `exploitation_id` int(10) unsigned DEFAULT NULL,
  `temp_ranges_id` int(10) unsigned DEFAULT NULL,
  `breakdown_voltage` text,
  `country` text,
  `measure` text,
  `price` text,
  `dealer_price` text,
  `currency_id` int(10) unsigned DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `mark_id` (`mark_id`),
  KEY `implementation_type_id` (`implementation_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_electricity_lamp`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_lamp` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `name` text,
  `marking` text,
  `group_id` int(10) unsigned DEFAULT NULL,
  `product_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `cap_type_id` int(10) unsigned DEFAULT NULL,
  `bulb_type_id` int(10) unsigned DEFAULT NULL,
  `voltage` int(10) unsigned DEFAULT NULL,
  `power` text,
  `reflector_diameter` text,
  `beam_angle` text,
  `dispersion_angle` text,
  `light_stream` text,
  `bulb_diameter` text,
  `tube_diameter` text,
  `lamp_diameter` text,
  `lamp_length` text,
  `country` text,
  `measure` text,
  `price` text,
  `dealer_price` text,
  `currency_id` int(10) unsigned DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `mark_id` (`mark_id`),
  KEY `group_id` (`group_id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `implementation_type_id` (`implementation_type_id`),
  KEY `cap_type_id` (`cap_type_id`),
  KEY `bulb_type_id` (`bulb_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `catalog_electricity_wires`;
CREATE TABLE IF NOT EXISTS `catalog_electricity_wires` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` text,
  `mark_id` int(10) unsigned DEFAULT NULL,
  `name` text,
  `marking` text,
  `production_type_id` int(10) unsigned DEFAULT NULL,
  `implementation_type_id` int(10) unsigned DEFAULT NULL,
  `conductor_material_id` int(10) unsigned DEFAULT NULL,
  `conductor_type_id` int(10) unsigned DEFAULT NULL,
  `conductor_section_id` int(10) unsigned DEFAULT NULL,
  `pairs_number` int(11) DEFAULT NULL,
  `conductors_number` int(11) DEFAULT NULL,
  `isolation_material_id` int(10) unsigned DEFAULT NULL,
  `cable_material_id` int(10) unsigned DEFAULT NULL,
  `wire_colour` text,
  `screening_id` int(10) unsigned DEFAULT NULL,
  `outer_diameter` int(10) unsigned DEFAULT NULL,
  `working_voltage_id` int(10) unsigned DEFAULT NULL,
  `working_frequency_id` int(10) unsigned DEFAULT NULL,
  `isolation_resistance` text,
  `bend_radius` text,
  `combustibility_id` int(10) unsigned DEFAULT NULL,
  `exploitation_id` int(10) unsigned DEFAULT NULL,
  `laying_temp` text,
  `temp_range_id` int(10) unsigned DEFAULT NULL,
  `country` text,
  `measure` text,
  `price` text,
  `dealer_price` text,
  `currency_id` int(10) unsigned DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `mark_id` (`mark_id`),
  KEY `production_type_id` (`production_type_id`),
  KEY `implementation_type_id` (`implementation_type_id`),
  KEY `conductor_material_id` (`conductor_material_id`),
  KEY `conductor_type_id` (`conductor_type_id`),
  KEY `isolation_material_id` (`isolation_material_id`),
  KEY `cable_material_id` (`cable_material_id`),
  KEY `screening_id` (`screening_id`),
  KEY `outer_diameter` (`outer_diameter`),
  KEY `working_voltage_id` (`working_voltage_id`),
  KEY `working_frequency_id` (`working_frequency_id`),
  KEY `combustibility_id` (`combustibility_id`),
  KEY `exploitation_id` (`exploitation_id`),
  KEY `currency_id` (`currency_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `catalog_airing`
  ADD CONSTRAINT `catalog_airing_ibfk_1` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`) ON DELETE SET NULL;

ALTER TABLE `catalog_electricity_battery`
  ADD CONSTRAINT `catalog_electricity_battery_ibfk_1` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`) ON DELETE SET NULL;

ALTER TABLE `catalog_electricity_isolation`
  ADD CONSTRAINT `catalog_electricity_isolation_ibfk_1` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`) ON DELETE SET NULL;

ALTER TABLE `catalog_electricity_lamp`
  ADD CONSTRAINT `catalog_electricity_lamp_ibfk_1` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`) ON DELETE SET NULL;

ALTER TABLE `catalog_electricity_wires`
  ADD CONSTRAINT `catalog_electricity_wires_ibfk_1` FOREIGN KEY (`mark_id`) REFERENCES `catalog_marks` (`id`) ON DELETE SET NULL;

SET FOREIGN_KEY_CHECKS=1;